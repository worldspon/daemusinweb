import main from './component/main/main.vue';
import notice from './component/notice/notice.vue';
import faq from './component/faq/faq.vue';
import inquiry from './component/inquiry.vue';
import guide from './component/guide.vue';
import board from './component/board/board.vue';

export default [
    { path: '/', component: faq },
    { path: '/notice', component: notice },
    { path: '/faq',component: faq },
    { path: '/inquiry',component: inquiry },
    { path: '/guide',component: guide },
    { path: '/board',component: board }
]