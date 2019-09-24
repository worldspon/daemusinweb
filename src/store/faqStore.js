import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        listArray: [],
        faqContentNo: null,
        faqContentObject: null,
        formType: ''
    },
    mutations: {
        resetState(state) {
            state.currentView = '';
            state.listArray = [];
            state.faqContentNo = null;
            state.faqContentObject = null;
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, view) {
            state.currentView = view;
        },
        setListArray(state, listArray) {
            state.listArray = listArray;
        },
        setFormType(state, type) {
            state.formType = type;
        },
        setFaqContentNo(state, faqContentNo) {
            state.faqContentNo = faqContentNo;
        },
        setFaqContentObject(state, faqContentObject) {
            state.faqContentObject = faqContentObject;
        }
    },
    actions: {
        axiosFaqList(context) {
            const url = `/api/faq/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.faq);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'faqList');
            })
        },
        axiosFaqContent(context) {
            
            const url = `/api/faq/read/${this.state.faq.faqContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setFaqContentObject', response.data.responseObject.faq);
                context.commit('setCurrentView', 'faqContent');
            })
        },
        axiosFaqWrite(context, writeObject) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }
            const url = `/api/faq/create?token=${token}`;

            axios.post(url, writeObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert('게시글이 작성되었습니다.');
                    context.commit('setFaqContentNo', response.data.responseObject.no);
                    context.dispatch('axiosFaqContent');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosFaqModify(context, modifyObject) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/faq/modify/${context.state.faqContentNo}?token=${token}`;

            axios.patch(url, modifyObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert('게시글이 수정되었습니다.');
                    context.commit('setFaqContentNo', response.data.responseObject.no);
                    context.dispatch('axiosFaqContent');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosFaqDelete(context) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/faq/remove/${context.state.faqContentNo}?token=${token}`;

            axios.delete(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert('게시글이 삭제되었습니다.');
                    context.dispatch('axiosFaqList');
                } else {
                    alert(response.data.message);
                }
            })
        }
    }   
}