import Vuex from "vuex";
import "~/assets/style/index.scss";
import DefaultLayout from "~/layouts/Default.vue";
import store from "~/store";

export default function(Vue, { appOptions, router, head, isClient }) {
  Vue.use(Vuex);
  Vue.component("Layout", DefaultLayout);
  appOptions.store = new Vuex.Store(store);
  // router.beforeEach((to, from, next) => {
  //   if (to.fullPath === "/account") next("/");
  //   else next();
  // });
}
