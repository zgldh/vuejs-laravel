import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = 'http://vuejs-laravel/api'

export default {
  resource: VueResource
}
