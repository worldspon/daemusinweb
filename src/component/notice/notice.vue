<template>
    <div class="notice">
        <noticeHeader @categoryClick="categoryClick"></noticeHeader>
        <noticeList v-if="currentView === 'noticeList'" @pageClick="pageClick" @searchStart="searchStart" @viewNoticeContent="viewNoticeContent"></noticeList>
        <noticeContent v-if="currentView === 'noticeContent'"></noticeContent>
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
        ...mapMutations('notice', [
            'resetState',
            'setCategory',
            'setContentNo'
        ]),
        ...mapMutations('pagenation', [
            'resetPageData'
        ]),
        ...mapMutations('search', [
            'resetSearchKeyword'
        ]),
        ...mapActions('notice', [
            'axiosNoticeList',
            'axiosNoticeContent'
        ]),
        viewNoticeContent(e) {
            const contentNo = e.target.dataset.no;
            this.setContentNo(contentNo);
            this.axiosNoticeContent();
        },
        categoryClick(newCategory) {
            this.setCategory(newCategory);
            this.axiosNoticeList();
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