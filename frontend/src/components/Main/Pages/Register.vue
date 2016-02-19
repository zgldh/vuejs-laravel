<template>

    <div class="row">
        <h1 class="col-md-6 col-md-offset-3">用户注册</h1>
    </div>
    <div class="row">
        <form class="col-xs-12 col-md-6 col-md-offset-3" v-on:submit="Submit">
            <fieldset class="form-group">
                <label for="username">用户名</label>
                <input type="text" class="form-control" id="username" placeholder="怎么称呼你？">
            </fieldset>
            <fieldset class="form-group">
                <label for="email">电子邮箱</label>
                <input type="email" class="form-control" id="email" placeholder="登录用">
            </fieldset>
            <fieldset class="form-group">
                <label for="password">密码</label>
                <input type="password" class="form-control" id="password" placeholder="至少六个字符">
            </fieldset>
            <fieldset class="form-group">
                <label for="password_confirmation">确认密码</label>
                <input type="password" class="form-control" id="password_confirmation" placeholder="重复上面的密码">
            </fieldset>
            <button type="submit" class="btn btn-primary">注册</button>
        </form>
    </div>

</template>

<script>
    import Config from '../../../config';
    export default {
        data () {
            return {
                msg: 'Register',
                domain: Config.DOMAIN
            };
        },
        components: {},
        methods: {
            Submit: function (event) {
                console.log(event);
            }
        },
        created: function () {
            // `this` 指向 vm 实例
            console.log('a is: ' + this.a);
        }
    };
</script>

<style scoped>
</style>
