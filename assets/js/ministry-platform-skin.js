/**
 * Axios causes a conflict with Ministry Platform's ASP postback stuff
 */

import Vue from 'vue';
import ministryPlatform from './common/ministry-platform.vue';

const app = new Vue({

    el: '#app',

    components: {
        ministryPlatform,
    },

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
