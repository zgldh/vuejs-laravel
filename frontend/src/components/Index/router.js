import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'components/Index/Pages/Home.vue'
import Register from 'components/Index/Pages/Register.vue'
import Login from 'components/Index/Pages/Login.vue'

Vue.use(VueRouter)
var router = new VueRouter({
  // Set to true to remove #! in path.
  // It needs proper configured server.
  // http://readystate4.com/2012/05/17/nginx-and-apache-rewrite-to-support-html5-pushstate/
  history: false
})
router.map({
  '/': {
    component: Home
  },
  '/login': {
    component: Login
  },
  '/register': {
    component: Register
  }
})
export default router
