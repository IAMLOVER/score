import { Lazyload,Sticky } from "vant";

const vantComponents = {
  install(Vue) {
    Vue.use(Lazyload).use(Sticky)
  }
};
export default vantComponents;