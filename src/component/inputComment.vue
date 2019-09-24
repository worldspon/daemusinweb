<template>
    <div class="comment">
        <div class="comment__user">
            <span>{{userId === '' ? '로그인해주세요' : userId}}</span>
            <span>( {{comment === undefined ? 0 : comment.length}} / 500 )</span>
        </div>
        <textarea class="comment__textarea" placeholder="내용을 입력해주세요." maxlength="500" v-model="comment"></textarea>
        <div class="button-box">
            <button class="comment__button" @click="registerComment">등록</button>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
    props: [
        'type',
        'content'
    ],
    data() {
        return {
            comment: this.content
        }
    },
    computed: {
        ...mapState('comment', ['commentContent']),
        ...mapState('login', ['userId'])
    },
    methods: {
        registerComment() {
            this.replaceWhiteSpace();
            if( this.type === 'register' ) {
                this.$emit('createComment', this.comment);
            } else if( this.type === 'modify' ) {
                this.$emit('modifyComment', this.comment);
            }
        },
        replaceWhiteSpace() {
            this.comment = this.comment.replace(/( +)/g,' ');
            this.comment = this.comment.replace(/(\n{2,})/g,'\n\n');
        }
    },
    watch: {
        commentContent() {
            if( this.commentContent === '' ) {
                this.comment = this.commentContent;
            }
        }
    },
}
</script>

<style scoped>
    .comment {
        margin-top: 10px;
        padding: 15px;
        border: 1px solid #bbb;
    }

    .comment__user {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .comment__textarea {
        width: 100%;
        height: 100px;
        font-size: 1.2rem;
        padding: 0;
        resize: none;
        border: none;
        white-space: normal;
    }

    .button-box {
        text-align: right;
    }

    .comment__button {
        margin-top: 10px;
        font-size: 1.2rem;
        margin-left: auto;
        padding: 5px 8px;
        color:white;
        background-color: #9e7e49;
        border: none;
        border-radius: 3px;
    }
</style>