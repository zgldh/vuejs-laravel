<template>
  <site-nav></site-nav>

  <div class="pusher" style="padding-top:70px;">
    <router-view></router-view>
  </div>
</template>

<script>
  import '../../semantic/dist/semantic.js'
  import SiteNav from 'components/Index/Common/SiteNav.vue'
  import CurrentUserProvider from 'extensions/CurrentUserProvider'

  export default {
    components: {
      SiteNav
    },
    ready: function () {
      CurrentUserProvider.installApp(this)
      CurrentUserProvider.loadFromServer()
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../semantic/dist/semantic.css";
  @import "../../../node_modules/nprogress/nprogress.css";
</style>
