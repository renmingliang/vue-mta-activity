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

// 引入页面切换loading
import './viewLoad'

// 通过Vue.http来请求
import { AjaxPlugin } from 'vux'
Vue.use(AjaxPlugin)

// 配置默认请求头为json格式，发送字符串需要将设置Content-Type为application/x-www-form-urlencoded; charset=UTF-8
// 注意这里还需要修改post前，将数据转换为ajax请求时的Form Data表单数据
// 即如这样: 'a=1&b=2&c=3'
Vue.http.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// 依据环境来配置相应请求地址
Vue.http.defaults.baseURL = process.env.BASE_API

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
