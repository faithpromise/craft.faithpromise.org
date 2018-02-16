import main from './group-results.vue';

const routes = [
    {
        name:      'groups',
        path:      '/',
        component: main,
    },
    {
        name:      'foo',
        path:      '/foo',
        component: main,
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