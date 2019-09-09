<template>
    <div class="faq__list">
        <searchComponent @searchStart="searchStart"></searchComponent>
        <div class="faq__row" v-for="(post, index) of listArray" :key="index">
            <span class="title" :data-no="post.no" @click="viewFaqContent">Q. {{post.faqTitle}}</span>
        </div>
        <div class="button-box" v-if="level">
            <button class="write-button">글쓰기</button>
        </div>
        <pagenation @pageClick="pageClick"></pagenation>
        <div class="inquery-router-box">
            <span>만족스러운 답변을 찾지 못하셨나요? 1:1 문의를 통해 직접 질문하세요.</span>
            <button class="inquery-button"><router-link to="/inquery">1:1 문의</router-link></button>
        </div>
    </div>
</template>

<script>
import searchComponent from '../searchComponent.vue';
import pagenation from '../pagenation.vue';
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    components: {
        searchComponent,
        pagenation
    },
    computed: {
        ...mapState('login', [ 'level' ]),
        ...mapState('faq', ['listArray']),
    },
    methods: {
        viewFaqContent(e) {
            this.$emit('viewFaqContent', e);
        },
        pageClick() {
            this.$emit('pageClick');
        },
        searchStart() {
            this.$emit('searchStart');
        }
    },
}
</script>

<style scoped>

    .faq__list {
        width: 100%;
        padding: 10px 30px;
        background-color: #fff;
    }

    .faq__row {
        display:flex;
        padding: 30px 0;
        border-bottom: 1px solid #aaa;
    }

    .faq__row:nth-child(2) {
        margin-top: 10px;
        border-top: 1px solid #888;
    }

    .title {
        font-size: 1.4rem;
        font-weight: bold;
        cursor: pointer;
    }

    .date {
        font-size: 1.2rem;
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

    .inquery-router-box {
        font-size: 1.2rem;
        text-align: center;
    }

    .inquery-button {
        font-size: 1.2rem;
        margin-left: 5px;
        padding: 3px 6px;
        border: 1px solid #888;
        border-radius: 5px;
        background-color: transparent;
    }

    @media (max-width: 568px) {
        .inquery-router-box {
            display: flex;
            flex-flow: column;
            align-items: center;
        }

        .inquery-button {
            margin-top: 5px;
        }
    }
</style>