<template>
    <div class="board">
        <boardHeader></boardHeader>
        <boardList v-if="currentView === 'boardList'" @viewBoardContent="viewBoardContent" :propsPageNum="pageNum" :propsSearchKeyword="searchKeyword"></boardList>
        <boardContent v-if="currentView === 'boardContent'" :propsContentNum="contentNum" @viewBoardList="viewBoardList"></boardContent>
    </div>
</template>

<script>
import boardHeader from './boardHeader.vue';
import boardList from './boardList.vue';
import boardContent from './boardContent.vue';

export default {
    components: {
        boardHeader,
        boardList,
        boardContent
    },
    data() {
        return {
            currentView: 'boardList',
            pageNum: 1,
            searchKeyword: '',
            contentNum: null
        }
    },
    methods: {
        viewBoardContent(pageObject) {
            this.pageNum = pageObject.pageNum;
            this.searchKeyword = pageObject.searchKeyword;
            this.contentNum = pageObject.contentNum;
            this.currentView = 'boardContent';
        },
        viewBoardList() {
            this.currentView = 'boardList';
        }
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