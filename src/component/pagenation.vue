<template>
    <div class="notice__pagenation">
        <ul>
            <img class="pageButton first" @click="moveFirstPage" src="assets/image/page-first.png" alt="">
            <img class="pageButton prev" @click="movePrevPage" src="assets/image/page-prev.png" alt="">
            <li :class="{ on : nowPage === page}" v-for="(page, index) of pageArray" :key="index" @click="emitPageNum">{{page}}</li>
            <img class="pageButton next" @click="moveNextPage" src="assets/image/page-next.png" alt="">
            <img class="pageButton last"  @click="moveLastPage" src="assets/image/page-last.png" alt="">
        </ul>
    </div>
</template>

<script>
export default {
    props: ['propsTotalPosts', 'propsTotalContent', 'propsNowPage'],
    data() {
        return {
            totalPosts: this.propsTotalPosts,
            totalContent: this.propsTotalContent,
            totalPage: null,
            nowPage: this.propsNowPage,
            phraseSize: 5,
            pageArray: []
        }
    },
    methods: {
        emitPageNum(e) {
            this.nowPage = Number(e.target.innerText);
            this.$emit('changePage', this.nowPage);
        },
        setPageArray() {
            this.pageArray = [];
            const startPhrase = Math.floor((this.nowPage - 1) / this.phraseSize) * this.phraseSize + 1
            const endPhrase = startPhrase + this.phraseSize - 1;

            for(let page = startPhrase; page <= endPhrase; page++) {
                this.pageArray.push(page);

                if( page === this.totalPage) {
                    break;
                }
            }
        },
        moveFirstPage() {
            this.nowPage = 1;
            this.$emit('changePage', this.nowPage);
        },
        movePrevPage() {
            this.nowPage - 5 <= 1 ? this.nowPage = 1 : this.nowPage -= 5;
            this.$emit('changePage', this.nowPage);
        },
        moveNextPage() {
            this.nowPage + 5 >= this.totalPage ? this.nowPage = this.totalPage : this.nowPage += 5;
            this.$emit('changePage', this.nowPage);
        },
        moveLastPage() {
            this.nowPage = this.totalPage;
            this.$emit('changePage', this.nowPage);
        }

    },
    created() {
        this.setPageArray();
    },
    watch: {
        propsTotalPosts() {
            this.totalPosts = this.propsTotalPosts;
            this.totalPage = Math.round((this.totalPosts / this.totalContent + 0.49));
        },
        propsNowPage() {
            console.log("CH");
            this.nowPage = this.propsNowPage;
        },
        nowPage() {
            this.setPageArray();
        },
        totalPage() {
            this.setPageArray();
        }
    },
}
</script>

<style scoped>
    .notice__pagenation {
        padding-top: 20px;
    }

    .notice__pagenation ul {
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

    .notice__pagenation ul li {
        padding: 0px 15px;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .pageButton {
            width: 20px;
        }
    }
</style>