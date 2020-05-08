import "~/assets/style/index.scss";
import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  router.beforeEach((to, from, next) => {
    if (to.fullPath === "/account") next("/");
    else next();
  });
}
