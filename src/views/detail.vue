<template>
  <div class="content">
    <Header></Header>
    <div class="tags-view">
      <p><i class="fa fa-paper-plane" aria-hidden="true"></i>&nbsp; 留言详情</p>
    </div>
    <div class="box">
      <div class="article">
        <h1 class="article-title">{{ detail.title }}</h1>
        <div class="article-info">
          <span class="info-date">{{ detail.createtime | parseTime }}</span>
          <span class="info-column">谏言栏目：{{ detail.label_name }}</span>
        </div>
        <div class="article-desc">
          <p>
            <span class="author">{{ detail.name? detail.name : '匿名' }}：</span>
            <span v-html="detail.content"></span>
          </p>
        </div>
        <div class="common-btn">
          <router-link :to="{name: 'column', params: { id: detail.labelid }}">
            <div class="go-form"><i class="fa fa-commenting" aria-hidden="true"></i>我也去留言</div>
          </router-link>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { Header, Footer } from '../components'
import { formateDate } from '../utils/validate'
import { mapState } from 'vuex'
import api from '../api'
export default {
  name: 'column',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    Header,
    Footer
  },
  created () {
    this.$store.dispatch({type: 'getDetail', url: api.getDetail(this.id)})
  },
  computed: {
    ...mapState([
      'detail'
    ])
  },
  filters: {
    parseTime (val) {
      return formateDate(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
