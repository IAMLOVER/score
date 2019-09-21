<template>
  <van-index-bar @select="select">
    <van-index-anchor index="A" />
    <div class="van-cell">
      <div class="van-cell__title">安徽</div>
    </div>
    <van-index-anchor index="B" />
    <div class="van-cell">
      <div class="van-cell__title">北京</div>
    </div>
    <van-index-anchor index="C" />
    <div class="van-cell">
      <div class="van-cell__title">重庆</div>
    </div>
    <van-index-anchor index="D" />
    <div class="van-cell">
      <div class="van-cell__title">东莞</div>
    </div>
    <van-index-anchor index="H" />
    <div class="van-cell">
      <div class="van-cell__title">海南省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">河北省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">黑龙江省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">河南省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">湖北省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">湖南省</div>
    </div>
    <van-index-anchor index="I" />
    <div class="van-cell">
      <div class="van-cell__title">东莞</div>
    </div>
    <van-index-anchor index="J" />
    <div class="van-cell">
      <div class="van-cell__title">海南省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">河北省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">黑龙江省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">河南省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">湖北省</div>
    </div>
    <div class="van-cell">
      <div class="van-cell__title">湖南省</div>
    </div>
  </van-index-bar>
</template>

<script>
export default {
  name: "VantIndexAnchor",
  data() {
    return {};
  },
  created() {},
  methods: {
    // 选中的值
    select(val){
    console.log(val)

    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .van-index-anchor {
  background-color: #eceded;
}
</style>