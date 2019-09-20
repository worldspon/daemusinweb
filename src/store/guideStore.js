import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView: '',
        guideList: [],
        guideContentNo: null,
        guideContentObject: null
    },
    mutations: {
        resetState(state) {
            state.currentView = '';
            state.guideList = [];
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, currentView) {
            state.currentView = currentView;
        },
        setListArray(state, guideList) {
            state.guideList = guideList;
        },
        setGuideContentNo(state, guideContentNo) {
            state.guideContentNo = guideContentNo;
        },
        setGuideContentObject(state, guideContentObject) {
            state.guideContentObject = guideContentObject;
        }
    },
    actions: {
        axiosGuideList(context) {
            const url = `/gameGuide/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;

            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.gameGuide);
                context.commit('pagenation/setTotalPosts', response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'guideList');
            })
        },
        axiosGuideContent(context) {
            
            const url = `/gameGuide/read/${this.state.guide.guideContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setGuideContentObject', response.data.responseObject.gameGuide);
                context.commit('setCurrentView', 'guideContent');
            })
        }
    }   
}