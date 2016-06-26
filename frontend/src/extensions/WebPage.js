import Vue from 'vue'
import CurrentUserProvicer from 'extensions/CurrentUserProvider'

var WebPage = {
  extend: function (settings) {
    var mixin = {
      route: {
        canActivate: function (transition) {
          var user = CurrentUserProvicer.getCurrentUser()
          if (!user) {
            transition.redirect('/login')
            return false
          }
          return true
        }
      },
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
