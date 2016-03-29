<template>

  <div class="ui container">
    <h1>VueJS + Laravel + SemanticUI + WebPack</h1>
    <p>次世代Web开发组合</p>
    <a v-on:click="TryAjax">Try Ajax</a><br>
    <a v-on:click="TryOutAjax">Try Out Ajax</a>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        msg: 'Home'
      }
    },
    components: {},
    methods: {
      TryAjax: function (e) {
        this.$http.delete('current_user', {
          foo: 'bar',
          gogo: 123
        }).then(function (re) {
          console.debug('Home.vue', arguments)
        }, function (err) {
          console.debug('Home.vue', arguments, err)
        })
      },
      TryOutAjax: function (e) {
        this.$http.post('http://www.baidu.com', {
          foo: 'bar',
          gogo: 123
        }).then(function (re) {
          console.debug('Home.vue', arguments)
        }, function (err) {
          console.debug('Home.vue', arguments, err)
        })
      }
    }
  }
</script>

<style scoped>
</style>
