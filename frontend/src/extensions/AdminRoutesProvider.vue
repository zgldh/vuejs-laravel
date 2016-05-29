<script>
  import Vue from 'vue'

  var routesConfig = null
  var vm = null
  var AdminRoutesProvider = {
    installApp: function (AppVm) {
      vm = AppVm
    },
    setRoutesConfig: function (routes) {
      routesConfig = routes
      vm.$dispatch('onRoutesChanged', routesConfig)
      vm.$broadcast('onRoutesChanged', routesConfig)
    },
    getRoutesConfig: function () {
      return routesConfig
    },
    loadFromServer: function () {
      return Vue.http.get('admin/routes').then(function (re) {
        re.data = re.data ? re.data : null
        AdminRoutesProvider.setRoutesConfig(re.data)
        return this
      }, function (err) {
        vm.$log(err)
      })
    },
    logout: function () {
      Vue.http.get('auth/logout').then(function (re) {
        AdminRoutesProvider.setRoutesConfig(null)
      }, function (err) {
        vm.$log(err)
      })
    }
  }
  export default AdminRoutesProvider
</script>
