<template>
  <div class="wxvfooter">
    <p class="wxvfootertxt"><span>保趣科技</span>提供技术支持</p>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wxvfooter{
  background-color: #F5F5F5;
  border-top: 1px solid #E5E5E5;
  margin: 0.4rem 0;
  padding: 0.4rem 0 0.4rem 0;
  text-align: center;
  p{
    color: #666;
    font-size: 0.28rem;
  }
  span{
    color: #c53535;
    margin-right: 0.08rem;
  }
}
</style>
