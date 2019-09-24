<template>
    <div class="guide__content">
        <div class="title">
            <span>{{guideContentObject.gameGuideTitle}}</span>
        </div>
        <div class="content">{{guideContentObject.gameGuideContent}}</div>
        <div class="button-box">
            <button class="modify-button" v-if="level" @click="viewGuideForm">수정</button>
            <button class="delete-button" v-if="level" @click="deleteGuide">삭제</button>
            <button class="list-button" @click="viewGuideList">목록</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState('login', [ 'level' ]),
        ...mapState('guide', ['guideContentObject'])
    },
    methods: {
        viewGuideForm() {
            this.$emit('viewGuideForm', 'modify');
        },
        viewGuideList() {
            this.$emit('viewGuideList');
        },
        deleteGuide() {
            this.$emit('deleteGuide');
        }
    }
}
</script>

<style scoped>
    .guide__content {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .title {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 30px;
        align-items: center;
        padding-bottom: 30px;
        border-bottom: 1px solid #aaa;
    }

    .content {
        white-space: pre-wrap;
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

    .delete-button {
        margin-left: 5px;
    }

    .list-button {
        margin-left: auto;
    }
</style>