import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView: 'inquiryRegister',
        inquiryList: [],
        inquiryContentNo: 123,
        inquiryContentObject: null
    },
    mutations: {
        resetState(state) {
            state.currentView = 'inquiryRegister';
            state.inquiryList = [];
            state.inquiryContentNo = null;
            state.inquiryContentObject = null;
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, currentView) {
            state.currentView = currentView;
        },
        setInquiryList(state, inquiryList) {
            state.inquiryList = inquiryList;
        },
        setInquiryContentNo(state, contentNo) {
            state.inquiryContentNo = contentNo;
        },
        setInquiryContentObject(state, contentObject) {
            state.inquiryContentObject = contentObject;
        }
    },
    actions: {
        axiosInquiryRegister(context, inquriyObject) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/contact/question/create?token=${token}`

            axios.post(url, inquriyObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert('문의가 등록되었습니다.');
                    context.commit('setInquiryContentNo', response.data.responseObject.no);
                    context.dispatch('axiosInquiryContent');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosInquiryList(context) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }


            const url = `/api/contact/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}?token=${token}`

            axios.get(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    context.commit('setInquiryList', response.data.responseObject.question);
                    context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                    context.commit('setCurrentView', 'inquiryList');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosInquiryContent(context) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/contact/read/${this.state.inquiry.inquiryContentNo}?token=${token}`;

            axios.get(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    context.commit('setCurrentView', 'inquiryContent');
                    context.commit('setInquiryContentObject', response.data.responseObject.contact);
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosAnswerRegister(context, answerContent) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/contact/answer/create?token=${token}`;

            const postObject = {
                contact: {
                    question: {
                        no : this.state.inquiry.inquiryContentNo
                    }, 
                    answer: {
                        answerContent : answerContent
                    }
                }
            }

            axios.post(url, postObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosInquiryContent');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosAnswerModify(context, patchObject) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const url = `/api/contact/answer/modify/${patchObject.no}?token=${token}`;

            const sendObject = {
                contact: {
                    question: {
                        no: this.state.inquiry.inquiryContentNo
                    }, 
                    answer: {
                        answerContent: patchObject.content
                    }
                }
            }

            axios.patch(url, sendObject).then(response => {
                console.log(response.data.errorCode);
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosInquiryContent');
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosAnswerDelete(context, answerNo) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }
            const url = `/api/contact/answer/remove/${answerNo}?token=${token}`;

            axios.delete(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosInquiryContent');
                }else {
                    alert(response.data.message);
                }
            })

        }


        
    }   
}