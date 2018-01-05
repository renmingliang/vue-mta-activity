<!-- appMain -->
<template>
  <div class="content">
    <Header></Header>
    <Breadcrumb></Breadcrumb>
    <List></List>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import List from '../components/List'
import Footer from '../components/Footer'
export default {
  name: 'appMain',
  data () {
    return {
    }
  },
  created () {},
  mounted () {},
  components: {
    Header,
    Breadcrumb,
    List,
    Footer
  },
  computed: {},
  methods: {},
  watch: {},
  filters: {}
}
</script>

<style lang='less' scoped>
</style>