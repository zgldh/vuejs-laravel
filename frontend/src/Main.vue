<template>

    <div class="container-fluid">
        <navbar></navbar>
    </div>

</template>

<script>
    import Navbar from './components/Main/Navbar.vue';

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