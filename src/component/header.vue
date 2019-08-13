<template>
    <header>
        <nav class="header__nav">
            <img src="/assets/image/logo.png" alt="logo" class="logo"  @click="moveHome()">
            <ul class="header__menu">
                <li><router-link to="/notice">공지사항</router-link></li>
                <li><router-link to="/faq">FAQ</router-link></li>
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
        moveHome() {
            location.href = 'http://localhost:8080';
        }
    }
}
</script>

<style scoped>


    a {
        color: white;
    }

    header {
        width: 100%;
        padding: 20px 0;
        margin-bottom: 50px;
        background-color: #9e7e49;
    }

    .header__nav {
        display: flex;
        max-width: 1600px;
        margin: 0 auto;
        align-items: center;
    }

    .logo {
        width: 200px;
        margin-right: 65px;
        cursor: pointer;
    }

    .header__menu {
        display: flex;
        align-items: center;
        font-size: 2rem;
        font-weight: bold;
        color: white;
    }

    .header__menu > li:not(:last-child) {
        margin-right: 90px;
    }

    .login-box {
        margin-left: auto;
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
    }

</style>
