<template>
  <section class="goods-toast-area">
    <div class="toast-main">
      <div
        class="toast-top"
        :class="typeIcon=='success'?'success':'fail'"
      >
        <div class="toast-icon"></div>
      </div>
      <div class="toast-bottom">
        <p class="toast-title">
          {{toastTitle}}
        </p>
        <p class="toast-desc">{{toastDesc}}</p>

        <div
          v-if="typeIcon=='success'"
          class="toast-btn success"
          @click="sureSubmit('success')"
        >确 认</div>
        <div
          v-else
          class="toast-btn fail"
          @click="sureSubmit('fail')"
        >重新支付</div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "GoodsToast",
  props: ["typeIcon"],
  data() {
    return {};
  },
  computed: {
    toastTitle() {
      let toastTitleStr = this.typeIcon == "success" ? "支付成功" : "支付失败";
      return toastTitleStr;
    },
    toastDesc() {
      let toastDescStr =
        this.typeIcon == "success"
          ? "恭喜您，订单已经支付成功"
          : "请仔细检查订单再重新支付";
      return toastDescStr;
    }
  },
  methods: {
    sureSubmit(status) {
      status = status == "success" ? true : false;
      this.$emit("sure", status);
    }
  }
};
</script>

<style lang="less" scoped>
.goods-toast-area {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .toast-main {
    width: 4.5rem;
    height: 5.4rem;
    background-color: #fff;
    border-radius: 0.24rem;
    overflow: hidden;
    .toast-top {
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      .toast-icon {
        width: 1.3rem;
        height: 1.3rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      &.success {
        background-color: #00d4b5;
        .toast-icon {
          background-image: url("../assets/image/goods/ic_success@2x.png");
        }
      }
      &.fail {
        background-color: #ff5474;
        .toast-icon {
          background-image: url("../assets/image/goods/ic_fail@2x.png");
        }
      }
    }
    .toast-bottom {
      height: 50%;
      padding: 0.32rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .toast-title {
        line-height: 0.44rem;
        font-size: 0.32rem;
        font-weight: 600;
        color: #333333;
      }
      .toast-desc {
        line-height: 0.32rem;
        color: #8a8a8a;
        margin: 0.1rem 0 0.32rem 0;
      }
      .toast-btn {
        width: 3.28rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        border-radius: 0.4rem;
        font-size: 0.32rem;
        color: #fff;
        cursor: pointer;
        user-select: none;

        &.success {
          background-color: #00d4b5;
          &:active {
            background: #f3802b;
            -webkit-tap-highlight-color: transparent;
          }
        }
        &.fail {
          background-color: #ff5474;
          &:active {
            background: #f4552c;
            -webkit-tap-highlight-color: transparent;
          }
        }
      }
    }
  }
}
</style>