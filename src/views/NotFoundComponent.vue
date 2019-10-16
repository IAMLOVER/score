<template>
  <section class="not-found-component-area">
    <div class="not-found-img">
      <img
        src="../assets/image/mescrolloptions/404.png"
        alt=""
      >
    </div>
    <p class="not-found-title">OOPS! 这个页面你不能进......</p>
    <p class="not-found-subtitle">请检查您输入的网址是否正确，<br>请勿乱给本站程序员提交非法参数</p>

    <router-link
      to="CreditScore"
      class="go-to-index"
      replace
    >返回首页</router-link>

  </section>
</template>

<script>
export default {
  name: "NotFoundComponent",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.not-found-component-area {
  width: 100%;
  height: 100vh;
  background-color: #f5f7f8;
  .not-found-img {
    padding: 0.2rem;
  }
  .not-found-title {
    line-height: 0.64rem;
    text-align: center;
    color: #1588f1;
    font-weight: 600;
    font-size: 0.32rem;
  }
  .not-found-subtitle {
    padding: 0 0.6rem;
    font-size: .24rem;
    line-height: 0.4rem;
    text-align: center;
    color: #666;
  }
  .go-to-index {
    margin: 0.4rem auto;
    width: 2.2rem;
    height: 0.72rem;
    border-radius: 0.72rem;
    line-height: 0.72rem;
    text-align: center;
    background-color: #1482f0;
    color: #fff;
    cursor: pointer;
    user-select: none;
    opacity: 0;
    animation: show 1s 0.2s ease both;
    &:active {
      background-color: #f5f5f5;
      -webkit-tap-highlight-color: transparent;
    }
  }
// 按钮显示动画
  @keyframes show {
    0% {
      transform: scale(0);
      opacity: 0.5;
    }
    80% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>