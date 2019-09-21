<template>
  <section class="student-info-area">
    <Security></Security>
    <router-link to="VantIndexAnchor?type=region" class="form-group">
      <span class="form-label">地区</span>
      <div class="form-content">
        <span class="form-val">{{region}}</span>
        <i data-v-13d26bc6 class="van-icon van-icon-arrow right-icon"></i>
      </div>
    </router-link>
    <div class="form-group">
      <span class="form-label">院校名称</span>
      <div class="form-content">
        <span class="form-val">{{studentName}}</span>
        <i data-v-13d26bc6 class="van-icon van-icon-arrow right-icon"></i>
      </div>
    </div>
    <div class="form-group">
      <span class="form-label">当前状态</span>
      <div class="form-content">
        <span class="form-val">{{status}}</span>
        <i data-v-13d26bc6 class="van-icon van-icon-arrow right-icon"></i>
      </div>
    </div>

    <Footertip class="mt20"></Footertip>
    <div class="button submit-info">提交</div>
  </section>
</template>

<script>
import Security from "./Security";
import Footertip from "./Footertip";
import { mapGetters } from "vuex";
export default {
  name: "StudentInfo",
  components: { Security, Footertip },
  data() {
    return {
      region: "", //地区
      studentName: "", //院校名称
      status: "", //当前状态
      regionList: [] //地区列表
    };
  },
  created() {
    // 通过计算属性获取选择的地区，若未选择则为空
    this.region = this.studentRegion;
    // 获取地区列表
    this.getReginList();
    
  },
  methods: {
    getReginList() {
      this.regionList = [
        {
          index: 'A',
          list: [{ id: 1, name: "安徽" }, { id: 2, name: "安庆" }]
        },
        {
          index: 'B',
          list: [{ id: 3, name: "北京" }, { id: 4, name: "北海" }]
        }
      ];
    }
  },
  // 从vuex的store中获取topMusicList的id 使用this.$store.getters.****方法
  // 语法糖 把vuex.store中的gettters 映射到vuex提供的一个方法mapGetters(['getters中定义的方法名','方法名2'])
  // 如果要把getters中的方法取一个别的名字,那么mapGetters({region,'studentRegion'})--中使用对象  这样就相当于把studentRegion取名为region
  // 由于getters 相当于vuex中的computed 当依赖发生变化时getter中也会发生变化,
  // 所以通过对象拓展的方法,把getter混入到computed中
  computed: {
    ...mapGetters(["studentRegion"])
  }
};
</script>

<style lang="less" scoped>
.student-info-area {
  height: 100%;
  background-color: #f7f7f7;
  .form-group {
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: center;
    height: 1.04rem;
    padding: 0 0.36rem;
    border-bottom: 0.02rem solid #f7f7f7;
    background-color: #fff;
    .form-label {
      line-height: 0.4rem;
      font-size: 0.3rem;
    }
    .form-content {
      height: 0.4rem;
      font-size: 0.28rem;
      text-align: right;
      .form-val {
        display: inline-block;
        vertical-align: middle;
        line-height: 0.4rem;
      }
      .right-icon {
        vertical-align: middle;
        line-height: 0.4rem;
      }
    }
  }
}
</style>