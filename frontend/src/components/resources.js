import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://vuejs-laravel/api'
Vue.http.options.beforeSend = function (settings) {
  var xsrfToken = getCookie('XSRF-TOKEN')
  if (xsrfToken) {
    settings.headers['X-XSRF-TOKEN'] = xsrfToken
  }
}

function getCookie (c_name) {
  if (document.cookie.length > 0) {
    var c_start = document.cookie.indexOf(c_name + '=')
    if (c_start !== -1) {
      c_start = c_start + c_name.length + 1
      var c_end = document.cookie.indexOf(';', c_start)
      if (c_end === -1) c_end = document.cookie.length
      return decodeURIComponent(document.cookie.substring(c_start, c_end))
    }
  }
  return ''
}

export default {
  resource: VueResource
}
