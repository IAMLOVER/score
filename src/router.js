import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import CreditScore from "./views/CreditScroe.vue";
import WxAuth from "./views/WxAuth.vue";
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
const CreditLife = () => import('./views/CreditLife.vue');
const CreditCheese = () => import('./views/CreditCheese.vue');
const CreditReport = () => import('./views/CreditReport.vue');
const Recharge = () => import('./views/Recharge.vue');
const ChangeDetails = () => import('./views/ChangeDetails.vue');
const GoodShopList = () => import('./views/GoodShopList.vue');
const MyOrder = () => import('./views/MyOrder.vue');
const MyRecord = () => import('./views/MyRecord.vue');

Vue.use(Router);


// 创建路由规则
const routes = [
  { path: '/', redirect: '/CreditScore' },
  { path: '/WxAuth', component: WxAuth, name: 'WxAuth' },
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
  },
  { path: '/CreditLife', component: CreditLife, name: "CreditLife", meta: { title: '信用生活' } },
  { path: '/CreditCheese', component: CreditCheese, name: "CreditCheese", meta: { title: '信用芝士' } },
  { path: '/CreditReport', component: CreditReport, name: "CreditReport", meta: { title: '信用报告' } },
  { path: '/Recharge', component: Recharge, name: 'Recharge', meta: { title: '充值' } },
  { path: '/ChangeDetails', component: ChangeDetails, name: 'ChangeDetails', meta: { title: '兑换详情' } },
  { path: '/GoodShopList', component: GoodShopList, name: 'GoodShopList', meta: { title: '兑换商城' } },
  { path: '/MyOrder', component: MyOrder, name: 'MyOrder', meta: { title: '我的订单' } },
  { path: '/MyRecord', component: MyRecord, name: 'MyRecord', meta: { title: '兑换记录' } }
];
const router = new Router({
  routes,
  // 路由滚动行为，用于路由跳转时跳回到顶部位置
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

// 路由守卫
router.beforeEach((to, from, next) => {
  // 路由守卫改变title
  if (to.meta.title) {
    document.title = to.meta.title;
  };
  // 判断是否是微信浏览器环境,不是微信环境就直接通过
  if (!/micromessenger/i.test(navigator.userAgent)) {
    next()
    return
  };
  //不对 WxAuth 路由进行拦截，不进入 WxAuth 路由就拿不到微信返回的授权 code
  if (to.name === 'WxAuth') {
    next()
    return
  };
  let wxUserInfo = localStorage.getItem('wxUserInfo');
  if (!wxUserInfo) {
    // 保存当前路由地址，授权后跳回到此地址
    sessionStorage.setItem('wxRedirectUrl', to.fullPath)
    // 请求微信授权，并跳转到 /WxAuth 路由
    let appId = 'wx67f82d608be81246';
    let redirectUrl = encodeURIComponent(`${window.location.host}/redirect.html?type=WxAuth`);
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=http://${redirectUrl}&response_type=code&scope=snsapi_base&state=state#wechat_redirect`
  } else {
    next();
  }

});





export default router;
