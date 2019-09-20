<template>
    <div class="guide">
        <guideHeader />
        <guideList v-if="currentView === 'guideList'" @viewGuideContent="viewGuideContent" @pageClick="pageClick" @searchStart="searchStart" />
        <guideContent v-if="currentView === 'guideContent'" @viewGuideList="viewGuideList" />
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import guideHeader from './guideHeader.vue';
import guideList from './guideList.vue';
import guideContent from './guideContent.vue';

export default {
    components: {
        guideHeader,
        guideList,
        guideContent
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
            'setGuideContentNo'
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
            'axiosGuideContent'
        ]),
        viewGuideContent(contentNo) {
            this.setGuideContentNo(contentNo);
            this.axiosGuideContent();
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