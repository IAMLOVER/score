<template>
  <section class="wxpay-area">
  </section>
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
    // this.$tools.showLoading();
    console.dir(this.myWXPay);
    this.myWXPay(res => {}, err => {}, cancel => {});
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.wxpay-area {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>