<template>
  <div>
    <div class="tags-view">
      <p><i class="fa fa-flag" aria-hidden="true"></i>&nbsp; 我要留言</p>
    </div>
    <div class="box">
      <div class="ly-form">
        <group title="留言标题">
          <x-input :disabled="isDisabled" name="formTitle" placeholder="必填" v-model="title"></x-input>
        </group>
        <group title="留言内容">
          <x-textarea name="formContent" :placeholder="inputTips" autosize v-model="content"></x-textarea>
        </group>
        <group title="姓名" v-show="isHidden==='0'">
          <x-input :disabled="isDisabled" name="formName" placeholder="输入您的名字" v-model="name"></x-input>
        </group>
        <group title="联系电话" v-show="isHidden==='0'">
          <x-input :disabled="isDisabled" name="formMobile" placeholder="请输入手机号码" v-model="mobile" type="text" :max="11"></x-input>
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
            <x-button type="primary" @click.native="submitForm" action-type="button"
              :disabled="isDisabled"
            >
              提交
            </x-button>
          </group>
        </div>
      </div>
    </div>
    <toast v-model="resSubmit.status" is-show-mask :type="resSubmit.type" @on-hide="hideToast">{{ resSubmit.tips }}</toast>
    <loading :show="isPost" text="Loading"></loading>
  </div>
</template>

<script>
import { Group, XButton, XInput, XTextarea, Toast, Loading, Checker, CheckerItem } from 'vux'
import { formateDate, isSpace, isMobile } from '../utils/validate'
import { mapState } from 'vuex'
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
      isDisabled: false,
      inputTips: '输入想说的话（必填）',
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
      'lastTime',
      'checkerArr',
      'isPost'
    ])
  },
  created () {
    if (this.lastTime < +new Date()) {
      this.isDisabled = true
      this.inputTips = '本次活动已结束！'
    }
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
      this.$store.dispatch({type: 'postForm', data: json}).then(res => {
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
.checker{
  padding: .1rem;
  margin-top: .2rem;
  .vux-checker-box{
    display: flex;
    justify-content: space-around;
    .checker-item {
      width: 2rem;
      height: 0.48rem;
      line-height: 0.48rem;
      font-size: 0.28rem;
      text-align: center;
      border-radius: 3px;
      border: 1px solid #ccc;
      background-color: #fff;
      margin-right: 0.12rem;
    }
    .checker-item-selected {
      background: #ffffff url(../assets/images/active.png) no-repeat right bottom;
      border-color: #ff4a00;
    }
  }
}
</style>
