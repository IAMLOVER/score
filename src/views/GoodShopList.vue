<template>
  <section class="goods-list-area">
    <!-- 滚动基本结构 -->
    <MescrollVue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <!-- NAV AREA -->
      <nav class="table-area">
        <router-link
          :to="{name:'MyOrder'}"
          class="table table-order"
        ></router-link>
        <router-link
          :to="{name:'MyRecord'}"
          class="table table-record"
        ></router-link>
      </nav>
      <!-- GOODS TITLE LINE AREA -->
      <section class="goods-title-line-area">
        <span class="line"></span>
        <span class="title">兑换专区</span>
        <span class="line"></span>
      </section>
      <!-- GOODS AREA -->
      <section
        class="credit-life-content-area"
        id="upscrollWarp"
      >
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
    </MescrollVue>
  </section>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "GoodShopList",
  components: {
    MescrollVue
  },
  data() {
    return {
      dataList: [], //商品列表
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
          num: 0, //默认是0，回调之后是1
          size: 15 //默认是10页，修改成5页
        },
        toTop: {
          src: require("../assets/image/mescrolloptions/mescroll-totop.png"),
          duration: 500
        },
        htmlNodata:
          '<p class="upwarp-nodata">我也是有底线的，没有更多数据啦～</p>'
      }
    };
  },
  created() {},
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
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      // 发送请求
      this.$tools
        .callServer("POST", "/djh/edit_info/list", {
          pageNo: page.num - 1,
          pageSize: page.size
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
    }
  }
};
</script>

<style lang="less" scoped>
.goods-list-area {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7f8;
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 0;
  }
  // 切换区域
  .table-area {
    height: 1.9rem;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .table {
      width: 2.96rem;
      height: 1.26rem;
      background-position: center center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      cursor: pointer;
    }
    .table-order {
      background-image: url("../assets/image/goods/order@2x.png");
    }
    .table-record {
      background-image: url("../assets/image/goods/record@2x.png");
    }
  }
  //
  .goods-title-line-area {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.64rem;
    .title {
      line-height: 0.44rem;
      font-size: 0.32rem;
      font-weight: 500;
      color: #333333;
      margin: 0 0.4rem;
    }
    .line {
      width: 1.6rem;
      height: 0.02rem;
      background-color: #eaedf2;
    }
  }
  // 商品列表区域
  .credit-life-content-area {
    padding: 0.32rem 0.2rem 0;
    background-color: #fff;
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
            background-image: url("../assets/image/creditLife/djq_20@2x.png");
          }
          &.life2 {
            background-image: url("../assets/image/creditLife/djq_20@2x.png");
          }
          &.life3 {
            background-image: url("../assets/image/creditLife/djq_20@2x.png");
          }
          &.life4 {
            background-image: url("../assets/image/creditLife/djq_20@2x.png");
          }
          &.life5 {
            background-image: url("../assets/image/creditLife/djq_20@2x.png");
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