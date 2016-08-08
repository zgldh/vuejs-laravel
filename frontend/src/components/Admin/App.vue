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
        pageTitle: '',
        loading: true
      }
    },
    events: {
      onCurrentUserChanged: function (user) {
        if (!user) {
          console.log('App.vue onCurrentUserChanged', user)
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
        CurrentUserProvider.hasRole('admin')
      ]).then(
              function (loadedUser) {
                console.log('App.vue ready: ', this.$route.path, loadedUser)
                this.loading = false
                var path = this.$route.path
                if (!loadedUser) {
                  Router.go('/login')
                }
                else if (!path || path === '/') {
                  Router.go('/dashboard')
                }
                else {
                  Router.go(path)
                }
              }.bind(this)
      ).catch(function (re) {
        console.log('App.vue fail: ', re)
        this.loading = false
        Router.go('/login')
      }.bind(this))
    }
  }
</script>

<style lang="scss">
  @import "../../semantic/dist/semantic.css";
  @import "../../../node_modules/nprogress/nprogress.css";
  @import "../../assets/page-transition.scss";
  @import "../../assets/custom.scss";

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
