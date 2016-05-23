<template>
  <!-- Sidebar Menu -->
  <div class="ui left fixed vertical menu side-menu" v-if="isLogin">
    <div class="ui container">
      <a class="item self-configuration" title="个人设置">
        <img class="ui medium circular image" src="/static/images/avatar1.jpg"></a>
      <a class="item"
         v-bind:class="{'active': $route.path=='/'}"
         v-link="{path:'/'}">首页</a>
      <a class="item">工作</a>
      <a class="item">公司</a>
      <a class="item">招聘</a>
      <a class="item" @click="logout(event)" v-show="isLogin">退出</a>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import CurrentUserProvider from '../../../extensions/CurrentUserProvier.vue'

  export default {
    attached: function () {
      $('#SiteNavUserMenu').dropdown()
    },
    data: function () {
      var user = CurrentUserProvider.getCurrentUser()
      return {
        isLogin: user !== null,
        user: user
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

<style lang="scss" rel="stylesheet/scss">
  .self-configuration {
    img {
      max-height: 64px;
      width: auto !important;
      margin: 0 auto;
    }
  }
</style>
