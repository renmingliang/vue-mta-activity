<!-- 留言栏目 -->
<template>
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
</template>

<script>
import { Grid, GridItem, cookie } from 'vux'
import { mapState } from 'vuex'
import api from '../api'
export default {
  name: 'Column',
  data () {
    return {}
  },
  components: {
    Grid,
    GridItem
  },
  created () {
    this.$store.dispatch({type: 'getColumns', url: api.getColumns})
  },
  computed: {
    ...mapState([
      'columns'
    ])
  },
  methods: {
    onItemClick (val) {
      cookie.set('sub', JSON.stringify(val))
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