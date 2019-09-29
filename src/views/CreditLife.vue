<template>
  <section class="credit-life-area">
    <!-- 滚动基本结构 -->
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
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

      <!-- FOUR HOT AREA -->
      <section class="four-hot-area">
        <router-link
          class="hot-item"
          to="Recharge"
        >
          <span class="hot1 hot-icon"></span>
          <span class="hot-item-desc">充值</span>
        </router-link>
        <div
          class="hot-item"
          @click="showMsg"
        >
          <span class="hot2 hot-icon"></span>
          <span class="hot-item-desc">电影</span>
        </div>
        <div
          class="hot-item"
          @click="showMsg"
        >
          <span class="hot3 hot-icon"></span>
          <span class="hot-item-desc">兑换</span>
        </div>
        <div
          class="hot-item"
          @click="showMsg"
        >
          <span class="hot4 hot-icon"></span>
          <span class="hot-item-desc">美食</span>
        </div>
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
          <div
            class="right goMore"
            @click="goToLifeMore"
          >更多</div>
        </div>

        <div class="content-list">
          <router-link
            class="list-item"
            v-for="(item,index) in dataList"
            :key="index"
            :to="`ChangeDetails?bgc=FFBF00`"
          >
            <div class="img life1">
              <span class="img-lf">45</span>
            </div>
            <p class="life-title">爱电影45元代金券</p>
            <div class="price-area">
              <span class="now-price">￥45</span>
              <span class="old-price">￥50</span>
            </div>

          </router-link>

        </div>
      </section>

    </mescroll-vue>
  </section>
</template>

<script>
import "../assets/js/swiper.min.js";
import "../assets/css/swiper.min.css";
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "CreditLife",
  components: { MescrollVue },
  data() {
    return {
      scoreData: "", //信用分
      bannerList: [],
      dataList: [], //信用生活列表数据
      mescroll: null,
      mescrollDown: {
        use: false
      },
      mescrollUp: {
        //上拉加载配置
        callback: this.upCallback, //上拉回调
        isBounce: false,
        empty: {
          warpId: "upscrollWarp",
          icon: require("../assets/image/mescrolloptions/mescroll-empty.png"),
          tip: "暂无相关数据"
        },
        page: {
          num: -1, //默认是0，回调之后是1，所以我们是从0开始的
          size: 5 //默认是10页，修改成5页
        },
        toTop: {
          src: require("../assets/image/mescrolloptions/mescroll-totop.png"),
          duration: 500
        },
        lazyLoad: {
          use: true // 是否开启懒加载,默认false 在img标签加imgurl即可
        },
        htmlNodata:
          '<p class="upwarp-nodata">我也是有底线的，没有更多数据啦～</p>'
      }
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
    }, 800);

    this.swiper2 = new window.Swiper(".swiper2", {
      slidesPerView: 2.5,
      freeMode: true
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
    });
  },
  beforeRouteLeave(to, from, next) {
    // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteLeave方法
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
    next();
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
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    // 上拉回调 page = {num:0, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 发送请求
      this.$tools
        .callServer("POST", "/djh/edit_info/list", {
          pageNo: page.num,
          pageSize: page.size
        })
        .then(res => {
          if (res.code == 0) {
            let arr = res.data.list;
            // 如果是第一页需手动置空列表
            if (page.num === 0) this.dataList = [];
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
              console.log(arr.length);

              mescroll.endSuccess(arr.length);
            });
          } else {
            this.$tools.showMsg(res.msg);
          }
        })
        .catch(error => {
          mescroll.endErr();
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
    },
    //信用生活更多
    goToLifeMore() {},
    showMsg() {
      const { showMsg } = this.$tools;
      showMsg("功能正在开发，敬请期待...");
    }
  }
};
</script>

<style lang="less" scoped>
.credit-life-area {
  width: 100%;
  height: 100vh;
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
      padding: 0 0.1rem;
      .list-item {
        width: 2.14rem;
        margin-right: 0.23rem;
        margin-bottom: 0.2rem;
        cursor: pointer;
        &:nth-of-type(3n) {
          margin-right: 0;
        }
        &:active {
          background-color: #f5f5f5;
          -webkit-tap-highlight-color: transparent;
        }
        .img {
          width: 100%;
          height: 1.24rem;
          padding-left: 0.18rem;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          .img-lf {
            font-size: 0.74rem;
            color: #fff;
            line-height: 1rem;
          }
          .img-lr {
            .voucher {
              font-size: 0.28rem;
              color: #fff;
              line-height: 0.42rem;
            }
            .coupon {
              width: 0.88rem;
              border-radius: 0.12rem;
              padding: 0.02rem 0.08rem;
              color: #f5a455;
              background-color: #fff;
              font-weight: 600;
              font-size: 0.16rem;
            }
          }
          &.life1 {
            background-image: url("../assets/image/creditLife/life1_bg@2x.png");
          }
          &.life2 {
            background-image: url("../assets/image/creditLife/life2_bg@2x.png");
          }
          &.life3 {
            background-image: url("../assets/image/creditLife/life3_bg@2x.png");
          }
          &.life4 {
            background-image: url("../assets/image/creditLife/life4_bg@2x.png");
          }
          &.life5 {
            background-image: url("../assets/image/creditLife/life5_bg@2x.png");
          }
        }
        .life-title {
          margin-top: 0.12rem;
          line-height: 0.32rem;
          color: #1d1d1d;
        }
        .price-area {
          text-align: center;
          line-height: 0.36rem;
          .now-price {
            color: #f17d0a;
            margin-right: 0.08rem;
          }
          .old-price {
            color: #8a8a8a;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>