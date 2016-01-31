require('./assets/admin.scss');
require('./common.js');

import Vue from 'vue';
import App from './Admin.vue';

/* eslint-disable no-new */
new Vue({
    el: 'body',
    components: {App}
});
