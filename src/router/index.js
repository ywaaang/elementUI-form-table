import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);
const routes = [
    {
         path: '/home',
         title: "home",
         component: (resolve) => require(['../views/index'], resolve)
     }, {
         path: '/',
         title: "form",
         component: (resolve) => require(['../views/form'], resolve)
     }, {
        path: '/table',
        title: "table",
        component: (resolve) => require(['../views/table'], resolve)
    }
 ]
const router = new VueRouter({
    routes,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {
            x: 0,
            y: 0
        };
    }
});
export default router;