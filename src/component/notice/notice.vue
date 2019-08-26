<template>
    <div class="notice">
        <noticeHeader :propsCurrentView="currentView" @changeCategory="changeCategory"></noticeHeader>
        <noticeList v-if="currentView === 'noticeList'" @noticeContent="noticeContent" @changePage="changePage" @searchList="searchList" :propsSearchKeyword="searchKeyword" :propsListArray="listArray" :propsTotalPosts="totalPosts" :propsPageNum="pageNum"></noticeList>
        <noticeContent v-if="currentView === 'noticeContent'" :propsNoticeObject="noticeObject" @historyBack="historyBack"></noticeContent>
    </div>
</template>

<script>
import noticeHeader from './noticeHeader.vue';
import noticeList from './noticeList.vue';
import noticeContent from './noticeContent.vue';

export default {
    components: {
        noticeHeader,
        noticeList,
        noticeContent
    },
    data() {
        return {
            currentView: 'noticeList',
            category: 'all',
            pageNum: 1,
            searchKeyword: '',
            listArray: null,
            totalPosts: null,
            noticeObject: null
        }
    },
    created() {
        this.axiosList();
        // this.axiosContent(152)
    },
    methods: {
        changePage(pageNum) {
            this.pageNum = pageNum
            this.axiosList();
        },
        searchList(searchKeyword) {
            this.searchKeyword = searchKeyword;
            this.pageNum = 1;
            this.axiosList();
        },
        changeCategory(category) {
            this.category = category;
            this.pageNum = 1;
            this.searchKeyword = '';
            this.axiosList();
        },
        noticeContent(no) {
            this.currentView = 'noticeContent';
            this.noticeObject = null;
            this.axiosContent(no);
        },
        axiosList() {
            const url = `http://211.192.165.100:3030/notice/list/${this.category}/${this.pageNum - 1}/${encodeURI(this.searchKeyword)}`;
        
            this.$http.get(url).then(response => {
                this.totalPosts = response.data.responseObject.totalPosts;
                this.listArray = response.data.responseObject.notice;
            })
        },
        axiosContent(no) {
            const url = `http://211.192.165.100:3030/notice/read/${no}`;
        
            this.$http.get(url).then(response => {
                this.noticeObject = response.data.responseObject.notice;
            })
        },
        historyBack() {
            this.currentView = 'noticeList';
            this.axiosList();
        }
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