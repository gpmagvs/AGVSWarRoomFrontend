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
    try {
      const field = state.fieldsInfo.find(field => field.floor == floor && field.name == fieldName);
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
  }
}
export const actions = {
  async downloadFieldsInfo({ state, commit }) {
    try {
      const res = await this.$backendService.DownloadFieldsInfo()
      commit('setFieldsInfo', res)
    } catch (error) {
      console.error('Error downloading fields info:', error)
      throw error
    }
  }
}
