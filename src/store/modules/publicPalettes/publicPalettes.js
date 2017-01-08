/* eslint-disable */
import { db } from '../../../firebase';
import {
  ADD_PUBLIC_PALETTE,
  UPDATE_PUBLIC_PALETTE_LIKES,
  CLEAR_PUBLIC_PALETTES,
  ADD_PUBLIC_PALETTES_TO_END,
  SET_PALETTES_WAS_ADDED,
  START_LOADING_PUBLIC,
  STOP_LOADING_PUBLIC,
  SET_NO_MORE_PALETTES,
} from './mutation-types';

const state = {
  palettes: [],
  palettesWasAdded: 0,
  isLoading: false,
  isNoMorePalettes: false,
};

const mutations = {
  [ADD_PUBLIC_PALETTE] (state, palette) {
    state.palettes.unshift(palette);
  },
  [CLEAR_PUBLIC_PALETTES] (state) {
    state.palettes.length = 0;
    state.isNoMorePalettes = false;
  },
  [UPDATE_PUBLIC_PALETTE_LIKES] (state, palette) {
    state.palettes[palette.index].likes = palette.likes;
    state.palettes[palette.index].isLiked = palette.isLiked;
  },
  [ADD_PUBLIC_PALETTES_TO_END] (state, palettes) {
    state.palettes.push(...palettes);
  },
  [SET_PALETTES_WAS_ADDED] (state, value) {
    state.palettesWasAdded = value;
  },
  [START_LOADING_PUBLIC] (state) {
    state.isLoading = true;
  },
  [STOP_LOADING_PUBLIC] (state) {
    state.isLoading = false;
  },
  [SET_NO_MORE_PALETTES] (state) {
    state.isNoMorePalettes = true;
  },
};

const addPalettesToEnd = ({ commit }, { uid, likes, endKey, palettesNum }, dbRef) => {
  commit(START_LOADING_PUBLIC);
  const nextPalettes = [];
  db.ref('public').off();
  dbRef.on('child_added', (data) => {
    const palette = data.val();
    const key = data.key;
    if (key !== endKey) {
      nextPalettes.unshift({
        ...palette,
        key,
      });
    } else {
      commit(ADD_PUBLIC_PALETTES_TO_END, nextPalettes);
      commit(STOP_LOADING_PUBLIC);
      if(nextPalettes.length === 0) {
        commit(SET_NO_MORE_PALETTES);
      }
    }
  });
}

const actions = {
  loadPublicPalettes({ commit, state }, palettesNum) {
    commit(START_LOADING_PUBLIC);
    const publicRef = db.ref('public').orderByKey().limitToLast(palettesNum);
    db.ref('public').off();
    commit(SET_PALETTES_WAS_ADDED, 0);
    let count = 0;
    let startKey;
    publicRef.on('child_added', (data) => {
      count += 1;
      if (count <= palettesNum) {
        const palette = data.val();
        const key = data.key;
        commit(ADD_PUBLIC_PALETTE, {
          ...palette,
          key,
        });
        if(count === palettesNum) {
          startKey = data.key;
          commit(STOP_LOADING_PUBLIC);
        }
      } else {
        db.ref('public').off();
        let addedCount = 0;
        db.ref('public').orderByKey().startAt(startKey).on('child_added', (data) => {
          addedCount += 1;
          // Omit addedCount === 1 because startAt() include child with start key
          if(addedCount > 1) {
            commit(SET_PALETTES_WAS_ADDED, state.palettesWasAdded + 1);
          }
        });
      }
    });
  },
  loadPickedPalettes({ commit, state }, palettesNum) {
    commit(START_LOADING_PUBLIC);
    const pickedRef = db.ref('public').orderByChild('picked').equalTo(true).limitToLast(palettesNum);
    db.ref('public').off();
    let count = 0;
    pickedRef.on('child_added', (data) => {
      count += 1;
      if (count <= palettesNum) {
        const palette = data.val();
        const key = data.key;
        commit(ADD_PUBLIC_PALETTE, {
          ...palette,
          key,
        });
        if(count === palettesNum) { commit(STOP_LOADING_PUBLIC); };
      }
    });
  },
  loadPopularPalettes({ commit, state }, palettesNum) {
    commit(START_LOADING_PUBLIC);
    const popularRef = db.ref('public').orderByChild('likes').limitToLast(palettesNum);
    db.ref('public').off();
    let count = 0;
    popularRef.on('child_added', (data) => {
      count += 1;
      if (count <= palettesNum) {
        const palette = data.val();
        const key = data.key;
        commit(ADD_PUBLIC_PALETTE, {
          ...palette,
          key,
        });
        if(count === palettesNum) { commit(STOP_LOADING_PUBLIC); };
      }
    });
  },
  updatePublicPaletteLikes({ commit }, { uid, key, index, likes, authorId }) {
    const isLikedRef = db.ref(`likes/${uid}/${key}`);
    isLikedRef.once('value')
      .then((data) => {
        const isLiked = data.val();
        const newLikesNum = isLiked ? likes - 1 : likes + 1;
        const newIsLiked = isLiked ? null : true;
        db.ref(`public/${key}/likes`).set(newLikesNum)
          .then(() => {
            isLikedRef.set(newIsLiked).then(() => {
              commit(UPDATE_PUBLIC_PALETTE_LIKES, {
                index,
                likes: newLikesNum,
                isLiked: newIsLiked,
              });
            });
          })
          .then(() => {
            const authorLikesRef = db.ref(`authors/${authorId}/${key}/likes`);
            authorLikesRef.once('value')
              .then((data) => {
                if (Number.isInteger(data.val())) {
                  authorLikesRef.set(newLikesNum);
                }
              });
          });
      });
  },
  clearPublicPalettes({ commit }) {
    commit(CLEAR_PUBLIC_PALETTES);
  },
  addPublicPalettesToEnd({ commit }, { uid, endKey, palettesNum }) {
    const publicRef = db.ref('public').orderByKey().endAt(endKey).limitToLast(palettesNum);
    addPalettesToEnd({ commit }, { uid, endKey, palettesNum }, publicRef);
  },
  addPickedPalettesToEnd({ commit }, { uid, endKey, palettesNum }) {
    const pickedRef = db.ref('public').orderByChild('picked').endAt(true, endKey).limitToLast(palettesNum);
    commit(START_LOADING_PUBLIC);
    const nextPalettes = [];
    db.ref('public').off();
    pickedRef.on('child_added', (data) => {
      const palette = data.val();
      const key = data.key;
      if (key !== endKey && palette.picked) {
        nextPalettes.unshift({
          ...palette,
          key,
        });
      } else {
        commit(ADD_PUBLIC_PALETTES_TO_END, nextPalettes);
        commit(STOP_LOADING_PUBLIC);
        if(nextPalettes.length === 0) {
          commit(SET_NO_MORE_PALETTES);
        }
      }
    });
  },
  addPopularPalettesToEnd({ commit }, { uid, likes, endKey, palettesNum }) {
    const popularRef = db.ref('public').orderByChild('likes').endAt(likes, endKey).limitToLast(palettesNum);
    addPalettesToEnd({ commit }, { uid, endKey, palettesNum }, popularRef);
  },
};

export default {
  state,
  mutations,
  actions,
};
