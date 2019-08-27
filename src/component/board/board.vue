<template>
    <div class="board">
        <boardHeader></boardHeader>
        <boardList></boardList>
    </div>
</template>

<script>
import boardHeader from './boardHeader.vue';
import boardList from './boardList.vue';

export default {
    components: {
        boardHeader,
        boardList
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