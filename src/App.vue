<template>
  <div id="app">
       <Header></Header>
       <router-view/>
  </div>
</template>

<script>
  import Header from './components/common/Header.vue'

export default {
  name: 'app',
  components: {
    Header:Header
  }
}
</script>

<style scoped rel="stylesheet/less" lang="less" >
  @import "./assets/css/base.less";
#app {
    background: @bgcolor;
}
</style>
