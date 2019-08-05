<template>
    <header>
        <nav class="navigator-box">
            <img src="/assets/image/header-logo.png" alt="header-logo" class="header-logo" @click="myClick">
            <ul class="menu">
                <li><router-link to="/notice">공지사항</router-link></li>
                <li><router-link to="/FAQ">FAQ</router-link></li>
                <li><router-link to="/inquery">1:1문의</router-link></li>
                <li><router-link to="/guide">게임가이드</router-link></li>
                <li><router-link to="/board">게시판</router-link></li>
            </ul>
            <div class="login-box">
                <span>로그인</span>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    methods: {
        myClick() {
            location.href = 'http://localhost:8080/';
        }
    },
}
</script>

<style scoped>

    a {
        color: white;
    }

    header {
        width: 100%;
        padding: 20px 0;
        background-color: gold;
    }

    .header-logo {
        width: 250px;
        margin-right: 50px;
    }

    .navigator-box {
        display: flex;
        width: 100%;
        max-width: 1600px;
        margin: 0 auto;
        align-items: center;
    }

    .menu {
        display: flex;
        align-items: center;
    }

    .menu > li {
        font-size: 20px;
        color: white;
    }

    .menu > li:not(:last-child) {
        margin-right: 30px;
    }

    .login-box {
        margin-left: auto;
        font-size: 15px;
        color: white;
    }

</style>
