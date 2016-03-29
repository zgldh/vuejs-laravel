import Vue from 'vue'
import App from './components/Index/App.vue'
import Router from './components/Index/router.js'
import './components/resources.js'

/* eslint-disable no-new */
var application = Vue.extend({
  components: {App}
})
Router.router.start(application, 'body')
