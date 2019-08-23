<template>
    <div class="notice">
        <noticeHeader @changeCategory="changeCategory"></noticeHeader>
        <div :is="currentView" @changePage="changePage" :propsListArray="propsData" :propsTotalPage="totalPosts" :propsPageNum="pageNum"></div>
    </div>
</template>

<script>
import noticeHeader from './noticeHeader.vue';
import noticeList from './noticeList.vue';

export default {
    components: {
        noticeHeader,
        noticeList
    },
    data() {
        return {
            currentView: 'noticeList',
            category: 'all',
            pageNum: 1,
            searchKeyword: '',
            propsData: null,
            totalPosts: null
        }
    },
    created() {
        this.axiosList();
    },
    methods: {
        changePage(pageNum) {
            this.pageNum = pageNum
            this.axiosList();
        },
        changeCategory(category) {
            this.category = category;
            this.pageNum = 1;
            this.searchKeyword = '';
            this.axiosList();
        },
        axiosList() {
            const url = `http://211.192.165.100:3030/notice/list/${this.category}/${this.pageNum - 1}/${this.searchKeyword}`;
        
            this.$http.get(url).then(response => {
                this.totalPosts = response.data.responseObject.totalPosts;
                this.propsData = response.data.responseObject.notice;
            })
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