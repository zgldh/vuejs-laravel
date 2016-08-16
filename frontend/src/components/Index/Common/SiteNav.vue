<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <!-- SiteNav Menu -->
  <div class="ui vertical sidebar menu">
    <a class="item sitenav-close-item"><i class="chevron left icon"></i> 关闭菜单</a>
    <a class="item"
       v-bind:class="{'active': $route.path=='/'}"
       v-link="{path:'/'}">首页</a>
    <a class="item">工作</a>
    <a class="item">公司</a>
    <a class="item">招聘</a>
    <a class="item" v-show="isLogin">{{userName}}</a>
    <a class="item" v-show="isLogin" @click="logout(event)">退出</a>
    <a class="item"
       v-show="isLogin===false"
       v-bind:class="{'active': $route.path=='/login'}"
       v-link="{path:'/login'}">登录</a>
    <a class="item"
       v-show="isLogin===false"
       v-bind:class="{'active': $route.path=='/register'}"
       v-link="{path:'/register'}">注册</a>
  </div>
  <!-- Page Contents -->
  <div class="pusher site-nav-pusher">
    <div class="ui large fixed pointing menu site-nav">
      <div class="ui container">
        <a class="toc item">
          <i class="sidebar icon"></i>
        </a>
        <a class="item"
           v-bind:class="{'active': $route.path=='/'}"
           v-link="{path:'/'}">首页</a>
        <a class="item">工作</a>
        <a class="item">公司</a>
        <a class="item">招聘</a>
        <div class="right menu">
          <a class="ui dropdown item" id="SiteNavUserMenu" v-show="isLogin">
            {{userName}}
            <i class="dropdown icon"></i>
            <div class="menu">
              <div class="item" @click="logout(event)">退出</div>
            </div>
          </a>
          <a class="item"
             v-show="isLogin===false"
             v-bind:class="{'active': $route.path=='/login'}"
             v-link="{path:'/login'}">登录</a>
          <a class="item"
             v-show="isLogin===false"
             v-bind:class="{'active': $route.path=='/register'}"
             v-link="{path:'/register'}">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import CurrentUserProvider from 'extensions/CurrentUserProvider'

  export default {
    attached: function () {
      $('.ui.sidebar').sidebar('attach events', '.toc.item,.ui.sidebar>.sitenav-close-item')
      $('#SiteNavUserMenu').dropdown()
    },
    data: function () {
      CurrentUserProvider.getCurrentUser().then(function (loadedUser) {
        this.isLogin = loadedUser !== null
        this.user = loadedUser
        this.userName = loadedUser ? loadedUser.name : ''
      }.bind(this))
      return {
        isLogin: false,
        user: null,
        userName: ''
      }
    },
    events: {
      onCurrentUserChanged: function (user) {
        this.isLogin = user !== null
        if (this.isLogin) {
          this.user = user
          this.userName = this.user.name
        }
        else {
          this.user = {name: null}
        }
      }
    },
    methods: {
      logout: function (event) {
        CurrentUserProvider.logout()
      }
    },
    components: {}
  }
</script>

<style lang="scss">
  .pusher.site-nav-pusher {
    min-height: inherit;
    overflow: visible;
    z-index: auto;

    .pointing.menu .toc.item {
      display: none;
    }

    @media only screen and (max-width: 700px) {
      .pointing.menu .item,
      .pointing.menu .menu {
        display: none;
      }

      .pointing.menu .toc.item {
        display: block;
      }
    }
  }
</style>
