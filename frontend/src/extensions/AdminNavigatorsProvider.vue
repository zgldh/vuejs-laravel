<script>
  import Vue from 'vue'

  var navigators = null
  var vm = null
  var AdminNavigatorsProvider = {
    installApp: function (AppVm) {
      vm = AppVm
    },
    setNavigators: function (navi) {
      navigators = navi
      vm.$dispatch('onNavigatorsChanged', navigators)
      vm.$broadcast('onNavigatorsChanged', navigators)
    },
    getNavigators: function () {
      return navigators
    },
    loadFromServer: function () {
      return Vue.http.get('admin/navigators').then(function (re) {
        re.data = re.data ? re.data : null
        AdminNavigatorsProvider.setNavigators(re.data)
        return this
      }, function (err) {
        vm.$log(err)
      })
    },
    logout: function () {
      Vue.http.get('auth/logout').then(function (re) {
        AdminNavigatorsProvider.setNavigators(null)
      }, function (err) {
        vm.$log(err)
      })
    }
  }
  export default AdminNavigatorsProvider
</script>
