import Vue from 'vue';
import Vuex from 'vuex';
import login from './loginStore.js'
import pagenation from './pagenationStore.js';
import commentPagenation from './commentPagenationStore.js';
import search from './searchKeywordStore.js';
import comment from './commentStore.js';
import notice from './noticeStore.js';
import faq from './faqStore.js';
import board from './boardStore.js';


Vue.use(Vuex);



export default new Vuex.Store({
    modules: {
        login: login,
        pagenation: pagenation,
        commentPagenation: commentPagenation,
        comment: comment,
        search: search,
        notice: notice,
        faq: faq,
        board: board
    }
})