<template>
    <header>
        <div class="login-modal-box" v-if="modal">
            <div class="modal">
                <div class="title-box">
                    <span>로그인</span>
                </div>
                <div class="id-box">
                    <input v-focus type="text" placeholder="ID" v-model="userId">
                </div>
                <div class="password-box">
                    <input type="password" placeholder="PASSWORD" v-model="userPassword" @keydown.enter="startLogin">
                </div>
                <div class="button-box">
                    <button @click="startLogin">로그인</button>
                    <button @click="destroyModal">취소</button>
                </div>
            </div>
        </div>
        <nav class="header__nav">
            <img src="../assets/image/logo.png" alt="logo" class="logo" @click="moveHome">
            <ul class="header__menu" v-if="windowWidth >= 1366">
                <li>
                    <router-link v-if="$route.path !== '/notice'" to="/notice">공지사항</router-link>
                    <a v-else @click="reload">공지사항</a>
                </li>
                <li>
                    <router-link v-if="$route.path !== '/faq'" to="/faq">FAQ</router-link>
                    <a v-else @click="reload">FAQ</a>
                </li>
                <li>
                    <router-link v-if="$route.path !== '/inquiry'" to="/inquiry">1:1문의</router-link>
                    <a v-else @click="reload">1:1문의</a>
                </li>
                <li>
                    <router-link v-if="$route.path !== '/guide'" to="/guide">게임가이드</router-link>
                    <a v-else @click="reload">게임가이드</a>
                </li>
                <li>
                    <router-link v-if="$route.path !== '/board'" to="/board">게시판</router-link>
                    <a v-else @click="reload">게시판</a>
                </li>
            </ul>
            <div class="login-box" v-if="windowWidth >= 1366">
                <span class="login" @click="showLoginModal" v-if="!loginState">로그인</span>
                <span class="login" @click="axiosLogout" v-if="loginState">로그아웃</span>
            </div>
            <img class="mobile-menu-button" src="../assets/image/mobile-menu.png" alt="" v-if="windowWidth < 1366" @click="mobileMenuToggle">
            <div v-if="showMobileMenu" class="mobile-menu">
                <img class="mobile-menu-button" src="../assets/image/mobile-menu.png" alt="" @click="mobileMenuToggle">
                <ul class="mobile-menu-nav">
                    <li @click="showLoginModal" v-if="!loginState">로그인</li>
                    <li @click="axiosLogout" v-if="loginState">로그아웃</li>
                    <li @click="mobileMenuClick">
                        <router-link v-if="$route.path !== '/notice'" to="/notice">공지사항</router-link>
                        <a v-else @click="reload">공지사항</a>
                    </li>
                    <li @click="mobileMenuClick">
                        <router-link v-if="$route.path !== '/faq'" to="/faq">FAQ</router-link>
                        <a v-else @click="reload">FAQ</a>
                    </li>
                    <li @click="mobileMenuClick">
                        <router-link  v-if="$route.path !== '/inquiry'" to="/inquiry">1:1문의</router-link>
                        <a v-else @click="reload">1:1문의</a>
                    </li>
                    <li @click="mobileMenuClick">
                        <router-link v-if="$route.path !== '/guide'" to="/guide">게임가이드</router-link>
                        <a v-else @click="reload">게임가이드</a>
                    </li>
                    <li @click="mobileMenuClick">
                        <router-link v-if="$route.path !== '/board'" to="/board">게시판</router-link>
                        <a v-else @click="reload">게시판</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
    data() {
        return {
            windowWidth: window.innerWidth,
            showMobileMenu: false,
            modal: false,
            userId: '',
            userPassword: '',
        }
    },
    computed: {
        ...mapState('login', [
            'loginState'
        ])
    },
    methods: {
        reload() {
            location.reload();
        },
        ...mapMutations('login', [
            'setUserId',
            'setUserPassword'
        ]),
        ...mapActions('login', [
            'axiosLogin',
            'axiosLogout',
            'axiosLoginCheck'
        ]),
        moveHome() {
            location.href = 'http://taemuking.com/';
        },
        onResize() {
            this.windowWidth = window.innerWidth;
            this.showMobileMenu = false;
        },
        mobileMenuToggle() {
            this.showMobileMenu = !this.showMobileMenu
        },
        mobileMenuClick() {
            this.showMobileMenu = false;
        },
        showLoginModal() {
            this.showMobileMenu = false;
            this.modal = !this.modal
        },
        startLogin() {
            const user = {
                id: this.userId,
                password: this.userPassword
            }
            this.axiosLogin(user);
            this.userId = ''
            this.userPassword = ''
        },
        destroyModal() {
            this.modal = false;
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
    },
    watch: {
        loginState() {
            if( this.loginState === true ) {
                this.modal = false;
            }
        }
    },
    directives: {
        focus: {
            inserted(el) {
                el.focus()
            }
        }
    }
}
</script>

<style scoped>


    .login-modal-box {
        display: flex;
        justify-content: center;
        position: absolute;
        top: 300px;
        width: 100%;
        z-index: 999;
    }

    .title-box {
        font-size: 3rem;
        color:#9e7e49;
        font-weight: bold;
        text-align: center;
        margin-bottom: 20px;
    }

    .modal {
        padding: 30px 70px;
        border-top: 30px solid #9e7e49;
        border-radius: 15px;
        background-color: #f2f2f2;
    }

    .id-box, .password-box {
        display: flex;
        flex-flow: column;
        align-items: flex-start;
        justify-content: space-between;
    }

    input {
        font-size: 1.5rem;
        line-height: 1.5;
        padding-left: 5px;
        margin-bottom: 10px;
        border-radius: 3px;
        border: 1px solid #9e7e49;
        color: #9e7e49;
    }

    .button-box {
        display: flex;
        justify-content: space-between;
    }

    .button-box > button {
        width: 48%;
        padding: 5px 0;
        font-weight: bold;
        font-size: 1.5rem;
        border: 0;
        border-radius: 3px;
        color: white;
        background-color: #9e7e49;
    }

    a {
        cursor: pointer;
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
        color: white;
    }

    .mobile-menu-nav > li {
        cursor: pointer;
    }

    .mobile-menu-nav li:not(:last-child) {
        margin-bottom: 30px;
    }

</style>
