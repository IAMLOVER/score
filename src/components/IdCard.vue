<template>
  <section class="id-card-area">
    <p class="id-card-title">- 请拍摄身份证，并录入信息 -</p>
    <div class="pic-id-card">
      <Camear tip="拍摄身份证正面"></Camear>
    </div>
    <div class="pic-id-card">
      <Camear tip="拍摄身份证背面"></Camear>
    </div>
  </section>
</template>

<script>
import Camear from "./Camear";
export default {
  name: "IdCard",
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
.id-card-area {
  height: 100%;
}
.id-card-title {
  line-height: 0.94rem;
  text-align: center;
  color: #9a9a9a;
}
.pic-id-card {
  margin-bottom: 0.3rem;
}
</style>