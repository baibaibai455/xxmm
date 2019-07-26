import 'lib-flexible';


import 'normalize.css';

import './scss/index.scss';


import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueRouter from 'vue-router';
import Axios from './utils/axios';
import Url from './utils/URLs';
import Bridge from './utils/bridge';



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);









Vue.use(VueRouter);
Vue.prototype.$axios = Axios;
Vue.prototype.$url = Url;
Vue.prototype.$bridge = Bridge;


Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
