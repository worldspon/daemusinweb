import './assets/css/reset.css';
import Vue from 'vue';
import store from './store/store.js';
import VueRouter from 'vue-router';
import routes from './router.js';
import App from './component/app.vue';
import Axios from 'axios';

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

// router.beforeEach((to, from, next)=>{
//     if(to.path === '/inquiry') {
//         console.log('a');
//     } else {
//         next();
//     }
// })

Vue.use(VueRouter);

Vue.prototype.$http = Axios;

const app = new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#wrap')

