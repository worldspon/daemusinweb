<template>
    <div class="inquiry">
        <inquiryHeader />
        <inquiryRegister v-if="currentView === 'inquiryRegister'" @registerInquiry="registerInquiry" @viewInquiryList="viewInquiryList" />
        <inquiryList v-if="currentView === 'inquiryList'" @viewInquiryContent="viewInquiryContent" @viewInquiryRegister="viewInquiryRegister" @pageClick="pageClick" @searchStart="searchStart" />
        <inquiryContent v-if="currentView === 'inquiryContent'" @answerRegister="answerRegister" @answerModify="answerModify" @viewInquiryList="viewInquiryList" @answerDelete="answerDelete" />
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import inquiryHeader from './inquiryHeader.vue';
import inquiryRegister from './inquiryRegister.vue';
import inquiryList from './inquiryList.vue';
import inquiryContent from './inquiryContent.vue';

export default {
    components: {
        inquiryHeader,
        inquiryRegister,
        inquiryList,
        inquiryContent
    },
    computed: {
        ...mapState('login', [
            'level'
        ]),
        ...mapState('inquiry', [
            'currentView'
        ])
    },
    methods: {
        ...mapMutations('inquiry', [
            'resetState',
            'setCurrentView',
            'setInquiryContentNo'
        ]),
        ...mapMutations('pagenation', [
            'resetPageData'
        ]),
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
        ...mapActions('inquiry', [
            'axiosInquiryRegister',
            'axiosInquiryList',
            'axiosInquiryContent',
            'axiosAnswerRegister',
            'axiosAnswerModify',
            'axiosAnswerDelete'
        ]),
        registerInquiry(inquiryObject) {
            this.axiosInquiryRegister(inquiryObject);
        },
        viewInquiryList() {
            this.axiosInquiryList();
        },
        viewInquiryContent(e) {
            const contentNo = e.target.parentNode.dataset.no;
            this.setInquiryContentNo(contentNo);
            this.axiosInquiryContent();
        },
        viewInquiryRegister() {
            this.setCurrentView('inquiryRegister');
            this.resetState();
        },
        pageClick() {
            this.axiosInquiryList();
        },
        searchStart() {
            this.resetPageData();
            this.axiosInquiryList();
        },
        answerRegister(answerContent) {
            this.axiosAnswerRegister(answerContent)
        },
        answerModify(patchObject) {
            this.axiosAnswerModify(patchObject)
        },
        answerDelete(no) {
            if( confirm('정말로 삭제하시겠습니까?') ) {
                this.axiosAnswerDelete(no);
            }
        }
    },
    created() {
        this.resetState();
        if( this.level ) {
            this.axiosInquiryList();
        }

    },
}
</script>

<style scoped>
    .inquiry {
        width: 100%;
        max-width: 1660px;
        padding: 0px 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }
</style>
