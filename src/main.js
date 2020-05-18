/* eslint-disable no-unused-vars */
import Vuex from 'vuex';
import '~/assets/fonts/index.scss';
import '~/assets/style/globals.scss';
import store from '~/store';
import { toLocaleDate } from '~/filters/date';

import DefaultLayout from '~/layouts/Default.vue';

import { startsWith } from '../utils/validator';

const routes = {
  withAuth: ['/account'],
  redirectToAccount: ['/login', 'register'],
};

export default function(Vue, { appOptions, router, head, isClient }) {
  Vue.use(Vuex);
  Vue.filter('toLocaleDate', toLocaleDate);
  Vue.component('Layout', DefaultLayout);

  appOptions.store = new Vuex.Store(store);

  if (process.isClient) {
    router.beforeEach((to, from, next) => {
      // access only when authenticated
      // else redirect to login
      if (
        !appOptions.store.getters.isAuthenticated &&
        routes.withAuth.some(route => startsWith(to.fullPath, route))
      ) {
        next('/login');
      } else {
        next();
      }

      // if already authenticated
      // redirect  specified routes to dashboard
      if (
        routes.redirectToAccount.some(route => startsWith(to.fullPath, route))
      ) {
        if (appOptions.store.getters.isAuthenticated) {
          next('/account');
        }
      }
    });
  }
}
