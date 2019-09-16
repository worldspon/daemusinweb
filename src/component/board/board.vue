<template>
    <div class="board">
        <boardHeader></boardHeader>
        <boardList v-if="currentView === 'boardList'" @pageClick="pageClick" @searchStart="searchStart" @viewBoardContent="viewBoardContent" @viewBoardForm="viewBoardForm"></boardList>
        <boardContent v-if="currentView === 'boardContent'" @viewBoardList="viewBoardList" @createComment="createComment" @modifyComment="modifyComment" @deleteComment="deleteComment" @commentPageClick="commentPageClick"></boardContent>
        <boardForm v-if="currentView === 'boardForm'"/>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import boardHeader from './boardHeader.vue';
import boardList from './boardList.vue';
import boardContent from './boardContent.vue';
import boardForm from './boardForm.vue';

export default {
    components: {
        boardHeader,
        boardList,
        boardContent,
        boardForm
    },
    computed: {
        ...mapState('board', ['currentView']),
        ...mapState('pagenation', ['pageNum']),
        ...mapState('search', ['searchKeyword'])
    },
    methods: {
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
        ...mapMutations('board', [
            'resetState',
            'setBoardContentNo',
            'setCurrentView'
        ]),
        ...mapMutations('comment', [
            'setCommentContent'
        ]),
        ...mapMutations('pagenation', [
            'resetPageData'
        ]),
        ...mapMutations('commentPagenation', [
            'resetCommentPageData'
        ]),
        ...mapMutations('search', [
            'resetSearchKeyword'
        ]),
        ...mapActions('board', [
            'axiosBoardList',
            'axiosBoardContent',
            'axiosCommentList',
            'axiosBoardContent',
            'axiosBoardCommentCreate',
            'axiosBoardCommentModify',
            'axiosBoardCommentDelete'
        ]),
        viewBoardContent(e) {
            const contentNo = e.target.parentNode.dataset.no;
            this.setBoardContentNo(contentNo);
            this.resetCommentPageData();
            this.axiosBoardContent();
            this.axiosCommentList();
        },
        viewBoardList() {
            this.axiosBoardList();
        },
        pageClick(clickPage) {
            this.axiosBoardList();
        },
        commentPageClick() {
            this.axiosCommentList();
        },
        createComment(comment) {
            this.setCommentContent(comment);
            this.axiosBoardCommentCreate();
        },
        modifyComment(comment, modifyTarget) {
            this.setCommentContent(comment);
            this.axiosBoardCommentModify(modifyTarget);
        },
        deleteComment(no) {
            confirm('정말로 삭제하시겠습니까?') ? this.axiosBoardCommentDelete(no) : '';
        },
        searchStart() {
            this.resetPageData();
            this.axiosBoardList();
        },
        viewBoardForm() {
            this.setCurrentView('boardForm');
        }
    },
    created() {
        this.axiosLoginCheck();
        this.resetState();
        // this.axiosBoardContent();
        // this.axiosCommentList();
        this.axiosBoardList();
    },
}
</script>

<style scoped>
    .board {
        width: 100%;
        max-width: 1660px;
        padding: 0px 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }
</style>