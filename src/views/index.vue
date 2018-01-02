<template>
  <div class="content">
    <div class="top">
      <div class="top-img">
        <img src="../assets/images/mobilebg_01.jpg">
      </div>
      <div class="top-txt">
				<p>从即日起至2018“年会”前，民太安集团，诚邀各位员工参与 2018 年“我向杨总说句话”建言征集活动。你可以通过这条网络通道，说说对公司工作的看法和建议。</p>
			</div>
    </div>
    <div class="box">
      <h2><a href="javascript:;">看看你想说什么？</a></h2>
      <div class="tips">点击你感兴趣的分类，即可开始留言！</div>
      <nav class="navbar">
        <grid :cols="3">
          <grid-item v-for="(item, index) in routes" :key="index" :link="{name: item.name, params: {type: index, id: index}}" :label="item.meta.title">
            <i slot="icon" class="fa fa-2x" :class="item.meta.icon" aria-hidden="true"></i>
          </grid-item>
        </grid>
      </nav>
    </div>
  </div>
</template>

<script>
import { constantRouterMap } from '@/router'
import { Grid, GridItem } from 'vux'
export default {
  name: 'index',
  data () {
    return {
      msg: '我向杨总说句话',
      routes: constantRouterMap
    }
  },
  components: {
    Grid,
    GridItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.content{
  .top{
    &-img{
      text-align: center;
      background: #ddd;
      img{
        max-width: 100%;
      }
    }
    &-txt{
      p{
        margin: 0.24rem 0.2rem;
        padding: 0.2rem;
        font-size: 0.28rem;
        line-height: normal;
        background: #eee;
        border-radius: 0.2rem;
        text-align: justify;
        color: #333;
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
    .tips{
      width: 6rem;
      height: 0.7rem;
      background: url(../assets/images/look-talk.png) center top no-repeat;
      background-size: contain;
      font-size: 0.28rem;
      color: #fff;
      line-height: 0.5rem;
      text-align: center;
      margin: 0.32rem auto;
    }
    .navbar{
      padding: 0 0.3rem 0.1rem;
      text-align: center;
    }
  }
}
</style>
