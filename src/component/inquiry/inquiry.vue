<template>
    <div class="inquiry">
        <inquiryHeader />
        <inquiryRegister @createInquiry="createInquiry" />
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import inquiryHeader from './inquiryHeader.vue';
import inquiryRegister from './inquiryRegister.vue';

export default {
    components: {
        inquiryHeader,
        inquiryRegister
    },
    methods: {
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
        createInquiry(inquiryObject) {
            console.log(inquiryObject);
        }
    },
    created() {
        this.axiosLoginCheck();
    },
}
</script>

<style scoped>
    .inquiry {
        width: 100%;
        max-width: 1660px;
        padding: 0px 30px;
        margin: 0 auto;
        margin-bottom: 50px;
    }
</style>
