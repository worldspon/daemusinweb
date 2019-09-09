import axios from 'axios'

export default {
    namespaced : true,
    state: {
        loginState: false,
        userId: '',
        level: false,
        token: ''
    },
    mutations: {
        setUserId(state, id) {
            state.userId = id;
        },
        setUserLevel(state, level) {
            state.level = level;
        },
        setLoginState(state, value) {
            state.loginState = value;
        }
    },
    actions: {
        axiosLoginCheck(context) {
            console.log('LOGIN CHECK')
            const url = `/token/verify`;
        
            axios.get(url).then(response => {
                if( response.data.errorCode === 0 ) {
                    context.commit('setLoginState', true);
                } else {
                    document.cookie = 'taemuuser=; expires=Thu, 01 Jan 1999 00:00:10 GMT;'
                    context.commit('setLoginState', false);
                    context.commit('setUserId', '');
                    context.commit('setUserLevel', false);
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
            axios.post('/login', userData)
            .then(response => {
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
            const url = `/logout`;

            axios.get(url).then(response => {
                const axiosData = response.data;
                if( axiosData.errorCode === 0 ) {
                    context.commit('setLoginState', false);
                    context.commit('setUserId', '');
                    context.commit('setUserLevel', false);
                } else {
                    alert(axiosData.message);
                }
            })
        }
    }   
}