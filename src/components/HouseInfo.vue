<template>
  <section class="house-info-area">
    <div class="house-info-title">请拍摄实体房产证，并录入信息</div>

    <Camear
      tip="房屋所有权页"
      height="10rem"
    ></Camear>
  </section>
</template>

<script>
import Camear from "./Camear";
export default {
  name: "HouseInfo",
  components: {
    Camear
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.house-info-area {
  min-height: 100vh;
  background-color: #f5f5f5;
  .house-info-title {
    line-height: 1.3rem;
    text-align: center;
    color: #666;
    font-size: 0.28rem;
  }
  .camear-box {
    height: 5.9rem;
    margin: 0 auto;
  }
}
</style>