<template>
    <section class="dev-plan-section">
        <h1>개발계획</h1>
        <section class="dev-plan-wrap">
            <img class="arrow dev-plan__left-arrow" src="/assets/image/slide-arrow-left.png" alt="" @click="devPlanMoveLeft">
            <div class="dev-plan-box" v-for="(item, index) of indexArray" :key="index">
                <span class="dev-plan__title">{{devPlan[item].title}}</span>
                <p class="dev-plan__content" style="white-space: pre-line;">{{devPlan[item].content}}</p>
            </div>
            <img class="arrow dev-plan__right-arrow" src="/assets/image/slide-arrow-right.png" alt="" @click="devPlanMoveRight">
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            devPlan: [
                {
                    title: '결투장1',
                    content: `보유하고 있는 장수들을 결투장에\n출전시켜 대결을 벌인다.\n\n간단한 CCG형태의 특징을 가지며\n매일 결투장 순위를 바탕으로 곡옥을\n지급한다.`
                },
                {
                    title: '결투장2',
                    content: '보유하고 있는 장수들을 결투장에\n출전시켜 대결을 벌인다.\n\n간단한 CCG형태의 특징을 가지며\n매일 결투장 순위를 바탕으로 곡옥을\n지급한다.'
                },
                {
                    title: '결투장3',
                    content: '보유하고 있는 장수들을 결투장에\n출전시켜 대결을 벌인다.\n\n간단한 CCG형태의 특징을 가지며\n매일 결투장 순위를 바탕으로 곡옥을\n지급한다.'
                },
                {
                    title: '결투장4',
                    content: '보유하고 있는 장수들을 결투장에\n출전시켜 대결을 벌인다.\n\n간단한 CCG형태의 특징을 가지며\n매일 결투장 순위를 바탕으로 곡옥을\n지급한다.'
                },
                {
                    title: '결투장5',
                    content: '보유하고 있는 장수들을 결투장에\n출전시켜 대결을 벌인다.\n\n간단한 CCG형태의 특징을 가지며\n매일 결투장 순위를 바탕으로 곡옥을\n지급한다.'
                },
                {
                    title: '결투장6',
                    content: '보유하고 있는 장수들을 결투장에\n출전시켜 대결을 벌인다.\n\n간단한 CCG형태의 특징을 가지며\n매일 결투장 순위를 바탕으로 곡옥을\n지급한다.'
                },
                {
                    title: '결투장7',
                    content: '보유하고 있는 장수들을 결투장에\n출전시켜 대결을 벌인다.\n\n간단한 CCG형태의 특징을 가지며\n매일 결투장 순위를 바탕으로 곡옥을\n지급한다.'
                }
            ],
            startIndex: 0,
            indexArray: [0,1,2,3]
        }
    },
    methods: {
        devPlanMoveLeft() {
            this.indexArray = [];
            this.startIndex > 0 ? this.startIndex-- : this.startIndex = this.devPlan.length-1;
            let index = this.startIndex;

            for(let i = 0; i < 4; i ++) {
                if( index < 0 ) {
                    index = this.devPlan.length-1;
                }
                this.indexArray.push(index);
                index--;
            }
        },
        devPlanMoveRight() {
            this.indexArray = [];
            this.startIndex < this.devPlan.length-1 ? this.startIndex++ : this.startIndex = 0;
            let index = this.startIndex;

            for(let i = 0; i < 4; i ++) {
                if( index >= this.devPlan.length ) {
                    index = 0;
                }
                this.indexArray.push(index);
                index++;
            }
        }
    },
}
</script>

<style scoped>
    
    .dev-plan-section {
        text-align: center;
        margin-bottom: 60px;
    }

    h1 {
        margin-bottom: 30px;
    }

    .dev-plan-wrap {
        position: relative;
        display: flex;
        justify-content: space-between;
    }

    .arrow {
        position: absolute;
        top: 42%;
        cursor: pointer;
    }

    .dev-plan__left-arrow {
        left: -51px;
    }

    .dev-plan__right-arrow {
        right: -51px;
    }

    .dev-plan-box {
        width: 22.65625%;
        height: 500px;
        box-sizing: border-box;
        padding: 50px 40px;
        background-color: #FFF;
        box-shadow: 5px 5px 5px rgba(40, 40, 40, .28);;
    }

    .dev-plan__title {
        display: inline-block;
        font-size: 2rem;
        font-weight: bold;
        padding-bottom: 5px;
        margin-bottom: 30px;
        border-bottom: 2px solid black;
    }

    .dev-plan__content {
        font-size: 1.5rem;
        line-height: 1.5;
        font-weight: bold;
        color: #888;
    }
</style>