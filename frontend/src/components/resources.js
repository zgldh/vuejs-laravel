import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://vuejs-laravel/'
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push({
  request: function (request) {
    if (/https?:\/\//.test(request.url) === false) {
      var xsrfToken = getCookie('XSRF-TOKEN')
      if (xsrfToken) {
        request.headers['X-XSRF-TOKEN'] = xsrfToken
      }

      var method = request.method.toLowerCase()
      if (method !== 'post' && method !== 'get') {
        console.log('here', request.data)
        if (request.data) {
          request.data._method = method
        }
        else {
          request.data = {_method: method}
        }
        request.method = 'POST'
      }
    }
    return request
  },

  response: function (response) {
    return response
  }
})

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
