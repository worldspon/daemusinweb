<template>
    <div class="notice__form">
        <label for="category">분류</label>
        <select id="category" v-model="selected">
            <option value="공지사항">공지사항</option>
            <option value="이벤트">이벤트</option>
            <option value="업데이트">업데이트</option>
        </select>
        <label for="title">제목</label>
        <input id="title" type="text" placeholder="제목을 입력해주세요" maxlength="200" v-model="title">
        <label for="content">내용</label>
        <textarea id="content" placeholder="내용을 입력해주세요" v-model="content"></textarea>
        <div class="button-box">
            <button @click="viewNoticeList">취소</button>
            <button v-if="formType==='create'" @click="writeNotice">작성</button>
            <button v-if="formType==='modify'" @click="modifyNotice">수정</button>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    computed: {
        ...mapState('notice', [
            'formType',
            'noticeContentObject'
        ])
    },
    data() {
        return {
            title: '',
            content: '',
            selected: ''
        }
    },
    methods: {
        viewNoticeList() {
            this.$emit('viewNoticeList');
        },
        writeNotice() {
            const writeObject = {
                notice: {
                    category: this.selected,
                    noticeTitle: this.title,
                    noticeContent: this.content
                }
            }
            this.$emit('writeNotice', writeObject);
        },
        modifyNotice() {
            const modifyObject = {
                notice: {
                    category: this.selected,
                    noticeTitle: this.title,
                    noticeContent: this.content
                }
            }

            this.$emit('modifyNotice', modifyObject);
        }
    },
    created() {
        if( this.formType === 'modify' ) {
            this.title = this.noticeContentObject.noticeTitle;
            this.content = this.noticeContentObject.noticeContent;
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
    
    .notice__form {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    #category {
        margin-bottom: 10px;
        font-size: 1.3rem;
        padding: 3px;
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
