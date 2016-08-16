import Vue from 'vue'
import VueAsyncData from 'vue-async-data'

import App from './components/Admin/App.vue'
import Router from './components/Admin/router.js'
import './components/resources.js'
import store from './components/Admin/Vuex/Store'

Vue.use(VueAsyncData)
Vue.config.debug = true
Vue.config.unsafeDelimiters = ['{!!', '!!}']
/* eslint-disable no-new */
var application = Vue.extend({
  components: {App},
  data () {
    return {pageTitle: null}
  },
  events: {
    onPageTitleChanged: function (title) {
      this.pageTitle = title
    }
  },
  store: store
})
Router.start(application, 'html')
