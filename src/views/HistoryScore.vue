<template>
  <section class="history-page">
    <!-- 滚动基本结构 -->
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
    >

      <!-- BG AREA -->
      <section class="bg-area">
        <p class="his-title">信用分需要慢慢积累哦，亲保持好习惯</p>
        <p class="month-data">本月{{creditScore}}{{lastCreditScore?'，上月'+lastCreditScore:null}}</p>
        <p class="update">更新时间：{{createTime}}</p>
        <!-- GRADE AREA -->
        <section class="grade-area">
          <div class="slide">
            <div class="tips">
              <span :class="active==4?'active':null">较差</span>
              <span :class="active==5?'active':null">中等</span>
              <span :class="active==6?'active':null">良好</span>
              <span :class="active==7?'active':null">优秀</span>
              <span :class="active==8?'active':null">极好</span>
            </div>
            <div class="line"></div>
            <div class="scale">
              <span>550</span>
              <span>650</span>
              <span>750</span>
              <span>850</span>
              <span>950</span>
            </div>
          </div>
        </section>
      </section>

      <!-- HISTORY AREA -->
      <section class="history-list-area">
        <!-- 吸顶 -->
        <div
          class="navWrap"
          ref="navWrap"
        >
          <div
            class="nav"
            ref="navContent"
          >
            <p class="history-list-title">历史消息</p>
          </div>
        </div>

        <div
          id="upscrollWarp"
          class="upscroll-wrap"
        >
          <ul
            class="history-list"
            id="historyList"
          >
            <li
              v-for="item in dataList"
              :key="item.id"
            >
              <p class="list-title">{{item.createTime}} 评估</p>
              <div class="list-desc">
                <p class="desc-title">信用分已更新</p>
                <p class="desc-result">本月结果{{item.creditScore}}分</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

    </mescroll-vue>

  </section>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import { mapGetters } from "vuex";
export default {
  name: "HistoryScore",
  components: { MescrollVue },
  data() {
    return {
      active: 4, // 滑动条激活的样式
      creditScore: "", //本月分数
      lastCreditScore: "", //上月分数
      createTime: "", //更新时间
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
          num: 0, //默认是0，回调之后是1
          size: 5 //默认是10页，修改成5页
        },
        toTop: {
          src: require("../assets/image/mescrolloptions/mescroll-totop.png"),
          duration: 500
        },
        htmlNodata:
          '<p class="upwarp-nodata">我也是有底线的，没有更多数据啦～</p>'
      },
      dataList: [] //历史列表数据
    };
  },
  created() {
    // 从全局变量中取出记录的级别
    this.active = sessionStorage.grade;
  },
  mounted() {
    // 设置sticky吸顶效果
    this.sticky();
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
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    // 上拉回调 page = {num:0, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 发送请求
      this.$tools
        .callServer("POST", "/djh/user_credit_score/list", {
          pageNo: page.num - 1,
          pageSize: page.size,
          userId: this.userIdToken.userId,
          token: this.userIdToken.token
        })
        .then(res => {
          if (res.code == 0) {
            let arr = res.data.list;
            // 如果是第一页需手动置空列表
            if (page.num === 0) this.dataList = [];
            this.dataList = this.dataList.concat(arr);
            this.creditScore = res.data.creditScore;
            this.createTime = res.data.createTime;
            this.lastCreditScore = res.data.lastCreditScore
              ? res.data.lastCreditScore
              : 0;
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
    // 历史消息吸顶效果
    sticky() {
      let { navWrap, navContent } = this.$refs;
      if (this.mescroll.os.ios) {
        navWrap.classList.add("nav-sticky");
      } else {
        this.mescroll.onScroll = function(mescroll, y, isUp) {
          // 列表当前滚动的距离y
          if (y > navWrap.offsetTop) {
            navContent.classList.add("nav-fixed");
          } else {
            navContent.classList.remove("nav-fixed");
          }
        };
      }
    }
  },
  computed: {
    ...mapGetters(["userIdToken"])
  }
};
</script>

<style lang="less" scoped>
.history-page {
  width: 100%;
  min-height: 100vh;
  .mescroll {
    position: fixed;
    top: 0;
    bottom: 0;
  }
  // BG AREA
  .bg-area {
    position: relative;
    width: 100%;
    height: 4rem;
    padding-top: 0.86rem;
    padding-left: 0.3rem;
    background: url("../assets/image/historyScore/bg_area.png") no-repeat center
      center / 100% 100%;
    color: #fff;
    .his-title {
      line-height: 0.8rem;
      font-size: 0.4rem;
      font-weight: bold;
    }
    .month-data,
    .update {
      line-height: 0.4rem;
    }
    .grade-area {
      position: absolute;
      width: 6.9rem;
      height: 2rem;
      left: 50%;
      transform: translate(-50%, 25%);
      background-color: #fff;
      box-shadow: 0px 1px 24px 0px rgba(73, 73, 73, 0.14);
      border-radius: 0.1rem;
      .slide {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .tips {
          width: 6rem;
          line-height: 0.4rem;
          height: 0.4rem;
          margin: 0 auto;
          color: #333;
          display: grid;
          grid-template-columns: repeat(5, 20%);
          justify-items: center;
          .active {
            position: relative;
            padding: 0 0.1rem;
            border-radius: 0.04rem;
            color: #fff;
            background-color: #f48f4a;
            &::after {
              content: "";
              position: absolute;
              width: 0;
              height: 0;
              bottom: -0.18rem;
              left: 50%;
              z-index: -1;
              transform: translateX(-50%);
              border-width: 0.1rem;
              border-style: solid;
              border-color: #f48f4a transparent transparent transparent;
            }
          }
        }
        .line {
          width: 6rem;
          height: 0.14rem;
          margin: 0.1rem auto;
          background: url("../assets/image/historyScore/xinyongline@2x.png")
            no-repeat center center / 100% 100%;
        }
        .scale {
          width: 6.25rem;
          margin: 0 auto;
          line-height: 0.4rem;
          color: #999;
          display: grid;
          grid-template-columns: repeat(5, 20%);
          justify-items: end;
        }
      }
    }
  }
  // HISTORY LIST AREA
  .history-list-area {
    padding-top: 1.6rem;
    .navWrap {
      width: 100%;
      height: 0.8rem;
      .nav {
        background-color: #fff;
        height: 0.8rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        padding-left: 0.3rem;
      }
      .history-list-title {
        color: #999999;
        font-weight: 500;
      }
    }

    //ios使用sticky样式实现
    .nav-sticky {
      z-index: 9999; //需设置zIndex,避免在悬停时,可能会被列表数据遮住
      position: -webkit-sticky;
      position: sticky;
      top: 0; //相对mescroll的div悬停的位置
    }

    /*android和pc端悬停*/
    .nav-fixed {
      z-index: 9999;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }

    .upscroll-wrap {
      border-top: 0.02rem solid #efeff1;
      .history-list {
        padding-left: 0.3rem;
        padding-right: 0.3rem;
      }
      .list-title {
        line-height: 0.8rem;
        color: #999;
      }
      .list-desc {
        padding: 0.3rem;
        background-color: #f7f7f7;
        border-radius: 0.1rem;
        .desc-title {
          font-size: 0.3rem;
          line-height: 0.5rem;
          font-weight: 500;
        }
        .desc-result {
          color: #999;
          line-height: 0.4rem;
          font-weight: 500;
        }
      }
    }
  }
}
</style>