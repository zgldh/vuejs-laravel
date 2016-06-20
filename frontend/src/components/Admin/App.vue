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
  import SiteNav from 'components/Admin/Common/SiteNav'
  import Router from 'components/Admin/router'
  import CurrentUserProvider from 'extensions/CurrentUserProvider'
  import PackageInstaller from 'extensions/PackageInstaller'
  import packages from 'src/packages/index.js'

  export default {
    data: function () {
      return {
        pageTitle: '233',
        loading: true
      }
    },
    events: {
      onCurrentUserChanged: function (user) {
        if (!user) {
          Router.go('/login')
        }
      }
    },
    components: {
      SiteNav
    },
    ready: function () {
      PackageInstaller.installApp(this)
      PackageInstaller.installPackages(packages)

      CurrentUserProvider.installApp(this)
      Promise.all([
        CurrentUserProvider.loadFromServer()
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
