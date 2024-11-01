import { DownloadFieldsInfo } from '@/services/backend'
export const state = () => ({
  fieldsInfo: [{
    floor: 3,
    name: 'AOI',
    equipments: [
      { eqType: 0, name: 'AGV_001' }
    ]
  }],
  EqSelectState: {
    floor: 0,
    field: '',
    eqName: ''
  }
})

export const getters = {
  EqSelectState(state) {
    return state.EqSelectState
  },
  FloorOptions(state) {
    var floors = state.fieldsInfo.map(field => {
      return { value: field.floor, label: field.floor + 'F' }
    });
    floors = [...new Map(floors.map(item => [item.value, item])).values()];
    return floors;
  },
  FieldOptions: (state) => (floor) => {
    console.info('FieldOptions', floor);
    try {
      return state.fieldsInfo.filter(field => field.floor === floor).map(field => {
        return { value: field.name, label: field.name }
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  EquipmentOptions: (state) => (floor, fieldName) => {
    console.info('EquipmentOptions', floor, fieldName);
    try {
      console.info(state.fieldsInfo);
      const field = state.fieldsInfo.find(field => field.floor == floor && field.name == fieldName);
      console.info('field', field);
      if (field) {
        return field.equipments.map(equipment => {
          return { value: equipment.name, label: equipment.name, eqType: equipment.eqType }
        });
      }
      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export const mutations = {

  UpdateEqSelectState(state, newState) {
    state.EqSelectState.floor = newState.floor;
    state.EqSelectState.field = newState.field;
    state.EqSelectState.eqName = newState.eqName;
  },
  setFieldsInfo(state, fieldsInfo) {
    state.fieldsInfo = fieldsInfo;
    console.info('setFieldsInfo', state.fieldsInfo);
  }
}
export const actions = {
  async downloadFieldsInfo({ state, commit }) {
    console.log('downloadFieldsInfo');
    const res = await DownloadFieldsInfo();
    commit('setFieldsInfo', res);
  }
}
