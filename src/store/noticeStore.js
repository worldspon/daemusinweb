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
            state.category = 'all';
            state.currentView = '';
            state.listArray = [];
            state.noticeContentNo = null;
            state.noticeContentObject = null;
            this.commit('pagenation/resetPageData');
            this.commit('search/resetSearchKeyword');
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
            state.noticeContentNo = parseInt(no);
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
            const url = `/api/notice/list/${this.state.notice.category}/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.notice);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'noticeList');
            })
        },
        axiosNoticeContent(context) {
            const url = `/api/notice/read/${this.state.notice.noticeContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setNoticeContentObject', response.data.responseObject.notice);
                context.commit('commentPagenation/setTotalPosts',response.data.responseObject.totalComments, { root: true });
                context.commit('setCurrentView', 'noticeContent');
            })
        },
        axiosCommentList(context) {
            const url = `/api/notice/${this.state.notice.noticeContentNo}/comment/${this.state.commentPagenation.pageNum - 1}`;
        
            axios.get(url).then(response => {
                context.commit('comment/setCommentObject', response.data.responseObject.comment, { root: true });
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
            const url = `/api/notice/comment/create?token=${token}`;

            axios.post(url, postObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosNoticeContent');
                    context.dispatch('axiosCommentList');
                    context.commit('comment/setCommentContent', '', { root: true });
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosNoticeCommentModify(context, commentNo) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;

            const url = `/api/notice/comment/modify/${commentNo}?token=${token}`;

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
                    context.dispatch('axiosCommentList');
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

            const url = `/api/notice/${context.state.noticeContentNo}/comment/remove/${no}?token=${token}`;

            axios.delete(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosNoticeContent');
                    context.dispatch('axiosCommentList');
                } else {
                    alert(response.data.message);
                }
            })
        }
    }   
}