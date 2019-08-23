<template>
    <header>
        <nav class="header__nav">
            <img src="src/assets/image/logo.png" alt="logo" class="logo"  @click="moveHome">
            <ul class="header__menu" v-if="windowWidth >= 1366">
                <li><router-link to="/notice">공지사항</router-link></li>
                <li><router-link to="/faq">FAQ</router-link></li>
                <li><router-link to="/inquery">1:1문의</router-link></li>
                <li><router-link to="/guide">게임가이드</router-link></li>
                <li><router-link to="/board">게시판</router-link></li>
            </ul>
            <div class="login-box" v-if="windowWidth >= 1366">
                <span class="login">로그인</span>
            </div>
            <img class="mobile-menu-button" src="src/assets/image/mobile-menu.png" alt="" v-if="windowWidth < 1366" @click="mobileMenuToggle">
            <div v-if="showMobileMenu" class="mobile-menu">
                <img class="mobile-menu-button" src="src/assets/image/mobile-menu.png" alt="" @click="mobileMenuToggle">
                <ul class="mobile-menu-nav">
                    <li><router-link to="/notice">공지사항</router-link></li>
                    <li><router-link to="/faq">FAQ</router-link></li>
                    <li><router-link to="/inquery">1:1문의</router-link></li>
                    <li><router-link to="/guide">게임가이드</router-link></li>
                    <li><router-link to="/board">게시판</router-link></li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>

export default {
    data() {
        return {
            windowWidth: window.innerWidth,
            showMobileMenu: false
        }
    },
    methods: {
        moveHome() {
            location.href = 'http://localhost:8080';
        },
        onResize() {
            this.windowWidth = window.innerWidth;
            this.showMobileMenu = false;
        },
        mobileMenuToggle() {
            this.showMobileMenu = !this.showMobileMenu
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
    }
}
</script>

<style scoped>


    a {
        color: white;
    }

    header {
        padding: 20px 0;
        margin-bottom: 50px;
        background-color: #9e7e49;
    }

    .header__nav {
        display: flex;
        max-width: 1660px;
        padding: 0 30px;
        margin: 0 auto;
        align-items: center;
    }

    .logo {
        width: 12.048%;
        min-width: 150px;
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
        font-size: 1.7rem;
        font-weight: bold;
        color: white;
    }

    .login {
        cursor: pointer;
    }

    .mobile-menu-button {
        width: 50px;
        min-width: 40px;
        margin-left: auto;
        cursor: pointer;
    }

    .mobile-menu {
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        text-align: right;
        padding: 37px 30px 20px 60px;
        z-index: 999;
        background-color: #9e7e49;
    }

    .mobile-menu-nav {
        font-size: 1.5rem;
        font-weight: bold;
        margin-top: 50px;
        text-align: right;
    }

    .mobile-menu-nav li:not(:last-child) {
        margin-bottom: 30px;
    }

    @media (min-width: 1025px) and (max-width: 1280px) {
    /* Device = Tablets */

    }

    @media (min-width: 768px) and (max-width: 1024px) {
 
    
    }

</style>
