/* eslint-disable */
import { db } from '../../../firebase';
import {
  ADD_USER_PALETTE,
  CLEAR_USER_PALETTES,
  UPDATE_USER_PALETTE_COLOR,
  UPDATE_USER_PALETTE_COLORS,
  UPDATE_USER_PALETTE_LIKES,
  MAKE_PALETTE_PUBLIC,
  REMOVE_USER_PALETTE,
  ADD_USER_PALETTES_TO_END,
} from './mutation-types';

const state = [];

const mutations = {
  [ADD_USER_PALETTE] (state, palette) {
    state.unshift(palette);
  },
  [CLEAR_USER_PALETTES] (state) {
    state.length = 0;
  },
  [UPDATE_USER_PALETTE_COLOR] (state, color) {
    state[color.paletteIndex].colors[`color${color.colorIndex}`] = color.value;
  },
  [UPDATE_USER_PALETTE_COLORS] (state, palette) {
    state[palette.index].colors = palette.colors;
  },
  [UPDATE_USER_PALETTE_LIKES] (state, palette) {
    state[palette.index].likes = palette.likes;
    state[palette.index].isLiked = palette.isLiked;
  },
  [MAKE_PALETTE_PUBLIC] (state, index) {
    state[index].public = true;
  },
  [REMOVE_USER_PALETTE] (state, index) {
    state.splice(index, 1);
  },
  [ADD_USER_PALETTES_TO_END] (state, palettes) {
    state.push(...palettes);
  },
};

const actions = {
  loadUserPalette({ commit }, { uid, palettesNum }) {
    db.ref(`authors/${uid}`).orderByKey().limitToLast(palettesNum).on('child_added', (data) => {
      const palette = data.val();
      const key = data.key;
      commit(ADD_USER_PALETTE,
        { ...palette,
          key,
        });
    });
  },
  addNewUserPalette({ commit }, user) {
    db.ref(`authors/${user.uid}`).off();
    const newPaletteRef = db.ref(`authors/${user.uid}`).push();
    const initialPalette = {
      colors: {
        color1: 'ffffff',
        color2: 'ffffff',
        color3: 'ffffff',
        color4: 'ffffff',
        color5: 'ffffff',
      },
      likes: 0,
      author: user,
    };
    const key = newPaletteRef.key;
    newPaletteRef.set(initialPalette)
      .then(() => {
        commit(ADD_USER_PALETTE, { ...initialPalette, key });
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
              db.ref(`public/${key}/likes`).set(newLikesNum);
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
  addUserPalettesToEnd({ commit }, { uid, endKey, palettesNum }) {
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
      }
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
