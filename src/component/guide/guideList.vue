<template>
    <div class="guide__list">
        <div v-for="(post, index) in guideList" :key="index" class="guide__row">
            <span @click="viewGuideContent" :data-no="post.id">{{post.no}}. {{post.gameGuideTitle}}</span>
        </div>
        <div class="button-box" v-if="level">
            <button class="write-button" @click="viewGuideForm">글쓰기</button>
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
        ...mapState('login', [ 'level' ]),
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
        },
        viewGuideForm() {
            this.$emit('viewGuideForm', 'create');
        },
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

    .button-box {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .write-button {
        font-size: 1.5rem;
        padding: 5px 8px;
        border: none;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }
</style>