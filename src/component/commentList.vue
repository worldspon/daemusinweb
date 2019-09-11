<template>
    <div class="list-box">
        <div class="list" v-for="(comment, index) in commentObject" :key="index" ref="list">
            <div class="comment-info">
                <span class="comment-id">{{comment.writtenBy}}</span>
                <div class="button-box" v-if="userId === comment.writtenBy">
                    <button v-if="modifyTarget === comment.no" class="comment-modify" :data-no="comment.no">확인</button>
                    <button v-if="modifyTarget === comment.no" class="comment-modify" @click="endModify">취소</button>
                    <button v-if="modifyTarget !== comment.no" class="comment-modify" :data-no="comment.no" @click="startModify">수정</button>
                    <button class="comment-delete" :data-no="comment.no" @click="deleteComment">삭제</button>
                </div>
            </div>
            <span class="comment-date">({{comment.date}})</span>
            <p class="comment-content">{{comment.comment}}</p>
            <inputComment v-if="modifyTarget === comment.no" type="modify" @modifyComment="modifyComment"/>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import inputComment from './inputComment.vue';

export default {
    components: {
        inputComment
    },
    computed: {
        ...mapState('comment', [
            'commentObject',
            'modifyTarget'
        ]),
        ...mapState('login', ['userId'])
    },
    methods: {
        ...mapMutations('comment', [
            'setModifyTarget'
        ]),
        ...mapActions('notice', [
            'axiosCommentDelete'
        ]),
        startModify(e) {
            this.setModifyTarget(e.target.dataset.no);
        },
        endModify() {
            this.setModifyTarget(null);
        },
        modifyComment(comment) {
            this.$emit('modifyComment', comment, this.modifyTarget);
        },
        deleteComment(e) {
            this.$emit('deleteComment', e.target.dataset.no);
        }
    }
}
</script>

<style scoped>
    .list-box {
        margin-top: 20px;
    }

    .list {
        border-top: 1px solid #bbb;
        padding: 20px 15px;
    }

    .list-box .list:last-child {
        border-bottom: 1px solid #bbb;
    }

    .comment-info {
        display: flex;
    }

    .button-box {
        display: flex;
        margin-left: auto;
    }

    .button-box button {
        font-size: 0.8rem;
        padding: 5px 8px;
        color:white;
        background-color: #9e7e49;
        border: none;
        border-radius: 3px;
    }

    .button-box button:not(:first-child) {
        margin-left: 5px;
    }

    .comment-id {
        display: block;
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .comment-date {
        display: block;
        font-size: 1rem;
        margin-bottom: 10px;
    }

    .comment-content {
        white-space:pre-wrap;
        word-break: break-all;
        font-size: 1.2rem;
    }
</style>