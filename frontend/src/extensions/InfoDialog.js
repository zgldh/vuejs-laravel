import $ from 'jquery'

var template = '<div class="ui small basic modal" id="error-dialog">' +
  '<i class="close icon"></i>' +
  '<div class="header"></div>' +
  '<div class="content">' +
  '<div class="description"><p></p></div>' +
  '</div>' +
  '<div class="actions">' +
  '<div class="ui green inverted cancel button">' +
  '<i class="checkmark icon"></i>关闭</div>' +
  '</div></div>' +

  '<div class="ui small modal" id="info-dialog">' +
  '<i class="close icon"></i>' +
  '<div class="header"></div>' +
  '<div class="content">' +
  '<div class="description"><p></p></div>' +
  '</div>' +
  '<div class="actions">' +
  '<div class="ui green inverted cancel button">' +
  '<i class="checkmark icon"></i>关闭</div>' +
  '</div></div>' +

  '<div class="ui small basic modal" id="confirm-dialog">' +
  '<i class="close icon"></i>' +
  '<div class="header"></div>' +
  '<div class="content">' +
  '<div class="description"><p></p></div>' +
  '</div>' +
  '<div class="actions">' +
  '<div class="ui cancel red inverted button">' +
  '<i class="remove icon"></i>取消</div>' +
  '<div class="ui ok green inverted button">' +
  '<i class="checkmark icon"></i>确定</div>' +
  '</div></div>'

var InfoDialog = {
  init: function () {
    $('body').append(template)
    $('#error-dialog').modal({
      onDeny: function () {
        return true
      }
    })
    $('#info-dialog').modal({
      onDeny: function () {
        return true
      }
    })
    $('#confirm-dialog').modal({
      onDeny: function () {
        return true
      },
      onApprove: function () {
        return true
      }
    })
  },
  error: function (content, title) {
    var dialog = $('#error-dialog')
    if (dialog.size() === 0) {
      InfoDialog.init()
      dialog = $('#error-dialog')
    }
    dialog.find('.header').text(title)
    dialog.find('.content .description p').text(content)
    dialog.modal('show')
  },
  info: function (content, title) {

  },
  confirm: function (content, title, data) {
    var dialog = $('#confirm-dialog')
    if (dialog.size() === 0) {
      InfoDialog.init()
      dialog = $('#confirm-dialog')
    }
    dialog.find('.header').text(title)
    dialog.find('.content .description p').text(content)
    dialog.modal('show')
    return new Promise(
      function (resolve, reject) {
        $('#confirm-dialog').modal({
          onDeny: function () {
            return reject(data)
          },
          onApprove: function () {
            return resolve(data)
          }
        })
      }
    )
  },
  confirmDeleting: function (content, data) {
    return this.confirm(content, '删除确认', data)
  }
}

export default InfoDialog
