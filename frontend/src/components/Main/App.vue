<template>

    <div class="container-fluid">
        <navbar></navbar>

        <router-view></router-view>
    </div>

</template>

<script>
    import Navbar from './Navbar.vue';

    export default {
        data () {
            return {
                msg: 'Hello from vue-loader!'
            };
        },
        components: {
            Navbar
        }
    };
</script>

<style scoped>
</style>