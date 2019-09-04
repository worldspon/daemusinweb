<template>
    <div class="board__content" v-if="boardObject !== null">
        <div class="headline">
            <div class="title-box">
                <span class="title">{{boardObject.boardTitle}}</span>
            </div>
            <div class="info-box">
                <div>
                    <span>{{boardObject.writtenBy}}</span>
                </div>
                <div class="info">
                    <span>조회수 {{boardObject.readCount}}</span>
                    <span>댓글 {{totalComments}}</span>
                </div>
            </div>
        </div>
        <div class="content">
            {{boardObject.boardContent}}
        </div>
        <div class="button-box">
            <button class="modify-button">수정</button>
            <button class="delete-button">삭제</button>
            <button class="list-button" @click="viewBoardList">목록</button>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'propsContentNum'
    ],
    data() {
        return {
            contentNum: this.propsContentNum,
            boardObject: null,
            commentObject: null,
            totalComments: null
        }
    },
    created() {
        this.axiosList();
    },
    methods: {
        axiosList() {
            const url = `http://211.192.165.100:3030/board/read/${this.contentNum}`;

            this.$http.get(url).then(response => {
                this.boardObject = response.data.responseObject.board;
                this.commentObject = response.data.responseObject.comment;
                this.totalComments = response.data.responseObject.totalComments;
            })
        },
        viewBoardList() {
            console.log('a');
            this.$emit('viewBoardList');
        }
    }
}
</script>

<style scoped>
    .board__content {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .headline {
        display: flex;
        margin-bottom: 30px;
        align-items: center;
        padding-bottom: 30px;
        border-bottom: 1px solid #aaa;
    }

    .title {
        font-size: 1.8rem;
        font-weight: bold;
    }

    .info-box {
        margin-left: auto;
        text-align: right;
        font-size: 1.3rem;
    }

    .info {
        margin-top: 5px;
    }

    .date {
        white-space: pre;
        margin-left: auto;
        text-align: center;
        font-size: 1.5rem;
        color: #aaa;
        font-weight: bold;
    }

    .content {
        white-space: pre-line;
        font-size: 1.5rem;
        margin-bottom: 10px;
        padding-bottom: 150px;
        border-bottom: 1px solid #aaa;
    }

    .button-box {
        display: flex;
    }

    .button-box > button {
        font-size: 1.2rem;
        padding: 5px 8px;
        border: none;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }

    .modify-button {

    }

    .delete-button {
        margin-left: 5px;
    }

    .list-button {
        margin-left: auto;
    }

    @media (max-width: 1112px) {
        .headline {
            flex-flow:column;
            align-items: flex-start;
        }

        .info-box {
            margin: 10px 0 0 0;
            display: flex;
        }

        .info {
            margin: 0 0 0 5px;
        }
    }
</style>