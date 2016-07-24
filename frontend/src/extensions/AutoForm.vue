<script>
  import Vue from 'vue'
  import resource from 'components/resources'
  import NProgress from 'nprogress'
  import InfoDialog from 'extensions/InfoDialog'
  /**
   // Template
   // <form class="ui form" action="current_user" method="post" v-auto-form>
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

   //    Vue
   //    methods: {
//       beforeAutoFormSubmit: function (data) {
//         return data
//       }
//   },
   */
  Vue.directive('auto-form', {
    params: ['action', 'v-response-type'],
    bind: function () {
      var params = this.params
      var form = this.el
      var vm = this.vm

      var action = params.action
      var selfServer = true
      if (/https?:\/\//.test(action) === true) {
        selfServer = false
      }
      else {
        action = Vue.http.options.root + '/' + action
      }

      console.log(action)

      // Prepare error boxes
      prepareErrorBoxes(form)

      // Prepare $watch
      form.unwatchFuncs = prepareWatch(vm, form)

      form.classList.add('auto-form')
      vm.$onAutoFormSubmit = function (event) {
        removeFormErrors(form)
        form.classList.add('loading')

        // fires before we do anything
        vm.$dispatch('beforeFormSubmit', form)

        // fires whenever an error occurs
        var handleError = function (err) {
          vm.$dispatch('onFormError', form, err)
        }

        // fires when the form returns a result
        var handleFinish = function (data) {
          if (xhr.readyState === 4) {
            NProgress.done()
            form.classList.remove('loading')
            // a check to make sure the result was a success
            var response = {
              status: xhr.status,
              data: xhr.response
            }
            if (xhr.status < 400) {
              vm.$dispatch('onFormComplete', form, response)
            } else {
              serverFormErrors(form, response, xhr)
              vm.$dispatch('onFormError', form, response)
            }
          }
        }

        var handleProgress = function (evt) {
          // flag indicating if the resource has a length that can be calculated
          if (evt.lengthComputable) {
            // create a new lazy property for percent
            evt.percent = (evt.loaded / evt.total) * 100
            vm.$dispatch('onFormProgress', form, evt)
          }
        }

        var xhr = new window.XMLHttpRequest()
        var data = new window.FormData(event.target)

        //  Method fix
        var method = form.attributes.getNamedItem('method').value.toLowerCase()
        if (selfServer) {
          if (method !== 'post' && method !== 'get') {
            data.append('_method', method)
            method = 'POST'
          }
        }
        else if (method === '') {
          method = 'get'
        }

        xhr.open(method, action, true)

        // XSRF
        if (selfServer) {
          var xsrfToken = resource.getXsrfToken()
          if (xsrfToken) {
            xhr.setRequestHeader('X-XSRF-TOKEN', xsrfToken)
          }
        }

        // you can set the form response type via v-response-type
        if (params.vResponseType) {
          xhr.responseType = params.vResponseType
        } else {
          xhr.responseType = 'json'
        }

        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')

        xhr.upload.addEventListener('progress', handleProgress)
        xhr.addEventListener('readystatechange', handleFinish)
        xhr.addEventListener('error', handleError)
        xhr.addEventListener('abort', handleError)
        xhr.send(data)

        NProgress.inc()

        // we have setup all the stuff we needed to
        vm.$dispatch('afterFormSubmit', form)

        event.preventDefault()
        event.stopPropagation()
      }

      form.addEventListener('submit', vm.$onAutoFormSubmit)
    },
    update: function (newValue, oldValue) {
    },
    unbind: function () {
      var form = this.el
      var vm = this.vm
      form.removeEventListener('submit', vm.$onAutoFormSubmit)

      var unwatchFuncs = form.unwatchFuncs
      for (var i = 0; i < unwatchFuncs.length; i++) {
        var func = unwatchFuncs[i]
        func()
      }
    }
  })

  function emptyDom (dom) {
    while (dom.childNodes.length) {
      var childNode = dom.childNodes[0]
      dom.removeChild(childNode)
    }
  }

  function prepareWatch (vm, form) {
    var unwatchFuncs = []
    var fields = form.querySelectorAll('[v-model]')
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      (function (field) {
        var modelName = field.attributes.getNamedItem('v-model').value
        unwatchFuncs.push(vm.$watch(modelName, function (newValue, oldValue) {
          removeFormError(form, field.name)
        }))
      })(field)
    }
    return unwatchFuncs
  }

  function prepareErrorBoxes (form) {
    var bigErrorNode = document.createElement('div')
    bigErrorNode.className = 'ui error message error-box'
    form.insertBefore(bigErrorNode, form.firstChild)

    var fieldDoms = form.getElementsByClassName('field')
    for (var i = 0; i < fieldDoms.length; i++) {
      var fieldDom = fieldDoms[i]
      var field = fieldDom.querySelector('[name]')
      if (field) {
        var fieldName = field.name
        var errorNode = document.createElement('div')
        errorNode.className = 'ui basic red pointing prompt label transition error-label field-error-' + fieldName
        fieldDom.appendChild(errorNode)
      }
    }
  }

  function findParentNodeByClass (node, className) {
    var parent = node.parentNode
    while (parent.classList.contains(className) === false) {
      parent = parent.parentNode ? parent.parentNode : null
    }
    return parent
  }

  function serverFormErrors (form, response, xhr) {
    var remainingErrors = {}

    if (response.status === 403) {
      InfoDialog.error('您没有操作权限。', response.status + ' ' + xhr.statusText)
    }
    else if (response.data === null) {
      InfoDialog.error('服务器通信故障，请联系管理员： ' + xhr.statusText, response.status)
    }
    else if (response.status >= 400) {
      for (var key in response.data) {
        if (response.data.hasOwnProperty(key)) {
          var fieldInput = form.querySelector('[name="' + key + '"]')
          var fieldDom = fieldInput ? findParentNodeByClass(fieldInput, 'field') : null
          if (!fieldDom) {
            remainingErrors[key] = response.data[key]
            continue
          }
          appendFieldError(fieldDom, response.data[key])
        }
      }
      appendBundleErrors(form, remainingErrors)
    }
  }

  function appendFieldError (fieldDom, errors) {
    fieldDom.classList.add('error')
    if (typeof (errors) === 'string') {
      errors = [errors]
    }
    var errorNode = fieldDom.querySelector('.error-label')
    for (var i = 0; i < errors.length; i++) {
      var textNode = document.createTextNode(errors[i])
      errorNode.appendChild(textNode)
      errorNode.appendChild(document.createElement('br'))
    }
    errorNode.classList.add('full-display')
    errorNode.classList.add('basic')
  }

  function appendBundleErrors (form, errors) {
    if (typeof (errors) === 'string') {
      errors = [errors]
    }
    if (errors) {
      form.classList.add('error')
      var errorBox = form.querySelector('.error-box')
      var hasErrors = false
      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          var errorItems = errors[key]
          console.log(typeof (errorItems))
          if (typeof (errorItems) === 'string') {
            errorItems = [errorItems]
          }
          for (var i = 0; i < errorItems.length; i++) {
            var pNode = document.createElement('p')
            pNode.appendChild(document.createTextNode(errorItems[i]))
            errorBox.appendChild(pNode)
            hasErrors = true
          }
        }
      }
      if (hasErrors) {
        errorBox.classList.add('full-display')
      }
    }
  }

  function removeFormError (form, fieldName) {
    var field = form.querySelector('.field-error-' + fieldName)
    emptyDom(field)
    field.classList.remove('full-display')
    field.parentNode.classList.remove('error')
  }

  function removeFormErrors (form) {
    form.classList.remove('error')
    var fieldDoms = form.querySelectorAll('.field.error')
    for (var i = 0; i < fieldDoms.length; i++) {
      var fieldDom = fieldDoms[i]
      fieldDom.classList.remove('error')
    }
    var errorLabels = form.querySelectorAll('.error-label')
    for (i = 0; i < errorLabels.length; i++) {
      var errorLabel = errorLabels[i]
      emptyDom(errorLabel)
      errorLabel.classList.remove('full-display')
    }
    var errorBox = form.querySelector('.error-box')
    emptyDom(errorBox)
    errorBox.classList.remove('full-display')
  }

</script>

<style lang="scss">
  .auto-form {

    .error-box {
      display: block !important;
    }

    .ui.label.error-label, .error-box {
      -webkit-transition: padding-top .3s, padding-bottom .3s, opacity .3s, height .3s;
      -moz-transition: padding-top .3s, padding-bottom .3s, opacity .3s, height .3s;
      -ms-transition: padding-top .3s, padding-bottom .3s, opacity .3s, height .3s;
      -o-transition: padding-top .3s, padding-bottom .3s, opacity .3s, height .3s;
      transition: padding-top .3s, padding-bottom .3s, opacity .3s, height .3s;
      line-height: 1.5em;

      opacity: 0;
      height: 0;
      padding: 0;
      margin-top: 0;
      overflow: hidden;

      &.full-display {
        opacity: 1;
        height: auto;
        margin-top: 12px;
        padding: 0.5833em 0.833em;
        overflow: visible;
      }

    }
  }
</style>
