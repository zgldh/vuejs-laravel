import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Pages/Home.vue'
import Register from './Pages/Register.vue'

Vue.use(VueRouter)
var router = new VueRouter()
router.map({
  '/': {
    component: Home
  },
  '/register': {
    component: Register
  }
})
export default {
  router: router
}
