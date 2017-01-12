import Vue from 'vue';
import Vuex from 'vuex';

import publicPalettes from './modules/publicPalettes/publicPalettes';
import userPalettes from './modules/userPalettes/userPalettes';
import newPalette from './modules/newPalette/newPalette';

import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_COLOR_TYPE,
  SET_SELECTED_COLOR,
  SET_ERROR_MESSAGE,
} from './mutation-types';

Vue.use(Vuex);

/* eslint-disable no-param-reassign */
export default new Vuex.Store({
  state: {
    currentUser: {
      uid: '',
      nickname: '',
    },
    colorType: 'hex',
    selectedColor: '',
    errorMessage: '',
  },
  modules: {
    private: userPalettes,
    public: publicPalettes,
    newPalette,
  },
  mutations: {
    [SET_CURRENT_USER](state, user) {
      state.currentUser.uid = user.uid;
      if (user.nickname) {
        state.currentUser.nickname = user.nickname;
      }
    },
    [CLEAR_CURRENT_USER](state) {
      state.currentUser = {
        uid: '',
        nickname: '',
      };
    },
    [SET_COLOR_TYPE](state, value) {
      state.colorType = value;
    },
    [SET_SELECTED_COLOR](state, color) {
      state.selectedColor = color;
    },
    [SET_ERROR_MESSAGE](state, message) {
      state.errorMessage = message;
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
    setErrorMessage({ commit }, message) {
      commit(SET_ERROR_MESSAGE, message);
    },
  },
});
