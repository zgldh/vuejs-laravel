import Vue from 'vue'
import App from './components/Main/App.vue'
import Router from './components/Main/router.js'
import './components/Main/resources.js'

/* eslint-disable no-new */
var application = Vue.extend({
  components: {App}
})
Router.router.start(application, 'body')
