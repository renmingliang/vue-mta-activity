// initial state
const state = {
  isLoading: false
}

// mutations
const mutations = {
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  }
}

export default {
  state,
  mutations
}
