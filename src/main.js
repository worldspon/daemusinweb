import Vue from 'vue';
import VueRouter from 'vue-router';
import Routes from './router.js';
import './assets/css/reset.css';
import App from './component/app.vue';

const router = new VueRouter({
    routes: Routes,
    mode: 'history'
});

Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    router: router
}).$mount('#wrap')

