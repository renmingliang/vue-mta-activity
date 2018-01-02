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
    <div class="tags-view">
      <p><i class="fa fa-flag" aria-hidden="true"></i>&nbsp; 效益与方针</p>
    </div>
    <div class="box">
      <h2><a href="javascript:;">我要留言</a></h2>
      <div class="form">
        <group title="留言标题">
          <x-input name="formDesc" v-model="formTitle"></x-input>
        </group>
        <group title="留言内容">
          <x-textarea :max="200" name="formDesc"></x-textarea>
        </group>
        <group>
          <flexbox>
            <flexbox-item>
              <x-button type="primary" action-type="button">submit</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button type="warn" action-type="reset">reset</x-button>
            </flexbox-item>
          </flexbox>
        </group>
      </div>
    </div>
  </div>
</template>

<script>
import { group, xInput, xTextarea, flexbox, flexboxItem } from 'vux'
export default {
  name: 'column',
  data () {
    return {
      type: this.$route.name
    }
  },
  components: {
    group,
    xInput,
    xTextarea,
    flexbox,
    flexboxItem
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
  .tags-view{
    padding: 0 0.2rem;
    font-size: 0.4rem;
    color: #005499;
    background-color: #eef7ff;
    border-bottom: 1px solid #00579f;
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
  }
}
</style>
