<template>
    <div class="faq">
        <faqHeader></faqHeader>
        <faqList v-if="currentView === 'faqList'" @pageClick="pageClick" @searchStart="searchStart" @viewFaqContent="viewFaqContent" @viewFaqForm="viewFaqForm"></faqList>
        <faqContent v-if="currentView === 'faqContent'" @viewFaqList="viewFaqList" @viewFaqForm="viewFaqForm" @deleteFaq="deleteFaq"></faqContent>
        <faqForm v-if="currentView === 'faqForm'" @viewFaqList="viewFaqList" @writeFaq="writeFaq" @modifyFaq="modifyFaq"/>
    </div>
</template>

<script>
import faqHeader from './faqHeader.vue';
import faqList from './faqList.vue';
import faqContent from './faqContent.vue';
import faqForm from './faqForm.vue';
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    components: {
        faqHeader,
        faqList,
        faqContent,
        faqForm
    },
    computed: {
        ...mapState('faq', ['currentView']),
        ...mapState('pagenation', ['pageNum']),
        ...mapState('search', ['searchKeyword'])
    },
    methods: {
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
        ...mapMutations('faq', [
            'resetState',
            'setFaqContentNo',
            'setFormType',
            'setCurrentView'
        ]),
        ...mapMutations('pagenation', [
            'resetPageData'
        ]),
        ...mapMutations('search', [
            'resetSearchKeyword'
        ]),
        ...mapActions('faq', [
            'axiosFaqList',
            'axiosFaqContent',
            'axiosFaqWrite',
            'axiosFaqModify',
            'axiosFaqDelete'
        ]),
        viewFaqContent(e) {
            const contentNo = e.target.dataset.no;
            this.setFaqContentNo(contentNo);
            this.axiosFaqContent();
        },
        viewFaqList() {
            this.axiosFaqList();
        },
        viewFaqForm(type) {
            this.setFormType(type);
            this.setCurrentView('faqForm');
        },
        writeFaq(writeObject) {
            this.axiosFaqWrite(writeObject);
        },
        modifyFaq(modifyObject) {
            this.axiosFaqModify(modifyObject);
        },
        deleteFaq() {
            confirm('정말로 삭제하시겠습니까?') ? this.axiosFaqDelete() : '';
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
        this.axiosLoginCheck();
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