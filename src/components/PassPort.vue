<template>
  <section class="passport-area">
    <p class="passport-title">- 请拍摄实体护照，并录入信息 -</p>
    <Camear tip="拍摄护照主页"></Camear>
  </section>
</template>

<script>
import Camear from "./Camear";
export default {
  name: "PassPort",
  components: {
    Camear
  },
  data() {
    return {};
  },
  created() {
    
  }
};
</script>

<style lang="less" scoped>
.passport-area {
  height: 100%;
}
.passport-title {
  line-height: 0.94rem;
  text-align: center;
  color: #9a9a9a;
}
</style>