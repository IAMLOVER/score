import { Lazyload } from "vant";

const vantComponents = {
  install(Vue) {
    Vue.use(Lazyload)
  }
};
export default vantComponents;