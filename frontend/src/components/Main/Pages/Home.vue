<template>

    <div>Home Page</div>
    <p>{{domain}}</p>

</template>

<script>
    import Config from '../../../config';
    export default {
        data () {
            return {
                msg: 'Home',
                domain: Config.DOMAIN
            };
        },
        components: {}
    };
</script>

<style scoped>
</style>
