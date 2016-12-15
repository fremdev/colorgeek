import Vue from 'vue';
import Vuex from 'vuex';

import palettes from './modules/palettes/palettes';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    palettes,
  },
  strict: debug,
});
