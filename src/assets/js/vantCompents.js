import { Lazyload, DatetimePicker, Popup, Picker, IndexBar, IndexAnchor } from "vant";

const vantComponents = {
  install(Vue) {
    Vue.use(Lazyload).use(DatetimePicker).use(Popup).use(Picker).use(IndexBar).use(IndexAnchor)
  }
};
export default vantComponents;