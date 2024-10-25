// plugins/router.js
export default ({ app }, inject) => {
  inject('router', app.router);
  inject('route', app.router.currentRoute);
};
