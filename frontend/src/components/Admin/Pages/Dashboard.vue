<template>

  <div class="ui container" transition="page">
    <h1>Admin Dashboard</h1>
  </div>

</template>

<script>
  import CurrentUserProvider from 'extensions/CurrentUserProvider'
  import WebPage from 'extensions/WebPage'

  var dashboard = WebPage.extend({
    route: {
      canActivate: function (transition) {
        return CurrentUserProvider.hasRole('admin').catch(function () {
          transition.redirect('/login')
        })
      }
    },
    data () {
      return {
        pageTitle: '总览'
      }
    },
    components: {}
  })

  export default dashboard
</script>

<style scoped>
</style>
