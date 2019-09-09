<template>
    <div>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions('login', [
            'axiosLoginCheck'
        ]),
    },
    created() {
        this.axiosLoginCheck();
    },
}
</script>
