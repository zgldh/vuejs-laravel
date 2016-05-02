<script>
  import Vue from 'vue'

  var currentUser = null
  var vm = null
  var CurrentUserProvider = {
    installApp: function (AppVm) {
      vm = AppVm
    },
    setCurrentUser: function (user) {
      currentUser = user
      vm.$dispatch('onCurrentUserChanged', currentUser)
      vm.$broadcast('onCurrentUserChanged', currentUser)
    },
    getCurrentUser: function () {
      return currentUser
    },
    loadFromServer: function () {
      Vue.http.get('current_user').then(function (re) {
        re.data = re.data ? re.data : null
        CurrentUserProvider.setCurrentUser(re.data)
      }, function (err) {
        vm.$log(err)
      })
    },
    logout: function () {
      Vue.http.get('auth/logout').then(function (re) {
        CurrentUserProvider.setCurrentUser(null)
      }, function (err) {
        vm.$log(err)
      })
    }
  }
  export default CurrentUserProvider
</script>
