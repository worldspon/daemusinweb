import axios from 'axios'

export default {
    namespaced : true,
    state: {
        currentView : '',
        category : 'all',
        listArray: [],
        noticeContentNo: null,
        noticeContentObject: null
    },
    mutations: {
        resetState(state) {
            state.currentView = 'noticeContent';
            state.noticeContentNo = 152;
            state.noticeContentObject = null;
            // state.category = 'all';
            // state.currentView = '';
            // state.listArray = [];
            // state.noticeContentNo = null;
            // state.noticeContentObject = null;
            // this.commit('pagenation/resetPageData');
            // this.commit('search/resetSearchKeyword');
        },
        setCurrentView(state, view) {
            state.currentView = view;
        },
        setCategory(state, newCategory) {
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
            state.category = newCategory;
        },
        setListArray(state, listArray) {
            state.listArray = listArray;
        },
        setNoticeContentNo(state, no) {
            state.noticeContentNo = no;
        },
        setNoticeContentObject(state, noticeContentObject) {
            state.noticeContentObject = noticeContentObject;
        },
        resetNoticeContentObject(state) {
            state.noticeContentObject = null;
        }
    },
    actions: {
        axiosNoticeList(context) {
            const url = `/notice/list/${this.state.notice.category}/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('pagenation/setMaximunPosts', 20, { root: true });
                context.commit('setListArray', response.data.responseObject.notice);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'noticeList');
            })
        },
        axiosNoticeContent(context) {
            const url = `/notice/read/${this.state.notice.noticeContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('pagenation/setMaximunPosts', 10, { root: true });
                context.commit('comment/setCommentObject', response.data.responseObject.comment, { root: true });
                context.commit('setNoticeContentObject', response.data.responseObject.notice);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalComments, { root: true });
                context.commit('setCurrentView', 'noticeContent');
            })
        },
        axiosNoticeCommentCreate(context) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const postObject = {
                notice: {
                    no: context.state.noticeContentNo
                },
                comment: {
                    content: this.state.comment.commentContent
                }
            }
            const url = `/notice/comment/create?token=${token}`;

            axios.post(url, postObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosNoticeContent');
                    context.commit('comment/setCommentContent', '', { root: true });
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosNoticeCommentModify(context, commentNo) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;

            const url = `/notice/comment/modify/${commentNo}?token=${token}`;

            const patchObject = {
                notice: {
                    no: context.state.noticeContentNo
                },
                comment: {
                    content: this.state.comment.commentContent
                }
            }

            axios.patch(url, patchObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosNoticeContent');
                    context.commit('comment/setCommentContent', '', { root: true });
                    context.commit('comment/setModifyTarget', null, { root: true });
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosNoticeCommentDelete(context, no) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;

            const url = `/notice/${context.state.noticeContentNo}/comment/remove/${no}?token=${token}`;

            axios.delete(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    context.dispatch('axiosNoticeContent');
                }
            })
        }
    }   
}