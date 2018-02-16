import Vue from 'vue';
import axios from 'axios';
import PortalVue from 'portal-vue';

import router from './groups/group-routes';

require('./custom_functions/_custom_functions');

Vue.prototype.$http = axios;

Vue.use(PortalVue);

const app = new Vue({

    router,

    el: '#app',

    data: function () {
        return {
            is_nav_open: false
        }
    },

    computed: {
        toggle_icon() {
            return this.is_nav_open ? 'close' : 'menu';
        },
    },

    watch: {
        is_nav_open: function (value) {
            document.documentElement.classList[value ? 'add' : 'remove']('nav-open');
        }
    },

    methods: {

        nav_open: function () {
            window.scrollTo(0, 0);
            this.is_nav_open = true;
        },

        nav_close: function () {
            window.scrollTo(0, 0);
            this.is_nav_open = false;
        },

        nav_toggle: function () {
            this.is_nav_open ? this.nav_close() : this.nav_open();
        },

    },

});
