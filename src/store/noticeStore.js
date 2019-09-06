import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        category : 'all',
        listArray: [],
        contentNo: null,
        noticeContentObject: null
    },
    mutations: {
        resetState(state) {
            state.category = 'all';
            state.currentView = '';
            state.listArray = [];
            state.contentNo = null;
            state.noticeContentObject = null;
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, view) {
            state.currentView = view;
        },
        setCategory(state, newCategory) {
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
            state.category = newCategory;
        },
        setListArray(state, listArray) {
            state.listArray = listArray;
        },
        setContentNo(state, no) {
            state.contentNo = no;
        },
        setNoticeContentObject(state, noticeContentObject) {
            state.noticeContentObject = noticeContentObject;
        },
        resetNoticeContentObject(state) {
            state.noticeContentObject = null;
        }
    },
    actions: {
        axiosNoticeList(context) {
            const url = `http://211.192.165.100:3030/notice/list/${this.state.notice.category}/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.notice);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'noticeList');
            })
        },
        axiosNoticeContent(context) {
            const url = `http://211.192.165.100:3030/notice/read/${this.state.notice.contentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setNoticeContentObject', response.data.responseObject.notice);
                context.commit('setCurrentView', 'noticeContent');
            })
        }
    }   
}