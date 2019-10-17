<template>
  <section class="interpretation-page">
    <!-- BG DESC AREA -->
    <section class="inter-bg-area">
      <span
        class="button history"
        @click="goToHistory"
      >历史信用分</span>
      <section class="inter-bg-desc">
        <!-- 图片 -->
        <div class="inter-bg-1">
          <span class="cb66">{{scoreData}}</span>
        </div>
        <!-- 5个描述 -->
        <div
          class="desc-item item1"
          :class="active==0?'active':null"
          @click="slideTo(0)"
        >
          <p class="img"></p>
          <p class="item-title">身份</p>
        </div>
        <div
          class="desc-item item2"
          :class="active==1?'active':null"
          @click="slideTo(1)"
        >
          <p class="img"></p>
          <p class="item-title">大数据</p>
        </div>
        <div
          class="desc-item item3"
          :class="active==2?'active':null"
          @click="slideTo(2)"
        >
          <p class="img"></p>
          <p class="item-title">人脉</p>
        </div>
        <div
          class="desc-item item4"
          :class="active==3?'active':null"
          @click="slideTo(3)"
        >
          <p class="img"></p>
          <p class="item-title">履约</p>
        </div>
        <div
          class="desc-item item5"
          :class="active==4?'active':null"
          @click="slideTo(4)"
        >
          <p class="img"></p>
          <p class="item-title">交易</p>
        </div>
      </section>
      <!-- PREIOD AREA -->
      <section class="preiod">
        <p class="preiod-title">本期解读</p>
        <div class="preiod-desc">
          保持你个人信息的稳定，避免发生逾期行为，这对你的信用分非常重要，本期你做得很好，加油哦
        </div>
      </section>
      <!-- SWIPER AREA -->
      <div class="swiper-container swiper-area">
        <div class="swiper-wrapper">
          <div class="swiper-slide slide1">
            <p class="slide-title ">身份特征</p>
            <p class="slide-desc">
              我们会从您的实民情况、社会属性、居住环境、教育情况进行考察
            </p>
            <p class="how-do">如何提升“身份特征”评估？</p>
            <p class="slide-desc">
              提供真实、完整、丰富的个人信息、有助于提升“身份”维度评估值
            </p>
          </div>
          <div class="swiper-slide slide2">
            <p class="slide-title ">大数据</p>
            <p class="slide-desc">
              我们会从你所授权的信息查询服务、信息验证服务、征信服务、网络爬虫等渠道进行考察
            </p>
            <p class="how-do">如何提升“大数据”评估？</p>
            <p class="slide-desc">
              合法、适度、有效地使用个人大数据，有助于提高个人数据的质量
            </p>
          </div>
          <div class="swiper-slide slide3">
            <p class="slide-title ">人脉</p>
            <p class="slide-desc">
              通过对关系圈朋友圈、信用水平和社交影响力等多维度的量化，建立的个人人脉关系网络
            </p>
            <p class="how-do">如何提升“人脉”评估？</p>
            <p class="slide-desc">
              人脉关系的相对稳定性等因素，是综合评估的考量因子
            </p>
          </div>
          <div class="swiper-slide slide4">
            <p class="slide-title ">履约</p>
            <p class="slide-desc">
              综合考虑你各方面的资产信息里判断你的履约能力，如信用卡账单、动产及不动产等
            </p>
            <p class="how-do">如何提升“履约”评估？</p>
            <p class="slide-desc">
              保持良好的履约行为，有助提高个人信用水平和履约能力评估
            </p>
          </div>
          <div class="swiper-slide slide5">
            <p class="slide-title ">交易</p>
            <p class="slide-desc">
              你消费、缴费、转账、还款等活动中体现出来的交易特征，如消费档次
            </p>
            <p class="how-do">如何提升“交易”评估？</p>
            <p class="slide-desc">
              使用电子交易，会通过系统更加了解你的交易行为
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import "@/assets/js/swiper.min.js";
import "@/assets/css/swiper.min.css";
import { mapGetters } from "vuex";
export default {
  name: "Interpretation",
  components: {},
  data() {
    return {
      scoreData: 400, //信用分
      active: 0 //控制雷达图显示高亮
    };
  },
  created() {
    this.scoreData =
      this.$route.query.scoreData || this.getCreditScoreGrade.creditScore;
    this.$tools.showLoading();
  },
  mounted() {
    let _this = this;
    this.swiper = new window.Swiper(".swiper-container", {
      loop: true,
      effect: "coverflow",
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: -9, //->调整两张图片的间距
        depth: 40,
        modifier: 3,
        slideShadows: false
      },
      centeredSlides: true,
      autoplay: false,
      on: {
        slideChange: function() {
          _this.active = this.realIndex;
        }
      }
    });
    setTimeout(() => {
      this.$tools.hideLoading();
    }, 300);
  },
  methods: {
    goToHistory() {
      this.$router.push({ name: "HistoryScore" });
    },
    slideTo(index) {
      this.swiper.slideToLoop(index, 300, false);
    }
  },
  computed: {
    ...mapGetters(["getCreditScoreGrade"])
  }
};
</script>

<style lang="less" scoped>
.interpretation-page {
  position: relative;
  min-height: 100vh;
  // BG DESC AREA
  .inter-bg-area {
    padding-top: 0.2rem;
    width: 100%;
    height: 9.28rem;
    background: url("../assets/image/interpretation/inter_bg.jpg") no-repeat
      center center / 100% 100%;

    .history {
      position: absolute;
      top: 0.32rem;
      right: 0.52rem;
      font-weight: 500;
      padding: 0.04rem;
      color: #fff;
      &::after {
        content: "";
        position: absolute;
        width: 0.24rem;
        height: 0.24rem;
        right: -0.24rem;
        top: 50%;
        transform: translateY(-50%);
        background: url("../assets/image/interpretation/arrow_right.png")
          no-repeat center center / 100% 100%;
      }
    }
    .inter-bg-desc {
      position: relative;
      width: 4.3rem;
      height: 4.1rem;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .inter-bg-1 {
      width: 2.63rem;
      height: 2.51rem;
      background: url("../assets/image/interpretation/inter_bg_1.png") no-repeat
        center center / 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .cb66 {
        line-height: 0.66rem;
        font-size: 0.66rem;
        font-weight: 600;
        color: #fff;
      }
    }
    .desc-item {
      position: absolute;
      color: rgba(255, 255, 255, 0.75);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .img {
        width: 0.34rem;
        height: 0.34rem;
        margin-bottom: 0.08rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      .item-title {
        font-size: 0.28rem;
        line-height: 0.28rem;
      }
      &.item1 {
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        .img {
          background-image: url("../assets/image/interpretation/shenfen@2x.png");
        }
      }
      &.item2 {
        right: 0;
        top: 45%;
        transform: translateY(-50%);
        .img {
          background-image: url("../assets/image/interpretation/dashuju@2x.png");
        }
      }
      &.item3 {
        right: 0.8rem;
        bottom: 0;
        .img {
          background-image: url("../assets/image/interpretation/renmai@2x.png");
        }
      }
      &.item4 {
        left: 0.8rem;
        bottom: 0;
        .img {
          background-image: url("../assets/image/interpretation/lvyue@2x.png");
        }
      }
      &.item5 {
        left: 0;
        top: 45%;
        transform: translateY(-50%);
        .img {
          background-image: url("../assets/image/interpretation/jiaoyi@2x.png");
        }
      }

      // 激活时样式
      &.active {
        color: #fff;
        &.item1 .img {
          background-image: url("../assets/image/interpretation/shenfen_active@2x.png");
        }
        &.item2 .img {
          background-image: url("../assets/image/interpretation/dashuju_active@2x.png");
        }
        &.item3 .img {
          background-image: url("../assets/image/interpretation/renmai_active@2x.png");
        }
        &.item4 .img {
          background-image: url("../assets/image/interpretation/lvyue_active@2x.png");
        }
        &.item5 .img {
          background-image: url("../assets/image/interpretation/jiaoyi_active@2x.png");
        }
      }
    }
    // PREIOD 本期解读
    .preiod {
      margin: 0.35rem auto 0;
      width: 6.9rem;
      min-height: 1.7rem;
      padding: 0.22rem 0.05rem 0.22rem 0.3rem;
      background-color: #fff;
      box-shadow: 0px 1px 12px 0px rgba(73, 73, 73, 0.14);
      border-radius: 0.1rem;
      .preiod-title {
        position: relative;
        line-height: 0.36rem;
        padding-left: 0.45rem;
        font-weight: 500;

        &::before {
          content: "";
          position: absolute;
          width: 0.3rem;
          height: 0.36rem;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          background: url("../assets/image/interpretation/avatar.png") no-repeat
            center center / 100% 100%;
        }
      }
      .preiod-desc {
        padding-left: 0.4rem;
        margin-top: 0.18rem;
        font-weight: 500;
        line-height: 0.34rem;
      }
    }

    // SWIPER AREA
    .swiper-area {
      position: relative;
      margin-top: 0.5rem;
      height: 5rem;
      width: 100%;
      padding-bottom: 0.2rem;
      .swiper-slide {
        width: 4.32rem;
        height: 4.8rem;
        overflow: hidden;
        background-color: #fff;
        border-radius: 0.1rem;
        padding: 0.62rem 0.3rem 0;
        background-position: right bottom;
        background-size: 2.16rem 2.6rem;
        background-repeat: no-repeat;
        background-image: url("../assets/image/interpretation/logo@2x.png");
        box-shadow: 0px 1px 10px 0px rgba(73, 73, 73, 0.16);
        .slide-title {
          position: relative;
          padding-left: 0.52rem;
          font-size: 0.3rem;
          font-weight: 500;
          line-height: 0.4rem;
          &::before {
            content: "";
            width: 0.34rem;
            height: 0.34rem;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        .slide-desc {
          color: #666;
          line-height: 0.36rem;
          margin-top: 0.2rem;
        }
        .how-do {
          margin-top: 0.6rem;
          color: #f36825;
          line-height: 0.36rem;
        }
        &.slide1 {
          .slide-title::before {
            background-image: url("../assets/image/interpretation/shenfen_slide@2x.png");
          }
        }
        &.slide2 {
          .slide-title::before {
            background-image: url("../assets/image/interpretation/dashuju_slide@2x.png");
          }
        }
        &.slide3 {
          .slide-title::before {
            background-image: url("../assets/image/interpretation/renmai_slide@2x.png");
          }
        }
        &.slide4 {
          .slide-title::before {
            background-image: url("../assets/image/interpretation/lvyue_slide@2x.png");
          }
        }
        &.slide5 {
          .slide-title::before {
            background-image: url("../assets/image/interpretation/jiaoyi_slide@2x.png");
          }
        }
      }
    }
  }
}
</style>
