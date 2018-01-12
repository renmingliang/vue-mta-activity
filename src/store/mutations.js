import * as types from './mutation-types'

// mutations，同步数据，用于methods中commit调用
const mutations = {

  [types.POST_FORM] (state, payload) {
    state.resSubmit = payload.data
    // let temp = payload.data
    // state.resSubmit.status = true
    // if (temp.result === '0') {
    //   state.resSubmit.type = 'cancel'
    //   state.resSubmit.tips = temp.errorInfo
    // }
  },

  [types.SHOW_LOAD] (state) {
    state.isPost = true
  },

  [types.HIDE_LOAD] (state) {
    state.isPost = false
  },

  [types.GET_COLUMNS] (state, payload) {
    state.columns = payload.columns
  },

  [types.GET_LISTS] (state, payload) {
    state.lists = payload.lists.list
    state.total = payload.lists.count
  },

  [types.GET_DETAIL] (state, payload) {
    state.detail = payload.data
  }
}

export default mutations
