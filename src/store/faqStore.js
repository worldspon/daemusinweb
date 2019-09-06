import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        listArray: [],
        contentNo: null,
        faqContentNo: null,
        faqContentObject: null
    },
    mutations: {
        resetState(state) {
            state.currentView = '';
            state.listArray = [];
            state.contentNo = null;
            state.faqContentNo = null;
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, view) {
            state.currentView = view;
        },
        setListArray(state, listArray) {
            state.listArray = listArray;
        },
        setContentNo(state, no) {
            state.contentNo = no;
        },
        setFaqContentNo(state, faqContentNo) {
            state.faqContentNo = faqContentNo;
        },
        resetFaqContentNo(state) {
            state.faqContentNo = null;
        },
        setFaqContentObject(state, faqContentObject) {
            state.faqContentObject = faqContentObject;
        },
        resetFaqContentObject(state) {
            state.faqContentObject = null;
        }
    },
    actions: {
        axiosFaqList(context) {
            const url = `http://211.192.165.100:3030/faq/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.faq);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'faqList');
            })
        },
        axiosFaqContent(context) {
            
            const url = `http://211.192.165.100:3030/faq/read/${this.state.faq.contentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setFaqContentObject', response.data.responseObject.faq);
                context.commit('setCurrentView', 'faqContent');
            })
        }
    }   
}