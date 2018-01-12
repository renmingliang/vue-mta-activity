<template>
  <div class="content">
    <div class="top">
      <div class="top-img">
        <img src="../assets/images/banner.png">
      </div>
      <div class="top-txt">
        <p>{{ msg }}</p>
      </div>
    </div>
    <nav class="nav-link">
      <ul class="clearfix">
        <li class="pull-left" v-for="(nav, index) in navs" :key="index">
          <span v-if="!!nav.path">
            <router-link :to="{name: nav.name}">{{ nav.meta.title }}</router-link>&nbsp;&gt;&nbsp;
          </span>
          <span v-else>
            {{ nav.meta.title }}
          </span>
        </li>
      </ul>
    </nav>
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
      <div v-if="lists.length>=15" class="common-btn">
        <router-link :to="{name: 'message', params: { id: id }}">
          <div class="go-form"><i class="fa fa-list" aria-hidden="true"></i>查看更多留言</div>
        </router-link>
      </div>
    </div>
    <div class="wxvfooter">
      <p class="wxvfootertxt"><span>保趣科技</span>提供技术支持</p>
    </div>
    <toast v-model="resSubmit.status" :type="resSubmit.type" @on-hide="hideToast">{{ resSubmit.tips }}</toast>
    <loading :show="isPost" text="Loading"></loading>
  </div>
</template>

<script>
import { Group, XButton, XInput, XTextarea, Toast, Loading, Checker, CheckerItem, cookie } from 'vux'
import { formateDate, isSpace, isMobile } from '../utils/validate'
import { mapState } from 'vuex'
import api from '../api'
export default {
  name: 'column',
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
  created () {
    this.$store.dispatch({type: 'getLists', url: api.getLists(this.id)})
    this.getBreadcrumb()
  },
  mounted () {
    this.resetScroll()
  },
  computed: {
    ...mapState([
      'msg',
      'checkerArr',
      'columns',
      'lists',
      'isPost'
    ])
  },
  methods: {
    // 纠正页面滚动置顶
    resetScroll () {
      document.documentElement.scrollTo(0, 0)
    },
    // 面包屑，即导航
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      if (this.columns.length !== 0) {
        const temp = this.columns.find(item => item.Id === this.id)
        cookie.set('sub', JSON.stringify(temp))
      }
      const sub = JSON.parse(cookie.get('sub'))
      const first = matched[0]
      if (first && first.name !== 'index') {
        matched = [{ path: '/', name: 'index', meta: {title: '首页'} }].concat([{meta: {title: sub.name}}])
      }
      this.navs = matched
    },
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
.checker{
  padding: 0.1rem;
  margin-top: 0.2rem;
  .vux-checker-box{
    display: flex;
    justify-content: space-around;
  }
  .checker-item {
    width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
  }
  .checker-item-selected {
    background: #ffffff url(../assets/images/active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
}

</style>
