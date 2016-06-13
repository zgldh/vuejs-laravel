<template xmlns:v-on="http://www.w3.org/1999/xhtml">

  <div class="ui container user-editor-page">
    <div class="content">
      <h1 v-if="userid">编辑用户 {{userid}}</h1>
      <h1 v-else>新增用户</h1>
    </div>
    <p>{{userid}}</p>
  </div>
</template>

<script>
  import 'extensions/AutoForm.vue'
  import CurrentUserProvider from 'extensions/CurrentUserProvier.vue'
  import Router from 'components/Admin/router'

  export default {
    route: {
      canReuse: function (transition) {
        return false
      }
    },
    data () {
      return {
        userid: this.$route.params ? this.$route.params.userid : null
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
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .user-editor-page {
  }
</style>
