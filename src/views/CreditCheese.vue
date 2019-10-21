<template>
  <section class="creditcheese-area" id="creditcheese-area">
    <!-- 顶部的tab栏 -->
    <div class="header">
      <div class="tabs-warp">
        <div ref="tabsContent" class="tabs-content mescroll-touch-x">
          <div style="display: inline-block">
            <ul class="tabs" ref="tabs">
              <li
                class="tab"
                v-for="(tab,i) in tabs"
                :class="{active: i===curIndex}"
                :style="{width: tabWidth+'px'}"
                :key="i"
                @click="changeTab(i)"
              >{{tab.name}}</li>
            </ul>
            <div class="tab-bar" :style="{width: barWidth+'px', left: barLeft}"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 滚动基本结构 -->
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in tabs" :key="index">
        <MescrollVue
          :ref="`mescroll${index}`"
          :down="getMescrollDown(index)"
          :up="getMescrollUp(index)"
          @init="mescrollInit(index,arguments)"
        >
          <div :id="`dataList${index}`">
            <div v-for="(item,index) in item.list" :key="index">
              <div v-if="!item.isVideo && item.style === 1">
                <CheeseDataList :msg="item"></CheeseDataList>
              </div>
              <div v-if="!item.isVideo && item.style === 2">
                <CheeseDataBigList :msg="item"></CheeseDataBigList>
              </div>
              <div v-if="item.isVideo">
                <CheeseVideoList :msg="item"></CheeseVideoList>
              </div>
            </div>
          </div>
        </MescrollVue>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import MescrollVue from "mescroll.js/mescroll.vue";
import CheeseDataList from "../components/CheeseDataList";
import CheeseVideoList from "../components/CheeseVideoList";
import CheeseDataBigList from "../components/CheeseDataBigList";
export default {
  name: "CreditCheese",
  components: {
    swiper,
    swiperSlide,
    MescrollVue,
    CheeseDataList,
    CheeseDataBigList,
    CheeseVideoList
  },
  computed: {
    swiper() {
      // 轮播对象
      return this.$refs.mySwiper.swiper;
    },
    barLeft() {
      // 红线的位置
      return (
        this.tabWidth * this.curIndex +
        (this.tabWidth - this.barWidth) / 2 +
        "px"
      );
    }
  },
  data() {
    return {
      tabs: [
        {
          name: "热门",
          searchHot: "1",
          type: "0",
          mescroll: null,
          list: [],
          isListInit: false
        },
        {
          name: "信用",
          type: "15",
          mescroll: null,
          list: [],
          isListInit: false
        },
        {
          name: "房贷",
          type: "10",
          mescroll: null,
          list: [],
          isListInit: false
        },
        {
          name: "车贷",
          type: "11",
          mescroll: null,
          list: [],
          isListInit: false
        },
        {
          name: "信贷",
          type: "12",
          mescroll: null,
          list: [],
          isListInit: false
        }
      ],
      tabWidth: 80, // 每个tab的宽度
      barWidth: 40, // tab底部红色线的宽度
      curIndex: 0, // 当前tab的下标
      tabScrollLeft: 0, // 菜单滚动条的位置
      swiperOption: {
        // 轮播配置
        on: {
          transitionEnd: () => {
            this.changeTab(this.swiper.activeIndex);
          }
        }
      }
    };
  },
  created() {},
  methods: {
    // mescroll初始化的回调
    mescrollInit(tabIndex, arg) {
      this.tabs[tabIndex].mescroll = arg[0]; // 传入mescroll对象
      this.tabs[tabIndex].mescroll.tabIndex = tabIndex; // 加入标记,便于在回调中取到对应的list
    },
    // 多mescroll的配置,需通过方法获取,保证每个配置是单例
    getMescrollDown(tabIndex) {
      let isAuto = tabIndex === 0; // 第一个mescroll传入true,列表自动加载
      return {
        auto: isAuto,
        callback: this.downCallback
      };
    },
    // 切换菜单
    changeTab(tabIndex) {
      if (this.curIndex === tabIndex) return; // 避免重复调用
      let curTab = this.tabs[this.curIndex]; // 当前列表
      let newTab = this.tabs[tabIndex]; // 新转换的列表
      curTab.mescroll && curTab.mescroll.hideTopBtn(); // 隐藏当前列表的回到顶部按钮
      this.curIndex = tabIndex; // 切换菜单
      this.swiper.slideTo(tabIndex);
      // 菜单项居中动画
      if (curTab.mescroll) {
        let tabsContent = this.$refs.tabsContent;
        let tabDom = tabsContent.getElementsByClassName("tab")[tabIndex];
        let star = tabsContent.scrollLeft; // 当前位置
        let end =
          tabDom.offsetLeft +
          tabDom.clientWidth / 2 -
          document.body.clientWidth / 2; // 居中
        this.tabScrollLeft = end;
        curTab.mescroll.getStep(star, end, function(step) {
          tabsContent.scrollLeft = step; // 从当前位置逐渐移动到中间位置,默认时长300ms
        });
      }
      if (newTab.mescroll) {
        if (!newTab.isListInit) {
          // 加载列表
          newTab.mescroll.triggerDownScroll();
        } else {
          // 检查新转换的列表是否需要显示回到到顶按钮
          setTimeout(() => {
            let curScrollTop = newTab.mescroll.getScrollTop();
            if (curScrollTop >= newTab.mescroll.optUp.toTop.offset) {
              newTab.mescroll.showTopBtn();
            } else {
              newTab.mescroll.hideTopBtn();
            }
          }, 300);
        }
      }
    },
    /* 下拉刷新的回调 */
    downCallback(mescroll) {
      mescroll.resetUpScroll(); // 触发下拉刷新的回调,加载第一页的数据
      mescroll.endSuccess();
    },
    // mescroll上拉加载的配置
    getMescrollUp(tabIndex) {
      let emptyWarpId = "dataList" + tabIndex;
      return {
        auto: false,
        page: {
          num: 0,
          size: 10
        },
        htmlLoading:
          '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">努力加载中..</p>',
        callback: this.upCallback, // 上拉回调,此处可简写; 相当于 callback: function (page) { upCallback(page); }
        offset: 100,
        noMoreSize: 4, // 如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        isBounce: false,
        empty: {
          warpId: emptyWarpId, // 父布局的id;
          icon: require("../assets/image/creditCheese/null.png"), // 图标,默认null
          tip: ""
        },
        toTop: {
          src: "" // 图片路径,默认null (建议写成网络图,不必考虑相对路径)
        },
        lazyLoad: {
          use: true,
        }
      };
    },
    /* 上拉加载的回调 page = {num:1, size:10}; num:当前页 从1开始, size:每页数据条数 */
    upCallback(page, mescroll) {
      this.tabs[mescroll.tabIndex].isListInit = true; // 标记列表已初始化,保证列表只初始化一次
      this.getListDataFromNet(
        mescroll,
        mescroll.tabIndex,
        page.num,
        page.size,
        curPageData => {
          mescroll.endSuccess(curPageData.length); // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          if (page.num === 1) this.tabs[mescroll.tabIndex].list = []; // 如果是第一页需手动制空列表
          this.tabs[mescroll.tabIndex].list = this.tabs[
            mescroll.tabIndex
          ].list.concat(curPageData); // 追加新数据
        },
        () => {
          if (page.num === 1) this.tabs[mescroll.tabIndex].isListInit = false;
          mescroll.endErr(); // 联网失败的回调,隐藏下拉刷新的状态
        }
      );
    },
    getListDataFromNet(
      mescroll,
      tabIndex,
      pageNum,
      pageSize,
      successCallback,
      errorCallback
    ) {
      let { callServer, showMsg } = this.$tools;
      let params = {};
      params.pageNo = pageNum - 1;
      params.pageSize = pageSize;
      params.status = 1;
      params.type = this.tabs[mescroll.tabIndex].type;
      params.shows = 1;
      if (tabIndex === 0) {
        params.hot = 1;
      } else {
        params.hot = null;
      }
      callServer("post", "/djh/edit_info_xyf/list", params).then(res => {
        if (res.code == 0) {
          let listData = res.data.list;
          successCallback && successCallback(listData);
        } else {
          showMsg(res.msg);
        }
      });
    },
    beforeRouteEnter(to, from, next) {
      // 如果没有配置回到顶部按钮或isBounce,则beforeRouteEnter不用写
      next(vm => {
        let curMescroll = vm.$refs["mescroll" + vm.curIndex]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
        curMescroll && curMescroll.beforeRouteEnter(); // 进入路由时,滚动到原来的列表位置,恢复回到顶部按钮和isBounce的配置
        // 恢复水平菜单的滚动条位置
        if (vm.$refs.tabsContent)
          vm.$refs.tabsContent.scrollLeft = vm.tabScrollLeft;
      });
    },
    beforeRouteLeave(to, from, next) {
      // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写
      let curMescroll = this.$refs["mescroll" + this.curIndex]; // 找到当前mescroll的ref,调用子组件mescroll-vue的beforeRouteEnter方法
      curMescroll && curMescroll.beforeRouteLeave(); // 退出路由时,记录列表滚动的位置,隐藏回到顶部按钮和isBounce的配置
      next();
    }
  }
};
</script>

<style lang="less" scoped>
/*模拟的标题*/
.header {
  z-index: 9990;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 16px;
  text-align: center;
  background-color: white;
  -webkit-tap-highlight-color: transparent;
}
/*菜单*/
.tabs-warp {
  height: 0.85rem; /*高度比tabs-content小, 目的是隐藏tabs的水平滚动条*/
  overflow-y: hidden;
  border-bottom: 0.01rem solid #eee;
  box-sizing: content-box;
}
.tabs-warp .tabs-content {
  width: 100%;
  height: 0.98rem;
  overflow-x: auto;
}
.tabs-warp .tabs-content .tabs {
  width: 100%;
  white-space: nowrap;
}
.tabs-warp .tabs-content .tabs li {
  display: inline-block;
  height: 0.8rem;
  line-height: 0.8rem;
  vertical-align: middle;
  font-size: 0.32rem;
  color: #333;
  font-weight: 500;
}
.tabs-warp .tabs-content .tabs .active {
  color: #fe7c04;
}
/*菜单进度*/
.tabs-warp .tab-bar {
  position: relative;
  height: 2px;
  background-color: #fe7c04;
  transition: left 300ms;
}
/*列表*/
.swiper-container {
  position: fixed;
  top: 0.8rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
.creditcheese-area {
  width: 100%;
  min-height: 100vh;
}
/deep/.mescroll-empty .empty-icon {
  width: 100% !important;
}
</style>