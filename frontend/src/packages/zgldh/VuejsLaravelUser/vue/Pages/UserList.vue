<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container user-list-page">
    <div class="content">
      <h1>用户列表</h1>
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
        pageTitle: '用户列表'
      }
    },
    events: {
      onFormComplete: function (form, response) {
        CurrentUserProvider.setCurrentUser(response.data)
        Router.go('/dashboard')
      }
    },
    methods: {},
    components: {}
  })
</script>

<style lang="scss" rel="stylesheet/scss">
  .user-list-page {
  }
</style>
