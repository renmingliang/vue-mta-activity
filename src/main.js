// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// A modern alternative to CSS resets
// import 'normalize.css/normalize.css'
import './assets/styles/reset.css'
import './assets/styles/common.less'

// 引入font-css
import 'font-awesome/css/font-awesome.min.css'

// 通过Vue.http来请求
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

// 配置默认请求头为json格式，发送字符串将设置Content-Type为application/x-www-form-urlencoded
Vue.http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

/* 解决移动端300ms点击延迟 */
const FastClick = require('fastclick')
FastClick.attach(document.body)

// 去除生成环境警告
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
