import { UPDATE_PALETTE } from './mutation-types';

const initialState = {
  palette1: {
    color1: 'ff0000',
    color2: '00ff00',
    color3: '0000ff',
    color4: 'ffff00',
    color5: '00ffff',
  },
  palette2: {
    color1: 'ffcccc',
    color2: '1cffc1',
    color3: 'eec5ff',
    color4: 'fff550',
    color5: '00f555',
  },
  palette3: {
    color1: 'dddd00',
    color2: '00ffdd',
    color3: '00ddff',
    color4: 'ffcc00',
    color5: '0dffff',
  },
};

const mutations = {
  [UPDATE_PALETTE](state, payload) {
    /* eslint-disable no-param-reassign*/
    state[payload.id] = payload.colors;
  },
};

const actions = {
  updatePalette({ commit }, palette) {
    commit(UPDATE_PALETTE, palette);
  },
};

export default {
  state: { ...initialState },
  mutations,
  actions,
};
