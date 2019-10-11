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
            :to="`ChangeDetails?goodsId=${item.goodsId}`"
          >
            <div class="img life1">
              <img
                src="../assets/image/mescrolloptions/img_default@2x.png"
                :imgurl="item.goodsImg"
                alt=""
              >
            </div>
            <p class="life-title">{{item.goodsName}}</p>
            <div class="price-area">
              <span class="now-price">￥{{item.goodsPrice}}</span>
              <span
                class="old-price"
                v-if="item.volume"
              >￥{{item.volume}}</span>
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
      type:'',//1,优生活 2，新娱乐 3，智金融
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
        lazyLoad: {
          use: true // 是否开启懒加载,默认false 在img标签加imgurl即可
        },
        htmlNodata:
          '<p class="upwarp-nodata">我也是有底线的，没有更多数据啦～</p>'
      }
    };
  },
  created() {
    this.type = this.$route.query.type
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
        .callServer("POST", "/djh/zhongchenGoods/list", {
          pageNo: page.num - 1,
          pageSize: page.size,
          type:this.type, //1,优生活 2，新娱乐 3，智金融
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