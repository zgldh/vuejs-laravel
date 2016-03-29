import Vue from 'vue'
Vue.directive('auto-form', {
  bind: function () {
    console.log('auto-form', this)
    var beforeAutoFormSubmit = this.vm.beforeAutoFormSubmit
    var form = this.el
    form.addEventListener('submit', function (e) {
      if (beforeAutoFormSubmit) {

      }
      console.log(form)
    })
  },
  update: function (newValue, oldValue) {
  },
  unbind: function () {
  }
})
