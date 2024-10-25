import VehicleBatteryApi from "./api/VehicleBattery";
import ConfigurationApi from "./api/Configuration.js";
import AppApi from "./api/App.js";
import axios from 'axios'
export default function ({ app, $axios, store }, inject) {
  var _axios = axios.create(process.env.NODE_ENV === 'development' ? {
    baseURL: 'http://127.0.0.1:5254'
  } : {})
  const API = {};
  API.VehicleBatteryApi = VehicleBatteryApi(_axios);
  API.APP = AppApi(_axios);
  API.Configuration = ConfigurationApi(_axios);
  // Inject to context as $api
  inject("api", API);
}
