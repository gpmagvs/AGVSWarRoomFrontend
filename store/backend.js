export const state = () => ({
  counter: 0,
  list: [
    {
      a: 213
    }
  ],
  batteryInfos: {},
  chargerInfos: {},
  alarmAudioState: {
    isAudioPlaying: false,
    playingAudios: []
  }
})

export const getters = {
  getCounter(state) {
    return state.counter
  }
}

export const mutations = {

  storeBatteryInfos(state, data) {
    state.batteryInfos = data;
  },
  storeChargerInfos(state, data) {
    // console.info('store charger data', data);
    state.chargerInfos = data;
  },
  storeAlarmAudioState(state, data) {
    state.alarmAudioState = data;
  }
}

export const actions = {
  async fetchCounter({ state, commit }) {
    // make request
    const res = { data: 10 };
    commit('add_todo', { dfdf: 123 })
    return state.list;
  }
}
