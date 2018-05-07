import main from './route-groups-home.vue';
import detail from './route-groups-detail.vue';

const routes = [
    {
        name:      'groups',
        path:      '/search',
        component: main,
        children:  [
            {
                name:      'group-detail',
                path:      '/:slug(\\d+)',
                component: detail,
                meta:      { scroll_to_top: false, },
            },
        ],
    },

];

const router = new VueRouter({
    routes:         routes.concat([]),
    base:           '/groups',
    mode:           'history',
    scrollBehavior: (to, from, savedPosition) => {

        let no_change = to.meta.scroll_to_top === false || from.meta.scroll_to_top === false;

        return savedPosition ? savedPosition : (no_change ? false : { x: 0, y: 0 });
    }
});

export default router;