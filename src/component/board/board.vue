<template>
    <div class="board">
        <boardHeader></boardHeader>
        <boardList v-if="currentView === 'boardList'" @pageClick="pageClick" @searchStart="searchStart" @viewBoardContent="viewBoardContent"></boardList>
        <boardContent v-if="currentView === 'boardContent'"></boardContent>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

import boardHeader from './boardHeader.vue';
import boardList from './boardList.vue';
import boardContent from './boardContent.vue';

export default {
    components: {
        boardHeader,
        boardList,
        boardContent
    },
    computed: {
        ...mapState('board', ['currentView']),
        ...mapState('pagenation', ['pageNum']),
        ...mapState('search', ['searchKeyword'])
    },
    methods: {
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
        ...mapMutations('board', [
            'resetState',
            'setBoardContentNo'
        ]),
        ...mapMutations('pagenation', [
            'resetPageData'
        ]),
        ...mapMutations('search', [
            'resetSearchKeyword'
        ]),
        ...mapActions('board', [
            'axiosBoardList',
            'axiosBoardContent'
        ]),
        viewBoardContent(e) {
            const contentNo = e.target.parentNode.dataset.no;
            this.setBoardContentNo(contentNo);
            this.axiosBoardContent();
        },
        pageClick(clickPage) {
            this.axiosBoardList();
        },
        searchStart() {
            this.resetPageData();
            this.axiosBoardList();
        }
    },
    created() {
        this.axiosLoginCheck();
        this.resetState();
        this.axiosBoardList();
    },
}
</script>

<style scoped>
    .board {
        width: 100%;
        max-width: 1660px;
        padding: 0px 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }
</style>