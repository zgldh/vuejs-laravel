<template>

    <nav class="navbar navbar-fixed-top navbar-light bg-faded">
        <button class="navbar-toggler  hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar">
            &#9776;
        </button>
        <div class="collapse  navbar-toggleable-xs" id="exCollapsingNavbar">
            <a class="navbar-brand" href="#">Logo</a>
            <ul class="nav navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">首页 <span class="sr-only">(当前页)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">文章</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">关于</a>
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
