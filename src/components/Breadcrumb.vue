<template>
  <nav class="nav-link">
    <ul class="clearfix">
      <li class="pull-left" v-for="(nav, index) in navs" :key="index">
        <span v-if="!!nav.path">
          <router-link :to="{name: nav.name}">{{ nav.meta.title }}</router-link>&nbsp;&gt;&nbsp;
        </span>
        <span v-else>
          {{ nav.meta.title }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script>
import { cookie } from 'vux'
export default {
  name: 'Breadcrumb',
  data () {
    return {
      navs: null
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    // 面包屑，即导航
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      let sub = JSON.parse(cookie.get('sub'))
      const first = matched[0]
      if (first && first.name !== 'index') {
        matched = [{ path: '/', name: 'index', meta: {title: '首页'} }].concat([{meta: {title: sub.name}}])
      }
      this.navs = matched
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nav-link{
  background: #202530;
  padding: 0.1rem 0.24rem;
  color: #fff;
  a{
    color: #fff;
  }
}
</style>
