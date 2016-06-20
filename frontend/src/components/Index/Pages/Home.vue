<template>

  <div class="ui container">
    <h1>VueJS + Laravel + SemanticUI + WebPack</h1>
    <p>次世代Web开发组合</p>
  </div>

</template>

<script>
  import WebPage from 'extensions/WebPage'

  export default WebPage.extend({
    data () {
      return {
        pageTitle: '首页'
      }
    },
    components: {}
  })
</script>

<style scoped>
</style>
