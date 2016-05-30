<script>
  import Vue from 'vue'
  import Router from 'components/Admin/router'

  var routesConfig = null
  var vm = null
  var AdminRoutesProvider = {
    installApp: function (AppVm) {
      vm = AppVm
    },
    setRoutesConfig: function (routes) {
      routesConfig = routes
      Router.map(routesConfig)
      vm.$dispatch('onRoutesChanged', routesConfig)
      vm.$broadcast('onRoutesChanged', routesConfig)
    },
    getRoutesConfig: function () {
      return routesConfig
    },
    loadFromServer: function () {
      return Vue.http.get('admin/routes').then(function (re) {
        re.data = re.data ? re.data : []
        AdminRoutesProvider.setRoutesConfig(transformToRouterConfig(re.data))
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

  function transformToRouterConfig (raw) {
    var routerConfig = {}
    for (var key in raw) {
      routerConfig[key] = {
        component: (function (componentName) {
          return function (resolve) {
            Vue.http.get('admin/component/' + encodeURIComponent(componentName)).then(function (re) {
              re.data = re.data ? re.data : {template: "Can't find component: " + componentName}
              resolve(re.data)
            }, function (err) {
              vm.$log(err)
            })
          }
        })(raw[key])
      }
    }
    return routerConfig
  }

  export default AdminRoutesProvider
</script>
