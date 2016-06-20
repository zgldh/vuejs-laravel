<template>
  <!-- Sidebar Menu -->
  <div class="ui left fixed vertical accordion menu side-menu" id="SiteNav" v-if="isLogin">
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

      <a class="item" @click="logout(event)" v-show="isLogin">退出</a>
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
      var user = CurrentUserProvider.getCurrentUser()
      return {
        isLogin: user !== null,
        user: user,
        navigators: AdminNavigatorsProvider.getNavigators()
      }
    },
    watch: {
      'isLogin': function (val, oldVal) {
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
        this.isLogin = user !== null
        if (this.isLogin) {
          this.user = user
        }
        else {
          this.user = {name: null}
        }
      },
      onNavigatorsChanged: function (navigators) {
        this.navigators = navigators
      }
    },
    methods: {
      logout: function (event) {
        CurrentUserProvider.logout()
      }
    },
    ready: function () {
      $('#SiteNav').accordion()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .self-configuration {
    img {
      max-height: 64px;
      width: auto !important;
      margin: 0 auto;
    }
  }

  .side-menu {
    .menu {
      width: 100%;
    }
  }
</style>
