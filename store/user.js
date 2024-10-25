export const state = () => ({
  name: 'OP'
})

export const getters = {
  IsLogin(state) {
    return state.name.toUpperCase() == 'GPM';
  },
  lastLoginTime(state) {
    return localStorage.getItem('loginTime')
  }
}

export const mutations = {
  setUserName(state, name) {

    console.info(name)
    state.name = name;
  },
  storeLoginTime(state, time) {
    localStorage.setItem('loginTime', time)
  }
}

export const actions = {
  async login({ state, commit }, user) {
    // make request
    try {
      const response = await this.$api.APP.userLogin(user);
      commit('setUserName', "GPM")
      commit('storeLoginTime', Date.now())
      return {
        confirm: true,
        response: response
      }
    } catch (error) {
      commit('setUserName', "OP")
      return {
        confirm: false,
        response: error
      };
    }
  },
  async logout({ state, commit }) {
    commit('setUserName', "OP")
    localStorage.removeItem('loginTime')

  }
}

