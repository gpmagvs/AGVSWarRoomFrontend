export const state = () => ({
  CurrentFieldName: '',
  SignalRUrl: 'http://127.0.0.1:5254/RealTimeDataHub',
  fields: [{ name: '', url: '' }],
  fieldsOverViewStatus: {},
  counter: 0,
  isCollapse: true
})

export const getters = {
  getCounter(state) {
    return state.counter
  },
  isAllBatteryNormal(state, fieldName) {
    return true;
  },
  anyFieldHasBatAbnormal(state) {
    var fieldsState = Object.values(state.fieldsOverViewStatus);
    //console.info(fieldsState);
    var hasAbnormalField = fieldsState.filter(ov => ov.nonNormalCount != 0);
    // console.log(hasAbnormalField)
    return hasAbnormalField;
  }
}

export const mutations = {

  setCurrentFieldName(state, name) {
    state.CurrentFieldName = name;
  },
  storeFieldInfos(state, data) {
    console.log(data)
    state.fields = data;
  },
  storeFieldOverViewStatus(state, data = { name: '', status: {} }) {
    state.fieldsOverViewStatus[data.name] = data.status;
  },
  currentSignalRUrl(state, url) {
    state.SignalRUrl = url;
  },
  SET_COLLAPSE(state, collapse) {
    state.isCollapse = collapse;
  }
}

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  }
}
