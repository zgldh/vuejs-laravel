<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="ui container login-page" transition="page">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui teal image header">
          <img src="" class="image">
          <div class="content">
            管理员登录
          </div>
        </h2>
        <form class="ui large form" action="auth/login" method="post" v-auto-form>
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="电子邮箱">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="密码">
              </div>
            </div>
            <button class="ui fluid large teal submit button" type="submit">登录</button>
          </div>

          <div class="ui error message"></div>

        </form>

        <div class="ui message">
          <a href="#" @click="forgotPassword(event)">忘记密码?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'extensions/AutoForm.vue'
  import CurrentUserProvider from 'extensions/CurrentUserProvider'
  import Router from 'components/Admin/router'
  import WebPage from 'extensions/WebPage'

  export default WebPage.extend({
    data () {
      return {
        pageTitle: '登录'
      }
    },
    events: {
      onFormComplete: function (form, response) {
        CurrentUserProvider.setCurrentUser(response.data)
        Router.go('/dashboard')
      }
    },
    methods: {
      forgotPassword: function (event) {
        window.alert('TODO forgotPassowrd()')
      }
    },
    components: {}
  })
</script>

<style lang="scss" scoped>
  .login-page {
    width: 100%;
    margin-top: 100px;
    .column {
      max-width: 450px;
    }
    .field {
      .error-label {
        float: left;
      }
      &:after {
        display: table;
        content: "";
        width: 0;
        clear: both;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .login-page {
      width: calc(100% - 2em) !important;
      margin-top: 100px;
    }
  }

  @media only screen and (min-width: 768px) {
    .login-page {
      margin-left: -214px;
    }
  }
</style>
