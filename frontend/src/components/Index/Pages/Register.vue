<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container register-page">
    <h1 class="ui header"><i class="add user icon"></i> 用户注册</h1>
    <div class="ui internally celled two column grid">
      <div class="row">
        <div class="column">

          <form class="ui form" action="auth/register" method="post" v-auto-form>
            <div class="field">
              <label>电子邮箱</label>
              <input type="email" name="email" placeholder="登录唯一标识符">
            </div>
            <div class="field">
              <label>昵称</label>
              <input type="text" name="name" placeholder="别人怎么称呼你">
            </div>
            <div class="field">
              <label>密码</label>
              <input type="password" name="password" placeholder="">
            </div>
            <div class="field">
              <label>重复密码</label>
              <input type="password" name="password_confirmation" placeholder="">
            </div>
            <button class="ui primary button" type="submit">注册</button>
          </form>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import 'extensions/AutoForm.vue'
  import CurrentUserProvider from 'extensions/CurrentUserProvider'
  import WebPage from 'extensions/WebPage'

  export default WebPage.extend({
    data () {
      return {}
    },
    events: {
      onFormComplete: function (form, response) {
        CurrentUserProvider.setCurrentUser(response.data)
      }
    },
    methods: {},
    components: {}
  })
</script>

<style lang="scss">
</style>
