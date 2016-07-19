import Vue from 'vue'

var currentUser = null
var vm = null
var promise = null
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
  isLogin: function () {
    if (promise) {
      return promise
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
  loadFromServer: function () {
    promise = Vue.http.get('current_user').then(function (re) {
      promise = null
      re.data = re.data ? re.data : null
      CurrentUserProvider.setCurrentUser(re.data)
      return new Promise(function (resolve, reject) {
        resolve(currentUser)
      })
    }, function (err) {
      promise = null
      vm.$log(err)
    })
    return promise
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
