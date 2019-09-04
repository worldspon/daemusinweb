<template>
    <div class="faq__content" v-if="faqObject !== null">
        <div class="title">
            <span>{{faqObject.faqTitle}}</span>
        </div>
        <div class="content">
            {{faqObject.faqContent}}
        </div>
        <div class="button-box">
            <button class="modify-button">수정</button>
            <button class="delete-button">삭제</button>
            <button class="list-button" @click="viewFaqList">목록</button>
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
            faqObject: null
        }
    },
    created() {
        this.axiosList();
    },
    methods: {
        axiosList() {
            const url = `http://211.192.165.100:3030/faq/read/${this.contentNum}`;

            this.$http.get(url).then(response => {
                this.faqObject = response.data.responseObject.faq;
            })
        },
        viewFaqList() {
            this.$emit('viewFaqList');
        }
    },
}
</script>

<style scoped>
    .faq__content {
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
</style>