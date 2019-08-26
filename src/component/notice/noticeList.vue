<template>
    <div class="notice__list">
        <div class="notice__title">
            <div class="notice__title__title">제목</div>
            <span class="notice__title__date">작성일</span>
        </div>
        <div class="notice__row" v-for="(post, index) of listArray" :key="index">
            <div class="notice__headline">
                <span class="notice__preface">{{post.category}} {{'no.' + post.no}}</span>
                <span class="title" @click="noticeContent" :data-no="post.no">{{post.noticeTitle}}</span>
            </div>
            <span class="date">{{post.date}}</span>
        </div>
        <div class="button-box"><button class="write-button">글쓰기</button></div>

        <pagenation @changePage="changePage" :propsTotalContent="20" :propsTotalPosts="totalPosts" :propsNowPage="pageNum"></pagenation>
        <searchComponent @searchList="searchList" :propsSearchKeyword="searchKeyword"></searchComponent>
    </div>
</template>

<script>
import pagenation from '../pagenation.vue';
import searchComponent from '../searchComponent.vue';

export default {
    components: {
        pagenation,
        searchComponent
    },
    props: ['propsListArray', 'propsTotalPosts', 'propsPageNum', 'propsSearchKeyword'],
    data() {
        return {
            listArray: this.propsListArray,
            totalPosts: this.propsTotalPosts,
            pageNum: this.propsPageNum,
            searchKeyword: this.propsSearchKeyword
        }
    },
    methods: {
        noticeContent(e) {
            this.$emit('noticeContent', e.target.dataset.no);
        },
        changePage(pageNum) {
            this.$emit('changePage', pageNum);
        },
        searchList(searchKeyword) {
            this.$emit('searchList', searchKeyword);
        }
    },
    watch: {
        propsListArray() {
            this.listArray = this.propsListArray;
        },
        propsTotalPosts() {
            this.totalPosts = this.propsTotalPosts;
        },
        propsPageNum() {
            this.pageNum = this.propsPageNum;
        },
        propsSearchKeyword() {
            this.searchKeyword = this.propsSearchKeyword;
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