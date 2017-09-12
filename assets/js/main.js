import Vue from 'vue';
import axios from 'axios';

import seriesList from './series/series-list.vue';

Vue.prototype.$http = axios;

const app = new Vue({

    el:         '#app',

    components: {
        seriesList,
    },

    data: function () {
        return {
            is_nav_open: false
        }
    },

    watch: {
        is_nav_open: function (value) {
            document.documentElement.classList[value ? 'add' : 'remove']('nav-open');
        }
    },

    methods: {

        nav_open: function () {
            this.is_nav_open = true;
        },

        nav_close: function () {
            this.is_nav_open = false;
        },

        nav_toggle: function () {
            this.is_nav_open = !this.is_nav_open;
        }

    },

});
