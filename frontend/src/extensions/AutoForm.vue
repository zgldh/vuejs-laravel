<script>
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

      // Prepare error boxes
      prepareErrorBoxes(form)

      form.classList.add('auto-form')
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
            serverFormErrors(response)
          })

          form.classList.add('loading')
          removeFormErrors(form)
        }

        e.preventDefault()
        e.stopPropagation()
      }

      function prepareErrorBoxes (form) {
        var fieldDoms = form.getElementsByClassName('field')
        for (var i = 0; i < fieldDoms.length; i++) {
          var fieldDom = fieldDoms[i]
          var errorNode = document.createElement('div')
          errorNode.className = 'ui basic red pointing prompt label transition error-label'
          fieldDom.appendChild(errorNode)
        }
      }

      var getFormData = function () {
        return JSON.parse(JSON.stringify(vm[expression]))
      }

      var serverFormErrors = function (response) {
        var remainingErrors = {}
        if (response.status === 422) {
          for (var key in response.data) {
            if (response.data.hasOwnProperty(key)) {
              var fieldInput = form.querySelector('[name="' + key + '"]')
              var fieldDom = fieldInput ? fieldInput.parentNode : null
              if (!fieldDom) {
                remainingErrors[key] = response.data[key]
                continue
              }
              appendFormError(fieldDom, response.data[key])
            }
          }
        }
      }

      var appendFormError = function (fieldDom, errors) {
        fieldDom.classList.add('error')
        var errorNode = fieldDom.querySelector('.error-label')
        for (var i = 0; i < errors.length; i++) {
          var textNode = document.createTextNode(errors[i])
          errorNode.appendChild(textNode)
          errorNode.appendChild(document.createElement('br'))
        }
        errorNode.classList.add('full-display')
        errorNode.classList.add('basic')
      }
      //
      // var removeFormError = function (form, field_name) {
      //   var input = form.find("[name='" + field_name + "']")
      //   var input_parent = input.parentsUntil('.field').parent()
      //   if (input_parent.length === 0) {
      //     input_parent = input.parent('.field')
      //   }
      //   input.siblings('.error-label').remove()
      //   input_parent.removeClass('error')
      // }
      //
      var removeFormErrors = function (form) {
        var fieldDoms = form.querySelectorAll('.field.error')
        for (var i = 0; i < fieldDoms.length; i++) {
          var fieldDom = fieldDoms[i]
          fieldDom.classList.remove('error')
        }
        var errorLabels = form.querySelectorAll('.error-label')
        for (i = 0; i < errorLabels.length; i++) {
          var errorLabel = errorLabels[i]
          while (errorLabel.childNodes.length) {
            var childNode = errorLabel.childNodes[0]
            errorLabel.removeChild(childNode)
          }
          errorLabel.classList.remove('full-display')
        }
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

</script>

<style lang="sass" rel="stylesheet/scss">
  .auto-form {
    .ui.label.error-label {
      -webkit-transition: padding .3s, opacity .3s, height .3s;
      -moz-transition: padding .3s, opacity .3s, height .3s;
      -ms-transition: padding .3s, opacity .3s, height .3s;
      -o-transition: padding .3s, opacity .3s, height .3s;
      transition: padding .3s, opacity .3s, height .3s;
      line-height: 1.5em;

      opacity: 0;
      height: 0;
      padding: 0;
      overflow: hidden;
      &.full-display {
        opacity: 1;
        height: auto;
        padding: 0.5833em 0.833em;
        overflow: visible;
      }
    }
  }
</style>
