import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import App from './App';

import routes from './routes';

Vue.use(VueRouter);
Vue.use(VueFire);

const router = new VueRouter({
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
