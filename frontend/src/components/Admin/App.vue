<template>
  <div v-if="loading">
    <h1>Loading</h1>
  </div>
  <div v-else>
    <div class="ui top attached demo menu" id="top-menu-bar" v-if="topMenuVisible">
      <a class="item" v-on:click="toggleSidebar(event)"><i class="sidebar icon"></i></a>
    </div>
  </div>
  <div class="ui bottom attached segment pushable" id="main-pusher">
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
        topMenuVisible: false,
        loading: true
      }
    },
    events: {
      onCurrentUserChanged: function (user) {
        if (!user) {
          this.topMenuVisible = false
          console.log('App.vue onCurrentUserChanged', user)
          Router.go('/login')
        }
        else {
          this.topMenuVisible = true
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
                  this.topMenuVisible = false
                  Router.go('/login')
                }
                else if (!path || path === '/') {
                  this.topMenuVisible = true
                  Router.go('/dashboard')
                }
                else {
                  this.topMenuVisible = true
                  Router.go(path)
                }
              }.bind(this)
      ).catch(function (re) {
        console.log('App.vue fail: ', re)
        this.loading = false
        Router.go('/login')
      }.bind(this))
    },
    methods: {
      toggleSidebar: function (event) {
        this.$broadcast('onToggleSidebar')
      }
    }
  }
</script>

<style lang="scss">
  @import "../../semantic/dist/semantic.css";
  @import "../../../node_modules/nprogress/nprogress.css";
  @import "../../assets/page-transition.scss";
  @import "../../assets/custom.scss";


</style>
