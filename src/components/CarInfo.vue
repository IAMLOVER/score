<template>
  <section class="car-info-area">
    <p class="car-info-title">- 请拍摄行驶证，并录入信息 -</p>
    <div class="pic-car">
      <Camear tip="拍摄行驶证主页"></Camear>
    </div>
    <div class="pic-car">
      <Camear tip="拍摄行驶证副页"></Camear>
    </div>
  </section>
</template>

<script>
import Camear from "./Camear";
export default {
  name: "CarInfo",
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
.car-info-area {
  height: 100%;
}
.car-info-title {
  line-height: 0.94rem;
  text-align: center;
  color: #9a9a9a;
}
.pic-car {
  margin-bottom: 0.3rem;
}
</style>