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
            state.boardContentNo = parseInt(no);
        },
        setBoardContentObject(state, boardContentObject) {
            state.boardContentObject = boardContentObject;
        }
    },
    actions: {
        axiosBoardList(context) {
            const url = `/board/list/${this.state.pagenation.pageNum - 1}/${encodeURI(this.state.search.searchKeyword)}`;
        
            axios.get(url).then(response => {
                context.commit('setListArray', response.data.responseObject.board);
                context.commit('pagenation/setTotalPosts',response.data.responseObject.totalPosts, { root: true });
                context.commit('setCurrentView', 'boardList');
            })
        },
        axiosBoardContent(context) {
            const url = `/board/read/${this.state.board.boardContentNo}`;
        
            axios.get(url).then(response => {
                context.commit('setBoardContentObject', response.data.responseObject.board);
                context.commit('commentPagenation/setTotalPosts',response.data.responseObject.totalComments, { root: true });
                context.commit('setCurrentView', 'boardContent');
            })
        },
        axiosCommentList(context) {
            const url = `/board/read/${this.state.board.boardContentNo}/comment/${this.state.commentPagenation.pageNum - 1}`;
        
            axios.get(url).then(response => {
                context.commit('comment/setCommentObject', response.data.responseObject.comment, { root: true });
            })
        },
        axiosBoardCommentCreate(context) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;
            if( token === '' ) {
                alert('로그인 후 이용해주세요');
                return ;
            }

            const postObject = {
                board: {
                    no: context.state.boardContentNo
                },
                comment: {
                    content: this.state.comment.commentContent
                }
            }
            const url = `/board/comment/create?token=${token}`;

            axios.post(url, postObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosBoardContent');
                    context.dispatch('axiosCommentList');
                    context.commit('comment/setCommentContent', '', { root: true });
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosBoardCommentModify(context, commentNo) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;

            const url = `/board/comment/modify/${commentNo}?token=${token}`;

            const patchObject = {
                board: {
                    no: context.state.boardContentNo
                },
                comment: {
                    content: this.state.comment.commentContent
                }
            }

            axios.patch(url, patchObject).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosBoardContent');
                    context.dispatch('axiosCommentList');
                    context.commit('comment/setCommentContent', '', { root: true });
                    context.commit('comment/setModifyTarget', null, { root: true });
                }else {
                    alert(response.data.message);
                }
            })
        },
        axiosBoardCommentDelete(context, no) {
            context.commit('login/setToken', '', { root: true });
            const token = this.state.login.token;

            const url = `/board/${context.state.boardContentNo}/comment/remove/${no}?token=${token}`;

            axios.delete(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    alert(response.data.message);
                    context.dispatch('axiosBoardContent');
                    context.dispatch('axiosCommentList');
                } else {
                    alert(response.data.message);
                }
            })
        }
    }   
}