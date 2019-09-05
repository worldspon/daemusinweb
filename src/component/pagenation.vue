<template>
    <div class="pagenation">
        <ul>
            <img class="pageButton first" @click="moveFirstPage" src="src/assets/image/page-first.png" alt="">
            <img class="pageButton prev" @click="movePrevPhrase" src="src/assets/image/page-prev.png" alt="">
            <li :class="{ on : pageNum === page}" v-for="(page, index) of pageArray" :key="index" @click="changePageNum">{{page}}</li>
            <img class="pageButton next" @click="moveNextPhrase" src="src/assets/image/page-next.png" alt="">
            <img class="pageButton last"  @click="moveLastPage" src="src/assets/image/page-last.png" alt="">
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
        ])
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