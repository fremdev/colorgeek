/* eslint-disable */
import { db } from '../../../firebase';
import {
  ADD_PUBLIC_PALETTE,
  UPDATE_PUBLIC_PALETTE_LIKES,
  CLEAR_PUBLIC_PALETTES,
  ADD_PUBLIC_PALETTES_TO_END,
  SET_PALETTES_WAS_ADDED,
} from './mutation-types';

const state = {
  palettes: [],
  palettesWasAdded: 0,
};

const mutations = {
  [ADD_PUBLIC_PALETTE] (state, palette) {
    state.palettes.unshift(palette);
  },
  [CLEAR_PUBLIC_PALETTES] (state) {
    state.palettes.length = 0;
    state.palettesWasAdded = 0;
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
};

const loadPalettes = ({ commit, state }, palettesNum, dbRef) => {
  db.ref('public').off();
  commit(SET_PALETTES_WAS_ADDED, 0);
  let count = 0;
  dbRef.on('child_added', (data) => {
    count += 1;
    if (count <= palettesNum) {
      const palette = data.val();
      const key = data.key;
      commit(ADD_PUBLIC_PALETTE, {
        ...palette,
        key,
      });
    } else {
      commit(SET_PALETTES_WAS_ADDED, state.palettesWasAdded + 1);
    }
  });
};

const addPalettesToEnd = ({ commit }, { uid, likes, endKey, palettesNum }, dbRef) => {
  const nextPalettes = [];
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
    }
  });
}

const actions = {
  loadPublicPalettes({ commit, state }, palettesNum) {
    const publicRef = db.ref('public').orderByKey().limitToLast(palettesNum);
    loadPalettes({ commit, state }, palettesNum, publicRef);
  },
  loadPopularPalettes({ commit, state }, palettesNum) {
    const popularRef = db.ref('public').orderByChild('likes').limitToLast(palettesNum);
    db.ref('public').off();
    commit(SET_PALETTES_WAS_ADDED, 0);
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
