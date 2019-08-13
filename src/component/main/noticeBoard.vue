<template>
    <div :class="type + '-box'">
        <div :class="type + '-box__title'">
            <h1>{{type === 'notice' ? '공지사항' : '게시판'}}</h1>
            <router-link :to="'/' + type">더보기</router-link>
        </div>
        <div :class="type + '-box__content'">
            <div v-for="(items, index) in resultData" :key="index" :class="type + '-box__content__row'">
                <router-link :to="'/' + type">{{items.noticeTitle}}</router-link>
                <span class="date-span">{{items.date}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        type: String
    },
    data() {
        return {
            resultData : []
        }
    },
    created() {
        const url = `http://211.192.165.100:3030/notice/list/all`;
        
        axios.get(url).then(response => {
            this.resultData = response.data.responseObject.notice.slice(0,5);
        })
    },
}
</script>

<style scoped>

    a {
        font-size: 1.2rem;
    }

    .date-span {
        margin-left: 20px;
    }

    .notice-box, .board-box {
        width: 49.0625%;
        padding: 50px 35px; 
        box-sizing: border-box;
        background-color: #fff;
    }

    .notice-box__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 30px;
        border-bottom: 1px solid #d4d4d4;
    }

    .notice-box__content {
        padding-top: 30px;
    }

    .notice-box__content__row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: #888;
    }

    .notice-box__content__row > a {
        font-size: 1.5rem;
        color: #555;
        font-weight: bold;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

    .notice-box__content__row:not(:last-child) {
        margin-bottom: 30px; 
    }

    .board-box__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 30px;
        border-bottom: 1px solid #d4d4d4;
    }

    .board-box__content {
        padding-top: 30px;
    }

    .board-box__content__row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
        font-weight: bold;
        color: #888;
    }

    .board-box__content__row > a {
        font-size: 1.5rem;
        color: #555;
        font-weight: bold;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
    }

    .board-box__content__row:not(:last-child) {
        margin-bottom: 30px; 
    }
</style>