<template>
    <div class="notice__list">
        <div class="notice__title">
            <div class="notice__title__title">제목</div>
            <span class="notice__title__date">작성일</span>
        </div>
        <div class="notice__row" v-for="(post, index) of listArray" :key="index">
            <div class="notice__headline">
                <span class="notice__preface">{{post.category}} {{'no.' + post.no}}</span>
                <span class="title">{{post.noticeTitle}}</span>
            </div>
            <span class="date">{{post.date}}</span>
        </div>
        <pagenation @changePage="changePage" :propsTotalContent="20" :propsTotalPosts="totalPosts" :propsNowPage="pageNum"></pagenation>
    </div>
</template>

<script>
import pagenation from '../pagenation.vue';

export default {
    components: {
        pagenation
    },
    props: ['propsListArray', 'propsTotalPage', 'propsPageNum'],
    data() {
        return {
            listArray: this.propsListArray,
            totalPosts: this.propsTotalPage,
            pageNum: this.propsPageNum
        }
    },
    methods: {
        changePage(pageNum) {
            this.$emit('changePage', pageNum);
        }
    },
    watch: {
        propsListArray() {
            this.listArray = this.propsListArray;
        },
        propsTotalPage() {
            this.totalPosts = this.propsTotalPage;
        },
        propsPageNum() {
            this.pageNum = this.propsPageNum;
        }
    },
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

    .date {
        font-size: 1.2rem;
    }
</style>