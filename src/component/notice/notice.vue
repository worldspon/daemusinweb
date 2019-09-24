<template>
    <div class="notice">
        <noticeHeader @categoryClick="categoryClick"></noticeHeader>
        <noticeList v-if="currentView === 'noticeList'" @pageClick="pageClick" @searchStart="searchStart" @viewNoticeContent="viewNoticeContent" @viewNoticeForm="viewNoticeForm"></noticeList>
        <noticeContent v-if="currentView === 'noticeContent'" @viewNoticeList="viewNoticeList" @viewNoticeForm="viewNoticeForm" @deleteContent="deleteContent" @createComment="createComment" @modifyComment="modifyComment" @deleteComment="deleteComment" @commentPageClick="commentPageClick"></noticeContent>
        <noticeForm v-if="currentView === 'noticeForm'" @viewNoticeList="viewNoticeList" @writeNotice="writeNotice" @modifyNotice="modifyNotice"/>
    </div>
</template>

<script>
import noticeHeader from './noticeHeader.vue';
import noticeList from './noticeList.vue';
import noticeContent from './noticeContent.vue';
import noticeForm from './noticeForm.vue';
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
    components: {
        noticeHeader,
        noticeList,
        noticeContent,
        noticeForm
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
            'setCurrentView',
            'setNoticeContentNo',
            'setFormType'
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
            'axiosNoticeWrite',
            'axiosNoticeModify',
            'axiosNoticeDelete',
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
        viewNoticeForm(type) {
            this.setFormType(type);
            this.setCurrentView('noticeForm');
        },
        categoryClick(newCategory) {
            this.setCategory(newCategory);
            this.axiosNoticeList();
        },
        writeNotice(writeObject) {
            this.axiosNoticeWrite(writeObject);
        },
        modifyNotice(modifyObject) {
            confirm('정말로 수정하시겠습니까?') ? this.axiosNoticeModify(modifyObject) : '';
        },
        deleteContent() {
            confirm('정말로 삭제하시겠습니까?') ? this.axiosNoticeDelete() : '';
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