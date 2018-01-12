<!-- scrollLoad -->
<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'

const COMPONENT_NAME = 'scroll'
const DIRECTION_H = 'horizontal'
const DIRECTION_V = 'vertical'

export default {
  name: COMPONENT_NAME,
  props: {
    /**
     * 列表的数据
     */
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    /**
     * 1 滚动的时候会派发scroll事件，会截流。
     * 2 滚动的时候实时派发scroll事件，不会截流。
     * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
     */
    probeType: {
      type: Number,
      default: 1
    },
    /**
     * 点击列表是否派发click事件
     */
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 是否派发列表滚动开始的事件
     */
    listenBeforeScroll: {
      type: Boolean,
      default: false
    },
    /**
     * 滚动方向
     */
    direction: {
      type: String,
      default: DIRECTION_V
    },
    /**
     * 是否显示滚动条
     */
    scrollbar: {
      type: null,
      default: false
    },
    /**
     * 是否派发顶部下拉的事件，用于下拉刷新
     */
    pullDownRefresh: {
      type: null,
      default: false
    },
    /**
     * 是否派发滚动到底部的事件，用于上拉加载
     */
    pullUpLoad: {
      type: null,
      default: false
    },
    /**
     * 垂直滚动起始距离
     */
    startY: {
      type: Number,
      default: 0
    },
    /**
     * 当数据更新后，刷新scroll的延时。
     */
    refreshDelay: {
      type: Number,
      default: 20
    },
    freeScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // 保证在DOM渲染完毕后初始化better-scroll
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  methods: {
    initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      // better-scroll的初始化
      let options = {
        probeType: this.probeType,
        click: this.click,
        scrollY: this.freeScroll || this.direction === DIRECTION_V,
        scrollX: this.freeScroll || this.direction === DIRECTION_H,
        scrollbar: this.scrollbar,
        pullDownRefresh: this.pullDownRefresh,
        pullUpLoad: this.pullUpLoad,
        startY: this.startY,
        freeScroll: this.freeScroll
      }
      this.scroll = new BScroll(this.$refs.wrapper, options)

      // 是否派发滚动事件
      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }

      // 是否派发列表滚动开始的事件
      if (this.listenBeforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScrollStart')
        })
      }

      // 是否派发顶部下拉事件，用于下拉刷新
      if (this.pullDownRefresh) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown')
        })
      }

      // 是否派发滚动到底部事件，用于上拉加载
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    disable () {
      // 代理better-scroll的disable方法
      this.scroll && this.scroll.disable()
    },
    enable () {
      // 代理better-scroll的enable方法
      this.scroll && this.scroll.enable()
    },
    refresh () {
      // 代理better-scroll的refresh方法
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      // 代理better-scroll的scrollTo方法
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      // 代理better-scroll的scrollToElement方法
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    },
    clickItem (e, item) {
      console.log(e)
      this.$emit('click', item)
    },
    destroy () {
      this.scroll.destroy()
    },
    forceUpdate () {
      if (this.pullDownRefresh) {
        this.scroll.finishPullDown()
      } else if (this.pullUpLoad) {
        this.scroll.finishPullUp()
      }
      this.refresh()
    }
  },
  watch: {
    // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
    data () {
      setTimeout(() => {
        this.forceUpdate()
      }, this.refreshDelay)
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper{
  height: 330px;
  overflow: hidden;
}
</style>