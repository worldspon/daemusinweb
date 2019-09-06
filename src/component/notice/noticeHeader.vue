<template>
    <div class="notice__header">
        <h1>공지사항</h1>
        <ul v-if="currentView === 'noticeList'" class="notice__category">
            <li :class="{on : category === 'all'}" data-category='all' @click="categoryClick">전체</li>
            <li :class="{on : category === 'notice'}" data-category='notice' @click="categoryClick">공지사항</li>
            <li :class="{on : category === 'update'}" data-category='update' @click="categoryClick">업데이트</li>
            <li :class="{on : category === 'event'}" data-category='event' @click="categoryClick">이벤트</li>
        </ul>
    </div>       
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapState('notice', ['category', 'currentView'])
    },
    methods: {
        categoryClick(e) {
            const newCategory = e.target.dataset.category;
            this.$emit('categoryClick', newCategory);
        }
    }
}
</script>

<style scoped>
    .notice__header {
        display: flex;
        padding: 30px;
        margin-bottom: 20px;
        justify-content: space-between;
        align-items: center;
        box-shadow: 5px 5px 5px rgba(40, 40, 40, .28);
        background-color: white;
    }

    .on {
        font-weight: bold;
    }

    .notice__category {
        display: flex;
        font-size: 1.5rem;
    }

    .notice__category li {
        cursor: pointer;
    }

    .notice__category li:not(:last-child) {
        margin-right: 40px;
    }

    @media (max-width: 768px) {
        .notice__category li:not(:last-child) {
            margin-right: 20px;
        }
    }
</style>