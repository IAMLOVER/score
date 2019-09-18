import Vue from "vue";
import Router from "vue-router";
import CreditScore from "./views/CreditScroe.vue";
import Interpretation from './views/Interpretation.vue';
import HistoryScore from './views/HistoryScore.vue';
import QuickScore from './views/QuickScore.vue';
Vue.use(Router);
// 创建路由规则
const routes = [
  { path: '/', redirect: '/CreditScore' },
  { path: '/CreditScore', component: CreditScore, name: 'CreditScore', meta: { title: '信用分' } },
  { path: '/Interpretation', component: Interpretation, name: 'Interpretation', meta: { title: '信用解读' } },
  { path: '/HistoryScore', component: HistoryScore, name: 'HistoryScore', meta: { title: '信用历史' } },
  { path: '/QuickScore', component: QuickScore, name: 'QuickScore', meta: { title: '快速提分' } }
]


export default new Router({
  routes
});
