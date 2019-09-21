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
  }
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
  height: 100%;

}
// 修改vant插件在ios10.3.3下面 picker组件无法拖动问题
.van-popup{
  overflow-y: hidden !important;
}
.van-picker-column{
  position: relative;
  z-index: 1;
  &::before{
    width: 100%;;
    height: 100%;;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
  }
  &>ul{
    z-index: -1;
    position: relative;
  }
}
</style>
