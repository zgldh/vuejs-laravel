<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container user-editor-page" transition="page">
    <div class="ui internally celled two column grid">
      <div class="row">
        <div class="column">

          <div class="content">
            <h1 v-if="userid">编辑用户 {{userid}}</h1>
            <h1 v-else>新增用户</h1>
          </div>

          <form class="ui form" v-bind:action="userid?'user/'+userid:'user'"
                v-bind:method="userid?'put':'post'" v-auto-form>
            <div class="field">
              <label>用户名</label>
              <input type="text" name="name" placeholder="" v-model="user.name">
            </div>
            <div class="field">
              <label>电子邮箱</label>
              <input type="email" name="email" placeholder="" v-model="user.email">
            </div>
            <div class="field">
              <label>密码</label>
              <input type="password" name="password" placeholder="">
            </div>
            <button class="ui primary button" type="submit">保存</button>
          </form>

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
  import Vue from 'vue'

  export default WebPage.extend({

    route: {
      data: function (transaction) {
        if (this.userid) {
          return Vue.http.get('user/' + this.userid)
                  .then(function (re) {
                    var user = re.data ? re.data : []
                    return {
                      user: user
                    }
                  }, function (err) {
                    console.log(err)
                  })
        }
        return []
      },
      canReuse: function (transition) {
        return false
      },
      canActivate: function (transition) {
        return CurrentUserProvider.hasRole('admin').catch(function () {
          transition.redirect('/login')
        })
      }
    },
    data () {
      var userid = this.$route.params ? this.$route.params.userid : null
      return {
        pageTitle: userid ? '编辑用户' : '新增用户',
        userid: userid,
        user: {}
      }
    },
    events: {
      onFormComplete: function (form, response) {
        Router.go('/users')
      }
    },
    methods: {},
    components: {}
  })
</script>

<style lang="scss">
  .user-editor-page {
  }
</style>
