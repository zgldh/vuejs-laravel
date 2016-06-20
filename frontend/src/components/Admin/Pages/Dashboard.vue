<template>

  <div class="ui container">
    <h1>Admin Dashboard</h1>
  </div>

</template>

<script>
  import CurrentUserProvider from 'extensions/CurrentUserProvider'
  import WebPage from 'extensions/WebPage'

  var dashboard = WebPage.extend({
    route: {
      canActivate: function (transition) {
        var user = CurrentUserProvider.getCurrentUser()
        if (!user) {
          transition.redirect('/login')
          return false
        }
        return true
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
