import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';

import store from './store/store';
import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
