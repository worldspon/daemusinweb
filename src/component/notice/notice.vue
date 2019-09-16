<template>
    <div class="notice">
        <noticeHeader @categoryClick="categoryClick"></noticeHeader>
        <noticeList v-if="currentView === 'noticeList'" @pageClick="pageClick" @searchStart="searchStart" @viewNoticeContent="viewNoticeContent"></noticeList>
        <noticeContent v-if="currentView === 'noticeContent'" @viewNoticeList="viewNoticeList" @createComment="createComment" @modifyComment="modifyComment" @deleteComment="deleteComment" @commentPageClick="commentPageClick"></noticeContent>
    </div>
</template>

<script>
import noticeHeader from './noticeHeader.vue';
import noticeList from './noticeList.vue';
import noticeContent from './noticeContent.vue';
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
    components: {
        noticeHeader,
        noticeList,
        noticeContent
    },
    computed: {
        ...mapState('notice', ['currentView', 'category']),
        ...mapState('pagenation', ['pageNum']),
        ...mapState('search', ['searchKeyword'])
    },
    methods: {
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
        ...mapMutations('notice', [
            'resetState',
            'setCategory',
            'setNoticeContentNo'
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
        ...mapActions('notice', [
            'axiosNoticeList',
            'axiosNoticeContent',
            'axiosCommentList',
            'axiosNoticeCommentCreate',
            'axiosNoticeCommentModify',
            'axiosNoticeCommentDelete'
        ]),
        viewNoticeContent(e) {
            const contentNo = e.target.dataset.no;
            this.setNoticeContentNo(contentNo);
            this.resetCommentPageData();
            this.axiosNoticeContent();
            this.axiosCommentList();
        },
        viewNoticeList() {
            this.axiosNoticeList();
        },
        categoryClick(newCategory) {
            this.setCategory(newCategory);
            this.axiosNoticeList();
        },
        createComment(comment) {
            this.setCommentContent(comment);
            this.axiosNoticeCommentCreate();
        },
        modifyComment(comment, modifyTarget) {
            this.setCommentContent(comment);
            this.axiosNoticeCommentModify(modifyTarget);
        },
        deleteComment(no) {
            confirm('정말로 삭제하시겠습니까?') ? this.axiosNoticeCommentDelete(no) : '';
        },
        pageClick() {
            this.axiosNoticeList();
        },
        commentPageClick() {
            this.axiosCommentList();
        },
        searchStart() {
            this.resetPageData();
            this.axiosNoticeList();
        }
    },
    created() {
        this.axiosLoginCheck();
        this.resetState();
        this.axiosNoticeList();
    },
}
</script>

<style scoped>
    .notice {
        width: 100%;
        max-width: 1660px;
        padding: 0px 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }
</style>