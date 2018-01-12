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
    <div class="box">
      <h2><a href="javascript:;">看看你想说什么？</a></h2>
      <div class="tips">点击你感兴趣的分类，即可开始留言！</div>
      <nav class="navbar">
        <grid :cols="3">
          <grid-item v-for="(column, index) in columns" :key="index" :link="{path: '/column/'+column.Id}" :label="column.name" @on-item-click="onItemClick(column)">
            <img slot="icon" :src="'http://t.jaja365.cn/'+column.mainpic">
          </grid-item>
        </grid>
      </nav>
    </div>
    <div v-if="!!lists.length" class="box">
      <h2><a href="javascript:;">其他人在说什么？</a></h2>
      <div class="net-list">
        <ul>
          <li class="net-item" v-for="(list, index) in lists" :key="index">
            <router-link :to="{name: 'detail', params: {id: list.Id}}">
              <div class="net-item-title">
                <span>{{ list.title }}</span>
              </div>
              <div class="net-item-desc" v-html="list.content"></div>
              <div class="net-item-info">
                <span class="info-photo"><i class="fa fa-user-o" aria-hidden="true"></i></span>
                <span class="info-author">{{ list.name? list.name : '匿名' }}</span>
                <span class="info-time">{{ list.createtime | parseTime }}</span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-if="lists.length>=15" class="common-btn">
        <router-link :to="{name: 'message', params: { id: 0 }}">
          <div class="go-form"><i class="fa fa-list" aria-hidden="true"></i>查看更多留言</div>
        </router-link>
      </div>
    </div>
    <div class="wxvfooter">
      <p class="wxvfootertxt"><span>保趣科技</span>提供技术支持</p>
    </div>
  </div>
</template>

<script>
import { formateDate } from '../utils/validate'
import { Grid, GridItem, cookie } from 'vux'
import { mapState } from 'vuex'
import api from '../api'
export default {
  name: 'index',
  data () {
    return {
      id: 0
    }
  },
  components: {
    Grid,
    GridItem
  },
  created () {
    this.$store.dispatch({type: 'getColumns', url: api.getColumns})
    this.$store.dispatch({type: 'getLists', url: api.getLists(this.id)})
  },
  computed: {
    ...mapState([
      'msg',
      'columns',
      'lists'
    ])
  },
  methods: {
    onItemClick (val) {
      cookie.set('sub', JSON.stringify(val))
    }
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
.weui-grid{
  padding: 0.3rem 0.2rem;
}
</style>
