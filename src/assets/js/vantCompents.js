import { Lazyload, DatetimePicker, Popup, Picker, IndexBar, IndexAnchor, Tab, Tabs,ActionSheet  } from "vant";

const vantComponents = {
  install(Vue) {
    Vue.use(Lazyload).use(DatetimePicker).use(Popup).use(Picker).use(IndexBar).use(IndexAnchor).use(Tab).use(Tabs).use(ActionSheet)
  }
};
export default vantComponents;