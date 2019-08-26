<template>
    <div class="notice__content" v-if="noticeObject !== null">
        <div class="headline">
            <span class="category">[{{noticeObject.category}}]</span>
            <div class="title-box">
                <span class="title">{{noticeObject.noticeTitle}}</span>
            </div>
            <span class="date">{{noticeObject.date}}</span>
        </div>
        <div class="content">
            {{noticeObject.noticeContent}}
        </div>
        <div class="button-box">
            <button class="modify-button">수정</button>
            <button class="delete-button">삭제</button>
            <button class="list-button" @click="historyBack">목록</button>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'propsNoticeObject'
    ],
    data() {
        return {
            noticeObject: null
        }
    },
    methods: {
        historyBack() {
            this.$emit('historyBack');
        }
    },
    watch: {
        propsNoticeObject() {
            this.noticeObject = this.propsNoticeObject;
            const words = this.noticeObject.date.split(' ');
            this.noticeObject.date = words[0];
            this.noticeObject.date += '\n';
            this.noticeObject.date += words[1];
        }
    },
}
</script>

<style scoped>
    .notice__content {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .headline {
        display: flex;
        margin-bottom: 30px;
        align-items: center;
        padding-bottom: 30px;
        border-bottom: 1px solid #aaa;
    }

    .category {
        white-space: nowrap;
        font-size: 1.3rem;
        font-weight: bold;
        color: #aaa;
    }

    .title {
        margin-left: 5px;
        font-size: 1.8rem;
        font-weight: bold;
    }

    .date {
        white-space: pre;
        margin-left: auto;
        text-align: center;
        font-size: 1.5rem;
        color: #aaa;
        font-weight: bold;
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