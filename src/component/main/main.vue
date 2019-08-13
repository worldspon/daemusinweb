<template>
    <section id="main-page-wrap">
        <section class="notice-board-section">
            <noticeBoard type="notice" />
            <noticeBoard type="board" />
        </section>
        <guideQuestion />
        <devPlan />
    </section>
</template>

<script>

import noticeBoard from './noticeBoard.vue';
import guideQuestion from './guideQuestion.vue';
import devPlan from './devPlan.vue';

export default {
  components: {
    noticeBoard,
    guideQuestion,
    devPlan
  }

}
</script>

<style scoped>
    #main-page-wrap {
        max-width: 1600px;
        margin: 0 auto;
    }

    .notice-board-section {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }
</style>

