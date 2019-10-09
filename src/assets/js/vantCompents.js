import { Lazyload, DatetimePicker, Popup, Picker, IndexBar, IndexAnchor, Tab, Tabs, ActionSheet, Dialog,Notify  } from "vant";

const vantComponents = {
  install(Vue) {
    Vue.use(Lazyload).use(DatetimePicker).use(Popup).use(Picker).use(IndexBar).use(IndexAnchor).use(Tab).use(Tabs).use(ActionSheet).use(Dialog).use(Notify)
  }
};
export default vantComponents;