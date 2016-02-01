require('./assets/main.scss');

import './common';
import Vue from 'vue';
import App from './components/Main/App.vue';
import Router from './components/Main/router.js';

/* eslint-disable no-new */
var application = Vue.extend({
    components: {App}
});
Router.router.start(application, 'body');
