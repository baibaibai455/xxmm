let ua = navigator.userAgent.toLowerCase();//获取判断用的对象


import VueRouter from 'vue-router';


//引入页面
const Home = () => import('./views/Home.vue');
const pageA = () => import('./views/homeA.vue');
const pageB = () => import('./views/homeB.vue');
const routes = [
    { path: '/', name: 'home', component: pageA, meta: { title: 'Home' } },
    { path: '/a', name: 'pageA', component: pageA, meta: { title: 'APage' } },
    { path: '/b', name: 'pageB', component: pageB, meta: { title: 'BPage' } }
];

const router = new VueRouter({
    // mode: 'history',
    routes
});


router.beforeEach((to, from, next) => {
    console.table({
        'from': from.path,
        'to': to.path
    });

    document.title = to.meta.title;


    next();
});

router.afterEach((to, from, next) => {


});


export default router;
