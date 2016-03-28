<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container register-page">
    <h1 class="ui header"><i class="add user icon"></i> 用户注册</h1>
    <div class="ui internally celled two column grid">
      <div class="row">
        <div class="column">

          <form class="ui form" v-on:submit.prevent="onSubmit">
            <div class="field">
              <label>E-Mail</label>
              <input type="text" name="email" placeholder="用户登录" v-model="form.email">
            </div>
            <div class="field">
              <label>昵称</label>
              <input type="text" name="name" placeholder="别人怎么称呼你" v-model="form.name">
            </div>
            <div class="field">
              <label>密码</label>
              <input type="password" name="password" placeholder="" v-model="form.password">
            </div>
            <div class="field">
              <label>重复密码</label>
              <input type="password" name="password_confirmation" placeholder="" v-model="form.password_confirmation">
            </div>
            <button class="ui primary button" type="submit">注册</button>
          </form>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
  var $ = require('jquery')
  $(document).ready(function () {
    $('.register-page .ui.checkbox').checkbox()
  })

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
    methods: {
      onSubmit: function (event) {
        var data = JSON.stringify(this.form)
        console.log(data)
      }
    },
    components: {}
  }
</script>

<style scoped>
</style>
