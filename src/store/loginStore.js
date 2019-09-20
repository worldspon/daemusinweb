import axios from 'axios'

export default {
    namespaced : true,
    state: {
        loginState: false,
        userId: '',
        level: false,
        token: null
    },
    mutations: {
        setUserId(state, id) {
            state.userId = id;
        },
        setUserLevel(state, level) {
            state.level = level;
        },
        setToken(state) {
            const cookie = document.cookie;
            const startIndex = cookie.indexOf('taemuuser') + 10;
            const endIndex = cookie.indexOf(';', startIndex);
            state.token = endIndex === -1 ? cookie.slice(startIndex) : cookie.slice(startIndex, endIndex);
        },
        setLoginState(state, value) {
            state.loginState = value;
        }
    },
    actions: {
        axiosLoginCheck(context) {
            const url = `/api/token/verify`;
        
            axios.get(url).then(response => {
                const axiosObject = response.data;
                if( axiosObject.errorCode === 0 ) {
                    context.commit('setLoginState', true);
                    context.commit('setUserId', axiosObject.responseObject.trademark);
                    context.commit('setUserLevel', axiosObject.responseObject.level);
                    context.commit('setToken');
                } else {
                    document.cookie = 'taemuuser=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
                    context.commit('setLoginState', false);
                    context.commit('setUserId', '');
                    context.commit('setUserLevel', false);
                    context.commit('setToken', null);
                }
            })
        },
        axiosLogin(context, userObject) {
            const userData = {
                user: {
                    trademark : userObject.id,
                    password : userObject.password
                }
            }
            axios.post('/api/login', userData)
            .then(response => {
                console.log(response);
                const axiosData = response.data;
                if( axiosData.errorCode === 0 ) {
                    context.commit('setLoginState', true);
                    context.commit('setUserId', axiosData.responseObject.trademark);
                    context.commit('setUserLevel', axiosData.responseObject.level);
                } else if( axiosData.errorCode === 1 ) {
                    alert(axiosData.message);
                    location.reload();
                } else {
                    alert(axiosData.message);
                }
            })
        },
        axiosLogout(context) {
            const url = `/api/logout`;

            const slashIndex = location.href.lastIndexOf('/');
            const nowLocation = location.href.slice(slashIndex+1 );

            axios.get(url).then(response => {
                const axiosData = response.data;
                if( axiosData.errorCode === 0 ) {
                    context.commit('setLoginState', false);
                    context.commit('setUserId', '');
                    context.commit('setUserLevel', false);
                    if(nowLocation === 'inquiry') {
                        location.href="http://192.168.0.25:8080/"
                    }
                } else {
                    alert(axiosData.message);
                }
            })
        }
    }   
}