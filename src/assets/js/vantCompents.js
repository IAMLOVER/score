import { Lazyload, DatetimePicker, Popup, Picker } from "vant";

const vantComponents = {
  install(Vue) {
    Vue.use(Lazyload).use(DatetimePicker).use(Popup).use(Picker)
  }
};
export default vantComponents;