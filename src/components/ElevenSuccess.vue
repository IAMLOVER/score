<template>
  <section class="eleven">
    <div class="eleven-content">
      <img src="../assets/image/creditLife/bg_success@2x.png" alt />
      <div class="receive" @click="goMyOrder">
          我的订单
      </div>
      <img src="../assets/image/creditLife/ic_close@2x.png" alt="" class="close" @click="elevenSuccessShow">
    </div>
  </section>
</template>

<script>
export default {
  name: "ElevenSuccess",
  methods: {
    elevenSuccessShow(){
      this.$emit("elevenSuccessShow")
    },
    goMyOrder(){
      this.$emit("goMyOrder")
    }
  }
};
</script>

<style lang="less" scoped>
.eleven {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 999;
  padding-top: 2rem;
  .eleven-content {
    width: 100vw;
    height: 6.9rem;
    box-sizing: border-box;
    position: relative;
    img {
      width: 100%;
      height: 6.9rem;
    }
    .receive{
        width: 3.23rem;
        height: .8rem;
        line-height: .8rem;
        font-size: .4rem;
        border-radius: .4rem;
        text-align: center;
        font-weight: 500;
        color: #653420;
        font-family: PingFang SC;
        background:linear-gradient(0deg,rgba(248,199,87,1) 0%,rgba(245,191,82,1) 16%,rgba(253,242,144,1) 98%);
        box-shadow:0rem .1rem 3rem 0rem rgba(0, 0, 0, 0.8);
        position: absolute;
        left: 50%;
        transform: translateX(-1.615rem);
        bottom: .5rem;
    }
    .close{
        width: .75rem;
        height: .75rem;
        margin: 0 auto;
        margin-top: .4rem;
    }
  }
}
</style>