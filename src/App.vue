<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
document.body.addEventListener("touchstart", function() {});
export default {
  data() {
    return {};
  },
  created() {}
};
</script> 

<style lang="less">
html,
body {
  height: 100%;
  -webkit-overflow-scrolling: touch;
}
#app {
  margin: 0 auto;
  max-width: 750px;
  min-height: 100vh;
}
// 修改vant插件在ios10.3.3下面 picker组件无法拖动问题
.van-popup {
  overflow-y: hidden !important;
}
.van-picker-column {
  position: relative;
  z-index: 1;
  &::before {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  & > ul {
    z-index: -1;
    position: relative;
  }
}
// 修改swiper 样式
// banner分页器样式
.banner-pagination {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #fff;
  opacity: 0.5;
  margin: 0 4px;
}
.banner-pagination-active {
  opacity: 1;
}

// 公共提交按钮样式
.submit-info {
  margin: 0.5rem auto 0;
  width: 6.8rem;
  height: 0.92rem;
  line-height: 0.92rem;
  text-align: center;
  border-radius: 0.08rem;
  background-color: #dedede;
  color: #9a9a9a;
  pointer-events: none;
  font-size: 0.36rem;
  &.active {
    background-color: #f4552c;
    color: #fff;
    pointer-events: auto;
    &:active {
      background: #f3802b;
      -webkit-tap-highlight-color: transparent;
    }
  }
}
// 公共样式
.mt20 {
  margin-top: 0.4rem !important;
}
</style>
