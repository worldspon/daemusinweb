<template>
    <div class="board__form">
        <label for="title">제목</label>
        <input id="title" type="text" placeholder="제목을 입력해주세요" maxlength="200" v-model="title">
        <label for="content">내용</label>
        <textarea id="content" placeholder="내용을 입력해주세요" v-model="content"></textarea>
        <div class="button-box">
            <button @click="viewBoardList">취소</button>
            <button v-if="formType==='create'" @click="writeBoard">작성</button>
            <button v-if="formType==='modify'" @click="modifyBoard">변경</button>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    computed: {
        ...mapState('board', [
            'formType',
            'boardContentObject'
        ])
    },
    data() {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        viewBoardList() {
            this.$emit('viewBoardList');
        },
        writeBoard() {
            const writeObject = {
                board: {
                    boardTitle: this.title,
                    boardContent: this.content
                }
            }
            this.$emit('writeBoard', writeObject);
        },
        modifyBoard() {
            const modifyObject = {
                board: {
                    boardTitle: this.title,
                    boardContent: this.content
                }
            }

            this.$emit('modifyBoard', modifyObject);
        }
    },
    created() {
        if( this.formType === 'modify' ) {
            this.title = this.boardContentObject.boardTitle;
            this.content = this.boardContentObject.boardContent;
        }
    },
}
</script>

<style scoped>
    label {
        font-size: 1.5rem;
        display: block;
        margin-bottom: 5px;
    }
    
    .board__form {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    #title {
        width :100%;
        margin-bottom: 10px;
        padding: 10px;
        font-size: 1.3rem;
    }

    #content {
        width: 100%;
        height: 500px;
        resize: none;
        margin-bottom: 10px;
        padding: 10px;
        font-size: 1.3rem;
    }

    .button-box {
        text-align: right;
    }

    .button-box button {
        font-size: 1.2rem;
        padding: 5px 8px;
        border: none;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }
</style>
