<template>
  <section class="security-area">
    信息安全保护中，未经你授权不对外提供
  </section>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.security-area {
  position: relative;
  line-height: 0.94rem;
  text-align: center;
  color: #9a9a9a;
  background-color: #F7F7F7;
  &::before {
    content: "";
    position: absolute;
    width: 0.24rem;
    height: 0.28rem;
    top: 50%;
    left: 1.24rem;
    transform: translateY(-50%);
    background: url("../assets/image/editInfo/Security_check@2x.png") no-repeat
      center center / 100% 100%;
  }
}
</style>