import main from './route-groups-home.vue';
import detail from './route-groups-detail.vue';

const routes = [
    {
        name:      'groups',
        path:      '/',
        component: main,
        children: [
            {
                name: 'group-detail',
                path: '/:slug',
                component: detail,
            }
        ],
    },

];

const router = new VueRouter({
    routes:         routes.concat([]),
    base:           '/groups/search',
    mode:           'history',
    scrollBehavior: (to, from, savedPosition) => {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    }
});

export default router;