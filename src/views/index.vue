<template>
  <div class="content">
    <Header></Header>
    <Column></Column>
    <List :id='id'></List>
    <Footer></Footer>
  </div>
</template>

<script>
import { Header, Column, List, Footer } from '../components'
export default {
  name: 'index',
  data () {
    return {
      id: '0'
    }
  },
  components: {
    Header,
    Column,
    List,
    Footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
