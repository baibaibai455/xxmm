import 'lib-flexible';


import 'normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
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


Vue.use(ElementUI);


import VueParticles from 'vue-particles';


Vue.use(VueParticles);


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
