<template>
    <div class="inquiry__list">
        <div class="headline">
            <div class="headline__title">제목</div>
            <div class="headline__infodata">
                <span class="headline__writer">작성자</span>
                <span class="headline__date">작성일</span>
                <span class="headline__answer">답변여부</span>
            </div>
        </div>
        <div class="inquiry__row" v-for="(inquiry, index) of inquiryList" :key="index">
            <div class="row__title-box" @click="viewInquiryContent" :data-no="inquiry.no">
                <span class="title">{{inquiry.questionTitle}}</span>
            </div>
            <div class="row__info">
                <span class="writer">{{inquiry.writtenBy}}</span>
                <span class="date">{{inquiry.date}}</span>
                <div class="answer">
                    <button v-if="inquiry.answer" class="answered">답변완료</button>
                    <button v-else class="no-answered">답변대기</button>
                </div>
            </div>
        </div>
        <div class="button-box">
            <button class="inquiry-button" @click="viewInquiryRegister">문의하기</button>
        </div>

        <pagenation @pageClick="pageClick"></pagenation>
        <searchComponent @searchStart="searchStart"></searchComponent>
    </div>
</template>

<script>
import pagenation from '../pagenation.vue';
import searchComponent from '../searchComponent.vue';
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    components: {
        searchComponent,
        pagenation
    },
    computed: {
        ...mapState('inquiry', [
            'inquiryList'
        ])
    },
    methods: {
        viewInquiryContent(e) {
            this.$emit('viewInquiryContent', e);
        },
        viewInquiryRegister() {
            this.$emit('viewInquiryRegister');
        },
        pageClick() {
            this.$emit('pageClick');
        },
        searchStart() {
            this.$emit('searchStart');
        },
    },
}
</script>

<style scoped>

    .inquiry__list {
        width: 100%;
        padding: 30px;
        background-color: #fff;
    }

    .headline {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 2px solid #aaa;
        font-size: 1.5rem;
        font-weight: bold;
    }

    .inquiry__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 0;
        border-bottom: 1px solid #aaa;
    }
    .row__title-box {
        font-size: 1.5rem;
        font-weight: bold;
        cursor: pointer;
    }

    .headline__writer, .writer {
        box-sizing: border-box;
        display: inline-block;
        margin-left: auto;
        width: 80px;
        text-align: center;
    }

    .headline__answer, .answer{
        display: inline-block;
        box-sizing: border-box;
        width: 100px;
        text-align: center;
    }

    .headline__date, .date{
        box-sizing: border-box;
        display: inline-block;
        width: 80px;
        text-align: center;
    }

    .writer, .answer, .date {
        font-size: 1.3rem;
    }

    .answer button {
        border: none;
        border-radius: 5px;
        color: white;
        padding: 5px 10px;
        font-weight: bold;
    }

    .answered {
        background-color: #49c355;
    }

    .no-answered {
        background-color: #f3d870;
    }

    .button-box {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
    }

    .inquiry-button {
        font-size: 1.2rem;
        padding: 5px 8px;
        border: none;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }
</style>