import VueRouter from 'vue-router';

var router = new VueRouter();
router.map({
    '/': {
        component: require('./Pages/Home.vue')
    },
    '/articles': {
        component: require('./Pages/Articles.vue')
    },
    '/about': {
        component: require('./Pages/About.vue')
    },
    '/register': {
        component: require('./Pages/Register.vue')
    }
});

export default {
    router: router
};
