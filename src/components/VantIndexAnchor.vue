<template>
  <section class="vant-index-anchor-area">
    <van-index-bar :index-list="indexList">
      <template v-for="(item,name) in dataList">
        <van-index-anchor
          :index="name"
          :key="name"
        />
        <!-- 城市区域 -->
        <template v-if="type==='region'">
          <VantCell
            v-for="item2 in item"
            :key="item2.provinceId"
            :title="item2.provinceName"
            :id="item2.provinceId"
            @selectFn="selectFn"
          ></VantCell>
        </template>

        <!-- 学校区域 -->
        <template v-else>
          <VantCell
            v-for="item2 in item"
            :key="item2.schoolId"
            :title="item2.schoolName"
            :id="item2.schoolId"
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
    const { type, provinceId, provinceName } = this.$route.query;
    this.type = type;
    this.getIndexList(type, provinceId, provinceName);
  },
  methods: {
    // 通过类型获取list值渲染
    getIndexList(type, provinceId, provinceName) {
      if (type === "region") {
        this.getRegionList();
      } else {
        this.getStudentList(provinceId, provinceName);
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

    // 获取学院数据
    getStudentList(provinceId, provinceName) {
      this.$tools
        .callServer("post", "/djh/school/list", { provinceId, provinceName })
        .then(res => {
          if (res.code == 0) {
            this.dataList = res.data.map;
            // 过滤数据获得索引
            this.indexList = Object.keys(this.dataList);
          }
        });
    },

    // 选中的值
    selectFn(val) {
      if (this.type === "region") this.$store.commit("SET_STUDENT_RIGION", val);
      if (this.type === "studentName")
        this.$store.commit("SET_STUDENT_INFO", val);
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