<template>
  <section class="zhima-info-area">
    <Security></Security>
    <!-- NO SUCESS -->
    <template v-if="!isSuccess">
      <div class="form-group">
        <span class="form-label">芝麻信用分</span>
        <div class="form-desc">
          <input
            type="text"
            placeholder="请输入您的芝麻信用分"
            v-model="zhimaScore"
          >
        </div>
      </div>
      <div class="form-group form-group-img">
        <span class="form-label">上传截图：</span>
      </div>
      <div class="whitebg">
        <Camear
          tip="芝麻信用截图"
          imgHeight="auto"
          multiple=true
          @savePicPath="savePicPath"
        ></Camear>
      </div>
      <div class="form-group form-group-img">
        <span class="form-label">截图示例：</span>
      </div>
      <div class="whitebg pdlr25">
        <div class="zhima-img"></div>
      </div>
      <div class="form-group form-group-img">
        <span class="form-label">截图操作说明：</span>
      </div>
      <div class="whitebg pd18 fz15 c666">
        打开支付宝APP - 点击“我的” - 点击芝麻信用 - 截图
      </div>

      <!-- BTN AREA -->
      <div
        class="button submit-info"
        :class="isActive?'active':null"
        @click="submitInfo"
      >
        提交
      </div>
    </template>

    <!-- SUCESS AREA -->
    <template v-else>
      <div class="success-main-area">
        <div class="success-tips">
          <p class="success-icon"></p>
          <p class="success-title">提交成功</p>
        </div>
        <!-- Main CONTENT -->
        <div class="success-main">
          <div class="main-item">
            <span class="item-lable">芝麻信用分</span>
            <span class="item-desc">{{zhimaScore}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">上传截图：</span>
          </div>
          <div class="suc-pic-area">
            <img
              :src="successPicPath"
              alt=""
            >
          </div>

        </div>
        <!-- DEL AREA -->
        <div class="del-area">
          <span class="sub-time">提交时间：{{null|dataFm("年-月-日")}}</span>
          <span
            class="del button"
            @click="delInfo"
          >删除</span>
        </div>
      </div>
      <div class="footer-position">
        <Footertip></Footertip>
      </div>
    </template>

    <DeleteToast
      v-if="isShowDeletConfirm"
      @closeFn="closeFn"
      @sure="sureFn"
    ></DeleteToast>

  </section>
</template>

<script>
import Security from "./Security";
import Camear from "./Camear";
import Footertip from "./Footertip";
import DeleteToast from "./DeleteToast";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "ZhiMaInfo",
  components: {
    Security,
    Camear,
    Footertip,
    DeleteToast
  },
  data() {
    return {
      zhimaScore: "", //芝麻分
      successPicPath: "", //截图上传成功的照片
      isSuccess: false, //判断信息是否提交成功
      isShowDeletConfirm: false //是否显示删除确认框
    };
  },
  created() {},
  methods: {
    ...mapMutations(["SET_ZHIMA_INFO_STATUS"]),
    savePicPath(successPicPath) {
      this.successPicPath = successPicPath;
    },
    resetForm() {
      this.zhimaScore = "";
      this.successPicPath = "";
      this.isSuccess = false;
      this.isShowDeletConfirm = false;
    },
    checkForm(noShow = true) {
      const { isEmpty, showMsg } = this.$tools;
      if (isEmpty(this.zhimaScore)) {
        noShow && showMsg("芝麻分不能为空");
        return false;
      }
      if (isEmpty(this.successPicPath)) {
        noShow && showMsg("图片不能为空");
        return false;
      }
      return true;
    },
    submitInfo() {
      if (this.checkForm()) {
        const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
        showLoading();
        callServer("post", "/djh/user_info/update_sesame", {
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          sesameCreditScore: this.zhimaScore,
          sesameCreditImg: this.successPicPath,
          sesameStatus: 1
        }).then(res => {
          hideLoading();
          if (res.code == 0) {
            this.isSuccess = true;
            this.SET_ZHIMA_INFO_STATUS(1);
          } else {
            showMsg(res.msg);
          }
        });
      }
    },
    delInfo() {
      this.isShowDeletConfirm = true;
    },
    // 关闭删除确认
    closeFn(val) {
      this.isShowDeletConfirm = val;
    },
    // 确认删除
    sureFn() {
      const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
      showLoading();
      callServer("post", "/djh/user_info/update_sesame", {
        userId: this.userInfo.userId,
        token: this.userInfo.token,
        sesameCreditScore: this.zhimaScore,
        sesameCreditImg: this.successPicPath,
        sesameStatus: 0
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          this.resetForm();
          this.SET_ZHIMA_INFO_STATUS(0);
        }
      });
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isActive() {
      if (this.checkForm(false)) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/common.css";
.zhima-info-area {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 0.6rem;
  .whitebg {
    background-color: #fff;
  }
  .pdlr25 {
    padding: 0 0.5rem;
  }
  .pd18 {
    padding: 0 0.36rem 0.36rem;
  }
  .fz15 {
    font-size: 0.3rem;
    line-height: 0.42rem;
  }
  .c666 {
    color: #666;
  }
  .form-group {
    display: grid;
    grid-template-columns: 30% 70%;
    height: 1.04rem;
    padding: 0 0.36rem;
    align-items: center;
    background-color: #fff;
    border-bottom: 0.02rem solid #f5f5f5;
    .form-label {
      font-size: 0.3rem;
      line-height: 0.4rem;
    }
    .form-desc {
      height: 0.4rem;
      line-height: 0.4rem;
    }
    &.form-group-img {
      border-bottom: 0 none;
      grid-template-columns: 40% 60%;
    }
  }

  .zhima-img {
    height: 3.82rem;
    background: url("../assets/image/editInfo/zhima@2x.png") no-repeat center
      center / 100% 100%;
  }
  // 成功区域样式
  .suc-pic-area {
    padding: 0 0.2rem;
    height: 3.8rem;
  }
  .footer-position {
    position: fixed;
    width: 100%;
    bottom: 0.4rem;
  }
}
</style>