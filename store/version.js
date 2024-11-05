import { AGVSFieldVersionInfo } from '@/utils/models/Version'
export const state = () => ({
  versions: [new AGVSFieldVersionInfo()],
  selectedVersion: null,
  loading: false,
  error: null
})

export const getters = {
  getVersions: state => state.versions,
  getSelectedVersion: state => state.selectedVersion,
  isLoading: state => state.loading,
  getError: state => state.error,
}

export const mutations = {
  SET_VERSIONS(state, versions) {
    state.versions = versions
  },
  SET_SELECTED_VERSION(state, version) {
    state.selectedVersion = version
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  },
  SET_ERROR(state, error) {
    state.error = error
  }
}

export const actions = {
  async fetchVersions({ commit }) {
    try {
      const response = await this.$backendService.FetchVersions();
      console.log('response', response)
      commit('SET_VERSIONS', response)
    } catch (error) {
      console.error(error)
    } finally {
    }
  },

  selectVersion({ commit }, version) {
    commit('SET_SELECTED_VERSION', version)
  },

  clearError({ commit }) {
    commit('SET_ERROR', null)
  }
}
