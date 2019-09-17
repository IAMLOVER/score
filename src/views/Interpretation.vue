<template>
  <section class="interpretation-page">
    <!-- BG DESC AREA -->
    <section class="inter-bg-area">
      <span
        class="button history"
        @click="showMsg"
      >历史信用分</span>
      <section class="inter-bg-desc">
        <!-- 图片 -->
        <div class="inter-bg-1">
          <span class="cb66">765</span>
        </div>
        <!-- 5个描述 -->
        <div class="desc-item item1" :class="acitve==0?'active':null">
          <p class="img"></p>
          <p class="item-title">身份</p>
        </div>
        <div class="desc-item item2" :class="acitve==1?'active':null">
          <p class="img"></p>
          <p class="item-title">大数据</p>
        </div>
        <div class="desc-item item3" :class="acitve==2?'active':null">
          <p class="img"></p>
          <p class="item-title">人脉</p>
        </div>
        <div class="desc-item item4" :class="acitve==3?'active':null">
          <p class="img"></p>
          <p class="item-title">履约</p>
        </div>
        <div class="desc-item item5" :class="acitve==4?'active':null">
          <p class="img"></p>
          <p class="item-title">交易</p>
        </div>
      </section>
      <section class="preiod">
        <p class="preiod-title">本期解读</p>
        <div class="preiod-desc">
          保持你个人信息的稳定，避免发生逾期行为，这对你的信用分非常重要，本期你做得很好，加油哦
        </div>
      </section>
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
            学而时习之，不亦说乎?有朋自远方来，不亦乐乎?人不知而不悦,不亦君子乎?
          </p>
          <p class="how-do">如何提升“身份特征”评估？</p>
          <p class="slide-desc">
            学习知识后时常复习它，不也是愉快的吗?有志同道合的朋友从远方来访，不也很快乐吗?
          </p>
        </div>
        <div class="swiper-slide slide3">
          <p class="slide-title ">人脉</p>
          <p class="slide-desc">
            默而识之,学而不厌,诲人不倦,何有于我哉!
          </p>
          <p class="how-do">如何提升“身份特征”评估？</p>
          <p class="slide-desc">
            默默地记住所学的知识,学习却不感觉满足,教导他人不知疲倦,这些对我来说,有哪一点是我所具备的呢?
          </p>
        </div>
        <div class="swiper-slide slide4">
          <p class="slide-title ">履约</p>
          <p class="slide-desc">
            三人行,必有我师焉；择其善者而从之,其不善者而改之。
          </p>
          <p class="how-do">如何提升“身份特征”评估？</p>
          <p class="slide-desc">
            几个人在一起走路,其中一定有人可以当我的老师.应当选择他们的优点去学习,
          </p>
        </div>
        <div class="swiper-slide slide5">
          <p class="slide-title ">交易</p>
          <p class="slide-desc">
            不愤不启,不悱不发.举一隅不以三隅反,则不复也
          </p>
          <p class="how-do">如何提升“身份特征”评估？</p>
          <p class="slide-desc">
            不到他想弄明白却不能的时候不去开导他,不到他想说明白却不说出来的时候不去启发他
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import "../assets/js/swiper.min.js";
import "../assets/css/swiper.min.css";
export default {
  name: "Interpretation",
  components: {},
  data() {
    return {
      acitve:0, //控制雷达图显示高亮

    };
  },
  created() {
    // this.$tools.showLoading();
  },
  mounted() {
    let swiper = new window.Swiper(".swiper-container", {
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
      on:{
        slideChangeTransitionEnd:function(){
          console.log(this.activeIndex)
        }
      }
    });
  },
  methods: {
    showMsg() {
      this.$tools.showMsg("功能正在开发，敬请期待...");
    }
  }
};
</script>

<style lang="less" scoped>
.interpretation-page {
  position: relative;
  height: 100%;
  // BG DESC AREA
  .inter-bg-area {
    padding-top: 0.32rem;
    width: 100%;
    height: 10.48rem;
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
      margin: 0.4rem auto 0;
      width: 6.9rem;
      height: 1.7rem;
      padding: 0.22rem 0.3rem;
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
  }
  .swiper-area {
    position: absolute;
    height: 5rem;
    width: 100%;
    padding-bottom: 0.2rem;
    bottom: 0.52rem;
    .swiper-slide {
      width: 4.32rem;
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
</style>
