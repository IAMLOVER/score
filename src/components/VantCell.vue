<template>
  <!-- 此组件用于VantIndexAnchor 中 -->
  <div
    class="van-cell button"
    @click="select"
  >
    <div class="van-cell__title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "VantCell",
  props: ["title", "id"],
  data() {
    return {};
  },
  created() {},
  methods: {
    select() {
      this.$emit("selectFn", { title: this.title, id: this.id });
    }
  }
};
</script>

<style lang="less" scoped>
.button {
  user-select: none;
  &:active {
    background-color: #f5f5f5;
  }
}
</style>