import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView: '',
        guideList: [],
        guideContentNo: null,
        guideContentObject: null,
        formType: ''
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
        setFormType(state, type) {
            state.formType = type;
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
            const url = `/api/gameGuide/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;

            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.gameGuide);
                context.commit('pagenation/setTotalPosts', response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'guideList');
            })
        },
        axiosGuideContent(context) {
            
            const url = `/api/gameGuide/read/${this.state.guide.guideContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setGuideContentObject', response.data.responseObject.gameGuide);
                context.commit('setCurrentView', 'guideContent');
            })
        },
        axiosGuideWrite(context, writeObject) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }
            const url = `/api/gameGuide/create?token=${token}`;

            axios.post(url, writeObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert('게시글이 작성되었습니다.');
                    context.commit('setGuideContentNo', response.data.responseObject.no);
                    context.dispatch('axiosGuideContent');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosGuideModify(context, modifyObject) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/gameGuide/modify/${context.state.guideContentNo}?token=${token}`;

            axios.patch(url, modifyObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert('게시글이 수정되었습니다.');
                    context.commit('setGuideContentNo', response.data.responseObject.no);
                    context.dispatch('axiosGuideContent');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosGuideDelete(context) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/gameGuide/remove/${context.state.guideContentNo}?token=${token}`;

            axios.delete(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert('게시글이 삭제되었습니다.');
                    context.dispatch('axiosGuideList');
                } else {
                    alert(response.data.message);
                }
            })
        }
    }   
}