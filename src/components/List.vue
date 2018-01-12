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
.scroll-list-wrap{
  .list-count{
    text-align: center;
    padding-bottom: 0.2rem;
    span{
      font-size: 0.44rem;
      font-weight: bold;
    }
  }
  .list-wrapper{
    height: 7rem;
    overflow: hidden;
    position: relative;
    background: #fff;
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
.box{
    padding-bottom: 0.3rem;
    h2{
      border-bottom: 0.02rem solid #e7e7e7;
      text-align: center;
      line-height: 1rem;
      margin-bottom: 0.4rem;
      a{
        display: inline-block;
        position: relative;
        bottom: -0.04rem;
        height: 100%;
        font-size: 0.4rem;
        border-bottom: 0.06rem solid #aaa;
        color: #333;
        text-decoration: none;
        font-weight: normal;
      }
    }
  .net-list{
    padding: 0 0.2rem;
    background: #fff;
    .net-item{
      margin: 0.2rem 0;
      padding: 0.2rem 0;
      border-bottom: 0.02rem dashed #ccc;
      .net-item-title{
        font-size: 0.32rem;
        font-weight: 700;
        display: block;
        margin: .6em 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #06c;
      }
      .net-item-desc{
        color: #666;
      }
      .net-item-info{
        color: #5d5d5d;
        margin-top: 0.1rem;
        text-align: right;
        font-size: 0.28rem;
      }
    }
  }
}
</style>
