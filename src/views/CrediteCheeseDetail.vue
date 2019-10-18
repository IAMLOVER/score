<template>
  <section class="creditcheese-detail">
    <div class="newsDetailTitle">
      <h4 class="newsTitleText">{{detailInfo.title}}</h4>
      <div class="newsTips">
        <span class="newsAuthor">{{detailInfo.author}}</span>
        <span class="separation">|</span>
        <span class="newsCreateTime">{{detailInfo.publishTimeStr}}</span>
      </div>
    </div>
    <div class="newsDetailContent" v-html="detailInfo.content"></div>

    <!-- 热门评论 -->
    <div class="newsDetailComment">
      <div class="comment-title">
        <span class="line left"></span>
        <span class="title">热门评论</span>
        <span class="line right"></span>
      </div>
      <div
        class="nodiscuss"
        style="display: block;"
        v-if="detailInfo.commentCount<=0"
      >还没有人评论，快来抢个沙发吧!</div>

      <!-- 已经评论的列表 -->
      <div class="comment-show">
        <div class="commentText" v-for="(item,index) in arr" :key="index">
          <div class="commentImg btn">
            <img :src="item.headPortrait" class="commentAvatar btn" v-if="item.headPortrait" />
            <img src="http://m.dazhongdianjin.com/img/logo.png" v-else class="commentAvatar btn" />
          </div>
          <div class="commentList">
            <div class="commentInfo">
              <a href="javascript:;" class="commentName">{{item.userName}}</a>
            </div>
            <div class="date-dz">
              <div class="comDate" :id="item.id" :username="item.userName">
                <span class="comDate-left comment-time">{{item.createTime}}</span>
              </div>
            </div>
            <div class="comment-wrap">
              <div
                class="commentContent hf-con-block"
                @click="showTextArea(index,item.ucId)"
              >{{item.content}}</div>
              <div class="hf-con" v-show="item.isShowTextArea">
                <div class="flex-text-wrap">
                  <pre class="pre" style="padding: 6px 15px;"><span></span><br /></pre>
                  <textarea
                    class="content comment-input hf-input"
                    placeholder
                    v-model="item.textAreaValue"
                  ></textarea>
                </div>
                <a
                  href="javascript:;"
                  class="hf-pl"
                  @click="replayComment(id,userId,item.id,item.beUcId ,item.id,item.textAreaValue,index)"
                >评论</a>
                <a href="javascript:;" class="hf-cancel" @click="item.isShowTextArea = false">取消</a>
              </div>
            </div>
            <div class="hf-list-con" v-for="(commentItem,i) in item.list " :key="i">
              <div class="comment-hf">
                <div class="pl-text hfpl-text" @click="showCommentText(index,i,commentItem.ucId)">
                  <a href="javascript:;" class="comment-size-name">{{commentItem.userName}}</a>
                  <div class="my-pl-con hf-inline comhf">
                    回复
                    <a href="javascript: void (0)" class="atName">@{{commentItem.beUserName}}</a>
                    : {{commentItem.content}}
                  </div>
                </div>
                <div class="date-dz" v-show="commentItem.isShowReplayTextArea">
                  <div class="hf-con">
                    <div class="flex-text-wrap">
                      <pre class="pre" style="padding: 6px 15px;"><span></span><br /></pre>
                      <textarea
                        class="content comment-input hf-input"
                        placeholder
                        v-model="commentItem.replayTextAreaValue"
                      ></textarea>
                    </div>
                    <a
                      href="javascript:;"
                      class="hf-pl"
                      @click="replayCommentReplay(id,userId,commentItem.replayTextAreaValue,commentItem.id,commentItem.ucId,commentItem.inId)"
                    >评论</a>
                    <a
                      href="javascript:;"
                      class="hf-cancel"
                      @click="commentItem.isShowReplayTextArea = false"
                    >取消</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 查看更多 -->
      <div class="discussMore btn" id="discussMore" style @click="getComment" v-show="showMore">
        查看更多评论
        <van-icon name="arrow-down" />
      </div>
    </div>
    <!-- 底部评论，收藏 -->
    <footer class="footerBtn" style="display: block;">
      <ul>
        <li class="write-comment btn" @click="showToask=!showToask">
          <div class="commentbg">
            <span class="commentflag"></span>
            <span class="tiptext">写评论...</span>
          </div>
        </li>
        <li class="show-message btn" @click="showToask=!showToask">
          <span id="commentNum" style>{{detailInfo.commentCount}}</span>
          <span class="footerIcon message"></span>
        </li>
        <li class="show-store btn">
          <span
            class="footerIcon store"
            data-type="1"
            v-if="detailInfo.isStore"
            @click="unStoreCheese"
          ></span>
          <span
            class="footerIcon storeIcon"
            data-type="0"
            v-if="!detailInfo.isStore"
            @click="storeCheese"
          ></span>
        </li>
        <li class="thumbupItem btn" :class="detailInfo.isThumbsUp?'active':''">
          <span id="thumbupNum">{{detailInfo.thumbsUpCount}}</span>
          <span class="footerIcon thumbupIcon" @click="thumbsUp"></span>
        </li>
      </ul>
    </footer>
    <!-- 评论的弹出框 -->
    <div class="toaskBox" v-show="showToask">
      <div class="commentTools">
        <span class="commentCancel btn" @click="showToask=!showToask">取消</span>
        <span class="comment">评论</span>
        <span class="commentSure btn" @click="sendComment">发布</span>
      </div>
      <form class="commentContents">
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
    <!-- 返回顶部按钮 -->
    <div class="returnTop btn" style="display: flex;" @click="backTop" v-show="btnFlag">
      <span></span>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
  data() {
    return {
      nickname: "",
      id: "", // 资讯id
      detailInfo: {}, // 资讯的详情
      commentList: [], // 资讯的评论
      arr: [], // 用于资讯评论的分页,
      showMore: false,
      userId: "", // 用户id
      showToask: false,
      commentContent: "",
      replayValue: "",
      pageNo: 0,
      pageSize: 5,
      scrollTop: 0,
      btnFlag: false
    };
  },
  methods: {
    // 评论资讯
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
          this.detailInfo.commentCount++;
          this.getRefashComment();
        } else {
          showMsg(res.msg);
        }
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
    // 获取资讯评论列表
    getComment() {
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = this.id;
      params.pageNo = this.pageNo;
      params.pageSize = this.pageSize;
      callServer("post", "/djh/edit_info_xyf/getComment", params).then(res => {
        if (res.code == 0) {
          this.commentList = res.data.list;

          this.arr.push(...this.commentList);
          if (this.arr.length === res.data.count) {
            this.showMore = false;
          } else {
            this.showMore = true;
          }
          // 处理一级评论的交互效果
          this.arr.forEach((item, index) => {
            this.$set(item, "isShowTextArea", false);
            this.$set(
              item,
              "textAreaValue",
              "" + this.nickname + "回复@" + item.userName + "："
            );
            // 处理一级评论下方的二级回复
            let replayList = item.list;
            replayList.forEach((item, index) => {
              this.$set(item, "isShowReplayTextArea", false);
              this.$set(
                item,
                "replayTextAreaValue",
                "" + this.nickname + "回复@" + item.beUserName + "："
              );
            });
          });
          if (res.data.count > this.pageNo * this.pageSize) {
            this.pageNo++;
          }
        } else {
          showMsg(res.msg);
        }
      });
    },
    getRefashComment() {
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = this.id;
      params.pageNo = 0;
      params.pageSize = this.arr.length + 1;
      callServer("post", "/djh/edit_info_xyf/getComment", params).then(res => {
        if (res.code == 0) {
          this.arr = [];
          this.commentList = res.data.list;
          this.arr.push(...this.commentList);
          // 处理一级评论的交互效果
          this.arr.forEach((item, index) => {
            this.$set(item, "isShowTextArea", false);
            this.$set(
              item,
              "textAreaValue",
              "" + this.nickname + "回复@" + item.userName + "："
            );
            // 处理一级评论下方的二级回复
            let replayList = item.list;
            replayList.forEach((item, index) => {
              this.$set(item, "isShowReplayTextArea", false);
              this.$set(
                item,
                "replayTextAreaValue",
                "" + this.nickname + "回复@" + item.beUserName + "："
              );
            });
          });
          if (this.arr.length === res.data.count) {
            this.showMore = false;
          } else {
            this.showMore = true;
          }
        } else {
          showMsg(res.msg);
        }
      });
    },
    showTextArea(index, ucId) {
      let { showMsg } = this.$tools;
      console.log(this.userId);
      console.log(ucId);
      if (this.userId === ucId) {
        showMsg("自己不能评论自己");
        return;
      }else{
        this.arr[index].isShowTextArea = true
      }
    },
    showCommentText(index,i,beUcId){
      let { showMsg } = this.$tools;
           if (this.userId === beUcId) {
        showMsg("自己不能评论自己");
        return;
      }else{
        this.arr[index].list[i].isShowReplayTextArea = true
      }
    },
    // 回复一级评论
    replayComment(id, userId, beId, beUcId, inId, content, index) {
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = id;
      params.ucId = userId;
      params.content = content.split("：")[1];
      params.beId = beId;
      params.beUcId = beUcId;
      params.inId = inId;
      callServer("post", "/djh/edit_info_xyf/addComment", params).then(res => {
        if (res.code == 0) {
          showMsg("回复成功");
          this.getRefashComment();
        } else {
          showMsg(res.msg);
        }
      });
    },
    // 回复一级评论的回复
    replayCommentReplay(id, userId, content, beId, beUcId, inId, index) {
      let { showMsg, callServer } = this.$tools;
      let params = {};
      params.infoId = id;
      params.ucId = userId;
      params.content = content.split("：")[1];
      params.beId = beId;
      params.beUcId = beUcId;
      params.inId = inId;
      callServer("post", "/djh/edit_info_xyf/addComment", params).then(res => {
        if (res.code == 0) {
          showMsg("回复成功");
          this.getRefashComment();
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
          showMsg("已取消");
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
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  },
  created() {
    //资讯id
    this.id = this.$route.query.id;
    // 从本地获取userId
    const store = JSON.parse(
      localStorage.getItem("store") ? localStorage.getItem("store") : null
    );
    this.nickname = localStorage.getItem("nickname")
      ? localStorage.getItem("nickname")
      : "";
    this.userId = store ? store.userId : null;
    this.getDetails();
    this.getComment();
  },

  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style lang="less" scoped>
.creditcheese-detail {
  width: 100%;
  height: auto;
  padding: 0 0.3rem;
  padding-top: 0.4rem;
  background: #fff;
  overflow-x: hidden;
  .videoBox {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .newsTitleText {
    font-size: 0.44rem;
    line-height: 0.64rem;
    color: #333;
    font-weight: normal;
  }
  .newsTips {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.24rem;
    color: #999;
    margin-top: 0.26rem;
    .separation {
      display: inline-block;
      color: #e5e5e5;
      margin-bottom: 0.07rem;
      overflow: hidden;
      margin: 0rem 0.05rem;
    }
  }
  .newsDetailContent {
    margin-top: 0.72rem;
    font-size: 0.32rem;
    color: #333;
    font-weight: 300;
    line-height: 1.6;
    font-family: PingFangSC-Regular;
    p {
      color: #333;
    }
  }
  .newsDetailComment {
    background: #fff;
    margin-top: 0.1rem;
    padding: 0.2rem 0;
    margin-bottom: 1rem;
    .comment-title {
      font-size: 0;
      text-align: center;
      .title {
        color: #fe7c04;
        font-size: 0.32rem;
        margin: 0 0.24rem;
      }
      .line {
        display: inline-block;
        width: 1.82rem;
        height: 0.06rem;
        border-bottom: solid #eee 0.01rem;
        margin-bottom: 0.1rem;
      }
    }
    .nodiscuss {
      font-size: 0.26rem;
      margin-top: 0.1rem;
      color: #666;
      display: none;
      text-align: center;
      height: 2rem;
      line-height: 2rem;
      background: #f5f5f5;
    }
  }
  .commentText {
    width: 100%;
    padding: 0.2rem 0;
    border-bottom: 1px solid #f5f5f5;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    &:last-child {
      border: none;
    }
    .commentImg {
      -ms-flex: 0 0 0.68rem;
      -webkit-flex: 0 0 0.68rem;
      -webkit-box-flex: 0;
      flex: 0 0 0.68rem;
      width: 0.68rem;
      height: 0.68rem;
      overflow: hidden;
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: -webkit-inline-box;
      display: inline-flex;
      border-radius: 50%;
      img {
        width: 0.68rem;
        height: 0.68rem;
        border-radius: 50%;
      }
    }
    .commentList {
      -ms-flex: 1;
      -webkit-flex: 1;
      -webkit-box-flex: 1;
      flex: 1;
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: -webkit-inline-box;
      display: inline-flex;
      -webkit-box-direction: normal;
      -webkit-box-orient: vertical;
      -moz-flex-direction: column;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      margin-left: 0.2rem;
      line-height: 1.6;
      .commentInfo {
        width: 100%;
        word-wrap: break-word;
        overflow: hidden;
        font-size: 0.26rem;
        color: #333;
        .commentName {
          color: #3f80cc;
          font-family: PingFangSC;
          font-size: 0.28rem;
        }
      }
      .commentContent {
        margin-top: 0.16rem;
        font-size: 0.26rem;
        width: 5.5rem;
        word-wrap: break-word;
      }
      .comDate {
        display: -webkit-box;
        /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
        /* 老版本语法: Firefox (buggy) */
        display: -ms-flexbox;
        /* 混合版本语法: IE 10 */
        display: -webkit-flex;
        /* 新版本语法: Chrome 21+ */
        display: flex;
        /* 新版本语法: Opera 12.1, Firefox 22+ */
        font-size: 0.24rem;
        margin-top: 0.18rem;
        position: relative;
        .comDate-left {
          color: #a1a7ae;
          display: -ms-inline-flexbox;
          display: -webkit-inline-flex;
          display: -webkit-inline-box;
          display: inline-flex;
        }
        .comment-time {
          margin-bottom: 0.1rem;
        }
        .dott {
          display: -ms-inline-flexbox;
          display: -webkit-inline-flex;
          display: -webkit-inline-box;
          display: inline-flex;
          width: 0.06rem;
          height: 0.06rem;
          border-radius: 50%;
          background-color: #8a9099;
          margin: 0.15rem 0.2rem;
        }
        .comDate-right {
          font-size: 0.24rem;
          a {
            color: #344e7e;
          }
        }
      }
      .hf-con {
        width: 100%;
        margin-top: 0.2rem;
        pre {
          white-space: pre;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .flex-text-wrap {
          width: 100%;
          position: relative;
          *zoom: 1;
        }
        textarea,
        .flex-text-wrap {
          outline: 0;
          margin: 0;
          border: none;
          padding: 0;
          *padding-bottom: 0 !important;
        }
        .flex-text-wrap textarea,
        .flex-text-wrap pre {
          *white-space: pre;
          *word-wrap: break-word;
          white-space: pre-wrap;
          width: 100%;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -ms-box-sizing: border-box;
          box-sizing: border-box;
        }
        .flex-text-wrap textarea {
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          resize: none;
          /* IE7 box-sizing fudge factor */
          *height: 94%;
          *width: 94%;
        }
        .flex-text-wrap pre {
          display: block;
          visibility: hidden;
        }
        .flex-text-wrap,
        textarea {
          margin-bottom: 0.1rem;
        }
        textarea,
        .flex-text-wrap pre {
          font-size: 0.26rem;
          font-family: "PingFangSC-Medium";
          padding: 0.1rem;
          border: 1px solid #c6c8ce;
          width: 100%;
          -webkit-appearance: none;
          background: #fff;
          border-radius: 3px;
          background-clip: padding-box;
          transition-duration: 300ms;
          transition-property: border-color, box-shadow;
        }
        .hf-pl {
          width: 1.4rem;
          line-height: 0.6rem;
          height: 0.6rem;
          background: #fe7c04;
          border-radius: 40px;
          text-align: center;
          display: block;
          float: right;
          color: #ffffff;
          font-size: 0.26rem;
          margin-top: 0.2rem;
        }
        .hf-cancel {
          width: 1.4rem;
          line-height: 0.6rem;
          height: 0.6rem;
          border: 1px solid #fe7c04;
          background: #fff;
          border-radius: 40px;
          text-align: center;
          display: block;
          float: right;
          color: #fe7c04;
          font-size: 0.26rem;
          margin-top: 0.2rem;
          margin-right: 0.2rem;
        }
        textarea {
          border: 1px solid #c6c8ce;
        }
      }
      .hf-list-con {
        /*评论回复*/
        width: 100%;
        background-color: #f5f5f5;
        &:first-child {
          margin-top: 0.16rem;
        }
      }
      .comment-hf {
        width: 96%;
        float: left;
        margin: 0 2%;
        padding: 0.1rem 0rem;
      }
      .pl-text {
        width: 5.5rem;
        word-wrap: break-word;
        overflow: hidden;
        .comment-size-name {
          font-size: 0.28rem;
          color: #3f80cc;
        }
        .atName {
          font-size: 0.26rem;
          color: #3f80cc;
        }
        .my-pl-con {
          font-size: 0.26rem;
          margin-top: 0.1rem;
          color: #8b8b8b;
          width: 100%;
        }
        .hf-inline {
          display: inline;
        }

        .date-dz {
          /*回复日期*/
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-direction: normal;
          -webkit-box-orient: vertical;
          flex-direction: column;
          .dz-status {
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            .date-dz-left {
              font-size: 0.22rem;
              color: #8b8b8b;
              display: -ms-inline-flexbox;
              display: -webkit-inline-flex;
              display: -webkit-inline-box;
              display: inline-flex;
            }
            .date-dz-right {
              position: relative;
              overflow: hidden;
              .pl-hf {
                display: -ms-inline-flexbox;
                display: -webkit-inline-flex;
                display: -webkit-inline-box;
                display: inline-flex;
                width: 0.36rem;
                height: 0.32rem;
                background-size: 0.36rem 0.32rem;
                // background-image: url(../img/find/reply@2x.png);
              }
              .date-dz-pl {
                font-size: 12px;
                color: #8b8b8b;
              }
              .hf-con-block {
                display: block;
              }
            }
          }
        }
      }
      .hfpl-text {
        margin-top: 0;
        a {
          display: inline;
        }
      }
    }
  }
  .toaskBox {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 500;
    text-align: center;
    background-color: #fff;
    .commentTools {
      height: 0.88rem;
      width: 100%;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      .commentCancel {
        width: 1.2rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.28rem;
      }
      .comment {
        flex: 1;
        text-align: center;
        line-height: 0.88rem;
        font-size: 0.36rem;
        color: #333;
      }
      .commentSure {
        width: 1.2rem;
        line-height: 0.88rem;
        text-align: center;
        font-size: 0.28rem;
        color: #fe7c04;
      }
    }
    .commentContents {
      padding: 0.3rem;
      .textArea {
        width: 100%;
      }
    }
  }
  .footerBtn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background: #fff;
    border-top: 1px solid #e8e8e8;
  }
  .footerBtn ul {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;
    /* 混合版本语法: IE 10 */
    display: -webkit-flex;
    /* 新版本语法: Chrome 21+ */
    display: flex;
    /* 新版本语法: Opera 12.1, Firefox 22+ */
    /* 新版本语法: Opera 12.1, Firefox 22+ */
  }
  .footerBtn li {
    height: 100%;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-box-flex: 1;
    -moz-box-flex: 1;
    text-align: center;
    color: #333;
    font-size: 0.3rem;
    cursor: pointer;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -moz-align-items: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .footerBtn li .commentbg {
    width: 4rem;
    height: 0.66rem;
    line-height: 0.66rem;
    background: #e8e8e8;
    border-radius: 0.34rem;
    margin: 0.2rem;
    position: relative;
  }
  .footerBtn li .commentbg .commentflag {
    display: inline-block;
    width: 0.38rem;
    height: 0.36rem;
    background-image: url("../assets/image/creditCheese/comment.png");
    background-size: 0.38rem 0.36rem;
    position: absolute;
    left: 0.32rem;
    top: 0.16rem;
  }
  .footerBtn li .commentbg .tiptext {
    margin-left: -1rem;
    color: #666;
  }
  .footerBtn li .footerIcon {
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    background-size: 0.4rem 0.4rem;
    margin: 0.3rem auto;
  }
  .footerBtn li #commentNum {
    position: absolute;
    top: 0.2rem;
    left: 4.9rem;
    display: inline-block;
    height: 0.18rem;
    line-height: 0.18rem;
    padding: 0.02rem 0.06rem;
    background: #e26361;
    border-radius: 0.09rem;
    font-size: 0.14rem;
    color: #fff;
    z-index: 1;
  }
  .footerBtn li #thumbupNum {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    display: inline-block;
    height: 0.18rem;
    line-height: 0.18rem;
    padding: 0.02rem 0.06rem;
    background: #e26361;
    border-radius: 0.09rem;
    font-size: 0.14rem;
    color: #fff;
    z-index: 1;
  }
  .footerBtn .thumbupItem .thumbupIcon {
    background-image: url("../assets/image/creditCheese/gooding.png");
  }
  .footerBtn .thumbupItem.active .thumbupIcon {
    background-image: url("../assets/image/creditCheese/good.png");
  }
  .footerBtn li .storeIcon {
    background-image: url("../assets/image/creditCheese/save.png");
  }
  .footerBtn li .message {
    background-image: url("../assets/image/creditCheese/message.png");
    position: relative;
  }
  .footerBtn li .store {
    /*收藏*/
    background-image: url("../assets/image/creditCheese/saved.png");
  }
}
.returnTop {
  /*返回顶部*/
  position: fixed;
  right: 0.3rem;
  bottom: 3rem;
  width: 1.2rem;
  height: 0.56rem;
  background-color: rgba(0, 0, 0, 0.55);
  /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox;
  /* 混合版本语法: IE 10 */
  display: -webkit-flex;
  /* 新版本语法: Chrome 21+ */
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: center;
  -moz-justify-content: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -moz-align-items: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 0.28rem;
  z-index: 1;
  span {
    display: inline-block;
    width: 0.84rem;
    height: 0.26rem;
    background-image: url("http://m.dazhongdianjin.cn/img/news/returnTop@2x.png");
    background-size: 0.84rem 0.26rem;
  }
}
.discussMore {
  margin-top: 0.26rem;
  text-align: center;
  font-size: 0.26rem;
  color: #5c8edc;
  .van-icon,
  .van-icon::before {
    display: inline-block;
    margin-top: 0.03rem;
  }
}
</style>