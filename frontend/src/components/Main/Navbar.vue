<template>

    <nav class="navbar navbar-light bg-faded main-navbar">
        <div class="navbar-nav">
            <a class="navbar-brand" v-link="{ path: '/' }">Logo</a>
            <button class="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse"
                    data-target="#exCollapsingNavbar">&#9776;</button>
        </div>
        <div class="hidden-sm-up clearfix"></div>
        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar">
            <ul class="nav navbar-nav">
                <li class="nav-item" v-bind:class="{'active': $route.path=='/'}">
                    <a class="nav-link" v-link="{ path: '/' }">首页 <span class="sr-only">(当前页)</span></a>
                </li>
                <li class="nav-item" v-bind:class="{'active': $route.path=='/articles'}">
                    <a class="nav-link" v-link="{ path: '/articles' }">文章</a>
                </li>
                <li class="nav-item" v-bind:class="{'active': $route.path=='/about'}">
                    <a class="nav-link" v-link="{ path: '/about' }">关于</a>
                </li>
            </ul>
            <ul class="nav navbar-nav pull-right">
                <li class="nav-item" v-bind:class="{'active': $route.path=='/login'}">
                    <a class="nav-link" v-link="{ path: '/login' }">登录</a>
                </li>
                <li class="nav-item" v-bind:class="{'active': $route.path=='/register'}">
                    <a class="nav-link" v-link="{ path: '/register' }">注册</a>
                </li>
                <li class="nav-item" v-bind:class="{'active': $route.path=='/logout'}">
                    <a class="nav-link" v-link="{ path: '/logout' }">退出</a>
                </li>
            </ul>
        </div>
    </nav>

</template>

<script>
    export default {
        data () {
            return {
                msg: 'Navbar'
            };
        },
        components: {}
    };
</script>

<style scoped>
    .main-navbar {
        margin: 1em 0;
    }
</style>
