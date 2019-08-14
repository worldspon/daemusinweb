<template>
    <header>
        <nav class="header__nav">
            <img src="/assets/image/logo.png" alt="logo" class="logo"  @click="moveHome()">
            <ul class="header__menu" v-if="windowWidth >= 1080">
                <li><router-link to="/notice">공지사항</router-link></li>
                <li><router-link to="/faq">FAQ</router-link></li>
                <li><router-link to="/inquery">1:1문의</router-link></li>
                <li><router-link to="/guide">게임가이드</router-link></li>
                <li><router-link to="/board">게시판</router-link></li>
            </ul>
            <div class="login-box" v-if="windowWidth >= 1080">
                <span>로그인</span>
            </div>
            <img class="mobile-menu" src="/assets/image/mobile-menu.png" alt="" v-if="windowWidth < 1080" @click="mobileMenuToggle">
        </nav>
    </header>
</template>

<script>

export default {
    data() {
        return {
            windowWidth: window.innerWidth
        }
    },
    methods: {
        moveHome() {
            location.href = 'http://localhost:8080';
        },
        onResize() {
            this.windowWidth = window.innerWidth;
        },
        mobileMenuToggle() {
            console.log("TOGGLE!");
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
        padding: 0 60px;
        margin: 0 auto;
        align-items: center;
    }

    .logo {
        width: 12.048%;
        min-width: 100px;
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

    .mobile-menu {
        width: 50px;
        margin-left: auto;
        cursor: pointer;
    }

    @media (min-width: 1025px) and (max-width: 1280px) {
    /* Device = Tablets */
        .header__menu {
            font-size: 1.6rem;
        }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
 
    
    }

</style>
