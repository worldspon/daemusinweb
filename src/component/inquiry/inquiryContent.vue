<template>
    <div class="inquiry__content">
        <div class="info">
            <div class="title-writer">
                <span class="title">{{inquiryContentObject.question.questionTitle}}</span>
                <span class="device">{{inquiryContentObject.question.deviceType}}</span>
            </div>
            <div class="device-date">
                <span class="writer">{{inquiryContentObject.question.writtenBy}}</span>
                <span class="date">{{inquiryContentObject.question.date}}</span>
            </div>
        </div>
        <div class="inquiry">
            <span class="type-title">문의</span>
            <div class="inquiry-user">{{inquiryContentObject.question.questionContent}}</div>
        </div>
        <inquiryAnswer v-if="inquiryContentObject.answer === undefined && level" @answerRegister="answerRegister" type="answer" :content="''" />
        <div v-if="inquiryContentObject.answer !== undefined" class="answer">
            <span class="type-title">답변<span class="answer-date">{{inquiryContentObject.answer.date}}</span></span>
            <div class="inquiry-user">{{inquiryContentObject.answer.answerContent}}</div>
            <inquiryAnswer v-if="modify" type="modify" :content="inquiryContentObject.answer.answerContent" :answerNo="inquiryContentObject.answer.no" @answerModify="answerModify" />
        </div>
        <div class="button-box">
            <button v-if="inquiryContentObject.answer !== undefined && level && !modify" @click="changeModify">수정</button>
            <button v-if="modify" @click="changeModify">취소</button>
            <button v-if="inquiryContentObject.answer !== undefined && level" @click="answerDelete" :data-no="inquiryContentObject.answer.no">삭제</button>
            <button @click="viewInquiryList">목록</button>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import inquiryAnswer from './inquiryAnswer.vue';

export default {
    data() {
        return {
            modify: false
        }
    },
    components: {
        inquiryAnswer
    },
    computed: {
        ...mapState('login', [
            'level'
        ]),
        ...mapState('inquiry', [
            'inquiryContentObject'
        ])
    },
    methods: {
        answerRegister(answerContent) {
            this.$emit('answerRegister', answerContent);
        },
        answerDelete(e) {
            this.$emit('answerDelete', e.target.dataset.no)
        },
        answerModify(patchObject) {
            this.modify = false;
            this.$emit('answerModify', patchObject);
        },
        viewInquiryList() {
            this.$emit('viewInquiryList');
        },
        changeModify() {
            this.modify = !this.modify;
        }
    },
}
</script>

<style scoped>
    .inquiry__content {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid #aaa;
    }

    .device-date {
        text-align: right;
    }

    .title-writer span, .device-date span  {
        display: block;
    }

    .title {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .title, .writer {
        margin-bottom: 5px;
    }

    .writer, .device, .date {
        font-size: 1.2rem;
    }

    .type-title {
        display: block;
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 10px;
    }

    .inquiry {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #aaa;
    }

    .inquiry-user {
        font-size: 1.4rem;
    }

    .answer {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #aaa;
    }

    .answer-date {
        font-size: 1.3rem;
        font-weight: normal;
        float: right;
    }

    .button-box {
        text-align: right;
    }

    .button-box > button {
        font-size: 1.2rem;
        padding: 5px 8px;
        border: none;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }
</style>