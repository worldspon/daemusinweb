<template>
    <div>
        <button @click="setCurrentView('noticeList')">asdsad</button>
        <p>{{pageNum}}</p>
        <p>{{stateInfo}}</p>
    </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'

export default {
    computed: {
        ...mapState(['category','pageNum']),
        ...mapGetters(['stateInfo'])
    },
    methods: {
        ...mapMutations({
            setStateReset: 'setStateReset',
            setCurrentView: 'setCurrentView'
        })
    },
}
</script>
