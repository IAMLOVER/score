<template>
  <section class="creditcheese-area">
    <!-- 滚动基本结构 -->
    <MescrollVue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >

    </MescrollVue>
  </section>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "CreditCheese",
  components: { MescrollVue },
  data() {
    return {
      mescrollDown: {
        use: false
      },
      mescrollUp: {}
    };
  },
  created() {},
  methods: {
    mescrollInit(){
      
    }
  }
};
</script>

<style lang="less" scoped>
// 修改vant样式
/deep/.van-tabs__line {
  background-color: #fe7c04;
}
.creditcheese-area {
  width: 100%;
  min-height: 100vh;
}
</style>