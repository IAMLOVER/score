<template>
  <section class="credit-life-area">
    <!-- 滚动基本结构 -->

    <!-- BANNER AREA -->
    <section class="banner-area">
      <div class="swiper-container swiper1">
        <div class="swiper-wrapper">
          <!-- 内容 -->
          <div class="swiper-slide swiper-slide-banner" v-for="item in bannerList" :key="item.id">
            <a class="banner-link" :href="item.eventUrl?item.eventUrl:null">
              <img :src="item.pictureUrl" alt />
            </a>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>
      </div>
    </section>

    <!-- CREDIT SCOREDATA -->
    <section class="credit-score-area">
      <div class="score-left">
        <span class="score-icon">您当前的信用分：</span>
        <span class="score">{{scoreData}}</span>
      </div>
      <span class="goMore score-right" @click="goToInterpretation">去查看</span>
    </section>

    <!-- FOUR HOT AREA -->
    <section class="four-hot-area">
      <router-link class="hot-item" to="Recharge">
        <span class="hot1 hot-icon"></span>
        <span class="hot-item-desc">充值</span>
      </router-link>
      <div class="hot-item" @click="showMsg">
        <span class="hot2 hot-icon"></span>
        <span class="hot-item-desc">电影</span>
      </div>
      <router-link class="hot-item" to="GoodShopList?exchangeType=1">
        <span class="hot3 hot-icon"></span>
        <span class="hot-item-desc">兑换</span>
      </router-link>
      <div class="hot-item" @click="goToDingchang">
        <span class="hot4 hot-icon"></span>
        <span class="hot-item-desc">运动</span>
      </div>
    </section>

    <!-- EXCELLENT LIFE AREA -->
    <template v-if="yshList.length>0">
      <CreditLifeList :lifeList="yshList" title="优生活" subtitle="便利生活更舒心" type="1"></CreditLifeList>
      <!-- 分割线 -->
      <div class="line10"></div>
    </template>

    <!-- New entertainment AREA -->
    <template v-if="xylList.length>0">
      <CreditLifeList :lifeList="xylList" title="新娱乐" subtitle="从心定义娱乐" type="2"></CreditLifeList>
      <!-- 分割线 -->
      <div class="line10"></div>

      <!-- 分割线 -->
      <div class="line10"></div>
    </template>

    <!-- Private doctor AREA -->
    <template v-if="djkList.length>0">
      <CreditLifeList :lifeList="djkList" title="大健康" subtitle="平安好医生、私人医生" type="4"></CreditLifeList>
      <!-- 分割线 -->
      <div class="line10"></div>
    </template>

    <!-- Intellectual finance area -->
    <template v-if="zjrList.length>0">
      <CreditLifeList :lifeList="zjrList" title="智金融" subtitle="便捷金融服务" type="3"></CreditLifeList>
    </template>

    <!-- 悬浮按钮 -->
    <router-link class="convert-icon" :to="{name:'MyOrder'}"></router-link>

    <!-- 新用户首次登陆送优惠券，欢迎组件 -->
    <WelcomeToast v-if="isFirstLogin" @closeToast="closeToast" :goodsNoList="goodsNoList"></WelcomeToast>
  </section>
</template>

<script>
import "@/assets/js/swiper.min.js";
import "@/assets/css/swiper.min.css";
import WX_SDK from "@/assets/js/WX_SDK.js";
import CreditLifeList from "../components/CreditLifeList";
import WelcomeToast from "../components/WelcomeToast";

import { mapGetters } from "vuex";
export default {
  name: "CreditLife",
  mixins: [WX_SDK],
  components: { CreditLifeList, WelcomeToast },
  data() {
    return {
      isFirstLogin: false, //是否新用户第一次登陆控制
      scoreData: "", //信用分
      goodsNoList: [], //兑换券数据
      bannerList: [],
      xylList: [], //新娱乐列表数据
      yshList: [], //优生活列表数据
      djkList: [], //大健康列表数据
      zjrList: [] //智金融列表数据
    };
  },
  created() {
    const { getCookie, isEmpty } = this.$tools;
    this.scoreData =
      this.getCreditScoreGrade.creditScore || this.$route.query.scoreData;
    if (
      !localStorage.getItem("store").openid &&
      /micromessenger/i.test(navigator.userAgent)
    ) {
      this.saveOpenId();
    }
    this.getBanner(); //获取banner图
    this.getYshXylDataList(); //获取优生活，新娱乐数据

    if (!isEmpty(getCookie("bondNum")) && getCookie("bondNum") >= 3) return;
    this.getBond(); //获取新用户首次登陆券
  },
  mounted() {},
  methods: {
    // 保存openId
    saveOpenId() {
      let openid = localStorage.getItem("wxUserInfo").openid;
      const { callServer } = this.$tools;
      let params = {};
      (params.openid = openid),
        (params.userId = localStorage.getItem("store").userId),
        (params.token = localStorage.getItem("store").token);
      callServer("post", "/djh/user_info/save_openid", params).then(res => {
        if (res.code == 0) {
          localStorage.getItem("store").openid = openid;
        }
      });
    },
    getBanner() {
      const { callServer, showLoading, hideLoading, showMsg } = this.$tools;
      showLoading();
      callServer("post", "/djh/banner_xyf/list", {
        belong: 1
      }).then(res => {
        if (res.code == 0) {
          this.bannerList = res.data.bannerList;
          this.$nextTick(() => {
            this.swiper1 = new window.Swiper(".swiper1", {
              loop: true,
              effect: "coverflow",
              slidesPerView: "auto",
              coverflowEffect: {
                rotate: 0,
                stretch: -6, //->调整两张图片的间距
                depth: 40,
                modifier: 3,
                slideShadows: false
              },
              centeredSlides: true,
              autoplay: {
                disableOnInteraction: false
              },
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                bulletClass: "banner-pagination",
                bulletActiveClass: "banner-pagination-active"
              }
            });
            hideLoading();
          });
        } else {
          showMsg(res.msg);
        }
      });
    },
    getYshXylDataList() {
      const { callServer, showMsg } = this.$tools;
      callServer("POST", "/djh/zhongchenGoods/getList", {}).then(res => {
        if (res.code == 0) {
          let { xylList, yshList, djkList, zjrList } = res.data;
          this.yshList = yshList;
          this.xylList = xylList;
          this.djkList = djkList;
          this.zjrList = zjrList;
          // 设置微信分享
          this.myWxShare(
            {
              shareLink: location.href,
              shareTitle: "信用生活",
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
        }
      });
    },
    getBond() {
      const { callServer, setCookie } = this.$tools;
      let params = {
        userId: this.userIdToken.userId,
        token: this.userIdToken.token
      };
      callServer("POST", "/djh/zhongchenOrder/getGiftCard", params).then(
        res => {
          if (res.code == 0) {
            let goodsNoList = res.data.goodsNoList, //新获取的产品
              ownGoodsNoList = res.data.ownGoodsNoList, //已经兑换过的产品
              len = goodsNoList.length > 0 ? goodsNoList.length : null, //用于判断是否显示弹窗
              ownLen = ownGoodsNoList.length > 0 ? ownGoodsNoList.length : null; //用于判断是否发送请求
            // 设置弹窗是否显示
            if (len && len > 0) {
              this.isFirstLogin = true;
              this.goodsNoList = goodsNoList;
            } else {
              this.isFirstLogin = false;
            }
            setCookie("bondNum", ownLen, 15);
          }
        }
      );
    },
    goToInterpretation() {
      this.$router.push({
        name: "Interpretation",
        query: { scoreData: this.scoreData }
      });
    },
    goToDingchang() {
      window.location.href =
        "https://api.ligusports.com/JH_venue_h5/index.html#/home?source=dzdj";
    },

    // 关闭welcometoast
    closeToast(val) {
      this.isFirstLogin = val;
    },
    showMsg() {
      const { showMsg } = this.$tools;
      showMsg("功能正在开发，敬请期待...");
    }
  },
  computed: {
    ...mapGetters(["userIdToken", "getCreditScoreGrade"])
  }
};
</script>

<style lang="less" scoped>
.credit-life-area {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 0.2rem;
  background-color: #fff;

  // 公共更多样式
  .goMore {
    position: relative;
    padding-right: 0.16rem;
    color: #f17d0a;
    cursor: pointer;
    user-select: none;
    &::after {
      content: "";
      width: 0.12rem;
      height: 0.24rem;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background: url("../assets/image/creditLife/arrow_back@2x.png") no-repeat
        center center / 100% 100%;
    }
  }
  // BANNER AREA
  .banner-area {
    width: 100%;

    background-color: #fff;
    padding: 0.1rem 0;
    .swiper-container {
      .swiper-slide-banner {
        width: 93%;
      }
      .banner-link {
        height: 2.8rem;
        img {
          border-radius: 0.12rem;
        }
      }
    }
  }

  // score-area
  .credit-score-area {
    margin: 0 0.2rem;
    padding: 0 0.2rem 0 0.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fafafa;
    .score-icon {
      position: relative;
      padding-left: 0.36rem;
      color: #666;
      font-size: 0.28rem;
      &::before {
        content: "";
        width: 0.3rem;
        height: 0.32rem;
        position: absolute;
        top: 54%;
        left: 0rem;
        transform: translateY(-50%);
        background: url("../assets/image/creditLife/ic_up@2x.png") no-repeat
          center center / 100% 100%;
      }
    }
    .score {
      font-size: 0.3rem;
      font-weight: 600;
      color: #333;
    }
  }

  // four-hot-area
  .four-hot-area {
    height: 1.32rem;
    border-bottom: 0.02rem solid #f5f7f8;
    display: flex;
    align-items: center;
    .hot-item {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      &:active {
        background: #f5f5f5;
        -webkit-tap-highlight-color: transparent;
      }
      .hot-icon {
        width: 0.6rem;
        height: 0.6rem;
        background-size: 100% 100%;
        background-position: center center;
        background-repeat: no-repeat;
        &.hot1 {
          background-image: url("../assets/image/creditLife/ic_cz@2x.png");
        }
        &.hot2 {
          background-image: url("../assets/image/creditLife/ic_dy@2x.png");
        }
        &.hot3 {
          background-image: url("../assets/image/creditLife/ic_dh@2x.png");
        }
        &.hot4 {
          background-image: url("../assets/image/creditLife/ic_ms@2x.png");
        }
      }
      .hot-item-desc {
        line-height: 0.4rem;
        color: #666;
        font-size: 0.28rem;
      }
    }
  }

  // LINE 10
  .line10 {
    position: relative;
    width: 100%;
    height: 0.2rem;
    background-color: #f5f7f8;
  }
  //悬浮按钮
  .convert-icon {
    position: fixed;
    width: 1.16rem;
    height: 1.16rem;
    right: 0.2rem;
    bottom: 2.2rem;
    transform: translateY(-55%);
    z-index: 10;
    border-radius: 50%;
    background: url("../assets/image/creditLife/convert@2x.png") no-repeat
      center center / 100% 100%;
  }
}
</style>