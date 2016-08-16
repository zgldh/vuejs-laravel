import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Create an object to hold the initial state when
// the app starts up
const state = {
  siteNavVisible: false
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
  // TODO: set up our mutations
  TOGGLE_SITENAV_VISIBLE: function (state, amount) {
    if (amount === undefined) {
      state.siteNavVisible = !state.siteNavVisible
    }
    else {
      state.siteNavVisible = amount
    }
  }
}

// Combine the initial state and the mutations to create a Vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
  state,
  mutations
})
