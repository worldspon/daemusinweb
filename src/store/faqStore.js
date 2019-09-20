import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        listArray: [],
        faqContentNo: null,
        faqContentObject: null
    },
    mutations: {
        resetState(state) {
            state.currentView = '';
            state.listArray = [];
            state.faqContentNo = null;
            state.faqContentObject = null;
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, view) {
            state.currentView = view;
        },
        setListArray(state, listArray) {
            state.listArray = listArray;
        },
        setFaqContentNo(state, faqContentNo) {
            state.faqContentNo = faqContentNo;
        },
        setFaqContentObject(state, faqContentObject) {
            state.faqContentObject = faqContentObject;
        }
    },
    actions: {
        axiosFaqList(context) {
            const url = `/faq/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.faq);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'faqList');
            })
        },
        axiosFaqContent(context) {
            
            const url = `/faq/read/${this.state.faq.faqContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setFaqContentObject', response.data.responseObject.faq);
                context.commit('setCurrentView', 'faqContent');
            })
        }
    }   
}