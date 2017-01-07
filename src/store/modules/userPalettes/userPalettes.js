/* eslint-disable */
import { db } from '../../../firebase';
import {
  ADD_USER_PALETTES,
  CLEAR_USER_PALETTES,
  UPDATE_USER_PALETTE_COLOR,
  UPDATE_USER_PALETTE_COLORS,
  UPDATE_USER_PALETTE_LIKES,
  MAKE_PALETTE_PUBLIC,
  REMOVE_USER_PALETTE,
  ADD_USER_PALETTES_TO_END,
  START_LOADING_PRIVATE,
  STOP_LOADING_PRIVATE,
  SET_NO_MORE_USER_PALETTES,
} from './mutation-types';

const state = {
  palettes: [],
  isLoading: false,
  isNoMorePalettes: false,
};

const mutations = {
  [ADD_USER_PALETTES] (state, palette) {
    state.palettes.unshift(palette);
  },
  [CLEAR_USER_PALETTES] (state) {
    state.palettes.length = 0;
    state.isNoMorePalettes = false;
  },
  [UPDATE_USER_PALETTE_COLOR] (state, color) {
    state.palettes[color.paletteIndex].colors[`color${color.colorIndex}`] = color.value;
  },
  [UPDATE_USER_PALETTE_COLORS] (state, palette) {
    state.palettes[palette.index].colors = palette.colors;
  },
  [UPDATE_USER_PALETTE_LIKES] (state, palette) {
    state.palettes[palette.index].likes = palette.likes;
    state.palettes[palette.index].isLiked = palette.isLiked;
  },
  [MAKE_PALETTE_PUBLIC] (state, index) {
    state.palettes[index].public = true;
  },
  [REMOVE_USER_PALETTE] (state, index) {
    state.palettes.splice(index, 1);
  },
  [ADD_USER_PALETTES_TO_END] (state, palettes) {
    state.palettes.push(...palettes);
  },
  [START_LOADING_PRIVATE] (state) {
    state.isLoading = true;
  },
  [STOP_LOADING_PRIVATE] (state) {
    state.isLoading = false;
  },
  [SET_NO_MORE_USER_PALETTES] (state) {
    state.isNoMorePalettes = true;
  },
};

const actions = {
  loadUserPalettes({ commit }, { uid, palettesNum }) {
    commit(START_LOADING_PRIVATE);
    const userPalettesRef = db.ref(`authors/${uid}`).orderByKey().limitToLast(palettesNum);
    db.ref(`authors/${uid}`).off();
    let count = 0;
    userPalettesRef.on('child_added', (data) => {
      count += 1;
      const palette = data.val();
      const key = data.key;
      commit(ADD_USER_PALETTES, {
        public: false,
        ...palette,
        key,
      });
      if(count === palettesNum) {
        db.ref(`authors/${uid}`).off();
        commit(STOP_LOADING_PRIVATE);
      }
    });
  },
  updateUserPaletteColor({ commit }, color) {
    commit(UPDATE_USER_PALETTE_COLOR, color);
  },
  updateUserPaletteColors({ commit }, { uid, key, index, colors }) {
    db.ref(`authors/${uid}/${key}/colors`).set(colors)
      .then(() => {
        commit(UPDATE_USER_PALETTE_COLORS, { index, colors })
      });
  },
  updateUserPaletteLikes({ commit }, { uid, key, index, likes, isPublic }) {
    const isLikedRef = db.ref(`likes/${uid}/${key}`);
    isLikedRef.once('value')
      .then((data) => {
        const isLiked = data.val();
        const newLikesNum = isLiked ? likes - 1 : likes + 1;
        const newIsLiked = isLiked ? null : true;
        db.ref(`authors/${uid}/${key}/likes`).set(newLikesNum)
          .then(() => {
            isLikedRef.set(newIsLiked).then(() => {
              commit(UPDATE_USER_PALETTE_LIKES, {
                index,
                likes: newLikesNum,
                isLiked: newIsLiked,
              });
            });
          })
          .then(() => {
            if(isPublic) {
              db.ref(`public/${key}/likes`).once('value')
                .then((data) => {
                  if(data.val() !== null) {
                    db.ref(`public/${key}/likes`).set(newLikesNum);
                  }
                });
            }
          });
      });
  },
  makePalettePublic({ commit }, { palette, index }) {
    db.ref(`public/${palette.key}`).set({
      author: palette.author,
      colors: palette.colors,
      likes: palette.likes,
    }).then(() => {
      db.ref(`authors/${palette.author.uid}/${palette.key}/public`).set(true)
        .then(() => {
          commit(MAKE_PALETTE_PUBLIC, index);
        });
    });
  },
  removeUserPalette({ commit }, { uid, key, index }) {
    db.ref(`authors/${uid}`).off();
    db.ref(`authors/${uid}/${key}`).remove()
      .then(() => {
        commit(REMOVE_USER_PALETTE, index);
      });
  },
  clearUserPalettes({ commit }) {
    commit(CLEAR_USER_PALETTES);
  },
  addUserPalettesToEnd({ commit, state }, { uid, endKey, palettesNum }) {
    db.ref(`authors/${uid}`).off();
    if(!state.isLoading) {
      commit(START_LOADING_PRIVATE);
    }
    const nextPalettes = [];
    db.ref(`authors/${uid}`).orderByKey().endAt(endKey).limitToLast(palettesNum)
    .on('child_added', (data) => {
      const palette = data.val();
      const key = data.key;
      if (key !== endKey) {
        nextPalettes.unshift({
          ...palette,
          key,
        });
      } else {
        commit(ADD_USER_PALETTES_TO_END, nextPalettes);
        commit(STOP_LOADING_PRIVATE);
        if(nextPalettes.length === 0) {
          commit(SET_NO_MORE_USER_PALETTES);
        }
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
