<template>
    <section class="guide-question-section">
        <router-link to="/guide">
            <div class="guide">
                <img src="/assets/image/guide-background.png" alt="">
                <div class="text-area">
                    게임가이드 보러가기
                </div>
            </div>
        </router-link>
        <router-link to="/faq">
            <div class="faq">
                <img src="/assets/image/faq-background.png" alt="">
                <div class="text-area">
                    FAQ 보러가기
                </div>
            </div>
        </router-link>
        <router-link to="inquery">
            <div class="question">
                <img src="/assets/image/question-background.png" alt="">
                <div class="text-area">
                    1:1문의 보러가기
                </div>
            </div>
        </router-link>
    </section>
</template>

<script>
export default {
    
}
</script>

<style scoped>

    img {
        width: 100%;
    }

    .guide-question-section {
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin-bottom: 80px;
    }

    .guide-question-section > a {
        width: 32.083%;
        background-color: #FFF;
    }

    .text-area {
        padding: 20px 0;
        font-size: 1.8rem;
        font-weight: bold;
    }

    @media (max-width: 768px) {
        .guide-question-section {
            flex-flow: column;
        }

        .guide-question-section > a {
            width: 100%;
        }

        .guide-question-section > a:not(:last-child) {
            margin-bottom: 20px;
        }
    }
</style>