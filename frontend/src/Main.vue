<template>

    <div>
        <img class="logo" src="./assets/logo.png">
        <h1>{{msg}}</h1>
        <comp-a></comp-a>
        <comp-b></comp-b>

        <div class="btn-group">
            <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Action
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
            </div>
        </div>
    </div>

</template>

<script>
    import CompA from './components/A.vue';
    import CompB from './components/B.vue';

    export default {
        data () {
            return {
                msg: 'Hello from vue-loader!'
            };
        },
        components: {
            CompA,
            CompB
        }
    };
</script>

<style>
    body {
        font-size: 100%;
        color: #999;
    }

    h2 {
        font-size: inherit;
    }

    .logo {
        width: 40px;
        height: 40px;
    }
</style>
