<script>
  import Vue from 'vue'
  
  Vue.component('remote-component', function (resolve, reject) {
    setTimeout(function () {
      resolve({
        template: '<div>I am async!</div>'
      })
    }, 1000)
  })


</script>
