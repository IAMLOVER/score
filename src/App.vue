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
</style>
