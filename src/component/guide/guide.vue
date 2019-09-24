<template>
    <div class="guide">
        <guideHeader />
        <guideList v-if="currentView === 'guideList'" @viewGuideContent="viewGuideContent" @viewGuideForm="viewGuideForm" @pageClick="pageClick" @searchStart="searchStart" />
        <guideContent v-if="currentView === 'guideContent'" @viewGuideList="viewGuideList" @viewGuideForm="viewGuideForm" @deleteGuide="deleteGuide"/>
        <guideForm v-if="currentView === 'guideForm'" @viewGuideList="viewGuideList" @writeGuide="writeGuide" @modifyGuide="modifyGuide" />
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import guideHeader from './guideHeader.vue';
import guideList from './guideList.vue';
import guideContent from './guideContent.vue';
import guideForm from './guideForm.vue';

export default {
    components: {
        guideHeader,
        guideList,
        guideContent,
        guideForm
    },
    computed: {
        ...mapState('guide', [
            'currentView'
        ])
    },
    methods: {
        ...mapMutations('guide', [
            'resetState',
            'setCurrentView',
            'setGuideContentNo',
            'setFormType'
        ]),
        ...mapMutations('pagenation', [
            'resetPageData'
        ]),
        ...mapMutations('search', [
            'resetSearchKeyword'
        ]),
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
        ...mapActions('guide', [
            'axiosGuideList',
            'axiosGuideContent',
            'axiosGuideWrite',
            'axiosGuideModify',
            'axiosGuideDelete'
        ]),
        viewGuideContent(contentNo) {
            this.setGuideContentNo(contentNo);
            this.axiosGuideContent();
        },
        viewGuideForm(type) {
            this.setFormType(type);
            this.setCurrentView('guideForm');
        },
        pageClick() {
            this.axiosGuideList();
        },
        searchStart() {
            this.resetPageData();
            this.axiosGuideList();
        },
        viewGuideList() {
            this.axiosGuideList();
        },
        writeGuide(writeObject) {
            this.axiosGuideWrite(writeObject);
        },
        modifyGuide(modifyObject) {
            this.axiosGuideModify(modifyObject);
        },
        deleteGuide() {
            confirm('정말로 삭제하시겠습니까?') ? this.axiosGuideDelete() : '';
        }
    },
    created() {
        this.axiosLoginCheck();
        this.resetState();
        this.axiosGuideList();
    },
}
</script>

<style scoped>
    .guide {
        width: 100%;
        max-width: 1660px;
        padding: 0px 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }
</style>