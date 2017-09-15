import Vue from 'vue';
import axios from 'axios';
import PortalVue from 'portal-vue'

import seriesList from './series/series-list.vue';
import playlistItem from './series/playlist-item.vue';
import sermonHero from './series/sermon-hero.vue';
import sermonTools from './series/sermon-tools.vue';

Vue.prototype.$http = axios;

Vue.use(PortalVue);

const app = new Vue({

    el: '#app',

    components: {
        seriesList,
        playlistItem,
        sermonHero,
        sermonTools,
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
