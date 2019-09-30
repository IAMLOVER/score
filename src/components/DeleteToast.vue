<template>
  <section class="delete-toast-area">
    <div class="toast-main">
      <div class="icon-delette">
      </div>
      <p class="delete-title">删除确认</p>
      <p class="delete-subtitle">您确定要删除这条信息吗？</p>
      <div
        class="button sure"
        @click="sure"
      >确认</div>
    </div>
    <div
      class="close-area"
      @click="closeToast"
    >

    </div>
  </section>
</template>

<script>
export default {
  name: "DeletToast",
  methods: {
    closeToast() {
      this.$emit("closeFn", false);
    },
    sure() {
      this.$emit("sure");
    }
  }
};
</script>

<style lang="less" scoped>
.delete-toast-area {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .toast-main {
    width: 6.4rem;
    height: 7rem;
    border-radius: 0.08rem;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-delette {
      width: 2.02rem;
      height: 2.02rem;
      margin-top: 0.58rem;
      border-radius: 50%;
      background: url("../assets/image/editInfo/ic_delete_confirm@2x.png")
        no-repeat center center / 100% 100%;
    }
    .delete-title {
      font-size: 0.4rem;
      font-weight: bold;
      line-height: 0.56rem;
      margin: 0.4rem 0 0.2rem;
    }
    .delete-subtitle {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #9a9a9a;
    }
    .sure {
      width: 5.6rem;
      height: 0.96rem;
      margin-top: 1.2rem;
      line-height: 0.96rem;
      text-align: center;
      font-size: 0.36rem;
      background-color: #f4552c;
      color: #fff;
      border-radius: 0.08rem;
      &:active {
        background: #f3802b;
        -webkit-tap-highlight-color: transparent;
      }
    }
  }
  .close-area {
    width: 0.96rem;
    height: 0.96rem;
    cursor: pointer;
    background: url("../assets/image/editInfo/ic_close@2x.png") no-repeat center
      center / 50% 50%;
  }
}
</style>