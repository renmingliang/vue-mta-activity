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
        <!-- <grid :cols="3">
          <grid-item v-for="(route, index) in routes" :key="index" :link="{name: route.name, params: {type: index, id: index}}" :label="route.meta.title">
            <i slot="icon" class="fa fa-2x" :class="route.meta.icon" aria-hidden="true"></i>
          </grid-item>
        </grid> -->
        <grid :cols="3">
          <grid-item v-for="(column, index) in columns" :key="index" :link="{path: '/column/'+column.Id}" :label="column.name" @on-item-click="onItemClick(column)">
            <img slot="icon" :src="'http://t.jaja365.cn/'+column.mainpic">
          </grid-item>
        </grid>
      </nav>
    </div>
    <div class="box">
      <h2><a href="javascript:;">其他人在说什么？</a></h2>
      <scroll-load ref="scroll"
        :data="lists"
        :pullDownRefresh="pullDownRefreshObj"
        :pullUpLoad="pullUpLoadObj"
        @pullingDown="onPullingDown"
        @pullingUp="onPullingUp" >
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
          <div class="pullup-wrapper" v-if="pullUpLoadObj">
            <div class="before-trigger" v-if="!isPullUpLoad">
              <span>{{pullUpTxt}}</span>
            </div>
            <div class="after-trigger" v-else>
              <load-more tip="正在加载"></load-more>
            </div>
          </div>
        </div>
      </scroll-load>
    </div>
    <div class="wxvfooter">
      <p class="wxvfootertxt"><span>保趣科技</span>提供技术支持</p>
    </div>
  </div>
</template>

<script>
import ScrollLoad from '../components/ScrollLoad'
import { formateDate } from '../utils/validate'
import { Grid, GridItem, LoadMore, cookie } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      page: 1,
      beforePullDown: true,
      pullDownRefresh: true,
      isPullingDown: false,
      pullDownRefreshThreshold: 70,
      pullDownRefreshStop: 0,
      pullUpDirty: true,
      pullUpLoad: true,
      isPullUpLoad: false,
      pullUpLoadThreshold: 30,
      pullUpLoadMoreTxt: '上拉加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了'
    }
  },
  components: {
    Grid,
    GridItem,
    LoadMore,
    ScrollLoad
  },
  created () {
    this.$store.dispatch({type: 'getColumns'})
    this.onPullingUp()
  },
  computed: {
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop)
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
      } : false
    },
    pullUpTxt () {
      return this.pullUpDirty ? this.pullUpLoadMoreTxt : this.pullUpLoadNoMoreTxt
    },
    ...mapState([
      'msg',
      'columns',
      'lists'
    ])
  },
  methods: {
    onPullingDown () {
      console.log('下拉刷新')
    },
    onPullingUp () {
      console.log('上拉加载')
      this.isPullUpLoad = true
      console.log(this.pullUpLoadObj)
      this.$store.dispatch({type: 'getLists', id: 0, page: this.page}).then(res => {
        this.isPullUpLoad = false
        console.log(res)
        if (res.list.length !== 0) {
          this.page += 1
        } else {
          console.log('没有数据了')
          // 如果没有新数据
          this.pullUpDirty = false
        }
      })
    },
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
