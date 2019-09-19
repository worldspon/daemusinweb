<template>
    <div class="answer">
        <span>답변하기</span>
        <textarea v-model="answerContent"></textarea>
        <div class="button-box">
            <button @click="answer">답변등록</button>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    props: [
        'type',
        'content',
        'answerNo'
    ],
    data() {
        return {
            answerContent: this.content
        }
    },
    computed: {
        ...mapState('inquiry', [
            'inquiryContentNo'
        ])
    },
    methods: {
        answer() {
            if( this.type === 'answer' ) {
                this.$emit('answerRegister', this.answerContent);
            } else if( this.type === 'modify' ) {
                const patchObject = {
                    content: this.answerContent,
                    no: this.answerNo
                }
                this.$emit('answerModify', patchObject);
            }
        }
    }
}
</script>

<style scoped>
    .answer {
        width: 100%;
        margin-top: 20px;
    }
    span {
        display: block;
        font-weight: bold;
        margin-bottom: 10px;
        font-size: 1.5rem;
    }

    textarea {
        width: 100%;
        height: 500px;
        font-size: 1.4rem;
        padding: 10px;
        margin-bottom: 10px;
        box-sizing: border-box;
        resize: none;
    }

    .button-box {
        text-align: right;
    }

    button {
        font-size: 1.2rem;
        padding: 5px 8px;
        border: none;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }
</style>