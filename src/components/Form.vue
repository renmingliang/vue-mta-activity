<template>
  <div class="content">
    <div class="tags-view">
      <p><i class="fa fa-flag" aria-hidden="true"></i>&nbsp; 我要留言</p>
    </div>
    <div class="box">
      <div class="ly-form">
        <group title="留言标题">
          <x-input name="formTitle" placeholder="必填" v-model="title"></x-input>
        </group>
        <group title="留言内容">
          <x-textarea name="formContent" placeholder="输入想说的话（必填）" autosize v-model="content"></x-textarea>
        </group>
        <group title="姓名" v-show="isHidden==='0'">
          <x-input name="formName" placeholder="输入您的名字" v-model="name"></x-input>
        </group>
        <group title="联系电话" v-show="isHidden==='0'">
          <x-input name="formMobile" placeholder="请输入手机号码" v-model="mobile" type="text" :max="11"></x-input>
        </group>
        <div class="checker">
          <checker
            v-model="isHidden"
            radio-required
            default-item-class="checker-item"
            selected-item-class="checker-item-selected"
            >
            <checker-item v-for="(item, index) in checkerArr" :key="index" :value="item.value">{{ item.tips }}</checker-item>
          </checker>
        </div>
        <!-- <group title="验证码" class="weui-cells_form">
          <x-input class="weui-cell_vcode">
            <img slot="right" class="weui-vcode-img" src="https://i.loli.net/2017/09/18/59bf7f32425d5.jpg">
          </x-input>
          <x-input class="weui-vcode">
            <x-button slot="right" type="primary" mini>发送验证码</x-button>
          </x-input>
        </group> -->
        <div class="ly-btn">
          <group>
            <x-button type="primary" @click.native="submitForm" action-type="button">提交</x-button>
          </group>
        </div>
      </div>
    </div>
    <toast v-model="resSubmit.status" :type="resSubmit.type" @on-hide="hideToast">{{ resSubmit.tips }}</toast>
    <loading :show="isLoad" text="Loading"></loading>
  </div>
</template>

<script>
import { Group, XButton, XInput, XTextarea, Toast, Loading, Checker, CheckerItem } from 'vux'
import { formateDate, isSpace, isMobile } from '../utils'
import { mapState } from 'vuex'
import api from '../api'
export default {
  name: 'Form',
  data () {
    return {
      navs: [],
      id: this.$route.params.id,
      resSubmit: {
        result: '1',
        status: false,
        type: 'success',
        tips: '提交成功'
      },
      isHidden: '0',
      title: '',
      content: '',
      name: '',
      mobile: ''
    }
  },
  components: {
    Group,
    XButton,
    XInput,
    XTextarea,
    Toast,
    Checker,
    CheckerItem,
    Loading
  },
  computed: {
    ...mapState([
      'checkerArr',
      'isLoad'
    ])
  },
  methods: {
    // 提示成功后跳转
    hideToast () {
      if (this.resSubmit.result === '1') {
        this.$router.push({ path: '/' })
      }
    },
    // 提交表单
    submitForm () {
      // 标题和内容不能为空
      if (isSpace(this.title) || isSpace(this.content)) {
        return false
      }
      // 若匿名，隐藏姓名与手机号码
      if (this.isHidden === '0') {
        if (isSpace(this.name) || isMobile(this.mobile)) {
          return false
        }
      }
      const json = {
        'zt_topic_labelid': this.id,
        'ishidden': this.isHidden,
        'title': this.title,
        'content': this.content,
        'name': this.name,
        'mobile': this.mobile
      }
      this.$store.dispatch({type: 'postForm', url: api.postForm, data: json}).then(res => {
        let temp = res.data
        let tempType = temp.result === '1' ? 'success' : 'cancel'
        this.resSubmit = {
          result: temp.result,
          status: true,
          type: tempType,
          tips: temp.errorInfo
        }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.tags-view{
  padding: 0 0.4rem;
  font-size: 0.34rem;
  line-height: 1rem;
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
  .ly-btn{
    margin:0 0.2rem;
  }
}
</style>
