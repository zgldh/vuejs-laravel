import VueRouter from 'vue-router';
import Home from './Pages/Home.vue';
import Articles from './Pages/Articles.vue';
import About from './Pages/About.vue';

var router = new VueRouter();

router.map({
    '/': {
        component: Home
    },
    '/articles': {
        component: Articles
    },
    '/about': {
        component: About
    }
});

export default {
    router: router
};
