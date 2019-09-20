<template>
    <div class="guide__list">
        <div v-for="(post, index) in guideList" :key="index" class="guide__row">
            <span @click="viewGuideContent" :data-no="post.no">{{post.no}}. {{post.gameGuideTitle}}</span>
        </div>
        <pagenation @pageClick="pageClick"></pagenation>
        <searchComponent @searchStart="searchStart"></searchComponent>
    </div>
</template>

<script>
import pagenation from '../pagenation.vue';
import searchComponent from '../searchComponent.vue';
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    components: {
        searchComponent,
        pagenation
    },
    computed: {
        ...mapState('guide', [
            'guideList'
        ])
    },
    methods: {
        pageClick() {
            this.$emit('pageClick');
        },
        searchStart() {
            this.$emit('searchStart');
        },
        viewGuideContent(e) {
            this.$emit('viewGuideContent', e.target.dataset.no);
        }
    },
}
</script>

<style scoped>
    .guide__list {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .guide__row {
        font-size: 1.4rem;
        padding: 20px 0;
        border-bottom: 1px solid #aaa;
    }

    .guide__row:first-child {
        border-top: 1px solid #aaa;
    }

    span {
        font-weight: bold;
        cursor: pointer;
    }
</style>