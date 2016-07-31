import Vue from 'vue'

var WebPage = {
  extend: function (settings) {
    var mixin = {
      ready: function () {
        if (this.pageTitle) {
          this.$dispatch('onPageTitleChanged', this.pageTitle)
        }
      }
    }

    if (settings.mixins) {
      settings.mixins.push(mixin)
    }
    else {
      settings.mixins = [mixin]
    }

    return Vue.extend(settings)
  }
}

export default WebPage
