import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store/index';

import './assets/css/reset.min.css'; //导入公共样式
import tools from './assets/js/tools'; //导入工具包
Vue.prototype.$tools = tools;
import VantCompents from './assets/js/vantCompents'; // 按需引入有赞插件
Vue.use(VantCompents);

// 全局过滤时间
Vue.filter('dataFm', (value = null, format = 'yyyy-mm-dd') => {
  value = value ? value : new Date();
  let nowDate = new Date(value),
    year = nowDate.getFullYear(),
    month = (nowDate.getMonth() + 1).toString().padStart(2, "0"),
    day = (nowDate.getDate()).toString().padStart(2, "0"),
    ymd = null;
  if (format == "yyyy-mm-dd") {
    ymd = year + "-" + month + "-" + day;
  } else if (format == "yyyy-mm") {
    ymd = year + "-" + month;
  } else {
    ymd = year + "年" + month + "月" + day + "日";
  }
  return ymd
});

// 给input设置自动获取焦点
Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
