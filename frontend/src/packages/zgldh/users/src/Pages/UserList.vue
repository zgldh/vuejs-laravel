<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container user-list-page">
    <div class="content">
      <h1>用户列表</h1>
    </div>
  </div>
</template>

<script>
  import 'extensions/AutoForm.vue'
  import CurrentUserProvider from 'extensions/CurrentUserProvier.vue'
  import Router from 'components/Admin/router'

  export default {
    data () {
      return {}
    },
    events: {
      onFormComplete: function (form, response) {
        CurrentUserProvider.setCurrentUser(response.data)
        Router.go('/dashboard')
      }
    },
    methods: {},
    components: {}
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .user-list-page {
  }
</style>
