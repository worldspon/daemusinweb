<template>
    <div class="notice__list">
        <div class="notice__title">
            <div class="notice__title__title">제목</div>
            <span class="notice__title__date">작성일</span>
        </div>
        <div class="notice__row" v-for="(post, index) of listArray" :key="index">
            <div class="notice__headline">
                <span class="notice__preface">{{post.category}} {{'no.' + post.no}}</span>
                <span class="title" @click="viewNoticeContent" :data-no="post.no">{{post.noticeTitle}} <span class="comment-count">[{{post.commentCount}}]</span></span>
            </div>
            <span class="date">{{post.date}}</span>
        </div>
        <div class="button-box" v-if="level"><button class="write-button">글쓰기</button></div>

        <pagenation @pageClick="pageClick"></pagenation>
        <searchComponent @searchStart="searchStart"></searchComponent>
    </div>
</template>

<script>
import pagenation from '../pagenation.vue';
import searchComponent from '../searchComponent.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        pagenation,
        searchComponent
    },
    computed: {
        ...mapState('login', [ 'level' ]),
        ...mapState('notice', ['category', 'listArray']),
    },
    methods: {
        viewNoticeContent(e) {
            this.$emit('viewNoticeContent', e);
        },
        pageClick() {
            this.$emit('pageClick');
        },
        searchStart() {
            this.$emit('searchStart');
        }
    }
}
</script>

<style scoped>

    .notice__list {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .notice__title {
        display: flex;
        padding-bottom: 10px;
        border-bottom: 2px solid #aaa;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .notice__title__title {
        width: 85%;
        text-align: center;
    }

    .notice__title__date {
        margin-left: auto;
        padding-right: 10px;
    }

    .notice__row {
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #aaa;
    }

    .notice__headline {
        display:flex;
        flex-flow: column;
    }

    .notice__preface {
        margin-bottom: 5px;
    }

    .title {
        font-size: 1.4rem;
        font-weight: bold;
        cursor: pointer;
    }

    .comment-count {
        font-size: 1.2rem;
        font-weight: 400;
        color: #666;
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
</style>