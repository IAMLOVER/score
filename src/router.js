import Vue from "vue";
import Router from "vue-router";
import CreditScore from "./views/CreditScroe.vue";
import Interpretation from './views/Interpretation.vue';
import HistoryScore from './views/HistoryScore.vue';
import QuickScore from './views/QuickScore.vue';
import EditInfo from './views/EditInfo.vue';

import IdCard from './components/IdCard.vue';
import PassPort from './components/PassPort.vue';
import StudentInfo from './components/StudentInfo.vue';
import EMail from './components/EMail.vue';
import Drive from './components/Drive.vue';
import CarInfo from './components/CarInfo.vue';
import HouseInfo from './components/HouseInfo.vue';
import VantIndexAnchor from './components/VantIndexAnchor.vue';

Vue.use(Router);
// 创建路由规则
const routes = [
  { path: '/', redirect: '/CreditScore' },
  { path: '/CreditScore', component: CreditScore, name: 'CreditScore', meta: { title: '信用分' } },
  { path: '/Interpretation', component: Interpretation, name: 'Interpretation', meta: { title: '信用解读' } },
  { path: '/HistoryScore', component: HistoryScore, name: 'HistoryScore', meta: { title: '信用历史' } },
  { path: '/QuickScore', component: QuickScore, name: 'QuickScore', meta: { title: '快速提分' } },
 
  {
    path: '/EditInfo', component: EditInfo, name: 'EditInfo',
    children: [
      {path:'IdCard',component:IdCard,name:'IdCard',meta: { title:'添加身份证' }},
      { path: 'PassPort', component: PassPort, name: 'PassPort', meta: { title: '添加护照' } },
      { path: 'StudentInfo', component: StudentInfo, name: 'StudentInfo', meta: { title: '学历学籍' } },
      { path: 'EMail', component: EMail, name: 'EMail', meta: { title: '单位邮箱' } },
      { path: 'Drive', component: Drive, name: 'Drive', meta: { title: '驾驶证' } },
      { path: 'CarInfo', component: CarInfo, name: 'CarInfo', meta: { title: '车辆信息' } },
      { path: 'HouseInfo', component: HouseInfo, name: 'HouseInfo', meta: { title: '房产信息' } },
      {path:'VantIndexAnchor',component:VantIndexAnchor,name:'VantIndexAnchor'},
    ]
  }
]


export default new Router({
  routes
});
