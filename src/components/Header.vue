<template>
  <div class="top">
    <div class="top-img">
      <img src="../assets/images/banner.png">
    </div>
    <div class="top-txt">
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      msg: '从即日起至2018年1月20日，集团诚邀各位员工参与 2018 年“我向杨董说句话”谏言征集活动。你可以通过这条网络通道，说说对公司经营发展的相关意见。'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.top{
  position: relative;
  &-img{
    text-align: center;
    background: #ddd;
    img{
      width: 100%;
    }
  }
  &-txt{
    position: absolute;
    bottom: 0.4rem;
    p{
      margin: 0.24rem 0.2rem;
      padding: 0.3rem;
      font-size: 0.3rem;
      line-height: normal;
      background: #484848;
      border-radius: 0.2rem;
      text-align: justify;
      color: #40aff7;
    }
  }
}
</style>
