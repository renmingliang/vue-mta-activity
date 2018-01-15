<!-- 留言列表,默认需超过15条 -->
<template>
  <div class="content">
    <div class="box">
      <div class="list-wrapper" ref="wrapper">
        <div class="scroll-content" ref="scrollContent">
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
          <div class="pullup-wrapper" v-if="pullUpLoad">
            <div class="before-trigger" v-if="!isPullUpLoad">
              <span>{{pullUpTxt}}</span>
            </div>
            <div class="after-trigger" v-else>
              <load-more tip="正在加载"></load-more>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { formateDate } from '../utils/validate'
import { LoadMore } from 'vux'
import { mapState } from 'vuex'
export default {
  name: 'message',
  data () {
    return {
      id: this.$route.params.id,
      lists: [],
      page: 1,
      pullUpLoad: true,
      isPullUpLoad: false,
      pullUpTxt: '上拉加载更多'
    }
  },
  created () {
    this.loadData()
  },
  components: {
    LoadMore
  },
  computed: {
    ...mapState([
      'total'
    ])
  },
  methods: {
    loadData () {
      this.isPullUpLoad = true
      this.$store.dispatch({type: 'getLists', id: this.id, page: this.page}).then(res => {
        this.isPullUpLoad = false
        this.lists = this.lists.concat(res.list)
        this.$nextTick(() => {
          if (!this.scroll) {
            this.$refs.wrapper.style.height = `${window.innerHeight}px`
            let options = {
              pullUpLoad: true,
              scrollbar: true
            }
            this.scroll = new BScroll(this.$refs.wrapper, options)
            this.scroll.on('pullingUp', () => {
              this.page += 1
              this.loadData()
            })
          } else {
            if (Number(this.total) !== 0 && Number(this.total) === this.lists.length) {
              this.pullUpTxt = `${this.total}条留言已全部加载完毕`
              return false
            }
            if (this.scroll.options.pullUpLoad) {
              // 上拉加载完成
              this.scroll.finishPullUp()
            }
            this.scroll.refresh()
          }
        })
      })
    }
  },
  filters: {
    parseTime (val) {
      return formateDate(val)
    }
  }
}
</script>

<style lang='less' scoped>
.content .box{
  .list-wrapper{
    height: 100%;
    overflow: hidden;
    position: relative;
    .scroll-content{
      position: relative;
      z-index: 1;
      .net-item:first-of-type{
        margin-top: 0;
      }
    }
    .pullup-wrapper{
      width: 100%;
      text-align: center;
      padding: 0.1rem 0;
      font-size: 0.24rem;
    }
  }
}
</style>