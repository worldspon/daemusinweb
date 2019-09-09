<template>
    <div class="board__content" v-if="boardContentObject !== null">
        <div class="headline">
            <div class="title-box">
                <span class="title">{{boardContentObject.boardTitle}}</span>
            </div>
            <div class="info-box">
                <div>
                    <span>{{boardContentObject.writtenBy}}</span>
                </div>
                <div class="info">
                    <span>조회수 {{boardContentObject.readCount}}</span>
                    <span>댓글</span>
                </div>
            </div>
        </div>
        <div class="content">
            {{boardContentObject.boardContent}}
        </div>
        <div class="button-box">
            <button class="modify-button" v-if="level">수정</button>
            <button class="delete-button" v-if="level">삭제</button>
            <button class="list-button" @click="viewBoardList">목록</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('board', ['boardContentObject']),
        ...mapState('login', ['level'])
    },
    methods: {
        ...mapMutations('board', [
            'setCurrentView'
        ]),
        viewBoardList() {
            this.setCurrentView('boardList');
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