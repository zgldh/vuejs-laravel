import Vue from 'vue'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

Vue.use(VueResource)
Vue.http.options.root = 'api'  // No tail slash
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push({
  request: function (request) {
    if (/https?:\/\//.test(request.url) === false) {
      var xsrfToken = getXsrfToken()
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
    NProgress.start()
    return request
  },

  response: function (response) {
    NProgress.done()
    return response
  }
})

function getCookie (cookieName) {
  if (document.cookie.length > 0) {
    var cookieStart = document.cookie.indexOf(cookieName + '=')
    if (cookieStart !== -1) {
      cookieStart = cookieStart + cookieName.length + 1
      var cookieEnd = document.cookie.indexOf(';', cookieStart)
      if (cookieEnd === -1) cookieEnd = document.cookie.length
      return decodeURIComponent(document.cookie.substring(cookieStart, cookieEnd))
    }
  }
  return ''
}

function getXsrfToken () {
  return getCookie('XSRF-TOKEN')
}

export default {
  resource: VueResource,
  getXsrfToken: getXsrfToken
}
