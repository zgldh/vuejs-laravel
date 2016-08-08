import Vue from 'vue'

var currentUser = null
var vm = null
var loaded = false
var loadingPromise = null
var policies = {}

function _hasRole (roleName) {
  var policy = policies['role-' + roleName]
  return new Promise(function (resolve, reject) {
    if (policy) {
      resolve(policy)
    }
    else {
      reject(policy)
    }
  })
}

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
    return CurrentUserProvider.isLogin()
  },
  isLogin: function () {
    if (loadingPromise) {
      return loadingPromise
    }
    if (loaded === false) {
      return CurrentUserProvider.loadFromServer()
    }
    return new Promise(function (resolve, reject) {
      if (currentUser) {
        resolve(currentUser)
      }
      else {
        reject(currentUser)
      }
    })
  },
  hasRole: function (roleName) {
    var policyKey = 'role-' + roleName
    var policy = policies[policyKey]
    if (policy === undefined) {
      return Vue.http.get('current_user/policy/role/' + roleName)
        .then(function (re) {
          policies[policyKey] = re.data.result
          return _hasRole(roleName)
        }, function (err) {
          vm.$log(err)
        })
    }
    else {
      return _hasRole(roleName)
    }
  },
  hasPermission: function (permissionName, itemId) {
    // TODO
  },
  loadFromServer: function () {
    loadingPromise = Vue.http.get('current_user')
      .then(function (re) {
        loaded = true
        loadingPromise = null
        re.data = re.data ? re.data : null
        CurrentUserProvider.setCurrentUser(re.data)
        return new Promise(function (resolve, reject) {
          resolve(currentUser)
        })
      }, function (err) {
        loaded = true
        loadingPromise = null
        vm.$log(err)
      })
    return loadingPromise
  },
  logout: function () {
    return Vue.http.get('auth/logout').then(function (re) {
      CurrentUserProvider.setCurrentUser(null)
    }, function (err) {
      vm.$log(err)
    })
  }
}
export default CurrentUserProvider
