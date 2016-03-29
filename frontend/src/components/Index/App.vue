<template>

  <site-nav></site-nav>

  <div class="pusher" style="padding-top:70px;">
    <router-view></router-view>
  </div>
</template>

<script>
  require('../../semantic/dist/semantic.js')
  var SiteNav = require('./Common/SiteNav')

  export default {
    components: {
      SiteNav
    },
    ready: function () {
      this.$http.get('current_user').then(function (re) {
        console.debug('First current_user at App.vue', arguments)
      }, function (err) {
        console.debug('First current_user at App.vue', arguments, err)
      })
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../../semantic/dist/semantic.css";
</style>
