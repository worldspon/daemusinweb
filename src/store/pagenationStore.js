export default {
    namespaced : true,
    state: {
        pageNum : 1,
        commentPageNum: 1,
        lastPage: null,
        maximumPosts: 20,
        phraseSize: 5,
        totalPosts: null,
        pageArray: []
    },
    mutations: {
        resetPageData(state) {
            state.pageNum = 1;
            state.lastPage =  null;
            state.totalPosts =  null;
        },
        changePageNum(state, page) {
            state.pageNum = page;
        },
        changeCommentPageNum(state, page) {
            state.commentPageNum = page;
        },
        setTotalPosts(state, totalPosts) {
            state.totalPosts = totalPosts;
            this.commit('pagenation/setLastPage');
            this.commit('pagenation/setPageArray');
        },
        setMaximunPosts(state, maximumPosts) {
            state.maximumPosts = maximumPosts;
        },
        setLastPage(state) {
            const lastPage = Math.round((state.totalPosts / state.maximumPosts + 0.49));
            state.lastPage = lastPage !== 0 ? lastPage : 1;
        },
        setPageArray(state) {
            state.pageArray = [];

            const startPhrase = Math.floor((state.pageNum - 1) / state.phraseSize) * state.phraseSize + 1
            const endPhrase = state.totalPosts !== 0 ? startPhrase + state.phraseSize - 1 : 1;

            for(let page = startPhrase; page <= endPhrase; page++) {
                state.pageArray.push(page);

                if( page === state.lastPage) {
                    break;
                }
            }
        },
        moveFirstPage(state) {
            state.pageNum = 1;
        },
        moveNextPhrase(state) {
            state.pageNum + state.phraseSize >= state.lastPage ? state.pageNum = state.lastPage : state.pageNum += state.phraseSize;
        },
        movePrevPhrase(state) {
            state.pageNum - state.phraseSize <= 1 ? state.pageNum = 1 : state.pageNum -= state.phraseSize;
        },
        moveLastPage(state) {
            state.pageNum = state.lastPage;
        }
    }
}