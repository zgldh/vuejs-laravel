<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container register-page">
    <h1 class="ui header"><i class="add user icon"></i> 用户注册</h1>
    <div class="ui internally celled two column grid">
      <div class="row">
        <div class="column">

          <form class="ui form" action="auth/register" method="post" is="auto-form">
            <div class="field">
              <label>电子邮箱</label>
              <input type="email" name="email" placeholder="用户登录" v-model="email">
            </div>
            <div class="field">
              <label>昵称</label>
              <input type="text" name="name" placeholder="别人怎么称呼你" v-model="name">
            </div>
            <div class="field">
              <label>密码</label>
              <input type="password" name="password" placeholder="" v-model="password">
            </div>
            <div class="field">
              <label>重复密码</label>
              <input type="password" name="password_confirmation" placeholder="" v-model="password_confirmation">
            </div>
            <button class="ui primary button" type="submit">注册</button>
          </form>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import '../../../extensions/AutoForm.vue'

  export default {
    data () {
      return {
        msg: 'Article',
        form: {
          email: '',
          name: '',
          password: '',
          password_confirmation: ''
        }
      }
    },
    methods: {},
    components: {}
  }
</script>

<style lang="sass" rel="stylesheet/scss">
</style>
