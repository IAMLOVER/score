<template>
  <section class="credit-cheese-video-detail">
    <MescrollVue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="videoBox">
        <video
          :src="detailInfo.video"
          controls="controls"
          preload="auto"
          id="video_tag"
          style="object-fit:fill"
          webkit-playsinline="true"
          x-webkit-airplay="true"
          playsinline="true"
          x5-video-player-type="h5"
          x5-video-orientation="h5"
          x5-video-player-fullscreen="true"
          :poster="detailInfo.picture"
        ></video>
      </div>
      <div class="titleBox">
        <div class="title">{{detailInfo.title}}</div>
        <div class="playCount">
          <span class="count">{{detailInfo.viewCount}}</span>次播放
        </div>
      </div>
      <div id="navWarp" class="nav-sticky">
        <div id="navContent" class="nav affix">
          <span
            class="btn navItem"
            :class="!showWordImg ? 'active' : ''"
            @click="showWordImg=false"
          >互动聊天</span>
          <span
            class="btn navItem"
            :class="showWordImg ? 'active' : ''"
            @click="showWordImg=true"
          >图文详情</span>
        </div>
      </div>
      <div id="upscrollWarp" style="min-height: 687px;">
        <!-- 评论列表 -->
        <ul id="dataList" class="data-list" v-show="!showWordImg">
          <li v-for="(item,index) in dataList" :key="index">
            <div class="avatar">
              <img src="../assets/image/creditCheese/header.png" alt class="mescroll-lazy-in" />
            </div>
            <div class="commentList">
              <div class="dt">
                <span>{{item.userName}}</span>
                <span class="time">{{item.createTime}}</span>
              </div>
              <div class="dd">{{item.content}}</div>
            </div>
          </li>
        </ul>
        <!-- 图文详情 -->
        <div v-html="detailInfo.content" v-show="showWordImg" class="wordImg"></div>
      </div>

      <!-- 底部发表评论工具 -->
      <div class="footer">
        <div class="left btn" @click="showToask = true">快来说说你的想法</div>
        <div class="right">
          <div class="btn collection" :class="detailInfo.isStore ? 'active':''">
            <span class="icon"></span>
            <span class="icon-title" @click="storeCheese">收藏</span>
          </div>
          <div class="btn like" @click="thumbsUp" :class="detailInfo.isThumbsUp?'active':''">
            <span class="icon"></span>
            <span class="likeCount icon-title">{{detailInfo.thumbsUpCount}}</span>
          </div>
          <div class="btn share" @click="showShare=true">
            <span class="icon"></span>
            <span class="icon-title">分享</span>
          </div>
        </div>
      </div>

      <!-- 分享的弹出 -->
      <div class="shareGuide btn" v-show="showShare" @click="showShare=false">
        <img src="http://m.dazhongdianjin.com/img/shareguide.png" />
      </div>

      <!-- 评论的盒子 -->
      <div class="commentBox" v-show="showToask">
        <div class="commentTools">
          <span class="commentCancel btn" @click="showToask = false">取消</span>
          <span class="comment">评论</span>
          <span class="commentSure btn" @click="sendComment">发布</span>
        </div>
        <form class="commentContent">
          <textarea
            class="textArea"
            autofocus="autofocus"
            name="content"
            rows="10"
            placeholder="请输入您的想法"
            v-model="commentContent"
          ></textarea>
        </form>
      </div>
    </MescrollVue>
  </section>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
export default {
  data() {
    return {
      id: "", // 资讯id
      detailInfo: {}, // 资讯的详情
      userId: "", // 用户id
      showWordImg: false,
      showShare: false,
      showToask: false,
      commentContent: "",
      mescroll: null,
      mescrollDown: {},
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 8
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 5,
        empty: {
          warpId: "dataList",
          tip: "暂无相关数据~"
        }
      },
      dataList: [] // 列表数据
    };
  },
  created() {
    //资讯id
    this.id = this.$route.query.id;
    // 从本地获取userId
    const store = JSON.parse(
      localStorage.getItem("store") ? localStorage.getItem("store") : null
    );
    this.userId = store ? store.userId : null;
    this.getDetails();
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      // 联网请求
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = this.id;
      params.pageNo = page.num - 1;
      params.pageSize = page.size;
      callServer("post", "/djh/edit_info_xyf/getComment", params)
        .then(response => {
          // 请求的列表数据
          let arr = response.data.list;
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.dataList = [];
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr);
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length);
          });
        })
        .catch(e => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          mescroll.endErr();
        });
    },
    // 读取资讯详情
    getDetails() {
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.id = this.id;
      params.userId = this.userId;
      callServer("post", "/djh/edit_info_xyf/detail", params).then(res => {
        if (res.code == 0) {
          this.detailInfo = res.data;
        } else {
          showMsg(res.msg);
        }
      });
    },
    sendComment() {
      let { isEmpty, showMsg, callServer } = this.$tools;
      if (isEmpty(this.commentContent)) {
        showMsg("请输入评论内容...");
        return false;
      }
      let params = {};
      params.infoId = this.id;
      params.ucId = this.userId;
      params.content = this.commentContent;
      callServer("post", "/djh/edit_info_xyf/addComment", params).then(res => {
        if (res.code == 0) {
          showMsg("评论成功");
          this.commentContent = "";
          this.showToask = !this.showToask;
          this.mescroll.triggerDownScroll();
        } else {
          showMsg(res.msg);
        }
      });
    },
    // 资讯点赞
    thumbsUp() {
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = this.id;
      params.ucId = this.userId;
      callServer("post", "/djh/edit_info_xyf/addThumbsUp", params).then(res => {
        if (res.code == 0) {
          this.detailInfo.isThumbsUp = true;
          this.detailInfo.thumbsUpCount++;
        } else {
          showMsg(res.msg);
        }
      });
    },
        // 资讯收藏
    storeCheese() {
      let that = this;
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = this.id;
      params.ucId = this.userId;
      params.type = 2;
      callServer("post", "/djh/edit_info_xyf/addStore", params).then(res => {
        if (res.code == 0) {
          that.$set(that.detailInfo, "isStore", true);
          showMsg("收藏成功");
        } else {
          showMsg(res.msg);
        }
      });
    },
    // 取消收藏
    unStoreCheese() {
      let that = this;
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = this.id;
      params.ucId = this.userId;
      params.type = 1;
      callServer("post", "/djh/edit_info_xyf/addStore", params).then(res => {
        if (res.code == 0) {
          that.detailInfo.isStore = false;
          showMsg("已取消收藏");
        } else {
          showMsg(res.msg);
        }
      });
    },
  },
  components: {
    MescrollVue
  }
};
</script>


<style lang="less" scoped>
.videoBox {
  width: 100%;
  height: 4.22rem;

  video {
    width: 100%;
    height: 100%;
  }
}
.mescroll {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: auto;
  padding-bottom: 1rem;
}
.wordImg {
  line-height: 1.6;
  color: #333;
  font-size: 0.24rem;
  padding: 0.3rem;
}
.credit-cheese-video-detail {
  .titleBox {
    padding: 0.2rem;
    color: #333;
    .title {
      white-space: nowrap;
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      font-size: 0.36rem;
      line-height: 0.5rem;
    }
    .playCount {
      font-size: 0.26rem;
      line-height: 0.36rem;
      position: relative;
      padding-left: 0.34rem;
      &::before {
        content: "";
        width: 0.26rem;
        height: 0.26rem;
        position: absolute;
        top: 50%;
        left: 0;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        background: url("http://m.dazhongdianjin.com/video/images/ic_view2@2x.png")
          no-repeat center center / 100% 100%;
      }
    }
  }
  #navWarp {
    height: 0.88rem;
    .affix {
      height: 0.88rem;
      line-height: 0.88rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: #fff;
      span {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 100%;
        text-align: center;
        font-size: 0.32rem;
        color: #666;
        border-bottom: 1px solid #e8e8e8;
      }
      .active {
        color: #fe7c04;
        border-bottom: 1px solid #fe7c04;
      }
    }
  }
  .data-list {
    width: 100%;
    overflow-x: hidden;
    li {
      padding: 0.2rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      .commentList {
        padding-top: 0.14rem;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin-left: 0.2rem;
        border-bottom: 1px solid #f5f5f5;
        overflow-x: hidden;
        .dt {
          color: #999999;
          font-size: 0.3rem;
          line-height: 0.42rem;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          .time {
            font-size: 0.22rem;
          }
        }
        .dd {
          font-size: 0.28rem;
          color: #333;
          line-height: 0.4rem;
          margin: 0.2rem 0;
          word-wrap: break-word;
        }
      }
      .avatar {
        width: 0.7rem;
        height: 0.7rem;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    img {
      width: 100%;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.98rem;
    border-top: 1px solid #e8e8e8;
    background-color: #fff;
    -webkit-transform: translateZ(0);
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 0.2rem;
    .left {
      height: 0.66rem;
      width: 4rem;
      border-radius: 0.33rem;
      background-color: #e8e8e8;
      border: 1px solid #f5f5f5;
      padding: 0 0.22rem;
      line-height: 0.66rem;
      font-size: 0.3rem;
      color: #999;
    }
    .right {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(3, auto);
      grid-template-rows: 0.98rem;
      .btn.collection .icon {
        background-image: url("http://m.dazhongdianjin.com/video/images/ic_collect.png");
      }
      .btn.collection.active {
        color: #fe7c04;
      }
      .btn.collection.active .icon {
        background-image: url("http://m.dazhongdianjin.com/video/images/ic_collect_active.png");
      }
      .btn.like .icon {
        background-image: url("http://m.dazhongdianjin.com/video/images/ic_like.png");
      }
      .btn.like.active {
        color: #fe7c04;
      }
      .btn.like.active .icon {
        background-image: url("http://m.dazhongdianjin.com/video/images/ic_like_active.png");
      }
      .btn.share .icon {
        background-image: url("http://m.dazhongdianjin.com/video/images/ic_share.png");
      }
      .btn.share.active {
        color: #fe7c04;
      }
      .btn.share.active .icon {
        background-image: url("http://m.dazhongdianjin.com/video/images/ic_share_active.png");
      }
      .btn {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
        padding: 0.14rem 0 0.06rem 0;
        color: #666666;
        .icon-title {
          line-height: 0.3rem;
          font-size: 0.22rem;
        }
        .icon {
          width: 0.38rem;
          height: 0.38rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center center;
        }
      }
    }
  }
  /*分享*/
  .shareGuide {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20000;
    width: 100%;
    height: 100%;
    background: rgba(7, 3, 3, 0.8);
    img {
      width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  // 评论
  .commentBox {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background-color: #fff;
    .commentTools {
      height: 0.88rem;
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      .commentCancel,
      .commentSure {
        width: 1.2rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.28rem;
      }
      .commentCancel {
        color: #666;
      }
      .commentSure {
        color: #fe7c04;
      }
      .comment {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.36rem;
        color: #333;
      }
    }
    .commentContent {
      padding: 0.3rem;
      .textArea {
        width: 100%;
        padding-top: .1rem;
      }
    }
  }
}
</style>