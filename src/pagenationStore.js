export default {
    namespaced : true,
    state: {
        pageNum : 1,
        lastPage: null,
        maximumPosts: 20,
        phraseSize: 5,
        totalPosts: null,
        pageArray: []
    },
    mutations: {
        changePageNum(state, e) {
            state.pageNum = Number(e.target.innerText);
        },
        setTotalPosts(state, totalPosts) {
            state.totalPosts = totalPosts;
        },
        setLastPage(state) {
            state.lastPage = Math.round((state.totalPosts / state.maximumPosts + 0.49));
        },
        setPageArray(state) {
            state.pageArray = [];

            const startPhrase = Math.floor((state.pageNum - 1) / state.phraseSize) * state.phraseSize + 1
            const endPhrase = startPhrase + state.phraseSize - 1;

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