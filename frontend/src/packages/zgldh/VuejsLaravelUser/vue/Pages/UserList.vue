<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container user-list-page" transition="page">
    <div class="content">
      <h1>用户列表</h1>

      <table class="ui selectable celled table">
        <thead>
        <tr>
          <th class="collapsing">ID</th>
          <th>用户名</th>
          <th>邮箱</th>
          <th class="right aligned collapsing">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users">
          <td class="collapsing">{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td class="right aligned collapsing">
            <button class="ui button primary" type="button" v-on:click="editUser(user)">编辑</button>
            <button class="ui button red" type="button" v-on:click="deleteUser(user)">删除</button>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <th colspan="4">
            <pagination></pagination>
          </th>
        </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
  import 'extensions/AutoForm.vue'
  import Vue from 'vue'
  import Router from 'components/Admin/router'
  import WebPage from 'extensions/WebPage'
  import CurrentUserProvider from 'extensions/CurrentUserProvider'
  import InfoDialog from 'extensions/InfoDialog'
  import Pagination from 'extensions/Pagination'

  export default WebPage.extend({
    route: {
      data: function (transaction) {
        return Vue.http.get('user')
                .then(function (re) {
                  var users = re.data ? re.data : []
                  return {
                    users: users
                  }
                }, function (err) {
                  console.log(err)
                })
      },
      canActivate: function (transition) {
        return CurrentUserProvider.isLogin().catch(function () {
          transition.redirect('/login')
        })
      }
    },
    data () {
      return {
        pageTitle: '用户列表',
        users: []
      }
    },
    events: {},
    methods: {
      editUser: function (user) {
        Router.go('/users/' + user.id + '/edit')
      },
      deleteUser: function (user) {
        var vm = this
        InfoDialog.confirmDeleting('真的要删除用户 ' + user.name + ' ？', user)
                .then(function (user) {
                  console.log('confirm resolve', user)
                  return Vue.http.delete('user/' + user.id)
                          .then(function (re) {
                            vm.users.$remove(user)
                          }, function (err) {
                            console.log(err)
                          })
                })
      }
    },
    components: {
      Pagination
    }
  })
</script>

<style lang="scss">
  .user-list-page {
  }
</style>
