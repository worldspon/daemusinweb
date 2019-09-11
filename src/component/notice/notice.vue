<template>
    <div class="notice">
        <noticeHeader @categoryClick="categoryClick"></noticeHeader>
        <noticeList v-if="currentView === 'noticeList'" @pageClick="pageClick" @searchStart="searchStart" @viewNoticeContent="viewNoticeContent"></noticeList>
        <noticeContent v-if="currentView === 'noticeContent'" @viewNoticeList="viewNoticeList" @createComment="createComment" @modifyComment="modifyComment" @deleteComment="deleteComment"></noticeContent>
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
        ...mapMutations('search', [
            'resetSearchKeyword'
        ]),
        ...mapActions('notice', [
            'axiosNoticeList',
            'axiosNoticeContent',
            'axiosNoticeCommentCreate',
            'axiosNoticeCommentModify',
            'axiosNoticeCommentDelete'
        ]),
        viewNoticeContent(e) {
            const contentNo = e.target.dataset.no;
            this.setNoticeContentNo(contentNo);
            this.axiosNoticeContent();
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
            this.axiosNoticeCommentDelete(no);
        },
        pageClick(clickPage) {
            this.axiosNoticeList();
        },
        searchStart() {
            this.resetPageData();
            this.axiosNoticeList();
        }
    },
    created() {
        this.axiosLoginCheck();
        this.resetState();
        this.axiosNoticeContent();
        // this.axiosNoticeList();
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