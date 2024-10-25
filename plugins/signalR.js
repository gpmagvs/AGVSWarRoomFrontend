// plugins/signalr.js
import Vue from 'vue';
import SignalRService from '@/services/signalR';

export default (app, { store }) => {
  console.log("Init from server/client");
  //SignalRService.init(store);
  Vue.prototype.$signalr = SignalRService;
};
