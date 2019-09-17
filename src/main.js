import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import './assets/css/reset.min.css'; //导入公共样式
import tools from './assets/js/tools'; //导入工具包
Vue.prototype.$tools = tools;
import VantCompents from './assets/js/vantCompents'; // 按需引入有赞插件
Vue.use(VantCompents);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => { // 路由守卫改变title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
