<template>
  <div class="content">
    <div class="top">
      <div class="top-img">
        <img src="../assets/images/banner.png">
      </div>
      <div class="top-txt">
        <p>{{ msg }}</p>
      </div>
    </div>
    <div class="tags-view">
      <p><i class="fa fa-paper-plane" aria-hidden="true"></i>&nbsp; 留言详情</p>
    </div>
    <div class="box">
      <div class="article">
        <h1 class="article-title">{{ detail.title }}</h1>
        <div class="article-info">
          <span class="info-date">{{ detail.createtime | parseTime }}</span>
          <span class="info-column">所属分类：{{ detail.label_name }}</span>
        </div>
        <div class="article-desc">
          <p>
            <span class="author">{{ detail.name? detail.name : '匿名' }}：</span>
            <span v-html="detail.content"></span>
          </p>
        </div>
        <div class="article-btn">
          <router-link :to="{name: 'column', params: { id: detail.labelid }}">
            <div class="go-form"><i class="fa fa-commenting" aria-hidden="true"></i>我也去留言</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="wxvfooter">
      <p class="wxvfootertxt"><span>保趣科技</span>提供技术支持</p>
    </div>
  </div>
</template>

<script>
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
  created () {
    this.$store.dispatch({type: 'getDetail', url: api.getDetail(this.id)})
  },
  computed: {
    ...mapState([
      'msg',
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
