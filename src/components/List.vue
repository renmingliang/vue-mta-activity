<template>
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
    <div v-if="lists.length>=14" class="common-btn">
      <router-link :to="{name: 'message', params: { id: id }}">
        <div class="go-form"><i class="fa fa-list" aria-hidden="true"></i>查看更多留言</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { formateDate } from '../utils/validate'
import { mapState } from 'vuex'
import api from '../api'
export default {
  name: 'List',
  props: {
    id: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {}
  },
  created () {
    this.$store.dispatch({type: 'getLists', url: api.getLists(this.id)})
  },
  computed: {
    ...mapState([
      'lists',
      'total'
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
