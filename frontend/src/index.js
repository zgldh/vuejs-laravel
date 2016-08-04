import App from './components/Index/App.vue'
import Router from './components/Index/router.js'

require(['vue', 'vue-async-data', 'vuex', './components/resources.js'],
  function (Vue, VueAsyncData, Vuex) {
    Vue.use(VueAsyncData)
    Vue.use(Vuex)
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
    Router.start(application, 'html')
  })
