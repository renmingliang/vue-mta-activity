import * as types from './mutation-types'
import Vue from 'vue'

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * postForm
   * new Promise((resolve, reject) => {})
   * url: payload.url
   * data: payload.data
   */
  postForm ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit({type: types.SHOW_LOAD})
      Vue.http({
        method: 'post',
        url: payload.url,
        data: payload.data
      })
      .then(
        response => {
          commit({type: types.HIDE_LOAD})
          commit({type: types.POST_FORM, data: response.data})
          resolve(response)
        }
      )
      .catch(
        (err) => {
          reject(err)
        }
      )
    })
  },
  /**
   * getColumns
   * new Promise((resolve, reject) => {})
   * url: payload.url
   */
  getColumns ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http({
        method: 'get',
        url: payload.url
      })
      .then(
        // 这里是处理正确的回调
        response => {
          commit({type: types.GET_COLUMNS, columns: response.data})
          resolve(response.data)
        },
        // 这里是处理错误的回调
        err => {
          console.log('fail', err)
          reject(err)
        }
      )
    })
  },
  /**
   * getLists
   * new Promise((resolve, reject) => {})
   * url: payload.url
   */
  getLists ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http({
        method: 'get',
        url: payload.url
      })
      .then(
        // 这里是处理正确的回调
        response => {
          commit({type: types.GET_LISTS, lists: response.data})
          resolve(response.data)
        },
        // 这里是处理错误的回调
        err => {
          console.log('fail', err)
          reject(err)
        }
      )
    })
  },
  /**
   * getDetail
   * new Promise((resolve, reject) => {})
   * url: payload.url
   */
  getDetail ({ commit, state }, payload) {
    Vue.http.get(payload.url).then(
      // 这里是处理正确的回调
      response => {
        commit({type: types.GET_DETAIL, data: response.data})
      },
      // 这里是处理错误的回调
      err => {
        console.log('fail', err)
      }
    )
  }
}

export default actions
