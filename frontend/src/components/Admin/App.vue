<template>
  <div v-if="loading">
    <h1>Loading</h1>
  </div>
  <div v-else>
    <site-nav></site-nav>

    <div class="pusher">
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

  @media only screen and (max-width: 768px) {
    .side-menu+.pusher {
      padding-left: 200px;
    }
  }

  @media only screen and (min-width: 768px) {
    .side-menu+.pusher {
      padding-left: 214px;
    }
  }
</style>
