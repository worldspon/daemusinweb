import Vue from 'vue';
import Vuex from 'vuex';
import notice from './noticeStore.js';
import pagenation from './pagenationStore.js';

Vue.use(Vuex);



export default new Vuex.Store({
    modules: {
        pagenation: pagenation,
        notice: notice
    }
})