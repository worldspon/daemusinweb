<template>
    <section class="dev-plan-section">
        <h1>개발계획</h1>
        <section class="dev-plan-wrap">
            <img class="arrow dev-plan__left-arrow" src="../../assets/image/slide-arrow-left.png" alt="" @click="minusCount">
            <div class="dev-plan-box" v-for="index in showCount" :key="index">
                <span class="dev-plan__title">{{showPlan[index-1].title}}</span>
                <p class="dev-plan__content" style="white-space: pre-line;">{{showPlan[index-1].content}}</p>
            </div>
            <img class="arrow dev-plan__right-arrow" src="../../assets/image/slide-arrow-right.png" alt="" @click="plusCount">
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            devPlan: null,
            showPlan: null,
            showCount: null,
            index: 0,
            lastIndex: null,
        }
    },
    methods: {
        axiosDevPlan() {
            const url = `/api/main/developmentPlan`;
        
            this.$http.get(url).then(response => {
                this.devPlan = response.data.responseObject.developmentPlan;
                this.setShowCount();
                this.lastIndex = this.devPlan.length-1;
            })
        },
        plusCount() {
            this.index++;
            if( this.index > this.lastIndex ) {
                this.index = 0;
            }
        },
        minusCount() {
            this.index--;
            if( this.index < 0 ) {
                this.index = this.lastIndex;
            }
        },
        setShowCount() {
            if(window.innerWidth > 1366 ) {
                this.showCount = 4;
                this.setShowPlan();
            } else if( window.innerWidth <= 1366 && window.innerWidth > 1024) {
                this.showCount = 3;
                this.setShowPlan();
            } else if( window.innerWidth <= 1024 && window.innerWidth > 768 ) {
                this.showCount = 2;
                this.setShowPlan();
            } else {
                this.showCount = 1;
                this.setShowPlan();
            }
        },
        setShowPlan() {
            this.showPlan = [];
            if( this.index + (this.showCount-1) <= this.lastIndex ) {
                for( let i = this.index; i <= this.index+this.showCount-1; i++) {
                    this.showPlan.push(this.devPlan[i]);
                }
            } else if( this.index + (this.showCount-1) > this.lastIndex ) {
                for( let i = this.index; i <= this.lastIndex; i++) {
                    this.showPlan.push(this.devPlan[i]);
                }
                for( let i = 0; i < (this.index + (this.showCount-1)) - (this.lastIndex); i++ ) {
                    this.showPlan.push(this.devPlan[i]);
                }
            }
        }
    },
    created() {
        this.axiosDevPlan();
        window.addEventListener('resize', this.setShowCount)
    },
    watch: {
        devPlan: function() {
            this.showPlan = this.devPlan.slice(0,this.showCount);
        },
        index: function() {
            this.setShowCount();
        }
    }
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
        width: 15px;
        position: absolute;
        top: 42%;
        cursor: pointer;
    }

    .dev-plan__left-arrow {
        left: -25px;
    }

    .dev-plan__right-arrow {
        right: -25px;
    }

    .dev-plan-box {
        width: 22.7409%;
        height: 500px;
        box-sizing: border-box;
        padding: 50px 40px;
        background-color: #FFF;
        box-shadow: 5px 5px 5px rgba(40, 40, 40, .28);
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
    
    @media (max-width: 1366px) {
        .dev-plan-box {
            width: 30.8931%;
        }
    }

    @media (max-width: 1024px) {
        .dev-plan-box {
            width: 47.55%;
        }
    }

    @media (max-width: 768px) {
        .dev-plan-box {
            width: 100%;
        }
    }
</style>