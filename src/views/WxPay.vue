<template>
  <div>

  </div>
</template>

<script>
import WX_SDK from "@/assets/js/WX_SDK.js";
export default {
  name: "WxPay",
  mixins: [WX_SDK],
  data() {
    return {};
  },
  created() {
    this.$tools.showLoading();
    console.dir(this.myWXPay);
    this.myWXPay(res => {}, err => {}, cancel => {});
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>