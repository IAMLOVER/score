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
        <router-link
          class="hot-item"
          to="GoodShopList"
        >
          <span class="hot3 hot-icon"></span>
          <span class="hot-item-desc">兑换</span>
        </router-link>
        <div
          class="hot-item"
          @click="showMsg"
        >
          <span class="hot4 hot-icon"></span>
          <span class="hot-item-desc">美食</span>
        </div>
      </section>

      <!-- EXCELLENT LIFE AREA -->
      <section class="excellent-life-area">
        <div class="credit-life-title">
          <div class="left">
            <span class="fc201D mr5">优生活</span>
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
            :to="`ChangeDetails?goodsId=${item.goodsId}`"
          >
            <div class="img">
              <img
                src="../assets/image/mescrolloptions/img_default@2x.png"
                :imgurl="item.goodsImg"
                alt=""
              >
            </div>
            <p class="life-title">{{item.goodsName}}</p>
            <div class="price-area">
              <span class="now-price">￥{{item.money}}</span>
              <span
                class="old-price"
                v-if="item.volume"
              >￥{{item.volume}}</span>
            </div>

          </router-link>
        </div>
      </section>

      <!-- 分割线 -->
      <div class="line10"></div>

      <!-- New entertainment AREA -->
      <section class="new-entertainment-area">
        <div class="credit-life-title">
          <div class="left">
            <span class="fc201D mr5">新娱乐</span>
            <span class="fc138A">新娱乐</span>
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
            :to="`ChangeDetails?goodsId=${item.goodsId}`"
          >
            <div class="img">
              <img
                src="../assets/image/mescrolloptions/img_default@2x.png"
                :imgurl="item.goodsImg"
                alt=""
              >
            </div>
            <p class="life-title">{{item.goodsName}}</p>
            <div class="price-area">
              <span class="now-price">￥{{item.money}}</span>
              <span
                class="old-price"
                v-if="item.volume"
              >￥{{item.volume}}</span>
            </div>

          </router-link>
        </div>
      </section>

      <!-- 分割线 -->
      <div class="line10"></div>

      <!-- Private doctor AREA -->
      <section class="private-doctor-area">
        <div class="credit-life-title">
          <div class="left">
            <span class="fc201D mr5">大健康</span>
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

      <!-- Intellectual finance area -->
      <section class="credit-life-content-area">
        <div class="credit-life-title">
          <div class="left">
            <span class="fc201D mr5">智金融</span>
            <span class="fc138A">智金融</span>
          </div>
          <div
            class="right goMore"
            @click="goToLifeMore"
          >更多</div>
        </div>

        <div
          class="content-list"
          id="upscrollWarp"
        >
          <router-link
            class="list-item"
            v-for="(item,index) in dataList"
            :key="index"
            :to="`ChangeDetails?goodsId=${item.goodsId}`"
          >
            <div class="img">
              <img
                src="../assets/image/mescrolloptions/img_default@2x.png"
                :imgurl="item.goodsImg"
                alt=""
              >
            </div>
            <p class="life-title">{{item.goodsName}}</p>
            <div class="price-area">
              <span class="now-price">￥{{item.money}}</span>
              <span
                class="old-price"
                v-if="item.volume"
              >￥{{item.volume}}</span>
            </div>

          </router-link>

        </div>
      </section>

      <!-- 悬浮按钮 -->
      <router-link
        class="convert-icon"
        :to="{name:'MyRecord'}"
      ></router-link>

    </mescroll-vue>

    <!-- 新用户首次登陆送优惠券，欢迎组件 -->
    <WelcomeToast
      v-if="isFirstLogin"
      @closeToast="closeToast"
      :goodsNoList="goodsNoList"
    ></WelcomeToast>

  </section>
</template>

<script>
import "../assets/js/swiper.min.js";
import "../assets/css/swiper.min.css";
import MescrollVue from "mescroll.js/mescroll.vue";
import WelcomeToast from "../components/WelcomeToast";
import { mapGetters } from "vuex";
export default {
  name: "CreditLife",
  components: { MescrollVue, WelcomeToast },
  data() {
    return {
      isFirstLogin: false, //是否新用户第一次登陆控制
      scoreData: "", //信用分
      goodsNoList: [], //兑换券数据
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
          num: 0, //默认是0，回调之后是1，所以我们是从0开始的
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
    const { getCookie, isEmpty } = this.$tools;
    this.scoreData = this.$route.query.scoreData;
    this.getBanner(); //获取banner图
    if (!isEmpty(getCookie("bondNum")) && getCookie("bondNum") >= 3) return;
    this.getBond(); //获取新用户首次登陆券
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
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    // 上拉回调 page = {num:0, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 发送请求
      this.$tools
        .callServer("POST", "/djh/zhongchenGoods/list", {
          pageNo: page.num - 1,
          pageSize: page.size,
          goodsType: "KQ"
        })
        .then(res => {
          if (res.code == 0) {
            let arr = res.data.list;
            // 如果是第一页需手动置空列表
            if (page.num === 1) this.dataList = [];
            this.dataList = this.dataList.concat(arr);
            // 数据渲染成功后,隐藏下拉刷新的状态
            this.$nextTick(() => {
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
    goToLifeMore() {
      this.$router.push({ name: "GoodShopList" });
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
    ...mapGetters(["userIdToken"])
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
    cursor: pointer;
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

  .credit-life-title {
    height: 1.04rem;
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

  .right {
    line-height: 0.32rem;
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
    padding-bottom: 0.3rem;
    .credit-life-title {
      padding: 0 0.2rem;
    }
    .doctor-link {
      height: 3.44rem;
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
    bottom: 1rem;
    transform: translateY(-55%);
    z-index: 10;
    border-radius: 50%;
    background: url("../assets/image/creditLife/convert@2x.png") no-repeat
      center center / 100% 100%;
  }
  //优生活，新娱乐，智金融
  .credit-life-content-area,
  .new-entertainment-area,
  .excellent-life-area {
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
        }
        .life-title {
          margin-top: 0.12rem;
          line-height: 0.32rem;
          color: #1d1d1d;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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