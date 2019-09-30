<template>
  <section class="myrecord-area">
    <MescrollVue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >

      <ul
        class="record-wrap"
        id="upscrollWarp"
      >
        <li
          class="record-item"
          v-for="(item,index) in dataList"
          :key="index"
        >
          <div class="left">
            <span class="record-price">10</span>
            <img
              src="../assets/image/mescrolloptions/img_default@2x.png"
              :imgurl="item.goodsImg"
              alt=""
            >
          </div>
          <div class="midel">
            <p class="goods-title">{{item.goodsName}}</p>
            <p class="charge-time">兑换时间：2019年09月27日</p>
          </div>
          <div class="right">
            <span
              class="success"
              v-if="item.status==2"
            >兑换成功</span>
            <span
              class="fail"
              v-else-if="item.status==3"
            >兑换失败</span>
          </div>
        </li>
      </ul>

    </MescrollVue>
  </section>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  name: "MyRecord",
  components: {
    MescrollVue
  },
  data() {
    return {
      userId: "",
      token: "",
      dataList: [], //订单列表
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
          token: this.token,
          type: 2 //1-话费充值 2-卡券兑换
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
.myrecord-area {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7f8;
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 0;
  }

  .record-item {
    height: 1.84rem;
    padding: 0 0.3rem;
    margin-bottom: 0.02rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    .left {
      position: relative;
      width: 2.12rem;
      height: 1.2rem;
      .record-price {
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
    .midel {
      height: 1.2rem;
      padding: 0.12rem 0;
      margin: 0 0.24rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        line-height: 0.4rem;
      }
      .goods-title {
        font-size: 0.28rem;
      }
      .charge-time {
        color: #8a8a8a;
      }
    }
    .right {
      line-height: 0.4rem;
      font-size: 0.28rem;
      font-weight: 500;
      .success {
        color: #40db58;
      }
      .fail {
        color: #ff3b17;
      }
    }
  }
}
</style>