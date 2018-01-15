import * as types from './mutation-types'
import { postForm, getColumns, getLists, getDetail } from '../api'

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * postForm
   * new Promise((resolve, reject) => {})
   * data: payload.data
   */
  postForm ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit({type: types.SHOW_LOAD})
      postForm(payload.data)
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
   */
  getColumns ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      getColumns()
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
   * id  : payload.id
   * page: payload.page
   */
  getLists ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      getLists(payload.id, payload.page)
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
   * id: payload.id
   */
  getDetail ({ commit, state }, payload) {
    getDetail(payload.id).then(
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
