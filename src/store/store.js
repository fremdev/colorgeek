import Vue from 'vue';
import Vuex from 'vuex';

import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
} from './mutation-types';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    currentUser: {},
  },
  mutations: {
    [SET_CURRENT_USER](state, user) {
      state.currentUser = user;
    },
    [CLEAR_CURRENT_USER](state) {
      state.currentUser = {};
    },
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit(SET_CURRENT_USER, user);
    },
    clearCurrentUser({ commit }) {
      commit(CLEAR_CURRENT_USER);
    },
  },
});
