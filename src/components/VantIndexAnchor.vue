<template>
  <section class="vant-index-anchor-area">
    <van-index-bar :index-list="indexList">
      <template v-for="(item,name) in dataList">
        <van-index-anchor
          :index="name"
          :key="name"
        />
        <template v-if="item&&item.length>0">
          <VantCell
            v-for="item2 in item"
            :key="item2.provinceId"
            :title="item2.provinceName"
            @selectFn="selectFn"
          ></VantCell>
        </template>
      </template>
    </van-index-bar>
  </section>
</template>

<script>
import VantCell from "../components/VantCell";
export default {
  name: "VantIndexAnchor",
  components: { VantCell },
  data() {
    return {
      indexList: [], //索引
      dataList: [] //展示的数据内容
    };
  },
  created() {
    const { type } = this.$route.query;
    this.getIndexList(type);
  },
  methods: {
    // 通过类型获取list值渲染
    getIndexList(type) {
      if (type === "region") {
        this.getRegionList();
      } else {
      }
    },
    // 获取地区数据
    getRegionList() {
      this.$tools.callServer("post", "/djh/province/list", {}).then(res => {
        if (res.code == 0) {
          this.dataList = res.data.map;
          // 过滤数据获得索引
          this.indexList = Object.keys(this.dataList);
        }
      });
    },

    // 选中的值
    selectFn(val) {
      this.$store.commit("SET_STUDENT_RIGION", val);
      // 返回上一层
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.vant-index-anchor-area {
  background-color: #eceded;
  padding-bottom: 0.4rem;
  padding-top: 0.1rem;
}
</style>