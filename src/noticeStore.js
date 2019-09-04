import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        category : 'all',
        pageNum : 1,
        searchKeyword : '',
        listArray: null,
        totalPosts: null,
    },
    mutations: {
        setStateReset(state) {
            state.category = 'all';
            state.pageNum = 1;
            state.searchKeyword = '';
        },
        changeCategory(state, category) {
            state.category = category;
            state.pageNum = 1;
            state.searchKeyword = '';
        },
        changeCurrentView(state, view) {
            state.currentView = view;
        },
        changePageNum(state, pageNum) {
            state.pageNum = pageNum;
        }
    },
    actions: {
        axiosNoticeList() {
            const url = `/notice/list/${this.state.notice.category}/${this.state.notice.pageNum - 1}/${encodeURI(this.state.notice.searchKeyword)}`;
        
            axios.get(url).then(response => {
                this.state.notice.totalPosts = response.data.responseObject.totalPosts;
                this.state.notice.listArray = response.data.responseObject.notice;
            })
        }
    }   
}