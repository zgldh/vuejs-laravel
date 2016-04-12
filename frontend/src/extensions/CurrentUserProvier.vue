<script>
  import Vue from 'vue'

  var currentUser = null
  var CurrentUserProvider = {
    setCurrentUser: function (user) {
      currentUser = user
    },
    getCurrentUser: function () {
      return currentUser
    },
    loadFromServer: function () {
      Vue.http.get('current_user').then(function (re) {
        console.log(re)
        CurrentUserProvider.setCurrentUser(re.data)
      }, function (err) {
        Vue.$log(err)
      })
    }
  }
  export default CurrentUserProvider
</script>
