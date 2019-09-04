import Vue from 'vue'
import Vuex from 'vuex'
import notice from './noticeStore.js'

Vue.use(Vuex);



export default new Vuex.Store({
    modules: {
        notice: notice
    }
})