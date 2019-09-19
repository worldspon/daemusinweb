<template>
    <div class="inquiry__register">
        <div class="input-wrap">
            <label for="phone">휴대폰기종</label>
            <input id="phone" type="text" v-model="phone" maxlength="20">
        </div>

        <div class="input-wrap">
            <label for="title">제목</label>
            <input id="title" type="text" v-model="title" maxlength="200">
        </div>

        <div class="input-wrap">
            <label for="content">내용</label>
            <textarea id="content" v-model="content"></textarea>
        </div>

        <div class="button-box">
            <button @click="viewInquiryList">내문의보기</button>
            <button @click="registerInquiry">문의하기</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            phone: '',
            title: '',
            content: ''
        }
    },
    methods: {
        registerInquiry() {
            const inquiryObject = {
                contact: {
                    question: {
                        deviceType	: this.phone,
                        questionTitle	: this.title,
                        questionContent	: this.content
                    }
	            }
            }
            this.$emit('registerInquiry', inquiryObject);
        },
        viewInquiryList() {
            this.$emit('viewInquiryList');
        }
    }
}
</script>

<style scoped>
    .inquiry__register {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .input-wrap {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

    }

    .input-wrap:not(:last-of-type) {
        margin-bottom: 20px;
    }

    label {
        font-size: 1.5rem;
    }

    #phone, #title, #content {
        width: 90%;
        padding: 10px;
        font-size: 1.3rem;
        box-sizing: border-box;
    }

    #content {
        height: 300px;
        resize: none;
    }

    .button-box {
        display: flex;
        justify-content: space-between;
    }

    .button-box button {
        font-size: 1.2rem;
        padding: 5px 8px;
        border: none;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }

    @media (max-width: 834px) {
        .input-wrap {
            flex-flow: column;
            align-items: flex-start;
        }

        label {
            margin-bottom: 10px;
        }

        #phone, #title, #content {
            width: 100%;
        }
    }
</style>