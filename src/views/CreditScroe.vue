<template>
  <section class="credit-page">
    <!-- BANNER AREA -->
    <section
      class="banner-area"
      @click="goToInterpretation"
    >
      <div
        class="score-area"
        :class="areaIcon"
      >
        <p class="score">{{scoreData}}</p>
        <p>信用{{gradeStr}}</p>
      </div>
      <p class="updatetime-area">
        <span>评估时间：</span>
        <span class="updatetime">{{nowTime|dataFm}}</span>
      </p>

    </section>
    <!-- FOUR MENU -->
    <section class="four-menu-area">
      <ul class="four-content">
        <li
          class="four-item"
          @click="goToQuickScore"
        >
          <span class="item-icon kuaishutifen"></span>
          <span class="item-title">快速提分</span>
        </li>
        <li
          class="four-item"
          @click="goToCreditReport"
        >
          <span class="item-icon xinyongbaogao"></span>
          <span class="item-title">信用报告</span>
        </li>
        <li
          class="four-item"
          @click="showMsg"
        >
          <span class="item-icon lishizhangdan"></span>
          <span class="item-title">历史账单</span>
        </li>
        <li
          class="four-item"
          @click="showMsg"
        >
          <span class="item-icon xinyongshenghuo"></span>
          <span class="item-title">信用生活</span>
        </li>
      </ul>
    </section>
    <!-- HOT RECOMMEND -->
    <section class="hot-recommend-area p24 mb32">
      <p class="title">热门推荐</p>
      <ul class="hot-recommend-wrap">
        <li
          class="recommend-item heimingdan"
          @click="showMsg"
        >
          <a href="javascript:;">
            <img
              src="../assets/image/creditScore/heimingdan@2x.png"
              alt=""
            >
          </a>
        </li>
        <li
          class="recommend-item sifashuju"
          @click="showMsg"
        >
          <a href="javascript:;">
            <img
              src="../assets/image/creditScore/sifashuju@2x.png"
              alt=""
            >
          </a>
        </li>
        <li
          class="recommend-item xinyongxiaozhishi"
          @click="showMsg"
        >
          <a href="javascript:;">
            <img
              src="../assets/image/creditScore/xinyongxiaozhishi@2x.png"
              alt=""
            >
          </a>
        </li>
      </ul>
    </section>
    <!-- TASK -->
    <section class="task-area p24 mb32">
      <p class="title">任务中心</p>
      <ul class="task-wrap">
        <li @click="showMsg">
          <div class="left">
            <p class="task-icon daily"></p>
            <div class="task-desc">
              <p class="task-titles">
                <span>每日签到赢大奖</span>
                <span class="faf5">天天抽不停</span>
              </p>
              <p class="ce959">信用分+2</p>
            </div>
          </div>
          <div class="right completed">
            <span>已完成</span>
          </div>
        </li>
        <li @click="showMsg">
          <div class="left">
            <p class="task-icon vip"></p>
            <div class="task-desc">
              <p class="task-titles">
                <span>升级VIP会员</span>
                <span class="faf5">信任礼包</span>
              </p>
              <p class="ce959">信用分+200</p>
            </div>

          </div>
          <div class="right">
            <span>未完成</span>
          </div>
        </li>
        <li @click="showMsg">
          <div class="left">
            <p class="task-icon repayment"></p>
            <div class="task-desc">
              <p class="task-titles">
                <span>设置还款计划</span>
                <span class="faf5">VIP专享</span>
              </p>
              <p class="ce959">信用分自动提升</p>
            </div>

          </div>
          <div class="right">
            <span>未完成</span>
          </div>
        </li>
      </ul>

    </section>
    <!-- ACTIVITY -->
    <section class="activity-area p24 mb32">
      <p class="title">精选活动</p>
      <div
        class="activity-main-img"
        @click="showMsg"
      >
        <img
          src="../assets/image/creditScore/activity_main@2x.png"
          alt=""
        >
      </div>
      <div class="activity-sub-imgs">
        <div
          class="left"
          @click="showMsg"
        >
          <img
            src="../assets/image/creditScore/activity_sub_1@2x.png"
            alt=""
          >
        </div>
        <div
          class="right"
          @click="showMsg('delLocalStorage')"
        >
          <img
            src="../assets/image/creditScore/activity_sub_2@2x.png"
            alt=""
          >
        </div>
      </div>
    </section>

  </section>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CreditScore",
  components: {},
  data() {
    return {
      nowTime: new Date(), // 当前评估时间
      scoreData: 400, //信用分默认400
      areaIcon: "icon4", //仪表盘背景图
      token: "", //用户token
      userId: "", //用户id
      gradeStr: "" //级别
    };
  },
  created() {
    if (this.checkLogin()) {
      this.token = this.userIdToken.token;
      this.userId = this.userIdToken.userId;
      this.getScoreData();
    }
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
    checkLogin() {
      const store = JSON.parse(
          localStorage.getItem("store") ? localStorage.getItem("store") : null
        ),
        userId = store ? store.userId : null;
      if (!userId) {
        this.$router.push({ name: "Login" });
        return false;
      }
      return true;
    },
    getScoreData() {
      const { showLoading, hideLoading, callServer, showMsg } = this.$tools;
      showLoading();
      callServer("post", "/djh/user_info/detail", {
        userId: this.userId,
        token: this.token,
        infotype: 0 //基本信息是0
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          let { creditScore, differenceTime } = res.data;
          // 设置分数
          this.scoreData = creditScore;
          // 设置表盘和对应的级别和时间差
          this.setGrade(differenceTime);
          // 设置个人信息状态
          this.setUserInfoStatus(res.data);
        } else {
          showMsg(res.msg, 500);
          this.$router.push({ name: "Login" });
        }
      });
    },
    showMsg(param) {
      if (param == "delLocalStorage") {
        localStorage.clear();
      }
      this.$tools.showMsg("功能正在开发中，敬请期待...");
    },
    setGrade(mss) {
      // 设置时间差毫秒
      const differenceTime = {
        day: parseInt(mss / (1000 * 60 * 60 * 24)),
        hours: parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.round((mss % (1000 * 60)) / 1000)
      };
      localStorage.setItem("differenceTime", JSON.stringify(differenceTime));
      if (this.scoreData >= 400 && this.scoreData < 550) {
        this.areaIcon = "icon4";
        sessionStorage.grade = 4; // 存入sessionstorage对应的级别
        this.gradeStr = "较差";
        return;
      }
      if (this.scoreData >= 550 && this.scoreData < 650) {
        this.areaIcon = "icon5";
        sessionStorage.grade = 5;
        this.gradeStr = "中等";
        return;
      }
      if (this.scoreData >= 650 && this.scoreData < 750) {
        this.areaIcon = "icon6";
        sessionStorage.grade = 6;
        this.gradeStr = "良好";
        return;
      }
      if (this.scoreData >= 750 && this.scoreData < 850) {
        this.areaIcon = "icon7";
        sessionStorage.grade = 7;
        this.gradeStr = "优秀";
        return;
      }
      if (this.scoreData >= 850 && this.scoreData < 950) {
        this.areaIcon = "icon8";
        sessionStorage.grade = 8;
        this.gradeStr = "极好";
        return;
      }
      if (this.scoreData >= 950) {
        this.areaIcon = "icon9";
        sessionStorage.grade = 9;
        this.gradeStr = "极好";
        return;
      }
    },
    setUserInfoStatus(data) {
      const {
        driverLicenseStatus,
        drivingLicenseStatus,
        educationStatus,
        emailStatus,
        idCardStatus,
        passportStatus,
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
    goToInterpretation() {
      this.$router.push({
        name: "Interpretation",
        query: { scoreData: this.scoreData }
      });
    },
    goToQuickScore() {
      this.$router.push({
        name: "QuickScore",
        query: { scoreData: this.scoreData }
      });
    },
    // 去信用报告
    goToCreditReport() {
      if (this.$tools.isWeiXin()) {
        this.$router.push({ name: "WxPay" });
      } else {
        this.$tools.showMsg("功能正在开发敬请期待...");
      }
    }
  },
  computed: {
    ...mapGetters(["userIdToken"])
  }
};
</script>

<style lang="less" scoped>
.banner-area {
  position: relative;
  width: 100%;
  height: 4.2rem;
  background: url("../assets/image/creditScore/banner@2x.png") no-repeat center
    center / 100% 100%;

  .score-area {
    position: absolute;
    width: 2.8rem;
    height: 2.03rem;
    bottom: 1.33rem;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    padding-top: 0.7rem;
    background-size: 100% 100%;
    background-position: center center;
    background-repeat: no-repeat;
    color: #fff;
    font-size: 0.3rem;
    line-height: 0.3rem;
    text-align: center;
    &.icon4 {
      background-image: url("../assets/image/creditScore/400.png");
    }
    &.icon5 {
      background-image: url("../assets/image/creditScore/550.png");
    }
    &.icon6 {
      background-image: url("../assets/image/creditScore/650.png");
    }
    &.icon7 {
      background-image: url("../assets/image/creditScore/750.png");
    }
    &.icon8 {
      background-image: url("../assets/image/creditScore/850.png");
    }
    &.icon9 {
      background-image: url("../assets/image/creditScore/950.png");
    }

    .score {
      font-size: 0.8rem;
      line-height: 1rem;
      font-weight: 600;
    }
  }

  .updatetime-area {
    position: absolute;
    left: 50%;
    bottom: 0.8rem;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    line-height: 0.4rem;
    color: #fff;
  }
}

.four-menu-area {
  position: relative;
  width: 100%;
  height: 1.1rem;

  .four-content {
    position: absolute;
    width: 6.9rem;
    height: 1.2rem;
    left: 50%;
    top: 0;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #fff;
    -webkit-box-shadow: 0px 1px 12px 0px rgba(73, 73, 73, 0.14);
    box-shadow: 0px 1px 12px 0px rgba(73, 73, 73, 0.14);
    border-radius: 0.1rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;

    li {
      width: 25%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      color: #333;
      cursor: pointer;

      .item-title {
        line-height: 0.28rem;
      }

      .item-icon {
        position: relative;
        width: 0.5rem;
        height: 0.45rem;
        margin-bottom: 0.13rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;

        &.kuaishutifen {
          background-image: url("../assets/image/creditScore/kuaishu_icon@2x.png");
        }

        &.xinyongbaogao {
          background-image: url("../assets/image/creditScore/xinyongbaogao_icon@2x.png");
        }

        &.lishizhangdan {
          background-image: url("../assets/image/creditScore/lishizhangdan_icon@2x.png");
        }

        &.xinyongshenghuo {
          background-image: url("../assets/image/creditScore/xinyongshenghuo_icon@2x.png");
        }
      }
    }
  }
}

// 公共样式
.title {
  font-size: 0.24rem;
  line-height: 0.32rem;
  font-weight: 500;
  margin-bottom: 0.15rem;
}

.p24 {
  padding-left: 0.24rem;
  padding-right: 0.24rem;
}

.mb32 {
  margin-bottom: 0.32rem;
}

.ce959 {
  color: #e95957;
}

.faf5 {
  padding: 0 0.16rem;
  background: -o-linear-gradient(
    left,
    rgba(250, 131, 52, 1),
    rgba(245, 170, 24, 1)
  );
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(rgba(250, 131, 52, 1)),
    to(rgba(245, 170, 24, 1))
  );
  background: linear-gradient(
    90deg,
    rgba(250, 131, 52, 1),
    rgba(245, 170, 24, 1)
  );
  border-radius: 0.2rem;
  color: #fff;
}

.hot-recommend-area {
  .hot-recommend-wrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;

    li {
      width: 33.33%;
      height: 1.34rem;
    }
  }
}

.task-area {
  .task-wrap {
    width: 100%;
    min-height: 2.82rem;
    border-radius: 0.1rem;
    -webkit-box-shadow: 0px 1px 12px 0px rgba(73, 73, 73, 0.14);
    box-shadow: 0px 1px 12px 0px rgba(73, 73, 73, 0.14);
    padding: 0.2rem 0.3rem;

    li {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 0.2rem 0;

      .left {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;

        .task-icon {
          width: 0.52rem;
          height: 0.54rem;
          margin-right: 0.24rem;
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;

          &.daily {
            background-image: url("../assets/image/creditScore/daily_icon@2x.png");
          }

          &.vip {
            background-image: url("../assets/image/creditScore/vip_icon@2x.png");
          }

          &.repayment {
            background-image: url("../assets/image/creditScore/repayment_icon@2x.png");
          }
        }

        .task-desc {
          .task-titles {
            margin-bottom: 0.1rem;
          }
        }
      }

      .right {
        width: 1rem;
        height: 0.34rem;
        line-height: 0.34rem;
        text-align: center;
        border-radius: 0.16rem;
        background-color: #cccccc;
        color: #fff;

        &.completed {
          background-color: #ef7d25;
        }
      }
    }
  }
}

.activity-area {
  .activity-main-img {
    width: 100%;
    height: 2.8rem;
  }

  .activity-sub-imgs {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;

    .left,
    .right {
      width: 50%;
    }
  }
}
</style>
