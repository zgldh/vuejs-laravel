<template>
  <!-- Sidebar Menu -->
  <div class="ui visible labeled accordion icon left inline vertical sidebar menu"
       id="SiteNav"
       v-if="visible" transition="sidenav">
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

  export default {
    attached: function () {
    },
    data: function () {
      CurrentUserProvider.getCurrentUser().then(function (loadedUser) {
        this.user = loadedUser
      }.bind(this))
      return {
        user: null,
        visible: false,
        navigators: AdminNavigatorsProvider.getNavigators()
      }
    },
    watch: {
      'visible': function (val, oldVal) {
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
          this.visible = true
        }
        else {
          this.user = {name: null}
          this.visible = false
        }
      },
      onNavigatorsChanged: function (navigators) {
        this.navigators = navigators
      },
      onToggleSidebar: function () {
        this.visible = !this.visible
      }
    },
    methods: {
      logout: function (event) {
        this.visible = false
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
    width: 250px;
  }

  /* 必需 */
  .sidenav-transition {
    transition: all .3s ease;
    height: 30px;
    padding: 10px;
    background-color: #eee;
    overflow: hidden;
  }

  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .sidenav-enter, .sidenav-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
  }
</style>
