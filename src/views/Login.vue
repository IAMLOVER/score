<template>
  <section class="login-page-area">
    <!-- BG AREA -->
    <!-- <div class="login-bg"></div> -->
    <!-- LOGIN TITLE AREA -->
    <div class="login-title-area">
      <p class="login-title">登录</p>
      <!-- <p class="login-subtitle">喵喵生活，乐在分享</p> -->
    </div>
    <!-- LOGIN FORM AREA -->
    <div class="login-form-area">
      <div class="form-group">
        <input
          type="text"
          name="mobile"
          placeholder="请输入手机号码"
          autocomplete="off"
          pattern="[0-9]*"
          maxlength="11"
          v-model="mobile"
        >
      </div>
      <div class="form-group">
        <input
          type="text"
          name="authcode"
          placeholder="请输入验证码"
          autocomplete="off"
          pattern="[0-9]*"
          v-model="verifyCode"
          class="verify-code"
        >
        <span
          class="button emit-verify-code"
          v-if="!isShowTime"
          @click="sendVerifyCode"
        >发送验证码</span>
        <span
          class="verify-code-time"
          v-else
        >{{totalTime}}s后重试</span>
      </div>
    </div>
    <!-- LOGIN BTN AREA -->
    <div
      class="login-btn-area button"
      @click="login"
    >
      登录
    </div>

  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      mobile: "", //手机号
      verifyCode: "", //验证码
      isShowTime: false, //是否显示倒计时
      totalTime: 60
    };
  },
  methods: {
    // 发送验证码
    sendVerifyCode() {
      clearInterval(this.timerId);
      let { isEmpty, showMsg, regPhone, callServer } = this.$tools;
      if (isEmpty(this.mobile)) {
        showMsg("手机号码未填写");
        return;
      }
      if (!regPhone(this.mobile)) {
        showMsg("请输入正确的手机号码");
        return;
      }
      this.isShowTime = true;
      this.timerId = setInterval(() => {
        this.totalTime--;
        if (this.totalTime < 0) {
          clearInterval(this.timerId);
          this.isShowTime = false;
          this.totalTime = 60;
        }
      }, 1000);
      callServer("post", "/djh/user_info/authcode", {
        mobile: this.mobile,
        type: 1
      }).then(res => {
        if (res.code == 0) {
        } else {
          showMsg(res.msg);
        }
      });
    },
    // 登录
    login() {
      let { isEmpty, showMsg, regPhone, callServer } = this.$tools;
      if (isEmpty(this.mobile)) {
        showMsg("手机号码不能为空");
        return;
      }
      if (!regPhone(this.mobile)) {
        showMsg("请输入正确的手机号码");
        return;
      }
      if (isEmpty(this.verifyCode)) {
        showMsg("验证码不能为空");
        return;
      }
      callServer("post", "/djh/user_info/login", {
        mobile: this.mobile,
        authcode: this.verifyCode
      }).then(res => {
        if (res.code == 0) {
          // 把手机号码存入本地
          localStorage.setItem("wlmMobile", this.mobile);
          // 设置token
          this.$store.commit("SET_TOKEN_USERID", {
            token: res.data.token,
            userId: res.data.userId
          });
          // 从本地取出存入的跳转路径，如果有，就跳转到存入的，没有就跳转到信用分首页
          let fromRouterName = localStorage.getItem("fromRouterName")
            ? localStorage.getItem("fromRouterName")
            : "CreditScore";
          this.$router.replace({
            name: fromRouterName
          });
        } else {
          showMsg(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-page-area {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 3.2rem 0.6rem 0 0.6rem;

  // 背景图
  .login-bg {
    position: absolute;
    right: 0;
    top: 0;
    width: 4.24rem;
    height: 5.1rem;
    background: url("../assets/image/login/logBg@2x.png") no-repeat center
      center / 100% 100%;
  }

  // 标题
  .login-title-area {
    .login-title {
      position: relative;
      font-size: 0.6rem;
      line-height: 0.84rem;
      font-weight: 600;
      color: #333;

      &::after {
        content: "";
        position: absolute;
        left: -0.02rem;
        bottom: 0.04rem;
        height: 0.16rem;
        width: 1.24rem;
        background-color: #f3802b;
        z-index: -1;
      }
    }

    .login-subtitle {
      font-size: 0.32rem;
      font-weight: 500;
      line-height: 0.44rem;
      color: #9a9a9a;
    }
  }

  // 表单区域
  .login-form-area {
    margin-top: 1rem;

    .form-group {
      position: relative;
      width: 100%;
      padding: 0.24rem 0;
      border-bottom: 0.02rem solid #f4f7fc;

      input {
        font-size: 0.32rem;
        line-height: 0.44rem;

        &.verify-code {
          width: 70%;
        }
      }

      .emit-verify-code {
        position: absolute;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 1.68rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        color: #f3802b;
        font-size: 0.24rem;
        border: 0.02rem solid #f3802b;
        border-radius: 0.32rem;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &:active {
          background: #f3802b;
          color: #fff;
          -webkit-tap-highlight-color: transparent;
        }
      }

      .verify-code-time {
        position: absolute;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 1.68rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
        background-color: #ccc;
        border: 0.02rem solid #ccc;
        border-radius: 0.32rem;
      }
    }
  }

  // 登录按钮
  .login-btn-area {
    margin-top: 0.7rem;
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    font-size: 0.32rem;
    font-weight: 600;
    color: #fff;
    border-radius: 0.46rem;
    background-color: #f3802b;
    -webkit-box-shadow: 0rem 0.04rem 0.08rem 0rem rgba(243, 128, 43, 0.6);
    box-shadow: 0rem 0.04rem 0.08rem 0rem rgba(243, 128, 43, 0.6);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:active {
      background: rgba(243, 128, 43, 0.6);
      color: #fff;
      -webkit-tap-highlight-color: transparent;
    }
  }
}
</style>