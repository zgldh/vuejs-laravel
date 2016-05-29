import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from 'components/Admin/Pages/Dashboard.vue'
import Login from 'components/Admin/Pages/Login.vue'

Vue.use(VueRouter)
var router = new VueRouter({
  // Set to true to remove #! in path.
  // It needs proper configured server.
  // http://readystate4.com/2012/05/17/nginx-and-apache-rewrite-to-support-html5-pushstate/
  history: false
})
router.map({
  '/dashboard': {
    component: Dashboard
  },
  '/login': {
    component: Login
  }
})
export default router
