<template>
    <div class="notice">
        <noticeHeader></noticeHeader>
        <noticeList v-if="currentView === 'noticeList'"></noticeList>
        <!--<noticeContent v-if="currentView === 'noticeContent'" :propsNoticeObject="noticeObject" @historyBack="historyBack"></noticeContent> -->
    </div>
</template>

<script>
import noticeHeader from './noticeHeader.vue';
import noticeList from './noticeList.vue';
import noticeContent from './noticeContent.vue';
import {mapState, mapMutations} from 'vuex'

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
    created() {
        this.setStateReset();
        this.changeCurrentView('noticeList');
    },
    computed: {
        ...mapState('notice', ['currentView'])
    },
    methods: {
        ...mapMutations('notice', {
            setStateReset: 'setStateReset',
            changeCurrentView: 'changeCurrentView'
        }),
        changePage(pageNum) {
            this.pageNum = pageNum
            this.axiosList();
        },
        searchList(searchKeyword) {
            this.searchKeyword = searchKeyword;
            this.pageNum = 1;
            this.axiosList();
        },
        noticeContent(no) {
            this.currentView = 'noticeContent';
            this.noticeObject = null;
            this.axiosContent(no);
        },
        axiosContent(no) {
            const url = `/notice/read/${no}`;
        
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