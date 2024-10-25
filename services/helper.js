import Vue from 'vue';

export function getCurrentUrl() {
  const router = Vue.prototype.$router;
  if (router) {
    return router.currentRoute.fullPath;
  }
  return null;
}
