import Vue from 'vue';
import Vuex from 'vuex';
import pagenation from './pagenationStore.js';
import search from './searchKeywordStore.js';
import notice from './noticeStore.js';
import faq from './faqStore.js';


Vue.use(Vuex);



export default new Vuex.Store({
    modules: {
        pagenation: pagenation,
        search: search,
        notice: notice,
        faq: faq
    }
})