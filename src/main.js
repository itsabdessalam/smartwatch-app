/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import '~/assets/fonts/index.scss';
import '~/assets/style/globals.scss';
import DefaultLayout from '~/layouts/Default.vue';
import store from '~/store';
import { toLocaleDate } from '~/filters/date';

export default function(Vue, { appOptions, router, head, isClient }) {
  Vue.use(Vuex);
  Vue.filter('toLocaleDate', toLocaleDate);
  Vue.component('Layout', DefaultLayout);

  appOptions.store = new Vuex.Store(store);

  // router.beforeEach((to, from, next) => {
  //   if (to.fullPath === "/account") next("/");
  //   else next();
  // });
}
