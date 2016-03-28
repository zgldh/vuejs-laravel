<template>
  <!-- Sidebar Menu -->
  <div class="ui vertical sidebar menu">
    <a class="active item">首页</a>
    <a class="item">工作</a>
    <a class="item">公司</a>
    <a class="item">招聘</a>
    <a class="item">登录</a>
    <a class="item">注册</a>
  </div>
  <!-- Page Contents -->
  <div class="pusher site-nav-pusher">
    <div class="ui large fixed pointing menu site-nav">
      <div class="ui container">
        <a class="toc item">
          <i class="sidebar icon"></i>
        </a>
        <a class="active item" v-link="{path:'/'}">首页</a>
        <a class="item">工作</a>
        <a class="item">公司</a>
        <a class="item">招聘</a>
        <div class="right menu">
          <a class="item">登录</a>
          <a class="item" v-link="{path:'/register'}">注册</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var $ = require('jquery')

  $(document).ready(function () {
    // create sidebar and attach to menu open
    $('.ui.sidebar').sidebar('attach events', '.toc.item')
  })

  export default {
    components: {}
  }
</script>

<style lang="sass" rel="stylesheet/scss">
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
