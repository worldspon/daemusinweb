import main from './component/main/main.vue';
import notice from './component/notice/notice.vue';
import faq from './component/faq/faq.vue';
import inquiry from './component/inquiry/inquiry.vue';
import guide from './component/guide/guide.vue';
import board from './component/board/board.vue';

import axios from 'axios'

function validateLogin(to, from, next) {
    const cookie = document.cookie;
    const startIndex = cookie.indexOf('taemuuser') + 10;
    const endIndex = cookie.indexOf(';', startIndex);
    const token = endIndex === -1 ? cookie.slice(startIndex) : cookie.slice(startIndex, endIndex);

    if(token === '') {
        alert('로그인 후 이용해주세요');
        if( from.path === '/inquiry' || from.path === '/' ) {
            location.href = "http://taemuking.com/";
            return ;
        }
    } else {
        const url = `/api/token/verify`;

        axios.get(url).then(response => {
            const axiosObject = response.data;
            if( axiosObject.errorCode === 0 ) {
                next();
            } else {
                alert('로그인 후 이용해주세요');
                location.href = "http://taemuking.com/";
            }
        })
    }
}

export default [
    { 
        path: '/', 
        component: main
    },
    { 
        path: '/notice', 
        component: notice
    },
    { 
        path: '/faq', 
        component: faq,
    },
    { 
        path: '/inquiry',
        component: inquiry,
        beforeEnter: (to, from, next) => {
            validateLogin(to, from, next);
        }
    },
    { 
        path: '/guide',
        component: guide
    },
    { 
        path: '/board',
        component: board
    }
]