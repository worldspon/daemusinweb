<template>
    <div class="faq">
        <faqHeader></faqHeader>
        <faqList v-if="currentView === 'faqList'" :propsPageNum="pageNum" :propsSearchKeyword="searchKeyword" @viewFaqContent="viewFaqContent"></faqList>
        <faqContent v-if="currentView === 'faqContent'" :propsContentNum="contentNum" @viewFaqList="viewFaqList"></faqContent>
    </div>
</template>

<script>
import faqHeader from './faqHeader.vue';
import faqList from './faqList.vue';
import faqContent from './faqContent.vue'

export default {
    components: {
        faqHeader,
        faqList,
        faqContent
    },
    data() {
        return {
            currentView: 'faqList',
            pageNum: 1,
            searchKeyword: '',
            contentNum: null
        }
    },
    methods: {
        viewFaqContent(pageData) {
            this.pageNum = pageData.pageNum;
            this.searchKeyword = pageData.searchKeyword;
            this.contentNum = pageData.contentNum;
            this.currentView = 'faqContent'
        },
        viewFaqList() {
            this.currentView = 'faqList';
        }
    },
}
</script>

<style scoped>
    .faq {
        width: 100%;
        max-width: 1660px;
        padding: 0px 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }
</style>