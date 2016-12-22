import Vue from 'vue';
import Vuex from 'vuex';

import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_COLOR_TYPE,
  SET_SELECTED_COLOR,
} from './mutation-types';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    currentUser: {},
    colorType: 'hex',
    selectedColor: '',
  },
  mutations: {
    [SET_CURRENT_USER](state, user) {
      state.currentUser = user;
    },
    [CLEAR_CURRENT_USER](state) {
      state.currentUser = {};
    },
    [SET_COLOR_TYPE](state, value) {
      state.colorType = value;
    },
    [SET_SELECTED_COLOR](state, color) {
      state.selectedColor = color;
    },
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit(SET_CURRENT_USER, user);
    },
    clearCurrentUser({ commit }) {
      commit(CLEAR_CURRENT_USER);
    },
    setColorType({ commit }, value) {
      commit(SET_COLOR_TYPE, value);
    },
    setSelectedColor({ commit }, color) {
      commit(SET_SELECTED_COLOR, color);
    },
  },
});
