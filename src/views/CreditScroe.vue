<template>
  <section class="credit-page">
    <!-- BANNER AREA -->
    <section class="banner-area" @click="goToInterpretation">
      <div class="score-area" :class="areaIcon">
        <p class="score">{{scoreData}}</p>
        <p>信用{{gradeStr}}</p>
      </div>
      <p class="updatetime-area">
        <span>评估时间：</span>
        <span class="updatetime">{{assessTime}}</span>
      </p>
    </section>
    <!-- FOUR MENU -->
    <section class="four-menu-area">
      <ul class="four-content">
        <li class="four-item" @click="goToQuickScore">
          <span class="item-icon kuaishutifen"></span>
          <span class="item-title">快速提分</span>
        </li>
        <li class="four-item" @click="goToCreditReport">
          <span class="item-icon xinyongbaogao"></span>
          <span class="item-title">信用报告</span>
        </li>
        <li class="four-item" @click="goToCreditCheese">
          <span class="item-icon lishizhangdan"></span>
          <span class="item-title">信用芝士</span>
        </li>
        <li class="four-item" @click="goToCreditLife">
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
          @click="recommendLinkTo(item.eventUrl)"
          v-for="(item,index) in hotRecommend"
          :key="index"
        >
          <a href="javascript:;">
            <img :src="imgPrePath + item.pictureUrl" alt />
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
        @click="activityLinkTo(item.eventUrl)"
        v-for="(item,index) in activityOne"
        :key="index"
      >
        <img :src="imgPrePath + item.pictureUrl" alt v-if="item.pictureUrl" />
      </div>
      <div class="activity-sub-imgs">
        <div
          :class="index == 0 ? 'left' : 'right'"
          @click="activityLinkTo(item.eventUrl)"
          v-for="(item,index) in activitySub"
          :key="index"
        >
          <img :src="imgPrePath + item.pictureUrl" alt v-if="item.pictureUrl" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations } from "vuex";
import WX_SDK from "@/assets/js/WX_SDK.js";
export default {
  name: "CreditScore",
  mixins: [WX_SDK],
  components: {},
  data() {
    return {
      mark: "", // 来源渠道
      isReport: "", // 是否做过征信
      customerId: "", // 渠道用户id
      assessTime: "", // 当前评估时间
      scoreData: "", //信用分默认400
      areaIcon: "icon4", //仪表盘背景图
      token: "", //用户token
      userId: "", //用户id
      gradeStr: "", //级别
      hotRecommend: [], // 热门推荐
      activity: [], // 精选活动
      activitySub: []
    };
  },
  created() {
    // 判断导航上是否有渠道mark字段，// bianlimao
    this.mark = this.$route.query.mark;
    if (this.mark == "bianlimao") {
      this.customerId = this.$route.query.customerId;
      this.customerLogin(this.mark, this.customerId);
    } else {
      this.token = this.userIdToken.token;
      this.userId = this.userIdToken.userId;
      this.getScoreData();
    }
    // 获取热门推荐
    this.getHotRecommend();
    // 获取精选活动
    this.getActivity();
  },
  mounted() {},
  methods: {
    ...mapMutations([
      "SET_TOKEN_USERID",
      "SET_SCOREDATA_GRADE",
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
          let { creditScore, differenceTime, assessTime } = res.data;
          // 设置分数
          this.scoreData = creditScore;
          // 设置评估时间
          this.assessTime = assessTime;
          // 设置个人信息状态
          this.setUserInfoStatus(res.data);
          // 设置表盘和对应的级别和时间差
          this.setGrade(differenceTime);
          // 设置微信分享
          this.myWxShare(
            {
              shareLink: location.href,
              shareTitle: "便利生活更舒心",
              shareDesc: "便利生活更舒心",
              shareImg:
                location.origin + require("../assets/image/login/logBg@2x.png")
            },
            res => {
              // 成功
            },
            err => {
              // 失败
            },
            cancel => {
              // 取消
              showMsg("分享取消");
            }
          );
        } else {
          showMsg(res.msg, 500);
          // this.$router.push({ name: "Login" });
        }
      });
    },
    showMsg(param) {
      if (param == "delLocalStorage") {
        localStorage.clear();
        this.$router.push({ name: "Login" });
        return;
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
      // 设置等级描述和等级对应的图片
      this.gradeStr = this.getCreditScoreGrade.gradeStr;
      this.areaIcon = `icon${this.getCreditScoreGrade.grade}`;
    },
    setUserInfoStatus(data) {
      const {
        creditScore,
        nickname,
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
      this.SET_TOKEN_USERID({
        token: this.token,
        userId: this.userId
      });
      this.SET_SCOREDATA_GRADE(creditScore);
      this.SET_IDCARD_STATUS(idCardStatus);
      this.SET_PASSPORT_STATUS(passportStatus);
      this.SET_STUDENT_INFO_STATUS(educationStatus);
      this.SET_EMAIL_STATUS(emailStatus);
      this.SET_DRIVE_STATUS(driverLicenseStatus);
      this.SET_CAR_INFO_STATUS(drivingLicenseStatus);
      this.SET_HOUSE_INFO_STATUS(deedStatus);
      this.SET_ZHIMA_INFO_STATUS(sesameStatus);
      this.SET_JD_INFO_STATUS(jingdongStatus);
      localStorage.setItem("nickname", nickname);
    },
    // 热门推荐
    getHotRecommend() {
      let { callServer, showMsg } = this.$tools;
      let params = {};
      params.mark = this.mark;
      callServer("post", "/djh/recomment_xyf/list", params).then(res => {
        if (res.code == 0) {
          this.hotRecommend = res.data.list;
        } else {
          showMsg(res.msg);
        }
      });
    },
    // 精选活动
    getActivity() {
      let { callServer, showMsg } = this.$tools;
      let params = {};
      params.mark = this.mark;
      callServer("post", "/djh/selected_activity/list", params).then(res => {
        if (res.code == 0) {
          this.activity = res.data.list;
          this.activitySub = this.activity.splice(1, 2);
        } else {
          showMsg(res.msg);
        }
      });
    },
    // 去信用解读
    goToInterpretation() {
      this.$router.push({
        name: "Interpretation",
        query: { scoreData: this.scoreData }
      });
    },
    // 去快速提分,需要根据渠道补充跳转链接
    goToQuickScore() {
      if (this.mark) {
        this.$router.push({
          name: "QuickScore",
          query: {
            scoreData: this.scoreData,
            mark: this.mark,
            isReport: this.isReport
          }
        });
      } else {
        this.$router.push({
          name: "QuickScore",
          query: { scoreData: this.scoreData }
        });
      }
    },
    // 去信用报告,根据渠道用户是否做过信检，跳转不同页面
    goToCreditReport() {
      // 其他渠道进入，并且没有完成信检，刷新当前页，后面加入#need_report字段，交予app监听
      if (this.mark && this.isReport == 0) {
        window.location.href = `${window.location.href}#need_report`;
        return;
      }
      // 其他渠道进入，并且完成信检，刷新当前页，后面加入#go_report字段，交予app监听
      if (this.mark && this.isReport == 1) {
        window.location.href = `${window.location.href}#go_report`;
        return;
      }
      const { callServer, showLoading, hideLoading, showMsg } = this.$tools;
      showLoading();
      callServer("post", "/djh/user_info/report_token", {
        userId: this.userId,
        token: this.token
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          console.log(res.data);
          if (res.data.token) {
            window.location.href = `http://wlm.dazhongdianjin.com/creditReport/creditReportNew/creditSearchNew.html?token=${res.data.token}`;
          } else {
            this.$router.push({ name: "CreditReport" });
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
    // 去信用芝士
    goToCreditCheese() {
      this.$router.push({ name: "CreditCheese" });
    },
    // 去信用生活
    goToCreditLife() {
      this.$router.push({
        name: "CreditLife",
        query: { scoreData: this.scoreData }
      });
    },
    // 跳转热门推荐
    recommendLinkTo(url) {
      window.location.href = url;
    },
    // 跳转精选活动
    activityLinkTo(url) {
      let { showMsg } = this.$tools;
      if (!url) {
        showMsg("功能正在开发中，敬请期待...");
        return;
      } else {
        window.location.href = url;
      }
    },
    // 来自其他渠道用户的登录
    customerLogin(mark, customerId) {
      let { callServer, showMsg } = this.$tools;
      let params = {};
      params.mark = mark;
      params.customerId = customerId;
      callServer("post", "/djh/user_info/cat/login", params)
        .then(res => {
          if (res.code == 0) {
            this.userId = res.data.userId;
            this.token = res.data.token;
            this.isReport = res.data.isReport;
          } else {
            showMsg(res.msg);
          }
        }).then(res => {
             this.getScoreData();
        })
    }
  },
  computed: {
    ...mapGetters(["userIdToken", "getCreditScoreGrade"]),
    activityOne() {
      return this.activity.splice(0, 1);
    },
    imgPrePath() {
      let baseURL = window.location.origin;
      baseURL =
        baseURL.indexOf(".com") > -1
          ? "http://xyf.dazhongdianjin.com"
          : "http://xyf.dazhongdianjin.cn";
      return baseURL;
    }
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
