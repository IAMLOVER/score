import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import CreditScore from "./views/CreditScroe.vue";
const Interpretation = () => import('./views/Interpretation.vue');
const HistoryScore = () => import('./views/HistoryScore.vue');
const QuickScore = () => import('./views/QuickScore.vue');
const EditInfo = () => import('./views/EditInfo.vue');
const IdCard = () => import('./components/IdCard.vue');
const PassPort = () => import('./components/PassPort.vue');
const StudentInfo = () => import('./components/StudentInfo.vue');
const EMail = () => import('./components/EMail.vue');
const Drive = () => import('./components/Drive.vue');
const CarInfo = () => import('./components/CarInfo.vue');
const HouseInfo = () => import('./components/HouseInfo.vue');
const VantIndexAnchor = () => import('./components/VantIndexAnchor.vue');

const ZhiMaInfo = () => import('./components/ZhiMaInfo.vue');
const JDInfo = () => import('./components/JDInfo.vue');

Vue.use(Router);


// 创建路由规则
const routes = [
  { path: '/', redirect: '/CreditScore' },
  { path: '/Login', component: Login, name: 'Login', meta: { title: '登录' } },
  { path: '/CreditScore', component: CreditScore, name: 'CreditScore', meta: { title: '信用分' } },
  { path: '/Interpretation', component: Interpretation, name: 'Interpretation', meta: { title: '信用解读' } },
  { path: '/HistoryScore', component: HistoryScore, name: 'HistoryScore', meta: { title: '信用历史' } },
  { path: '/QuickScore', component: QuickScore, name: 'QuickScore', meta: { title: '快速提分' } },

  {
    path: '/EditInfo', component: EditInfo, name: 'EditInfo',
    children: [
      { path: 'IdCard', component: IdCard, name: 'IdCard', meta: { title: '添加身份证' } },
      { path: 'PassPort', component: PassPort, name: 'PassPort', meta: { title: '添加护照' } },
      { path: 'StudentInfo', component: StudentInfo, name: 'StudentInfo', meta: { title: '学历学籍' } },
      { path: 'EMail', component: EMail, name: 'EMail', meta: { title: '单位邮箱' } },
      { path: 'Drive', component: Drive, name: 'Drive', meta: { title: '驾驶证' } },
      { path: 'CarInfo', component: CarInfo, name: 'CarInfo', meta: { title: '车辆信息' } },
      { path: 'HouseInfo', component: HouseInfo, name: 'HouseInfo', meta: { title: '房产信息' } },
      { path: 'VantIndexAnchor', component: VantIndexAnchor, name: 'VantIndexAnchor' },
      { path: 'ZhiMaInfo', component: ZhiMaInfo, name: 'ZhiMaInfo', meta: { title: '芝麻信用' } },
      { path: 'JDInfo', component: JDInfo, name: 'JDInfo', meta: { title: '京东信用' } },
    ]
  }
];
const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

// 路由守卫
// router.beforeEach((to, from, next) => {

//   // 保存想要前往的页面
//   // if (to.fullPath != '/Login') {
//   //   localStorage.setItem('lastVisitPath', to.fullPath)
//   // }

//   if (to.meta.needLogin) { // 需要先进行登录判断

//     // 如果localStorage中有userId和token表示登录过
//     const store = JSON.parse(localStorage.getItem("store") ? localStorage.getItem("store") : null),
//       userId = store ? store.userId : null;
//     if (userId) {
//       next()
//     } else {
//       router.push({ name: 'Login' })
//     }
//   } else { // 不需要验证是否登录
//     next()
//   }


// })




export default router;
