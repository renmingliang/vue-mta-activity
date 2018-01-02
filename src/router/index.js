import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: _import('index'),
    meta: { title: '首页', icon: 'fa-camera-retro' }
  },
  {
    path: '/column/:type',
    name: 'column',
    component: _import('column'),
    meta: { title: '栏目', icon: 'fa-handshake-o' }
  },
  {
    path: '/form/:type',
    name: 'form',
    component: _import('form'),
    meta: { title: '表单', icon: 'fa-briefcase' }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: _import('detail'),
    meta: { title: '详情', icon: 'fa-cutlery' }
  }
]

export default new Router({
  routes: constantRouterMap
})
