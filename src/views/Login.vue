<template>
  <section class="login-page-area">
    <!-- BG AREA -->
    <div class="login-bg"></div>
    <!-- LOGIN TITLE AREA -->
    <div class="login-title-area">
      <p
        class="login-title"
        :class="active==1?'active':null"
        @click="tableChange('1')"
      >登录</p>
      <p
        class="login-title"
        :class="active==2?'active':null"
        @click="tableChange('2')"
      >注册</p>
    </div>

    <template v-if="active==1">
      <!-- LOGIN FORM AREA -->
      <div class="login-form-area">
        <div class="form-group mobile">
          <input
            type="text"
            placeholder="请输入手机号码"
            autocomplete="off"
            pattern="[0-9]*"
            maxlength="11"
            v-model="mobile"
          >
        </div>
        <div
          class="form-group password"
          v-if="selectPassWord"
        >
          <input
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
            v-model="loginpassword"
          >
        </div>
        <div
          class="form-group verfication"
          v-else
        >
          <input
            type="text"
            placeholder="请输入验证码"
            autocomplete="off"
            pattern="[0-9]*"
            v-model="loginverifyCode"
            class="verify-code"
          >
          <span
            class="button emit-verify-code"
            v-if="!loginisShowTime"
            @click="sendVerifyCode('login')"
          >发送验证码</span>
          <span
            class="verify-code-time"
            v-else
          >{{logintotalTime}}s后重试</span>
        </div>
      </div>
      <!-- LOGIN BTN AREA -->
      <div
        class="login-btn-area button"
        @click="loginFn"
      >
        登录
      </div>
      <!-- PASSWORD & VERIFICATION LOGIN SELECT AREA -->
      <div class="password-verification-select">
        <span
          v-if="selectPassWord"
          @click="selectPassWordFn(false)"
        >验证码登陆</span>
        <span
          v-else
          @click="selectPassWordFn(true)"
        >密码登陆</span>
      </div>
    </template>
    <template v-else>
      <!-- REGISTER FROM AREA -->
      <div class="degister-from-area">
        <div class="form-group mobile">
          <input
            type="text"
            placeholder="请输入手机号码"
            autocomplete="off"
            pattern="[0-9]*"
            maxlength="11"
            v-model="mobile"
          >
        </div>

        <div class="form-group verfication">
          <input
            type="text"
            placeholder="请输入验证码"
            autocomplete="off"
            pattern="[0-9]*"
            v-model="regverifyCode"
            class="verify-code"
          >
          <span
            class="button emit-verify-code"
            v-if="!regisShowTime"
            @click="sendVerifyCode('reg')"
          >发送验证码</span>
          <span
            class="verify-code-time"
            v-else
          >{{regtotalTime}}s后重试</span>
        </div>
        <div class="form-group password">
          <input
            type="password"
            placeholder="请输入密码"
            autocomplete="off"
            v-model="regpassword"
          >
        </div>
        <div class="form-group password">
          <input
            type="password"
            placeholder="请再次输入密码"
            autocomplete="off"
            v-model="regcheckPassWord"
          >
        </div>
      </div>
      <!-- LOGIN BTN AREA -->
      <div
        class="login-btn-area button"
        @click="registerFn"
      >
        注册
      </div>
    </template>

  </section>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      active: 1, //控制登录注册切换
      selectPassWord: true, //控制密码登陆，注册码登陆切换
      mobile: "", //手机号
      loginverifyCode: "", //验证码
      loginpassword: "", //密码
      loginisShowTime: false, //是否显示倒计时
      logintotalTime: 60, //倒计时总时间
      regverifyCode: "", //注册验证码
      regisShowTime: false, //是否显示倒计时
      regtotalTime: 60,
      regpassword: "",
      regcheckPassWord: ""
    };
  },
  methods: {
    ...mapMutations(["SET_TOKEN_USERID", "SET_SCOREDATA_GRADE"]),
    // 登录注册事件
    tableChange(val) {
      this.active = val;
      this.loginverifyCode = null;
      this.loginpassword = null;
      this.regverifyCode = null;
      this.regpassword = null;
      this.regcheckPassWord = null;
    },
    // 发送验证码
    sendVerifyCode(type) {
      clearInterval(this.timerId);
      let { isEmpty, showMsg, regPhone, callServer } = this.$tools;
      if (isEmpty(this["mobile"])) {
        showMsg("手机号码未填写");
        return;
      }
      if (!regPhone(this.mobile)) {
        showMsg("请输入正确的手机号码");
        return;
      }
      this[`${type}isShowTime`] = true;
      let timerId = setInterval(() => {
        this[`${type}totalTime`]--;
        if (this[`${type}totalTime`] < 0) {
          clearInterval(timerId);
          this[`${type}isShowTime`] = false;
          this[`${type}totalTime`] = 60;
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
    // 密码，验证码切换控制
    selectPassWordFn(booleans) {
      if (booleans) {
        this.loginverifyCode = null;
      } else {
        this.loginpassword = null;
      }
      this.selectPassWord = booleans;
    },
    // 登录
    loginFn() {
      const { isEmpty, showMsg, regPhone, callServer } = this.$tools;
      if (isEmpty(this.mobile)) {
        showMsg("手机号码不能为空");
        return;
      }
      if (!regPhone(this.mobile)) {
        showMsg("请输入正确的手机号码");
        return;
      }
      if (this.selectPassWord) {
        //选择密码登陆
        if (isEmpty(this.loginpassword)) {
          showMsg("密码不能为空");
          return;
        }
      } else {
        // 选择验证码登陆
        if (isEmpty(this.loginverifyCode)) {
          showMsg("验证码不能为空");
          return;
        }
      }
      let params = { mobile: this.mobile };
      params.openid = localStorage.getItem("wxUserInfo").openid;
      this.selectPassWord
        ? (params.password = this.loginpassword)
        : (params.authcode = this.loginverifyCode);
      callServer("post", "/djh/user_info/login", params).then(res => {
        if (res.code == 0) {
          // 把手机号码存入本地
          localStorage.setItem("wlmMobile", this.mobile);
          // 把用户昵称存入本地
          localStorage.setItem("nickname", res.data.nickname);
          // 设置token
          this.SET_TOKEN_USERID({
            token: res.data.token,
            userId: res.data.userId
          });
          // 设置信用分及等级
          this.SET_SCOREDATA_GRADE(res.data.creditScore);
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
    },
    // 注册
    registerFn() {
      const { isEmpty, showMsg, regPhone, callServer } = this.$tools;
      if (isEmpty(this.mobile)) {
        showMsg("手机号码不能为空");
        return;
      }
      if (!regPhone(this.mobile)) {
        showMsg("请输入正确的手机号码");
        return;
      }
      if (isEmpty(this.regverifyCode)) {
        showMsg("验证码不能为空");
        return;
      }
      if (isEmpty(this.regpassword)) {
        showMsg("密码不能为空");
        return;
      }
      if (isEmpty(this.regcheckPassWord)) {
        showMsg("请再次输入确认密码");
        return;
      }
      if (this.regpassword !== this.regcheckPassWord) {
        showMsg("两次输入密码不一致!");
        return;
      }
      callServer("POST", "/djh/user_info/register", {
        mobile: this.mobile,
        authcode: this.regverifyCode,
        password: this.regpassword,
        openid: localStorage.getItem("wxUserInfo").openid,
      }).then(res => {
        if (res.code == 0) {
          showMsg("注册成功");
          // 把手机号码存入本地
          localStorage.setItem("wlmMobile", this.mobile);
          // 把用户昵称存入本地
          localStorage.setItem("nickname", res.data.nickname);
          // 设置token
          this.SET_TOKEN_USERID({
            token: res.data.token,
            userId: res.data.userId
          });
          // 设置信用分及等级
          this.SET_SCOREDATA_GRADE(res.data.creditScore);
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
  background-color:#fff;

  // 背景图
  .login-bg {
    width: 100%;
    height: 4.04rem;
    background: url("../assets/image/login/logBg@2x.png") no-repeat center
      center / 100% 100%;
  }

  // 标题
  .login-title-area {
    display: flex;
    padding: 0.4rem 0.6rem 0 0.6rem;
    .login-title {
      position: relative;
      font-size: 0.4rem;
      line-height: 0.96rem;
      color: #8a8a8a;
      margin-right: 0.4rem;
      &.active {
        font-size: 0.48rem;
        font-weight: 600;
        color: #333;
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: 0.04rem;
          transform: translateX(-50%);
          height: 0.04rem;
          width: 0.8rem;
          background-color: #f3802b;
          z-index: -1;
        }
      }
    }
  }

  // 表单区域
  .login-form-area,
  .degister-from-area {
    padding: 0 0.6rem;
    margin-top: 0.6rem;
    background-color: #fff;

    .form-group {
      position: relative;
      width: 100%;
      padding: 0.24rem 0 0.24rem 0.46rem;
      border-bottom: 0.02rem solid #f4f7fc;
      &::before {
        content: "";
        position: absolute;
        width: 0.36rem;
        height: 0.36rem;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      &.mobile {
        &::before {
          background-image: url("../assets/image/login/mobile@2x.png");
        }
      }
      &.verfication {
        &::before {
          background-image: url("../assets/image/login/verfication@2x.png");
        }
      }
      &.password {
        &::before {
          background-image: url("../assets/image/login/password@2x.png");
        }
      }
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
    margin: 0.7rem auto 0;
    width: 6.3rem;
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

  // 密码登陆，验证码登陆切换
  .password-verification-select {
    margin-top: 0.28rem;
    color: #3f9dff;
    font-size: 0.32rem;
    font-weight: 500;
    line-height: 0.44rem;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
}
</style>