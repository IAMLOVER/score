<template>
  <section class="myorder-area">
    <MescrollVue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >
      <!-- 订单列表 -->
      <div
        class="order-wrap"
        id="upscrollWarp"
      >
        <router-link
          :to="`MyOrderDetail/serialNo=${item.serialNo}`"
          class="order-item"
          v-for="(item,index) in dataList"
          :key="index"
        >
          <p class="order-num">
            <span>订单号：</span>
            <span>{{item.serialNo}}</span>
          </p>
          <div class="order-main">
            <div class="left">
              <span class="price">10</span>
              <img
                src=""
                :imgurl="item.goodsImg"
                alt=""
              >
            </div>
            <div class="right">
              <p class="good-title">{{item.goodsName}}</p>
              <p class="charge-time">下单时间：{{null|dataFm("年-月-日")}}</p>
            </div>
          </div>
        </router-link>
      </div>

    </MescrollVue>
  </section>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "MyOrder",
  components: {
    MescrollVue
  },
  data() {
    return {
      userId: "",
      token: "",
      dataList: [], //商品列表
      mescrollDown: {
        use: false
      },
      mescrollUp: {
        //上拉加载配置
        callback: this.upCallback, //上拉回调
        empty: {
          warpId: "upscrollWarp",
          icon: require("../assets/image/mescrolloptions/mescroll-empty.png"),
          tip: "暂无相关数据"
        },
        page: {
          num: 0, //默认是0，回调之后是1
          size: 10 //默认是10页，修改成5页
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
    // 从本地获取userId
    const store = JSON.parse(
      localStorage.getItem("store") ? localStorage.getItem("store") : null
    );
    this.userId = store ? store.userId : null;
    this.token = store ? store.token : null;
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
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      // 发送请求
      this.$tools
        .callServer("POST", "/djh/zhongchenOrder/list", {
          pageNo: page.num - 1,
          pageSize: page.size,
          userId: this.userId,
          token: this.token
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
.myorder-area {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7f8;
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 0;
  }
  //
  .order-wrap {
    .order-item {
      padding: 0rem 0.3rem;
      margin-bottom: 0.1rem;
      background-color: #fff;
      &:active {
        background-color: #f5f5f5;
        -webkit-tap-highlight-color: transparent;
      }
      .order-num {
        padding: 0.1rem 0;
        border-bottom: 0.02rem solid #f7f7f7;
        span {
          display: inline-block;
          vertical-align: middle;
          line-height: 0.4rem;
          font-size: 0.28rem;
          font-weight: 500;
          &:nth-of-type(1) {
            color: #8a8a8a;
          }
        }
      }
      .order-main {
        padding: 0.2rem 0;
        display: flex;
        .left {
          position: relative;
          width: 2.12rem;
          height: 1.2rem;
          margin-right: 0.2rem;
          .price {
            position: absolute;
            top: 50%;
            left: 0.06rem;
            transform: translateY(-50%);
            font-size: 0.74rem;
            line-height: 1.02rem;
            font-weight: 600;
            color: #fff;
          }
        }
        .right {
          position: relative;
          height: 1.2rem;
          padding: 0.1rem 0 0.2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .good-title {
            font-size: 0.28rem;
            line-height: 0.36rem;
            font-weight: 500;
          }
          .charge-time {
            color: #8a8a8a;
            font-weight: 500;
          }
          &::after {
            content: "";
            position: absolute;
            width: 0.14rem;
            height: 0.28rem;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            background: url("../assets/image/quickScore/arrow_back@2x.png")
              no-repeat center center / 100% 100%;
          }
        }
      }
    }
  }
}
</style>