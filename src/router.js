import main from './component/main/main.vue';
import notice from './component/notice/notice.vue';
import faq from './component/faq.vue';
import inquery from './component/inquery.vue';
import guide from './component/guide.vue';
import board from './component/board.vue';

export default [
    { path: '/', component: notice },
    { path: '/notice', component: notice },
    { path: '/faq',component: faq },
    { path: '/inquery',component: inquery },
    { path: '/guide',component: guide },
    { path: '/board',component: board }
]