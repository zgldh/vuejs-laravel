<template>

    <nav class="navbar navbar-light bg-faded">
        <button class="navbar-toggler  hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
            &#9776;
        </button>
        <div class="collapse  navbar-toggleable-xs" id="exCollapsingNavbar">
            <a class="navbar-brand" v-link="{ path: '/' }">Logo</a>
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
            <form class="form-inline pull-xs-right">
                <input class="form-control" type="text" placeholder="搜索">
                <button class="btn btn-success-outline" type="submit">
                    <i class="fa fa-search"></i>
                </button>
            </form>
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
</style>
