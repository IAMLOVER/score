<template>
  <section class="credit-life-area">
    <!-- BANNER AREA -->
    <section class="banner-area">
      <div class="swiper-container swiper1">
        <div class="swiper-wrapper">
          <!-- 内容 -->
          <div
            class="swiper-slide swiper-slide-banner"
            v-for="item in bannerList"
            :key="item.id"
          >
            <a class="banner-link">
              <img
                :src="item.pictureUrl"
                alt=""
              >
            </a>
          </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination "></div>
      </div>
    </section>

    <!-- CREDIT SCOREDATA -->
    <section class="credit-score-area">
      <div class="score-left">
        <span class="score-icon">您当前的信用分：</span>
        <span class="score">{{scoreData}}</span>
      </div>
      <span
        class="goMore score-right"
        @click="goToInterpretation"
      >去查看</span>
    </section>

    <!-- Private doctor AREA -->
    <section class="private-doctor-area">
      <div class="credit-life-title">
        <div class="left">
          <span class="fc201D mr5">私家医生</span>
          <span class="fc138A">平安好医生、私人医生</span>
        </div>
        <div
          class="right goMore"
          @click="goToPingAnDoctor"
        >更多</div>
      </div>

      <!-- swiper2 area -->

      <div class="swiper-container swiper2">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a
              class="doctor-link"
              href="https://jkt.jkwlx.net/wx/viewPmProduct.jhtml?productCode=201906271339"
            >
              <img
                src="../assets/image/creditLife/doctor1@2x.png"
                alt=""
              >
            </a>
          </div>
          <div class="swiper-slide">
            <a
              class="doctor-link"
              href="https://jkt.jkwlx.net/wx/viewPmProduct.jhtml?productCode=201906271503"
            >
              <img
                src="../assets/image/creditLife/doctor2@2x.png"
                alt=""
              >
            </a>
          </div>
          <div class="swiper-slide">
            <a
              class="doctor-link"
              href="https://jkt.jkwlx.net/wx/viewPmProduct.jhtml?productCode=020cyw2019"
            >
              <img
                src="../assets/image/creditLife/doctor3@2x.png"
                alt=""
              >
            </a>
          </div>
        </div>
      </div>

    </section>

    <!-- 分割线 -->
    <div class="line10"></div>
    <!-- credit life content area -->
    <section class="credit-life-content-area">
      <div class="credit-life-title">
        <div class="left">
          <span class="fc201D mr5">信用生活</span>
          <span class="fc138A">便利生活更舒心</span>
        </div>
      </div>

      <div class="content-list">
        <div class="list-item card1">
          <img
            src="../assets/image/creditLife/card1@2x.png"
            alt=""
          >
        </div>
        <div class="list-item card2">
          <img
            src="../assets/image/creditLife/card2@2x.png"
            alt=""
          >
        </div>
        <a
          class="list-item card3"
          href="http://dkcs.dazhongdianjin.com/online_product/onlineProduct.html"
        >
          <img
            src="../assets/image/creditLife/card3@2x.png"
            alt=""
          >
        </a>
        <a
          class="list-item card4"
          href="http://dkcs.dazhongdianjin.com/offline_product/offlineProduct.html"
        >
          <img
            src="../assets/image/creditLife/card4@2x.png"
            alt=""
          >
        </a>
      </div>

    </section>
  </section>
</template>

<script>
import "../assets/js/swiper.min.js";
import "../assets/css/swiper.min.css";
export default {
  name: "CreditLife",
  components: {},
  data() {
    return {
      scoreData: "", //信用分
      bannerList: []
    };
  },
  created() {
    this.scoreData = this.$route.query.scoreData;
    this.getBanner();
  },
  mounted() {
    // 设置倒计时用于初始化第一个swiper
    setTimeout(() => {
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
      this.$tools.hideLoading();
    }, 500);

    this.swiper2 = new window.Swiper(".swiper2", {
      slidesPerView: 2.5,
      freeMode: true
    });
  },
  methods: {
    getBanner() {
      const { callServer, showLoading, hideLoading, showMsg } = this.$tools;
      showLoading();
      callServer("post", "/djh/banner_xyf/list", {
        belong: 1
      }).then(res => {
        if (res.code == 0) {
          this.bannerList = res.data.bannerList;
        } else {
          showMsg(res.msg);
        }
      });
    },
    goToPingAnDoctor() {
      window.location.href =
        "https://jkt.jkwlx.net/wx/index.jhtml?from=singlemessage&isappinstalled=0";
    },
    goToInterpretation() {
      this.$router.push({
        name: "Interpretation",
        query: { scoreData: this.scoreData }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.credit-life-area {
  width: 100%;
  min-height: 100vh;
  padding-bottom: 0.2rem;
  background-color: #fff;
  // 公共样式
  .goMore {
    position: relative;
    padding-right: 0.16rem;
    color: #f17d0a;
    &::after {
      content: "";
      width: 0.12rem;
      height: 0.24rem;
      position: absolute;
      top: 52%;
      right: 0;
      transform: translateY(-50%);
      background: url("../assets/image/creditLife/arrow_back@2x.png") no-repeat
        center center / 100% 100%;
    }
  }
  .credit-life-title {
    height: 1.04rem;
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .fc201D {
    color: #1d1d1d;
    font-size: 0.4rem;
    font-weight: 500;
  }
  .fc138A {
    color: #8a8a8a;
  }
  .mr5 {
    margin-right: 0.1rem;
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
        height: 3.86rem;
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

  // Private doctor AREA
  .private-doctor-area {
    margin-top: 0.06rem;
    .doctor-link {
      height: 3.44rem;
    }
  }
  // LINE 10
  .line10 {
    width: 100%;
    height: 0.2rem;
    background-color: #f5f7f8;
  }
  // credit life content area
  .credit-life-content-area {
    padding: 0 0.2rem;
    .content-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .list-item {
        width: 3.46rem;
      }
    }
  }
}
</style>