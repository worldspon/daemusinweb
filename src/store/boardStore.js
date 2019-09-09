import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        listArray: [],
        boardContentNo: null,
        boardContentObject: null
    },
    mutations: {
        resetState(state) {
            state.currentView = '';
            state.listArray = [];
            state.boardContentNo = null;
            state.boardContentObject = null;
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, view) {
            state.currentView = view;
        },
        setListArray(state, listArray) {
            state.listArray = listArray;
        },
        setBoardContentNo(state, no) {
            state.boardContentNo = no;
        },
        setBoardContentObject(state, boardContentObject) {
            state.boardContentObject = boardContentObject;
        }
    },
    actions: {
        axiosBoardList(context) {
            const url = `http://211.192.165.100:3030/board/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.board);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'boardList');
            })
        },
        axiosBoardContent(context) {
            const url = `http://211.192.165.100:3030/board/read/${this.state.board.boardContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setBoardContentObject', response.data.responseObject.board);
                context.commit('setCurrentView', 'boardContent');
            })
        }
    }   
}