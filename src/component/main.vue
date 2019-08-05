<template>
    <section id="main-page-wrap">
        <section class="notice-board-section">
            <div class="notice-box">
                NOTICE
            </div>
            <div class="board-box">BOARD</div>
        </section>
        <section class="guide-question-section">
            <div>
                GUIDE
            </div>
            <div>
                FAQ
            </div>
            <div>
                PERSONAL QUESTION
            </div>
        </section>
        <section class="development-plan-section">
            <h1>개발계획</h1>
            <section class="development-plan-wrap">
                <div>FIGHT</div>
                <div>MASTER SKILLS</div>
                <div>CLAN</div>
                <div>WAR</div>
            </section>
        </section>
    </section>
</template>

<script>
export default {

}
</script>

<style scoped>
    #main-page-wrap {
        max-width: 1600px;
        margin: 0 auto;
    }

    .notice-board-section {
        display: flex;
        justify-content: space-between;
    }

    .notice-board-section > div {
        width: 48%;
        height: 120px;
        background-color: red;
    }

    .guide-question-section {
        display: flex;
        justify-content: space-between;
        text-align: center;
    }

    .guide-question-section > div {
        width: 30%;
        height: 120px;
        background-color: pink;
    }

    .development-plan-section {
        text-align: center;
    }

    .development-plan-wrap {
        display: flex;
        justify-content: space-between;
    }

    .development-plan-wrap > div {
        width: 20%;
        height: 120px;
        background-color: green;
    }
</style>

