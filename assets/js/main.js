import Vue from 'vue';
import axios from 'axios';
import PortalVue from 'portal-vue';

import seriesList from './series/series-list.vue';
import playlistItem from './series/playlist-item.vue';
import sermonHero from './series/sermon-hero.vue';
import sermonTools from './series/sermon-tools.vue';
import videoEmbed from './common/video-embed.vue';
import homePageVideo from './common/home-page-video.vue';
import volunteerPositions from './serving/volunteer-positions.vue';
import readingPlanNav from './common/reading-plan-nav.vue';
import globalLeadershipSummit from './common/global-leadership-summit.vue';

require('url-search-params/build/url-search-params.max');

Vue.prototype.$http = axios;

Vue.use(PortalVue);

const app = new Vue({

    el: '#app',

    components: {
        seriesList,
        playlistItem,
        sermonHero,
        sermonTools,
        videoEmbed,
        homePageVideo,
        volunteerPositions,
        readingPlanNav,
        globalLeadershipSummit,
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
