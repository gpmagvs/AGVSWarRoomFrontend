export const state = () => ({
  counter: 0,
  list: [
    {
      a: 213
    }
  ]
})

export const getters = {
  getCounter(state) {
    return state.counter
  }
}

export const mutations = {

  add_todo(state, todo) {
    state.list.push(todo);
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
