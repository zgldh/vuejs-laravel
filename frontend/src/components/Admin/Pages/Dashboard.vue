<template>

  <div class="ui container">
    <h1>Admin Dashboard</h1>
    <p></p>
  </div>

</template>

<script>
  import CurrentUserProvider from '../../../extensions/CurrentUserProvier.vue'

  export default {
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
        msg: 'Dashboard'
      }
    },
    components: {}
  }
</script>

<style scoped>
</style>
