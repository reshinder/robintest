<template>
  <div id="app">
       <Header></Header>
       <router-view/>
       <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/common/Header.vue'
  import Footer from './components/common/Footer.vue'

export default {
  name: 'App',
  components: {
    Header:Header,
    Footer:Footer
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less" >
  @import "./assets/css/base.less";
   #app {
    background: @bgcolor;
   }
</style>
