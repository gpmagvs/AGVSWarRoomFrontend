// store/signalr.js
import SignalRService from '@/services/signalR';

export const state = () => ({
  messages: [],
  isConnected: false,
  realTimeEquipmentStatus: {},
});

export const mutations = {
  ADD_MESSAGE(state, message) {
    state.messages.push(message);
  },
  SET_CONNECTION_STATUS(state, status) {
    state.isConnected = status;
  },
  SET_REAL_TIME_EQUIPMENT_STATUS(state, status) {
    state.realTimeEquipmentStatus = status;
  },
};

export const actions = {
  async startEquipmentsStateConnection({ commit }, query) {
    console.log('startEquipmentsStateConnection', query.floor, query.field, query.equipment);
    const hubUrl = `http://localhost:5190/EquipmentStatus?floor=${query.floor}&field=${query.field}&equipmentName=${query.equipment}`;
    SignalRService.startConnection(hubUrl);
    SignalRService.addListener('EquipmentStatusData', (message) => {
      console.log('EquipmentStatusData', message);
      commit('SET_REAL_TIME_EQUIPMENT_STATUS', message);
    });

    SignalRService.connection.onreconnected(() => {
      commit('SET_CONNECTION_STATUS', true);
    });

    SignalRService.connection.onclose(() => {
      commit('SET_CONNECTION_STATUS', false);
    });
  },


  async startConnection({ commit }) {
    const hubUrl = 'http://localhost:5190/Test';
    SignalRService.startConnection(hubUrl);

    SignalRService.addListener('ReceiveData', (message) => {
      console.log('ReceiveData', message);
      commit('ADD_MESSAGE', message);
    });

    SignalRService.connection.onreconnected(() => {
      commit('SET_CONNECTION_STATUS', true);
    });

    SignalRService.connection.onclose(() => {
      commit('SET_CONNECTION_STATUS', false);
    });
  },

  async sendMessage({ commit }, message) {
    await SignalRService.sendMessage('SendMessage', message);
    commit('ADD_MESSAGE', message); // 可选，更新本地消息状态
  },

  stopConnection() {
    SignalRService.stopConnection();
  },
};
