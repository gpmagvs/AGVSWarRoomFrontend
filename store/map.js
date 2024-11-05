import axios from 'axios';
import { clsMap } from '@/utils/models/map';
export const state = () => ({
  mapData: {
    'TEST': new clsMap()
  }
})

export const getters = {
  getMapData: (state) => (name = 'test') => {
    return state.mapData[name];
  }
}

export const mutations = {
  SET_MAP_DATA(state, { name = 'test', data = new clsMap() }) {
    state.mapData[name] = data;
    console.info('setMapData', state.mapData);
  }
}

export const actions = {
  async getTestMapData({ commit }) {
    const data = await FetchMapData();
    commit('SET_MAP_DATA', { name: 'test', data: data });
  }
}

async function FetchMapData() {
  const res = await axios.get('http://localhost:7026/map');
  let _map = new clsMap()
  Object.assign(_map, res.data['Map']);
  return _map;
}
