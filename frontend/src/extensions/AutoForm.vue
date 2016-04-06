<script>
  import Vue from 'vue'
  import resource from '../components/resources'
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

   //    Vue
   //    methods: {
//       beforeAutoFormSubmit: function (data) {
//         return data
//       }
//   },
   */
  Vue.component('auto-form', {
    name: 'auto-form',
    data: function () {
      return {
        email: '',
        name: '',
        password: '',
        password_confirmation: ''
      }
    },
    props: {
      'id': String,
      'class': String,
      'action': {
        type: String,
        required: true
      },
      'method': {
        type: String,
        required: true,
        validator: function (value) {
          switch (value.toUpperCase()) {
            case 'CONNECT':
              return true
            case 'DELETE':
              return true
            case 'GET':
              return true
            case 'HEAD':
              return true
            case 'OPTIONS':
              return true
            case 'POST':
              return true
            case 'PUT':
              return true
            case 'TRACE':
              return true
            case 'TRACK':
              return true
            default:
              return false
          }
        }
      },
      'v-response-type': String
    },
    template: '<form id="{{id}}" class="{{class}} auto-form" name="{{name}}" action="{{action}}" method="{{method}}" v-on:submit.prevent="handleAjaxFormSubmit" ><slot></slot></form>',
    created: function () {
      this.selfServer = true
      if (/https?:\/\//.test(this.action) === true) {
        this.selfServer = false
      }
      else {
        this.action = Vue.http.options.root + this.action
      }
    },
    compiled: function () {
      var form = this.$el
      // Prepare error box
      prepareErrorBoxes(form)
    },
    ready: function () {
//      var form = this.$el
//      var fieldInputs = form.querySelectorAll('[name]')
//      for (var i = 0; i < fieldInputs.length; i++) {
//        var name = fieldInputs[i].name
//      }
//      this.$watch('name', function (newValue, oldValue) {
//        console.log('watch', newValue)
//      })
      this.$log()
    },
    watch: {
      name: {
        handler: function (data) {
          console.log('watch', data)
        }
      }
    },
    events: {
      beforeFormSubmit: function (el) {
        // fired after form is submitted
        console.log('beforeFormSubmit', el)
      },
      afterFormSubmit: function (el) {
        // fired after fetch is called
        console.log('afterFormSubmit', el)
        removeFormErrors(this.$el)
      },
      onFormComplete: function (el, res) {
        // the form is done, but there could still be errors
        console.log('onFormComplete', el, res)
        // indicate the changes
        this.response = res
      },
      onFormProgress: function (el, e) {
        // the form is done, but there could still be errors
        console.log('onFormProgress', el, e)
        // indicate the changes
        this.progress = e.percent
      },
      onFormError: function (el, err) {
        // handle errors
        serverFormErrors(this.$el, err)
      }
    },
    methods: {
      handleAjaxFormSubmit: function (event) {
        // fires before we do anything
        this.$dispatch('beforeFormSubmit', this)

        // fires whenever an error occurs
        var handleError = function (err) {
          this.$dispatch('onFormError', this, err)
        }.bind(this)

        // set a default form method
        if (!this.method) {
          this.method = 'post'
        }

        // fires when the form returns a result
        var handleFinish = function (data) {
          if (xhr.readyState === 4) {
            // a check to make sure the result was a success
            if (xhr.status < 400) {
              this.$dispatch('onFormComplete', this, xhr.response)
            } else {
              var response = {
                status: xhr.status,
                data: xhr.response
              }
              this.$dispatch('onFormError', this, response)
            }
          }
        }.bind(this)

        var handleProgress = function (evt) {
          // flag indicating if the resource has a length that can be calculated
          if (evt.lengthComputable) {
            // create a new lazy property for percent
            evt.percent = (evt.loaded / evt.total) * 100
            this.$dispatch('onFormProgress', this, evt)
          }
        }.bind(this)

        var xhr = new window.XMLHttpRequest()
        var data = new window.FormData(event.target)

        //  Method fix
        if (this.selfServer) {
          var method = this.method.toLowerCase()
          if (method !== 'post' && method !== 'get') {
            data.append('_method', method)
            this.method = 'POST'
          }
        }

        xhr.open(this.method, this.action, true)

        // XSRF
        if (this.selfServer) {
          var xsrfToken = resource.getXsrfToken()
          if (xsrfToken) {
            xhr.setRequestHeader('X-XSRF-TOKEN', xsrfToken)
          }
        }

        // you can set the form response type via v-response-type
        if (this.vResponseType) {
          xhr.responseType = this.vResponseType
        } else {
          xhr.responseType = 'json'
        }

        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*')

        xhr.upload.addEventListener('progress', handleProgress)
        xhr.addEventListener('readystatechange', handleFinish)
        xhr.addEventListener('error', handleError)
        xhr.addEventListener('abort', handleError)
        xhr.send(data)
        // we have setup all the stuff we needed to
        this.$dispatch('afterFormSubmit', this)
      }
    }
  })

  function prepareErrorBoxes (form) {
    var bigErrorNode = document.createElement('div')
    bigErrorNode.className = 'ui error message error-box'
    form.insertBefore(bigErrorNode, form.firstChild)

    var fieldDoms = form.getElementsByClassName('field')
    for (var i = 0; i < fieldDoms.length; i++) {
      var fieldDom = fieldDoms[i]
      var errorNode = document.createElement('div')
      errorNode.className = 'ui basic red pointing prompt label transition error-label'
      fieldDom.appendChild(errorNode)
    }
  }

  function serverFormErrors (form, response) {
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
      appendBundleErrors(form, remainingErrors)
    }
  }

  function appendFormError (fieldDom, errors) {
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

  function appendBundleErrors (form, errors) {
    if (errors) {
      form.classList.add('error')
      var errorBox = form.querySelector('.error-box')
      for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
          var errorItems = errors[key]
          for (var i = 0; i < errorItems.length; i++) {
            var pNode = document.createElement('p')
            pNode.appendChild(document.createTextNode(errorItems[i]))
            errorBox.appendChild(pNode)
          }
        }
      }
      errorBox.classList.add('full-display')
    }
  }
  //  //
  //  function removeFormError (form, field_name) {
  //    var input = form.find("[name='" + field_name + "']")
  //    var input_parent = input.parentsUntil('.field').parent()
  //    if (input_parent.length === 0) {
  //      input_parent = input.parent('.field')
  //    }
  //    input.siblings('.error-label').remove()
  //    input_parent.removeClass('error')
  //  }

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

  function emptyDom (dom) {
    while (dom.childNodes.length) {
      var childNode = dom.childNodes[0]
      dom.removeChild(childNode)
    }
  }

</script>

<style lang="sass" rel="stylesheet/scss">
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
