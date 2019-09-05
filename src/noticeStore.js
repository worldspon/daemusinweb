import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        category : 'all',
        listArray: [],
        contentNo: null,
        noticeContentObject: null,
        searchKeyword : '',
    },
    mutations: {
        setStateReset(state) {
            state.category = 'all';
            state.currentView = '';
            state.listArray = [];
            this.state.pagenation.pageNum = 1;
            this.state.pagenation.lastPage =  null;
            this.state.pagenation.totalPosts =  null;
            state.searchKeyword = '';
        },
        setCurrentView(state, view) {
            state.currentView = view;
        },
        // 카테고리 변경시 초기화 후 재통신
        // watch
        setCategory(state, e) {
            const newCategory = e.target.dataset.category;
            state.listArray = [];
            this.state.pagenation.pageNum = 1;
            this.state.pagenation.lastPage =  null;
            this.state.pagenation.totalPosts =  null;
            state.searchKeyword = '';
            state.category = newCategory;
            this.dispatch('notice/axiosNoticeList');
        },
        setListArray(state, listArray) {
            state.listArray = listArray;
        },
        setContentNo(state, e) {
            state.contentNo = e.target.dataset.no;
        },
        setnoticeContentObject(state, noticeContentObject) {
            state.noticeContentObject = noticeContentObject;
        }
    },
    actions: {
        axiosNoticeList(context) {
            console.log('wlsdlq')
            const url = `http://211.192.165.100:3030/notice/list/${this.state.notice.category}/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.notice.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.notice);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('pagenation/setLastPage', null, { root: true });
                context.commit('pagenation/setPageArray', null, { root: true });
            })
        },
        axiosNoticeContent(context) {
            const url = `http://211.192.165.100:3030/notice/read/${this.state.notice.contentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setnoticeContentObject', response.data.responseObject.notice);
            })
        }
    }   
}