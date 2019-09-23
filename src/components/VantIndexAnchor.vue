<template>
  <section class="vant-index-anchor-area">
    <van-index-bar :index-list="indexList">
      <template v-for="item in dataList">
        <van-index-anchor
          :index="item.index"
          :key="item.index"
        />
        <template v-if="item.list&&item.list.length>0">
          <VantCell
            v-for="item2 in item.list"
            :key="item2.id"
            :title="item2.name"
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
          list: [{ id: 5, name: "重庆" }, { id: 6, name: "长安" }]
        },
        {
          index: "D",
          list: [{ id: 7, name: "大连" }]
        },
        {
          index: "E",
          list: [
            { id: 8, name: "大连" },
            { id: 9, name: "大连" },
            { id: 10, name: "大连" },
            { id: 11, name: "大连" },
            { id: 12, name: "大连" },
            { id: 13, name: "大连" }
          ]
        },
        {
          index: "F",
          list: [
            { id: 14, name: "大连" },
            { id: 15, name: "大连" },
            { id: 16, name: "大连" },
            { id: 17, name: "大连" },
            { id: 18, name: "大连" },
            { id: 19, name: "大连" }
          ]
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

<style lang="less">
body{
  height: auto;
}
.vant-index-anchor-area {

  background-color: #eceded;
  padding-bottom: 0.4rem;
}
</style>