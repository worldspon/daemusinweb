<template>
    <section class="notice-board-section">
        <boxComponent type="notice" />
        <boxComponent type="board" />
    </section>
</template>

<script>
import boxComponent from './boxComponent.vue';

export default {
  components: {
    boxComponent
  }
}
</script>

<style scoped>

    .notice-board-section {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    @media (max-width: 1366px) {
        /* Device = Tablets */
        .notice-board-section {
            flex-flow: column;
        }
    }
</style>