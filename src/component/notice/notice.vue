<template>
    <div class="notice">
        <noticeHeader></noticeHeader>
        <noticeList v-if="currentView === 'noticeList'"></noticeList>
        <noticeContent v-if="currentView === 'noticeContent'"></noticeContent>
    </div>
</template>

<script>
import noticeHeader from './noticeHeader.vue';
import noticeList from './noticeList.vue';
import noticeContent from './noticeContent.vue';
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    components: {
        noticeHeader,
        noticeList,
        noticeContent
    },
    data() {
        return {
            noticeObject: null,
        }
    },
    computed: {
        ...mapState('notice', ['currentView', 'category'])
    },
    methods: {
        ...mapMutations('notice', [
            'setStateReset',
            'setCurrentView'
        ]),
        ...mapActions('notice', [
            'axiosNoticeList'
        ])
    },
    created() {
        this.setStateReset();
        this.setCurrentView('noticeList');
    }
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