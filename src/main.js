import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import firebase from './firebase';
import App from './App';

import routes from './routes';
import store from './store/store';

Vue.use(VueRouter);
Vue.use(VueFire);

const router = new VueRouter({
  routes,
  mode: 'history',
  /* eslint-disable no-unused-vars */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (to.matched.some(record => record.meta.requiresGuest) && user) {
      next({ path: '/my-palettes' });
    } else if (to.matched.some(record => record.meta.requiresAuth) && !user) {
      next({
        path: 'auth/login',
        query: { redirect: '/my-palettes' },
      });
    } else {
      next();
    }
  });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
