<template>

    <div>
        <img class="logo" src="../../assets/logo.png">
        <h1>{{msg}}</h1>
    </div>

</template>

<script>

    export default {
        data () {
            return {
                msg: 'Hello from vue-loader!'
            };
        },
        components: {
        }
    };
</script>

<style scoped>
</style>