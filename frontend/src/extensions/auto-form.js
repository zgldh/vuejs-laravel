import Vue from 'vue'
/**
 // Template
 // <form class="ui form" action="current_user" method="post" v-auto-form="form">
 // <div class="field">
 // <label>E-Mail</label>
 // <input type="text" name="email" placeholder="用户登录" v-model="form.email">
 // </div>
 // <div class="field">
 // <label>昵称</label>
 // <input type="text" name="name" placeholder="别人怎么称呼你" v-model="form.name">
 // </div>
 // <div class="field">
 // <label>密码</label>
 // <input type="password" name="password" placeholder="" v-model="form.password">
 // </div>
 // <div class="field">
 // <label>重复密码</label>
 // <input type="password" name="password_confirmation" placeholder="" v-model="form.password_confirmation">
 // </div>
 // <button class="ui primary button" type="submit">注册</button>
 // </form>

 // Vue
 // methods: {
 //      beforeAutoFormSubmit: function (data) {
 //        return data
 //      }
 //  },
 */
Vue.directive('auto-form', {
  params: ['action'],
  bind: function () {
    console.log('auto-form: bind', this)
    var params = this.params
    var expression = this.expression
    var form = this.el
    var vm = this.vm
    vm.$onAutoFormSubmit = function (e) {
      var data = getFormData()
      var beforeAutoFormSubmit = vm.beforeAutoFormSubmit
      if (beforeAutoFormSubmit) {
        data = beforeAutoFormSubmit(data)
      }

      if (data !== false) {
        var url = params.action
        var method = form.method
        Vue.http({url: Vue.http.options.root + url, method: method, data: data}).then(function (response) {
          console.log('auto-form: submit success', response)
          form.classList.remove('loading')
        }, function (response) {
          console.log('auto-form: submit error', response)
          form.classList.remove('loading')
        })

        form.classList.add('loading')
      }

      e.preventDefault()
      e.stopPropagation()
    }
    var getFormData = function () {
      return JSON.parse(JSON.stringify(vm[expression]))
    }

    form.addEventListener('submit', vm.$onAutoFormSubmit)
  },
  update: function (newValue, oldValue) {
  },
  unbind: function () {
    var form = this.el
    var vm = this.vm
    form.removeEventListener('submit', vm.$onAutoFormSubmit)
  }
})
