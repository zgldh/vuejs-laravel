import Vue from 'vue'
import App from './components/Index/App.vue'
import Router from './components/Index/router.js'
import './components/resources.js'

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
  }
})
Router.start(application, 'body')
