<template>
  <section class="quick-score-page">
    <!-- BG AREA -->
    <section class="bg-area">
      <p class="score-data">{{scoreData}}</p>
      <p class="now-score">当前信用</p>
      <p
        class="next-time"
      >距下次评估:{{differenceTime.day}}天 {{differenceTime.hours}}时 : {{differenceTime.minutes}}分 : {{differenceTime.seconds}}秒</p>
    </section>
    <!-- FRIEND TIPS AREA -->
    <section class="friend-tips-area mb8">
      <p class="friend-tip">- 以下内容有助于更好的评估您的信用 -</p>
      <p class="quick-title main-wrap">快速提升</p>
      <div class="sub-wrap" @click="goToCreditReport">
        <span class="icon ic-bigdata"></span>
        <span class="sub-title">征信大数据</span>
        <span class="ic-warning"></span>
        <span class="colorf455">
          ￥
          <span class="price">19.9</span>
        </span>
        <span class="colorf455 query" v-if="isReport == 0">我要查询</span>
        <span class="suc-icon" v-else style="position:absolute;right:.35rem"></span>
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
        <span class="icon" :class="item.style"></span>
        <div class="right">
          <span class="sub-title">{{item.name}}</span>
          <span class="pending" v-if="item.status==0">待完成</span>
          <span class="suc-icon" v-else></span>
        </div>
      </div>
    </section>

    <!-- JOBS AREA -->
    <section class="jobs-area mb8">
      <p class="main-wrap">职业</p>
      <div class="sub-wrap" v-for="item in jobList" :key="item.id" @click="showMsg">
        <span class="icon" :class="item.style"></span>
        <div class="right">
          <span class="sub-title">{{item.name}}</span>
          <span class="pending" v-if="item.status==0">待完成</span>
          <span class="suc-icon" v-else></span>
        </div>
      </div>
    </section>

    <!-- CREDITS AREA -->
    <section class="credits-area">
      <p class="main-wrap">信用</p>
      <div
        class="sub-wrap"
        v-for="item in creditList"
        :key="item.id"
        @click="goToEditInfo(item.enname,item.status)"
      >
        <span class="icon" :class="item.style"></span>
        <div class="right">
          <span class="sub-title">{{item.name}}</span>
          <span class="pending" v-if="item.status==0">待完成</span>
          <span class="suc-icon" v-else></span>
        </div>
      </div>
    </section>
    <footer>您的个人信息以严格的认证标准进行保护， 未经您的授权不会对任何第三方提供。</footer>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "QuickScore",
  components: {},
  data() {
    return {
      mark: "",
      isReport: "",
      token: "",
      userId: "",
      scoreData: "", //分数
      ownInfoList: [], //个人信息数据
      jobList: [], //职业数据
      creditList: [], //信用数据
      differenceTime: "", //时间
      baseURL: "" // 用于跳转到空白页面的baseUrl
    };
  },
  created() {
    const { scoreData } = this.$route.query,
      differenceTime = JSON.parse(localStorage.getItem("differenceTime"));
    this.scoreData = scoreData;
    this.differenceTime = differenceTime;
    this.token = this.userIdToken.token;
    this.userId = this.userIdToken.userId;
    this.mark = this.$route.query.mark;
    this.isReport = this.$route.query.isReport;
    this.getUserInfo();
    let baseURL = window.location.origin;
    this.baseURL = baseURL.indexOf(".com") > -1 ? "http://m.dazhongdianjin.com" : "http://m.dazhongdianjin.cn";
  },
  mounted() {},
  methods: {
    ...mapMutations([
      "SET_IDCARD_STATUS",
      "SET_PASSPORT_STATUS",
      "SET_STUDENT_INFO_STATUS",
      "SET_EMAIL_STATUS",
      "SET_DRIVE_STATUS",
      "SET_CAR_INFO_STATUS",
      "SET_HOUSE_INFO_STATUS",
      "SET_ZHIMA_INFO_STATUS",
      "SET_JD_INFO_STATUS"
    ]),
    getUserInfo() {
      const { showLoading, callServer, showMsg, hideLoading } = this.$tools;
      showLoading();
      callServer("post", "/djh/user_info/detail", {
        userId: this.userId,
        token: this.token,
        infotype: 0 //基本信息是0
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          let { creditScore, differenceTime } = res.data,
            differenceTimeObj = this.setDifferenceTimeObj(differenceTime);
          // 设置分数
          this.scoreData = creditScore;
          // 设置时间差
          this.differenceTime = differenceTimeObj;
          // 设置个人信息状态到vuex
          this.setUserInfoStatus(res.data);
          // 根据返回的数据设置状态
          this.getOwnInfoList(res.data);
          this.getJobList(res.data);
          this.getCreditList(res.data);
        } else {
          showMsg(res.msg);
        }
      });
    },
    setDifferenceTimeObj(date) {
      return {
        day: parseInt(date / (1000 * 60 * 60 * 24)),
        hours: parseInt((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: parseInt((date % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.round((date % (1000 * 60)) / 1000)
      };
    },
    setUserInfoStatus(data) {
      const {
        idCardStatus,
        passportStatus,
        educationStatus,
        emailStatus,
        driverLicenseStatus,
        drivingLicenseStatus,
        deedStatus,
        sesameStatus,
        jingdongStatus
      } = data;
      this.SET_IDCARD_STATUS(idCardStatus);
      this.SET_PASSPORT_STATUS(passportStatus);
      this.SET_STUDENT_INFO_STATUS(educationStatus);
      this.SET_EMAIL_STATUS(emailStatus);
      this.SET_DRIVE_STATUS(driverLicenseStatus);
      this.SET_CAR_INFO_STATUS(drivingLicenseStatus);
      this.SET_HOUSE_INFO_STATUS(deedStatus);
      this.SET_ZHIMA_INFO_STATUS(sesameStatus);
      this.SET_JD_INFO_STATUS(jingdongStatus);
    },
    getOwnInfoList(data) {
      const {
        idCardStatus,
        passportStatus,
        educationStatus,
        emailStatus,
        driverLicenseStatus,
        drivingLicenseStatus,
        deedStatus
      } = data;
      this.ownInfoList = [
        {
          id: 1, //用于循环key值
          enname: "IdCard",
          name: "身份证",
          status: idCardStatus, //1表示完成，0表示未完成
          style: "ic-card"
        },
        {
          id: 2,
          enname: "PassPort",
          name: "护照",
          status: passportStatus, //1表示完成，0表示未完成
          style: "ic-passport"
        },
        {
          id: 3,
          enname: "StudentInfo",
          name: "学籍信息",
          status: educationStatus, //1表示完成，0表示未完成
          style: "ic-info"
        },
        {
          id: 4,
          enname: "EMail",
          name: "单位邮箱",
          status: emailStatus, //1表示完成，0表示未完成
          style: "ic-mail"
        },
        {
          id: 5,
          enname: "Drive",
          name: "驾驶证",
          status: driverLicenseStatus, //1表示完成，0表示未完成
          style: "ic-drive"
        },
        {
          id: 6,
          enname: "CarInfo",
          name: "车辆信息",
          status: drivingLicenseStatus, //1表示完成，0表示未完成
          style: "ic-carinfo"
        },
        {
          id: 7,
          enname: "HouseInfo",
          name: "房产信息",
          status: deedStatus, //1表示完成，0表示未完成
          style: "ic-houseinfo"
        }
      ];
    },
    getJobList(data) {
      this.jobList = [
        {
          id: 1, //用于循环key值
          enname: "BosssInfo",
          name: "BOSS直聘认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-boss"
        },
        {
          id: 2,
          enname: "MaiMaiInfo",
          name: "脉脉认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-maimai"
        },
        {
          id: 3,
          enname: "LinInfo",
          name: "领英认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-in"
        },
        {
          id: 4,
          enname: "LiePinInfo",
          name: "猎聘认证",
          status: 0, //1表示完成，0表示未完成
          style: "ic-liepin"
        }
      ];
    },
    getCreditList(data) {
      const { sesameStatus, jingdongStatus } = data;
      this.creditList = [
        {
          id: 1, //用于循环key值
          enname: "ZhiMaInfo",
          name: "芝麻信用",
          status: sesameStatus, //1表示完成，0表示未完成
          style: "ic-zhima"
        },
        {
          id: 2,
          enname: "JDInfo",
          name: "京东信用",
          status: jingdongStatus, //1表示完成，0表示未完成
          style: "ic-jingdong"
        }
      ];
    },
    goToEditInfo(info, status) {
      if (status) {
        this.$tools.showMsg("信息已填写完成");
        return;
      }
      if(this.mark && info == "IdCard"){
        window.open(`${this.baseURL}/empty.html#certification`);
        return;
      }
      this.$router.push({ path: `EditInfo/${info}`, query: { info: info } });
    },
    // 去信用报告
    goToCreditReport() {
      const { callServer, showLoading, hideLoading, showMsg } = this.$tools;
        // 其他渠道进入，并且没有完成信检，刷新当前页，后面加入#need_report字段，交予app监听
      if (this.mark && this.isReport == 0) {
        // let url = window.location.href;
        // // 说明点击过了
        // if (url.indexOf("#need_report") > -1) {
        //   url = url.replace(
        //     url.substring(url.indexOf("#need_report"), url.length),
        //     ""
        //   );
        //   window.open(`${this.baseURL}/empty.html#need_report`);
        //   return;
        // }
        // window.open(`${this.baseURL}/empty.html#need_report`);
        showMsg('功能正在完善中...')
        return;
      }
      // 其他渠道进入，并且完成信检，刷新当前页，后面加入#go_report字段，交予app监听
      if (this.mark && this.isReport == 1) {
        return;
      }
      showLoading();
      callServer("post", "/djh/user_info/report_token", {
        userId: this.userId,
        token: this.token
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          if (res.data.token) {
            window.location.href = `http://wlm.dazhongdianjin.com/creditReport/creditReportNew/creditSearchNew.html?token=${res.data.token}`;
          } else {
            showMsg('功能正在完善中...')
            // this.$router.push({ name: "CreditReport" });
          }
        } else if (res.code == 101) {
          // 登录超时
          showMsg(res.msg);
          this.$router.replace({ name: "Login" });
        } else {
          showMsg(res.msg);
        }
      });
    },
    showMsg() {
      this.$tools.showMsg("功能正在开发，敬请期待...");
    }
  },
  computed: {
    ...mapGetters(["userIdToken"])
  }
};
</script>

<style lang="less" scoped>
.quick-score-page {
  width: 100%;
  min-height: 100vh;
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