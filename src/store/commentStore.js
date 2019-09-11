import axios from 'axios'

export default {
    namespaced : true,
    state: {
        commentNo: null,
        totalComments: null,
        commentObject: null,
        commentContent: '',
        modifyTarget: null
    },
    mutations: {
        resetComment(state) {
            state.commentNo = null;
            state.totalComments = null;
            state.commentObject = null;
            state.commentContent = '';
        },
        setCommentContent(state, commentContent) {
            state.commentContent = commentContent;
        },
        setCommentObject(state, commentObject) {
            state.commentObject = commentObject;
        },
        setModifyTarget(state, targetNo) {
            state.modifyTarget = targetNo;
        }
    },
    actions: {

    }   
}