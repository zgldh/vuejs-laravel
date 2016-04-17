<template>

  <site-nav></site-nav>

  <div class="pusher" style="padding-top:70px;">
    <router-view></router-view>
  </div>
</template>

<script>
  import '../../semantic/dist/semantic.js'
  import SiteNav from './Common/SiteNav.vue'
  import CurrentUserProvider from '../../extensions/CurrentUserProvier.vue'

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

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../../semantic/dist/semantic.css";
</style>
