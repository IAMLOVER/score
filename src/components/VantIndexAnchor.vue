<template>
  <van-index-bar :index-list="indexList">
    <template v-for="item in dataList">
      <van-index-anchor :index="item.index" :key="item.index" />
      <template v-if="item.list&&item.list.length>0">
        <VantCell
          v-for="item2 in item.list"
          :key="item2.id"
          :title="item2.name"
          @selectFn="selectFn"
        ></VantCell>
      </template>
    </template>

    <!-- <van-index-anchor index="B" />
    <VantCell title="北京" @selectFn="selectFn"></VantCell>
    <van-index-anchor index="C" />
    <VantCell title="重庆" @selectFn="selectFn"></VantCell>
    <van-index-anchor index="D" />
    <VantCell title="东莞" @selectFn="selectFn"></VantCell>
    <van-index-anchor index="H" />
    <VantCell title="海南省" @selectFn="selectFn"></VantCell>-->
  </van-index-bar>
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
      this.dataList = [
        {
          index: "A",
          list: [{ id: 1, name: "安徽" }, { id: 2, name: "安庆" }]
        },
        {
          index: "B",
          list: [{ id: 3, name: "北京" }, { id: 4, name: "北海" }]
        },
        {
          index: "C",
          list: [{ id: 5, name: "重庆" },{id:6,name:"长安"}]
        },
        {
          index: "D",
          list: [{ id: 7, name: "大连" }]
        }
      ];
      // 过滤数据获得索引
      this.dataList.forEach(item => {
        this.indexList.push(item.index);
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
/deep/ .van-index-anchor {
  background-color: #eceded;
}
</style>