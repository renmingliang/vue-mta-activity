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
import { mapState } from 'vuex'
export default {
  name: 'Breadcrumb',
  props: {
    id: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      navs: []
    }
  },
  created () {
    this.getBreadcrumb()
  },
  computed: {
    ...mapState([
      'columns'
    ])
  },
  methods: {
    // 面包屑，即导航
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      if (this.columns.length !== 0) {
        const temp = this.columns.find(item => item.Id === this.id)
        cookie.set('sub', JSON.stringify(temp))
      }
      const sub = JSON.parse(cookie.get('sub'))
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
</style>
