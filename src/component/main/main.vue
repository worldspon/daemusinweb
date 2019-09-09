<template>
    <section id="main-page-wrap">
        <noticeBoard />
        <guideQuestion />
        <devPlan />
    </section>
</template>

<script>

import noticeBoard from './noticeBoard.vue';
import guideQuestion from './guideQuestion.vue';
import devPlan from './devPlan.vue';
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
  components: {
    noticeBoard,
    guideQuestion,
    devPlan
  },
  methods: {
    ...mapActions('login', [
      'axiosLoginCheck'
    ]),
  },
  created() {
    this.axiosLoginCheck();
  },

}
</script>

<style scoped>
    #main-page-wrap {
        max-width: 1660px;
        padding: 0 35px;
        box-sizing: border-box;
        margin: 0 auto;
    }

</style>

