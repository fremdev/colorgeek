/* eslint-disable */
import {
  RESET_NEW_PALETTE_COLORS,
  UPDATE_NEW_PALETTE_COLOR,
} from './mutation-types';

const state = {
  colors: {
    color1: 'ffffff',
    color2: 'ffffff',
    color3: 'ffffff',
    color4: 'ffffff',
    color5: 'ffffff',
  },
  likes: 0,
};

const mutations = {
  [RESET_NEW_PALETTE_COLORS] (state) {
    state.colors.color1 = 'ffffff';
    state.colors.color2 = 'ffffff';
    state.colors.color3 = 'ffffff';
    state.colors.color4 = 'ffffff';
    state.colors.color5 = 'ffffff';
  },
  [UPDATE_NEW_PALETTE_COLOR] (state, color) {
    state.colors[`color${color.colorIndex}`] = color.value;
  },
};

const actions = {
  resetNewPaletteColors({ commit }) {
    commit(RESET_NEW_PALETTE_COLORS);
  },
  updateNewPaletteColor({ commit }, color) {
    commit(UPDATE_NEW_PALETTE_COLOR, color);
  },
};

export default {
  state,
  mutations,
  actions,
};
