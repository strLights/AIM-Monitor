import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children: [
                {
                    path: '/b28-server',
                    component: resolve => require(['../components/page/server_B28.vue'], resolve)
                },
                {
                    path: '/b28-exchange',
                    component: resolve => require(['../components/page/exchange_B28.vue'], resolve)
                },
                {
                    path: '/m6-server',
                    component: resolve => require(['../components/page/server_M6.vue'], resolve)
                },
                {
                    path: '/m6-exchange',
                    component: resolve => require(['../components/page/exchange_M6.vue'], resolve)
                }
            ]
        },
        {
            path: '/dashboard',
            component: resolve => require(['../components/common/Iframe.vue'], resolve),
            children: [
                {
                    path: '/dashboard-b28-exchange',
                    component: resolve => require(['../components/page/grafana/b28_exchange/index.vue'], resolve)
                },
                {
                    path: '/dashboard-b28-server',
                    component: resolve => require(['../components/page/grafana/b28_server/index.vue'], resolve)
                },
                {
                    path: '/dashboard-m6-exchange',
                    component: resolve => require(['../components/page/grafana/m6_exchange/index.vue'], resolve)
                },
                {
                    path: '/dashboard-m6-server',
                    component: resolve => require(['../components/page/grafana/m6_server/index.vue'], resolve)
                },
            ]
        },
        {
            path: '/Dashboard-Customize',
            component: resolve => require(['../components/page/Dashboard.vue'], resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
