<template>
  <section class="quick-score-page">
    <!-- BG AREA -->
    <section class="bg-area">
      <p class="score-data">{{scoreData}}</p>
      <p class="now-score">当前信用</p>
      <p class="next-time">距下次评估:20天 16时 : 43分 : 52秒</p>
    </section>

  </section>
</template>

<script>
export default {
  name: "QuickScore",
  components: {},
  data() {
    return {
      scoreData: ""
    };
  },
  created() {
    let { scoreData } = this.$route.query;
    this.scoreData = scoreData;
  }
};
</script>

<style lang="less" scoped>
.quick-score-page {
  width: 100%;
  height: 100%;
}

.bg-area {
  width: 100%;
  height: 2.96rem;
  padding-top: .4rem;
  background: linear-gradient(
    360deg,
    rgba(242, 128, 73, 1) 0%,
    rgba(251, 206, 79, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  .score-data{
    line-height: 1rem;
    font-size: .72rem;
    font-weight: 600;
    text-shadow:0px 2px 2px rgba(0,0,0,0.2);
    color: #fff;

  }
  .now-score,.next-time{
    color:rgba(255, 255, 255, .8);
    font-size: .28rem;
    line-height: .4rem;
    text-shadow:0px 1px 1px rgba(0,0,0,0.2);
  }
  .now-score{
    margin-bottom: .2rem;
  }
}
</style>