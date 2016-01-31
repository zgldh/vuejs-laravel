require('./assets/main.scss');
require('./common.js');

import Vue from 'vue';
import App from './Main.vue';

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: {App}
});
