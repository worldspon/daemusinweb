export default {
    namespaced : true,
    state: {
        searchKeyword: ''
    },
    mutations: {
        resetSearchKeyword(state) {
            state.searchKeyword = '';
        },
        setSearchKeyword(state, keyword) {
            state.searchKeyword = keyword;
        }
    }
}