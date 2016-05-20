<template>
  <div v-if="loading">
    Loading
  </div>
  <div v-else>
    <site-nav></site-nav>

    <div class="pusher" style="padding-top:70px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import '../../semantic/dist/semantic.js'
  import SiteNav from './Common/SiteNav.vue'
  import CurrentUserProvider from '../../extensions/CurrentUserProvier.vue'
  import Router from './router.js'

  export default {
    data: function () {
      return {
        loading: true
      }
    },
    events: {
      onCurrentUserChanged: function (user) {
        this.loading = false
        if (!user) {
          Router.go('/login')
        }
      }
    },
    components: {
      SiteNav
    },
    ready: function () {
      CurrentUserProvider.installApp(this)
      CurrentUserProvider.loadFromServer()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../semantic/dist/semantic.css";
  @import "../../../node_modules/nprogress/nprogress.css";
</style>
