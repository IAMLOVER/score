<template>
  <section class="quick-score-page">
    <!-- BG AREA -->
    <section class="bg-area">
      <p class="score-data">{{scoreData}}</p>
      <p class="now-score">当前信用</p>
      <p class="next-time">距下次评估:20天 16时 : 43分 : 52秒</p>
    </section>
    <!-- FRIEND TIPS AREA -->
    <section class="friend-tips-area mb8">
      <p class="friend-tip">- 以下内容有助于更好的评估您的信用 -</p>
      <p class="quick-title main-wrap">快速提升</p>
      <div
        class="sub-wrap"
        @click="showMsg"
      >
        <span class="icon ic-bigdata"></span>
        <span class="sub-title">征信大数据</span>
        <span class="ic-warning"></span>
        <span class="colorf455">￥<span class="price">19.9</span></span>
        <span class="colorf455 query">我要查询</span>
      </div>
    </section>
    <!-- OWN INFOS AREA -->
    <section class="own-infos-area mb8">
      <p class="main-wrap">个人信息</p>
      <div
        class="sub-wrap"
        v-for="item in ownInfoList"
        :key="item.id"
        @click="goToEditInfo(item.enname,item.status)"
      >
        <span
          class="icon"
          :class="item.style"
        ></span>
        <div class="right">
          <span class="sub-title">{{item.name}}</span>
          <span
            class="pending"
            v-if="item.status==0"
          >待完成</span>
          <span
            class="suc-icon"
            v-else
          ></span>
        </div>
      </div>
    </section>

    <!-- JOBS AREA -->
    <section class="jobs-area mb8">
      <p class="main-wrap">职业</p>
      <div
        class="sub-wrap"
        v-for="item in jobList"
        :key="item.id"
      >
        <span
          class="icon"
          :class="item.style"
        ></span>
        <div class="right">
          <span class="sub-title">{{item.name}}</span>
          <span
            class="pending"
            v-if="item.status==0"
          >待完成</span>
          <span
            class="suc-icon"
            v-else
          ></span>
        </div>
      </div>
    </section>

    <!-- CREDITS AREA -->
    <section class="credits-area">
      <p class="main-wrap">信用</p>
      <div
        class="sub-wrap"
        v-for="item in jobList"
        :key="item.id"
      >
        <span
          class="icon"
          :class="item.style"
        ></span>
        <div class="right">
          <span class="sub-title">{{item.name}}</span>
          <span
            class="pending"
            v-if="item.status==0"
          >待完成</span>
          <span
            class="suc-icon"
            v-else
          ></span>
        </div>
      </div>
    </section>
    <footer>
      您的个人信息以严格的认证标准进行保护， 未经您的授权不会对任何第三方提供。
    </footer>

  </section>
</template>

<script>
export default {
  name: "QuickScore",
  components: {},
  data() {
    return {
      scoreData: "", //分数
      ownInfoList: [], //个人信息数据
      jobList: [], //职业数据
      creditList: [] //信用数据
    };
  },
  created() {
    this.$tools.showLoading();
    let { scoreData } = this.$route.query;
    this.scoreData = scoreData;
    this.getOwnInfoList();
    this.getJobList();
    this.getCreditList();
  },
  mounted() {
    setTimeout(() => {
      this.$tools.hideLoading();
    }, 500);
  },
  methods: {
    getOwnInfoList() {
      this.ownInfoList = [
        {
          id: 1, //用于循环key值
          enname: "IdCard",
          name: "身份证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-card"
        },
        {
          id: 2,
          enname: "PassPort",
          name: "护照",
          status: 0, //1表示完成，0表示未完成
          style: "ic-passport"
        },
        {
          id: 3,
          enname: "StudentInfo",
          name: "学籍信息",
          status: 0, //1表示完成，0表示未完成
          style: "ic-info"
        },
        {
          id: 4,
          enname: "EMail",
          name: "单位邮箱",
          status: 0, //1表示完成，0表示未完成
          style: "ic-mail"
        },
        {
          id: 5,
          enname: "Drive",
          name: "驾驶证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-drive"
        },
        {
          id: 6,
          enname: "CarInfo",
          name: "车辆信息",
          status: 0, //1表示完成，0表示未完成
          style: "ic-carinfo"
        },
        {
          id: 7,
          enname: "HouseInfo",
          name: "房产信息",
          status: 0, //1表示完成，0表示未完成
          style: "ic-houseinfo"
        }
      ];
    },
    getJobList() {
      this.jobList = [
        {
          id: 1, //用于循环key值
          name: "BOSS直聘认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-boss"
        },
        {
          id: 2,
          name: "脉脉认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-maimai"
        },
        {
          id: 3,
          name: "领英认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-in"
        },
        {
          id: 4,
          name: "猎聘认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-liepin"
        }
      ];
    },
    getCreditList() {
      this.creditList = [
        {
          id: 1, //用于循环key值
          name: "芝麻信用",
          status: 0, //1表示完成，0表示未完成
          style: "ic-zhima"
        },
        {
          id: 2,
          name: "京东信用",
          status: 0, //1表示完成，0表示未完成
          style: "ic-jingdong"
        }
      ];
    },
    goToEditInfo(info, status) {
      if (status) {
        this.$tools.showMsg("信息已填写完成");
        return;
      }
      this.$router.push({ path: `EditInfo/${info}`, query: { info: info } });
    },
    showMsg() {
      this.$tools.showMsg("功能正在开发，敬请期待...");
    }
  }
};
</script>

<style lang="less" scoped>
.quick-score-page {
  width: 100%;
  min-height: 100%;
  background-color: #f7f7f7;
  // 公共样式
  .mb8 {
    margin-bottom: 0.16rem;
  }
  .colorf455 {
    color: #f4552c;
  }
  .main-wrap {
    position: relative;
    padding-left: 0.36rem;
    line-height: 0.96rem;
    font-size: 0.32rem;
    font-weight: 600;
  }
  .sub-wrap {
    position: relative;
    padding-left: 0.36rem;
    padding-right: 0.36rem;
    line-height: 1.04rem;
    font-size: 0.3rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .sub-title {
      font-size: 0.3rem;
      margin-left: 0.24rem;
    }
    // 列表图标
    .icon {
      width: 0.36rem;
      height: 0.36rem;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      &.ic-bigdata {
        background-image: url("../assets/image/quickScore/ic_bigdata@2x.png");
      }
      &.ic-card {
        background-image: url("../assets/image/quickScore/ic_card@2x.png");
      }
      &.ic-passport {
        background-image: url("../assets/image/quickScore/ic_passport@2x.png");
      }
      &.ic-info {
        background-image: url("../assets/image/quickScore/ic_info@2x.png");
      }
      &.ic-mail {
        background-image: url("../assets/image/quickScore/ic_mail@2x.png");
      }
      &.ic-drive {
        background-image: url("../assets/image/quickScore/ic_drive@2x.png");
      }
      &.ic-carinfo {
        background-image: url("../assets/image/quickScore/ic_carinfo@2x.png");
      }
      &.ic-houseinfo {
        background-image: url("../assets/image/quickScore/ic_houseinfo@2x.png");
      }
      &.ic-boss {
        background-image: url("../assets/image/quickScore/ic_boss@2x.png");
      }
      &.ic-maimai {
        background-image: url("../assets/image/quickScore/ic_maimai@2x.png");
      }
      &.ic-in {
        background-image: url("../assets/image/quickScore/ic_in@2x.png");
      }
      &.ic-liepin {
        background-image: url("../assets/image/quickScore/ic_liepin@2x.png");
      }
      &.ic-zhima {
        background-image: url("../assets/image/quickScore/ic_zhima@2x.png");
      }
      &.ic-jingdong {
        background-image: url("../assets/image/quickScore/ic_jingdong@2x.png");
      }
    }
    // 列表右侧内容
    .right {
      flex: 1;
      border-bottom: 0.02rem solid #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    // 待完成样式
    .pending {
      position: relative;
      color: #f4552c;
      font-size: 0.26rem;
      font-weight: 500;
      padding-right: 0.2rem;
      &::after {
        content: "";
        position: absolute;
        width: 0.1rem;
        height: 0.2rem;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        background: url("../assets/image/quickScore/arrow_back@2x.png")
          no-repeat center center / 100% 100%;
      }
    }
    // 已完成样式
    .suc-icon {
      width: 0.36rem;
      height: 0.36rem;
      background: url("../assets/image/quickScore/ic_correct@2x.png") no-repeat
        center center / 100% 100%;
    }

    &:last-child {
      .right {
        border-bottom: none;
      }
    }
    // 点击hover效果
    &:active {
      background: #f5f5f5;
      -webkit-tap-highlight-color: transparent;
    }
  }
}

.bg-area {
  width: 100%;
  height: 2.96rem;
  padding-top: 0.4rem;
  background: linear-gradient(
    360deg,
    rgba(242, 128, 73, 1) 0%,
    rgba(251, 206, 79, 1) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  .score-data {
    line-height: 1rem;
    font-size: 0.72rem;
    font-weight: 600;
    text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    color: #fff;
  }
  .now-score,
  .next-time {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.28rem;
    line-height: 0.4rem;
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  }
  .now-score {
    margin-bottom: 0.2rem;
  }
}
.friend-tips-area {
  background-color: #fff;

  .friend-tip {
    color: #9a9a9a;
    line-height: 0.34rem;
    text-align: center;
    padding: 0.28rem 0;
  }
  .quick-title {
    &::after {
      content: "";
      position: absolute;
      width: 0.36rem;
      height: 0.36rem;
      top: 50%;
      left: 1.8rem;
      transform: translateY(-50%);
      background: url("../assets/image/quickScore/ic_up@2x.png") no-repeat
        center center / 100% 100%;
    }
  }
  .ic-warning {
    width: 0.36rem;
    height: 0.36rem;
    margin: 0 0.1rem;
    background: url("../assets/image/quickScore/ic_warning@2x.png") no-repeat
      center center / 100% 100%;
  }
  .price {
    font-size: 0.4rem;
    font-weight: 800;
  }
  .query {
    position: absolute;
    right: 0.36rem;
    font-weight: 500;
  }
}
.own-infos-area,
.credits-area,
.jobs-area {
  background-color: #fff;
}
footer {
  padding: 0.4rem 1.08rem;
  line-height: 0.4rem;
  font-size: 0.28rem;
  color: rgba(244, 85, 44, 0.4);
  text-align: center;
}
</style>