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
  import SiteNav from 'components/Admin/Common/SiteNav.vue'
  import Router from 'components/Admin/router'
  import CurrentUserProvider from 'extensions/CurrentUserProvier.vue'
  import AdminNavigatorsProvider from 'extensions/AdminNavigatorsProvider.vue'
  import AdminRoutesProvider from 'extensions/AdminRoutesProvider.vue'

  export default {
    data: function () {
      return {
        loading: true
      }
    },
    components: {
      SiteNav
    },
    ready: function () {
      CurrentUserProvider.installApp(this)
      AdminNavigatorsProvider.installApp(this)
      AdminRoutesProvider.installApp(this)
      Promise.all([
        CurrentUserProvider.loadFromServer(),
        AdminNavigatorsProvider.loadFromServer(),
        AdminRoutesProvider.loadFromServer()
      ]).then(
        function (result) {
          this.loading = false
          var user = CurrentUserProvider.getCurrentUser()
          if (!user) {
            Router.go('/login')
          }
          else if (!Router.path) {
            Router.go('/dashboard')
          }
        }.bind(this)
      ).catch(console.log.bind(console))
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../semantic/dist/semantic.css";
  @import "../../../node_modules/nprogress/nprogress.css";

  @media only screen and (max-width: 768px) {
    .side-menu + .pusher {
      padding-left: 200px;
    }
  }

  @media only screen and (min-width: 768px) {
    .side-menu + .pusher {
      padding-left: 214px;
    }
  }
</style>
