import Vuex from "vuex";
import "~/assets/style/index.scss";
import DefaultLayout from "~/layouts/Default.vue";
import store from "~/store";
import { toLocaleDate } from "~/filters/date";

export default function(Vue, { appOptions, router, head, isClient }) {
  Vue.filter("toLocaleDate", toLocaleDate);
  Vue.component("Layout", DefaultLayout);
  Vue.use(Vuex);
  
  appOptions.store = new Vuex.Store(store);
  
  // router.beforeEach((to, from, next) => {
  //   if (to.fullPath === "/account") next("/");
  //   else next();
  // });
}
