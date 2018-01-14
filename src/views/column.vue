<template>
  <div class="content">
    <Header></Header>
    <Breadcrumb :id='id'></Breadcrumb>
    <Form></Form>
    <List :id='id'></List>
    <Footer></Footer>
  </div>
</template>

<script>
import { Header, Breadcrumb, Form, List, Footer } from '../components'
export default {
  name: 'column',
  data () {
    return {
      id: this.$route.params.id
    }
  },
  components: {
    Header,
    Breadcrumb,
    Form,
    List,
    Footer
  },
  mounted () {
    this.resetScroll()
  },
  methods: {
    // 纠正页面滚动置顶
    resetScroll () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
