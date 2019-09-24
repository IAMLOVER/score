<template>
  <section class="id-card-area">
    <Security></Security>
    <!-- NO SUCCESS -->
    <template v-if="!isSuccess">
      <!-- FORM AREA -->
      <div class="form-area">

        <div class="form-group">
          <span class="form-label">姓名</span>
          <div class="form-desc">
            <input
              type="text"
              v-model="userName"
              placeholder="请输入您的姓名"
            />
          </div>
        </div>
        <div class="form-group">
          <span class="form-label">身份证</span>
          <div class="form-desc">
            <input
              type="text"
              v-model="idCardNo"
              placeholder="请输入您的身份证号"
            />
          </div>
        </div>
      </div>
      <!-- PIC AREA -->
      <div class="pic-area">
        <div class="pic-id-card">
          <Camear
            tip="拍摄身份证正面"
            @savePicPath="savePicPathF"
          ></Camear>
        </div>
        <div class="pic-id-card">
          <Camear
            tip="拍摄身份证背面"
            @savePicPath="savePicPathB"
          ></Camear>
        </div>
      </div>
      <!-- FOOTER TIP AREA -->
      <Footertip></Footertip>
      <!-- BTN AREA -->
      <div
        class="submit-info button"
        :class="isActive?'active':null"
        @click="submitInfo"
      >提交</div>
    </template>
    <template v-else>
      <div class="success-main-area">
        <div class="success-tips">
          <p class="success-icon"></p>
          <p class="success-title">提交成功</p>
        </div>
        <!-- Main CONTENT -->
        <div class="success-main">
          <div class="main-item">
            <span class="item-lable">姓 名</span>
            <span class="item-desc">{{userName}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">身份证号</span>
            <span class="item-desc">{{idCardNo}}</span>
          </div>

          <div class="main-item">
            <span class="item-lable">身份证图片</span>
          </div>
          <div class="item-pic-area">
            <div class="suc-pic-area">
              <img
                :src="idcardF"
                alt
              />
            </div>
            <div class="suc-pic-area">
              <img
                :src="idcardB"
                alt
              />
            </div>
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
      <!-- FOOTER TIP AREA -->
      <Footertip></Footertip>
    </template>

    <DeleteToast
      v-if="isShowDeletConfirm"
      @closeFn="closeFn"
      @sure="sureFn"
    ></DeleteToast>
  </section>
</template>

<script>
import Camear from "./Camear";
import Security from "./Security";
import Footertip from "./Footertip";
import DeleteToast from "./DeleteToast";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "IdCard",
  components: {
    Camear,
    Security,
    Footertip,
    DeleteToast
  },
  data() {
    return {
      userName: "",
      idCardNo: "",
      idcardF: "", //正面
      idcardB: "", //背面
      isSuccess: false, // 判断信息是否提交成功
      isShowDeletConfirm: false //是否显示删除确认框
    };
  },
  created() {},
  methods: {
    ...mapMutations(["SET_IDCARD_STATUS"]),
    savePicPathF(successPicPath) {
      this.idcardF = successPicPath;
    },
    savePicPathB(successPicPath) {
      this.idcardB = successPicPath;
    },
    checkForm(noShow = true) {
      let { isEmpty, showMsg, isIdentityCardNo } = this.$tools;
      if (isEmpty(this.userName)) {
        noShow && showMsg("姓名不能为空");
        return false;
      }
      if (isEmpty(this.idCardNo)) {
        noShow && showMsg("身份证号不能为空");
        return false;
      }
      if (!isIdentityCardNo(this.idCardNo)) {
        noShow && showMsg("身份证号格式不正确");
        return false;
      }
      if (isEmpty(this.idcardF)) {
        noShow && showMsg("身份证号正面不能为空");
        return false;
      }
      if (isEmpty(this.idcardB)) {
        noShow && showMsg("身份证号背面不能为空");
        return false;
      }
      return true;
    },
    resetForm() {
      this.userName = "";
      this.idCardNo = "";
      this.idcardF = "";
      this.idcardB = "";
      this.isSuccess = false;
      this.isShowDeletConfirm = false;
    },
    // 提交信息
    submitInfo() {
      const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
      if (this.checkForm()) {
        showLoading();
        callServer("post", "/djh/user_info/update_id_card", {
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          name: this.userName,
          idCardNo: this.idCardNo,
          idCardFront: this.idcardF,
          idCardBack: this.idcardB,
          idCardStatus: 1
        }).then(res => {
          hideLoading();
          if (res.code == 0) {
            this.isSuccess = true;
            this.SET_IDCARD_STATUS(1);
          } else {
            showMsg(res.msg);
          }
        });
      }
    },
    delInfo() {
      this.isShowDeletConfirm = true;
    },
    // 提交状态信息
    // 关闭删除确认
    closeFn(val) {
      this.isShowDeletConfirm = val;
    },
    // 确认删除
    sureFn() {
      const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
      showLoading();
      callServer("post", "/djh/user_info/update_id_card", {
        userId: this.userInfo.userId,
        token: this.userInfo.token,
        name: this.userName,
        idCardNo: this.idCardNo,
        idCardFront: this.idcardF,
        idCardBack: this.idcardB,
        idCardStatus: 0
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          this.resetForm();
          this.SET_IDCARD_STATUS(0);
        }
      });
    }
  },
  computed: {
    isActive() {
      if (this.checkForm(false)) {
        return true;
      }
      return false;
    },
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/common.css";
.id-card-area {
  height: 100%;
  padding-bottom: 0.68rem;
  background-color: #f7f7f7;
}
.id-card-title {
  line-height: 0.94rem;
  text-align: center;
  color: #9a9a9a;
}
.form-area {
  background-color: #fff;

  .form-group {
    display: grid;
    height: 1.04rem;
    width: 100%;
    padding: 0 0.36rem;
    grid-template-columns: 30% 70%;
    align-items: center;
    border-bottom: 0.02rem solid #eee;
    &:nth-of-type(2) {
      border-bottom: 0 none;
    }
    .form-label {
      font-size: 0.3rem;
      font-weight: 500;
      line-height: 0.4rem;
    }
    .form-desc {
      height: 0.4rem;
      input {
        line-height: 0.4rem;
        text-align: right;
        font-size: 0.28rem;
      }
    }
  }
}
.pic-area {
  background-color: #fff;
  padding-bottom: 0.4rem;
  margin-bottom: 0.4rem;
  .pic-id-card:nth-of-type(1) {
    margin-bottom: 0.3rem;
  }
}
</style>