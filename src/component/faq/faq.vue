<template>
    <div class="faq">
        <faqHeader></faqHeader>
        <faqList v-if="currentView === 'faqList'" @pageClick="pageClick" @searchStart="searchStart" @viewFaqContent="viewFaqContent"></faqList>
        <faqContent v-if="currentView === 'faqContent'"></faqContent>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

import faqHeader from './faqHeader.vue';
import faqList from './faqList.vue';
import faqContent from './faqContent.vue'

export default {
    components: {
        faqHeader,
        faqList,
        faqContent
    },
    computed: {
        ...mapState('faq', ['currentView']),
        ...mapState('pagenation', ['pageNum']),
        ...mapState('search', ['searchKeyword'])
    },
    methods: {
        ...mapMutations('faq', [
            'resetState',
            'setContentNo'
        ]),
        ...mapMutations('pagenation', [
            'resetPageData'
        ]),
        ...mapMutations('search', [
            'resetSearchKeyword'
        ]),
        ...mapActions('faq', [
            'axiosFaqList',
            'axiosFaqContent'
        ]),
        viewFaqContent(e) {
            const contentNo = e.target.dataset.no;
            this.setContentNo(contentNo);
            this.axiosFaqContent();
        },
        categoryClick(newCategory) {
            this.setCategory(newCategory);
            this.axiosFaqList();
        },
        pageClick(clickPage) {
            this.axiosFaqList();
        },
        searchStart() {
            this.resetPageData();
            this.axiosFaqList();
        }
    },
    created() {
        this.resetState();
        this.axiosFaqList();
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