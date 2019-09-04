<template>
    <div class="board__list">
        <div class="headline">
            <div class="headline__title">제목</div>
            <div class="headline__infodata">
                <span class="headline__writer">작성자</span>
                <span class="headline__readcount">조회수</span>
                <span class="headline__date">작성일</span>
            </div>
        </div>
        <div class="board__row" v-for="(post, index) of listArray" :key="index">
            <div class="row__title-box" @click="viewBoardContent" :data-no="post.no">
                <span class="title">{{post.boardTitle}}</span>
                <span class="comment-count">[{{post.commentCount}}]</span>
            </div>
            <div class="row__info">
                <span class="writer">{{post.writtenBy}}</span>
                <span class="read-count">{{post.readCount}}</span>
                <span class="date">{{post.date}}</span>
            </div>
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
    props: [
        'propsPageNum',
        'propsSearchKeyword'
    ],
    components: {
        pagenation,
        searchComponent
    },
    data() {
        return {
            pageNum: this.propsPageNum,
            searchKeyword: this.propsSearchKeyword,
            listArray: null,
            totalPosts: null
        }
    },
    created() {
        this.axiosList();
    },
    methods: {
        axiosList() {
            const url = `http://211.192.165.100:3030/board/list/${this.pageNum - 1}/${encodeURIComponent(this.searchKeyword)}`;
        
            this.$http.get(url).then(response => {
                this.totalPosts = response.data.responseObject.totalPosts;
                this.listArray = response.data.responseObject.board;
            })
        },
        changePage(pageNum) {
            this.pageNum = pageNum;
            this.axiosList();
        },
        searchList(searchKeyword) {
            this.searchKeyword = searchKeyword;
            this.pageNum = 1;
            this.axiosList();
        },
        viewBoardContent(e) {
            const pageData = {
                pageNum: this.pageNum,
                searchKeyword: this.searchKeyword,
                contentNum: e.target.parentNode.dataset.no
            }
            this.$emit('viewBoardContent', pageData);
        }
    },
}
</script>

<style scoped>

    .board__list {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .headline {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 2px solid #aaa;
        font-size: 1.5rem;
        font-weight: bold;
    }
    
    .board__row {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #aaa;
    }

    .row__title-box {
        cursor: pointer;
    }

    .title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .comment-count {
        font-size: 1.2rem;
        font-weight: 400;
        color: #666;
    }

    .headline__writer, .writer {
        box-sizing: border-box;
        display: inline-block;
        margin-left: auto;
        text-align: center;
    }

    .headline__readcount, .read-count{
        display: inline-block;
        box-sizing: border-box;
        width: 80px;
        text-align: center;
    }

    .headline__date, .date{
        box-sizing: border-box;
        display: inline-block;
        width: 80px;
        text-align: center;
    }

    .writer, .read-count, .date {
        font-size: 1.3rem;
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

    @media (max-width: 768px) {
        .headline__infodata {
            display: none;
        }

        .board__row {
            flex-flow: column;
        }

        .writer, .read-count, .date {
            width: auto;
            margin-top: 5px;
        }
    }
</style>