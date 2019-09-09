<template>
    <div class="pagenation">
        <ul>
            <img class="pageButton first" @click="first" src="../assets/image/page-first.png" alt="">
            <img class="pageButton prev" @click="prev" src="../assets/image/page-prev.png" alt="">
            <li :class="{ on : pageNum === page}" v-for="(page, index) of pageArray" :key="index" @click="pageClick">{{page}}</li>
            <img class="pageButton next" @click="next" src="../assets/image/page-next.png" alt="">
            <img class="pageButton last"  @click="last" src="../assets/image/page-last.png" alt="">
        </ul>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapState('pagenation', [
            'pageNum',
            'phraseSize',
            'lastPage',
            'totalPost',
            'pageArray'
        ])
    },
    methods: {
        ...mapMutations('pagenation', [
            'setPageArray',
            'changePageNum',
            'moveFirstPage',
            'movePrevPhrase',
            'moveNextPhrase',
            'moveLastPage'
        ]),
        pageClick(e) {
            const clickPage = Number(e.target.innerText);
            this.changePageNum(clickPage);
            this.$emit('pageClick');
        },
        first() {
            this.moveFirstPage();
            this.$emit('pageClick');
        },
        prev() {
            this.movePrevPhrase();
            this.$emit('pageClick');
        },
        next() {
            this.moveNextPhrase();
            this.$emit('pageClick');
        },
        last() {
            this.moveLastPage();
            this.$emit('pageClick');
        }
    },
    created() {
        this.setPageArray();
    },
    watch: {
        pageNum() {
            this.setPageArray();
        }
    },
}
</script>

<style scoped>
    .pagenation {
        padding: 10px 0px;
    }

    .pagenation ul {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.4rem;
    }

    .pageButton {
        width: 30px;
        cursor: pointer;
    }

    .prev, .next {
        margin: 0px 5px 0px 5px;
    }

    .on {
        font-weight: bold;
    }

    .pagenation ul li {
        padding: 0px 15px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .pageButton {
            width: 20px;
        }
    }
</style>