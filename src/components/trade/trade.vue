<style scoped lang="less">
      @import "../../assets/css/trade/index.less";
</style>
<template>
  <div class="content-wrap">
      <div class="container">
          <div class="row">
              <sidebarview></sidebarview>
              <sidemainview></sidemainview>
          </div>
      </div>
  </div>
</template>

<script>
  import sidebarview from './components/sidebar.vue';
  import sidemainview from './components/sidemain.vue';
  export default {
    components: {sidebarview, sidemainview},
    data () {
      return {

      }
    },
    methods: {

    },
    mounted(){

    }

  }
</script>
