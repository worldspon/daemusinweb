<template>
    <footer>
        <div class="footer__content">
            <div class="footer__info-box">
                <img class="footer__logo" src="assets/image/footer-logo.png" alt="">
                <div class="footer__info">
                    <p>주소 : 서울특별시 강남구 테헤란로 63길 14, 9층(삼성동, 인화빌딩)</p>
                    <p>이메일 : help@worldspon.com</p><br>
                    <p>Copyright 2019 WORLDSPON inc. All Rights Reserved</p>
                </div>
            </div>
            <div class="footer__family">
                <div class="footer__apps">
                    <a href="https://play.google.com/store/apps/details?id=com.coinbank.worldspon&hl=ko" target="_blank">
                        <img class="footer__app" src="assets/image/app-icon-worldspon.png" alt="">
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.worldspon.minigames" target="_blank">
                        <img class="footer__app" src="assets/image/app-icon-minigames.png" alt="">
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.worldspon.newbigking" target="_blank">
                        <img class="footer__app" src="assets/image/app-icon-daemusin.png" alt="">
                    </a>
                </div>
                <select class="footer__select" v-model="selected" @change="locationFamilySite">
                    <option selected disabled style="display:none;" value="FAMILY SITE">FAMILY SITE</option>
                    <option value="http://www.worldspon.com/intro/">WORLDSPON BRAND SITE</option>
                    <option value="http://www.worldspon.com">WORLDSPON APP SITE</option>
                    <option value="http://www.worldspon.net">WORLDSPON CUSTOMER SITE</option>
                </select>
            </div>
            
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            selected: 'FAMILY SITE'
        }
    },
    methods: {
        locationFamilySite(e) {
            window.open(this.selected);
        }
    }
}
</script>

<style scoped>
    footer {
        background-color: #9e7e49;
    }

    .footer__content {
        display: flex;
        max-width: 1660px;
        padding: 30px;
        margin: 0 auto;
        align-items: center;
    }

    .footer__info-box {
        display: flex;
        align-items: center;
    }

    .footer__logo {
        width: 120px;
    }

    .footer__info {
        margin-left: 20px;
        font-size: 1.3rem;
        font-weight: bold;
        line-height: 1.5;
        color: #fff;
    }

    .footer__family {
        display: flex;
        flex-flow: column;
        margin-left: auto;
    }

    .footer__apps {
        margin-bottom: 10px;
    }

    .footer__apps a:not(:last-child){
        margin-right: 15px;
    }

    .footer__app {
        width: 50px;
    }

    .footer__select {
        padding: 5px;
    }

    @media (max-width: 1366px) {
        .footer__info-box {
            flex-flow: column;
            align-items: flex-start;
        }
        .footer__logo {
            margin-bottom: 10px;
        }

        .footer__info {
            margin-left: 0;
        }
    }

    @media (max-width: 768px) {
        .footer__content {
            flex-flow: column;
            align-items: flex-start;
        }

        .footer__info-box {
            margin-bottom: 10px;
        }

        .footer__family {
            margin-left:0;
        }

    }

</style>

