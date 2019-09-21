<template>
  <section class="student-info-area">
    <Security></Security>
    <div class="form-group">
      <span class="form-title">地区</span>
      <i data-v-13d26bc6 class="van-icon van-icon-arrow"></i>
    </div>
    <div class="form-group">
      <span class="form-title">院校名称</span>
      <i data-v-13d26bc6 class="van-icon van-icon-arrow"></i>
    </div>
    <div class="form-group">
      <span class="form-title">当前状态</span>
      <i data-v-13d26bc6 class="van-icon van-icon-arrow"></i>
    </div>

    <Footertip class="mt20"></Footertip>
    <div class="button submit-info">提交</div>
  </section>
</template>

<script>
import Security from "./Security";
import Footertip from "./Footertip";
export default {
  name: "StudentInfo",
  components: { Security, Footertip },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.student-info-area {
  height: 100%;
  background-color: #f7f7f7;
  .form-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.04rem;
    padding: 0 0.36rem;
    border-bottom: 0.02rem solid #f7f7f7;
    background-color: #fff;
    .form-title {
      font-size: 0.3rem;
    }
  }
}
</style>