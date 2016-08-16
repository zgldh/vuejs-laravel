<template>
  <!-- Sitenav Menu -->
  <div class="ui visible labeled accordion icon left inline vertical sidebar menu"
       id="SiteNav"
       v-if="siteNavVisible" transition="sitenav">
    <div class="ui container">
      <a class="item self-configuration" title="个人设置">
        <img class="ui medium circular image" src="/static/images/avatar1.jpg"></a>
      <a class="item"
         v-bind:class="{'active': $route.path=='/dashboard'}"
         v-link="{path:'/dashboard'}">总览</a>

      <template v-for="item in navigators">
        <div class="item" v-if="item.children">
          <a class="title">
            <i class="dropdown icon"></i>
            {{ item.text }}
          </a>
          <div class="content">
            <div class="ui vertical menu">
              <a class="item"
                 v-for="child in item.children"
                 v-bind:class="{'active': $route.path==child.route}"
                 v-link="{path:child.route}"
                 v-else>{{ child.text }}</a>
            </div>
          </div>
        </div>
        <a class="item"
           v-bind:class="{'active': $route.path==item.route}"
           v-link="{path:item.route}"
           v-else>{{ item.text }}</a>
      </template>

      <a class="item" @click="logout(event)">退出</a>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import CurrentUserProvider from 'extensions/CurrentUserProvider'
  import AdminNavigatorsProvider from 'extensions/AdminNavigatorsProvider.vue'
  import store from 'components/Admin/Vuex/Store'
  import { getSiteNavVisible } from 'components/Admin/Vuex/Getters'

  export default {
    attached: function () {
    },
    vuex: {
      getters: {
        // note that you're passing the function itself, and not the value 'getCount()'
        siteNavVisible: getSiteNavVisible
      }
    },
    data: function () {
      CurrentUserProvider.getCurrentUser().then(function (loadedUser) {
        this.user = loadedUser
      }.bind(this))
      return {
        user: null,
        navigators: AdminNavigatorsProvider.getNavigators()
      }
    },
    watch: {
      'siteNavVisible': function (val, oldVal) {
        if (val === true) {
          $('#SiteNav').accordion('refresh')
        }
      },
      'navigators': function (val, oldVal) {
        if (val === true) {
          $('#SiteNav').accordion('refresh')
        }
      }
    },
    events: {
      onCurrentUserChanged: function (user) {
        if (user) {
          this.user = user
          store.dispatch('TOGGLE_SITENAV_VISIBLE', true)
        }
        else {
          this.user = {name: null}
          store.dispatch('TOGGLE_SITENAV_VISIBLE', false)
        }
      },
      onNavigatorsChanged: function (navigators) {
        this.navigators = navigators
      }
    },
    methods: {
      logout: function (event) {
        store.dispatch('TOGGLE_SITENAV_VISIBLE', false)
        CurrentUserProvider.logout()
      }
    },
    ready: function () {
      $('#SiteNav').accordion()
    }
  }
</script>

<style lang="scss" scoped>
  #SiteNav {
    /* 必需 */
    &.sitenav-transition {
      transition: all .3s ease;
      width: 250px;
      height: auto;
      overflow: hidden;
    }

    /* .expand-enter 定义进入的开始状态 */
    /* .expand-leave 定义离开的结束状态 */
    &.sitenav-enter, &.sitenav-leave {
      width: 0px;
      height: auto;
      opacity: 0;
    }

    .content.active {
      z-index: 1;
    }
  }

</style>
