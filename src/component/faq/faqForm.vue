<template>
    <div class="faq__form">
        <label for="title">제목</label>
        <input id="title" type="text" placeholder="제목을 입력해주세요" maxlength="200" v-model="title">
        <label for="content">내용</label>
        <textarea id="content" placeholder="내용을 입력해주세요" v-model="content"></textarea>
        <div class="button-box">
            <button @click="viewFaqList">취소</button>
            <button v-if="formType==='create'" @click="writeFaq">작성</button>
            <button v-if="formType==='modify'" @click="modifyFaq">수정</button>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    computed: {
        ...mapState('faq', [
            'formType',
            'faqContentObject'
        ])
    },
    data() {
        return {
            title: '',
            content: ''
        }
    },
    methods: {
        viewFaqList() {
            this.$emit('viewFaqList');
        },
        writeFaq() {
            const writeObject = {
                faq: {
                    faqTitle: this.title,
                    faqContent: this.content
                }
            }
            this.$emit('writeFaq', writeObject);
        },
        modifyFaq() {
            const modifyObject = {
                faq: {
                    faqTitle: this.title,
                    faqContent: this.content
                }
            }

            this.$emit('modifyFaq', modifyObject);
        }
    },
    created() {
        if( this.formType === 'modify' ) {
            this.title = this.faqContentObject.faqTitle;
            this.content = this.faqContentObject.faqContent;
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
    
    .faq__form {
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
