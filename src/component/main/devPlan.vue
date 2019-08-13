<template>
    <section class="dev-plan-section">
        <h1>개발계획</h1>
        <section class="dev-plan-wrap">
            <div class="dev-plan-box">
                <span>결투장</span>
                <p>
                    보유하고 있는 장수들을 결투장에<br>
                    출전시켜 대결을 벌인다.<br><br>
                    간단한 CCG형태의 특징을 가지며<br>
                    매일 결투장 순위를 바탕으로 곡옥을<br>
                    지급한다.
                </p>
            </div>
            <div class="dev-plan-box">MASTER SKILLS</div>
            <div class="dev-plan-box">CLAN</div>
            <div class="dev-plan-box">WAR</div>
        </section>
    </section>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    
    .dev-plan-section {
        text-align: center;
    }

    h1 {
        margin-bottom: 30px;
    }

    .dev-plan-wrap {
        display: flex;
        justify-content: space-between;
    }

    .dev-plan-box {
        width: 23.59375%;
        padding-top: 50px;
        padding-bottom: 180px;
        background-color: #FFF;
    }

    .dev-plan-box span {
        display: inline-block;
        font-size: 2rem;
        font-weight: bold;
        padding-bottom: 5px;
        margin-bottom: 30px;
        border-bottom: 2px solid black;
    }

    .dev-plan-box p {
        font-size: 1.5rem;
        line-height: 1.5;
        font-weight: bold;
        color: #888;
    }
</style>