<template>
  <section class="creditPage">
    <!-- BANNER -->
    <div class="banner">
      <img
        src="../assets/image/creditReport/banner.png"
        alt="log"
      >
    </div>
    <!-- FORM -->
    <div
      class="form"
      id="form"
    >
      <div class="title pd20 fz22">
        <i class="sign">*</i>查询个人报告需要确认您的身份信息
      </div>
      <div class="inputs">
        <div class="inputs-item">
          <div class="icon icon-username"></div>
          <div class="input">
            <input
              type="text"
              placeholder="请填写真实姓名"
              name="username"
              data-required='true'
              data-name="姓名"
              id="userName"
              autocomplete="off"
              v-model="username"
            >
          </div>
        </div>
        <div class="inputs-item">
          <div class="icon icon-idcard"></div>
          <div class="input">
            <input
              type="text"
              placeholder="请填写身份证号码"
              maxlength="18"
              name="idcard"
              id="idCard"
              data-required='true'
              data-name="身份证"
              autocomplete="off"
              v-model="idcard"
            >
          </div>
        </div>
        <div class="inputs-item">
          <div class="icon icon-mobile"></div>
          <div class="input">
            <input
              type="tel"
              placeholder="请填写手机号码"
              novalidate="novalidate"
              pattern="[0-9]*"
              maxlength="11"
              name="mobile"
              id="mobile"
              data-required='true'
              data-name="手机号码"
              autocomplete="off"
              v-model="mobile"
            >
          </div>
        </div>
      </div>
      <div class="agree pd20 fz22">
        <span
          class="is-agree-icon  cur"
          :class="agree?'active':null"
          @click="changeAgree"
        >
          <input
            type="hidden"
            data-required='true'
            id="is-agree-icon-flag"
            name="agree"
            v-model="agreeVal"
          >
        </span>
        <p class="agree-desc cur">
          我同意<a
            href="http://wlm.dazhongdianjin.com/creditReport/pact.html"
            class="blue"
          >《个人信息授权协议》</a>
        </p>
      </div>
      <div
        class="submit cur"
        :class="active?'active':null"
        id="submitPlay"
        @click="submitInfo"
      > 支付（¥{{money/100}}）</div>
    </div>
    <!-- DECLARATION -->
    <div class="declaration">
      <p class="decdt">
        <span class="safety"></span>数据安全声明
      </p>
      <p class="decdd">您的个人信息仅用作信息报告查询</p>
      <p class="decdd">采用MD5+RSA加密算法，银行级数据保护</p>
    </div>
  </section>
</template>

<script>
import WX_SDK from "@/assets/js/WX_SDK.js";
export default {
  name: "CreditReport",
  mixins: [WX_SDK],
  data() {
    return {
      openid: "",
      money: "1",
      userId: "",
      username: "",
      idcard: "",
      mobile: "",
      agree: true,
      agreeVal: 1 //1为同意授权协议，
    };
  },
  created() {
    // 从本地获取微信用户信息
    const wxUserInfo = JSON.parse(
      localStorage.getItem("wxUserInfo")
        ? localStorage.getItem("wxUserInfo")
        : null
    );
    // 从本地获取userId
    const store = JSON.parse(
      localStorage.getItem("store") ? localStorage.getItem("store") : null
    );
    this.openid = wxUserInfo ? wxUserInfo.openid : null;
    this.userId = store ? store.userId : null;
  },
  methods: {
    //是否同意
    changeAgree() {
      if (this.agree) {
        this.agree = false;
        this.agreeVal = 0;
      } else {
        this.agree = true;
        this.agreeVal = 1;
      }
    },
    checkForm(noShow = true) {
      const { showMsg, isEmpty, isIdentityCardNo, regPhone } = this.$tools;
      if (isEmpty(this.username)) {
        noShow && showMsg("姓名不能为空");
        return false;
      }
      if (isEmpty(this.idcard)) {
        noShow && showMsg("身份证号码不能为空");
        return false;
      }
      if (!isIdentityCardNo(this.idcard)) {
        noShow && showMsg("身份证号码格式不正确");
        return false;
      }
      if (isEmpty(this.mobile)) {
        noShow && showMsg("电话号码不能为空");
        return false;
      }
      if (!regPhone(this.mobile)) {
        noShow && showMsg("手机号码格式不正确");
        return false;
      }
      if (this.agreeVal == 0) {
        noShow && showMsg("请选择同意");
        return false;
      }
      return true;
    },
    submitInfo() {
      if (this.checkForm()) {
        const { callServer, showMsg, showLoading, hideLoading } = this.$tools;
        showLoading();
        callServer("post", "/djh/wx_pay/prepay_info", {
          money: this.money,
          openid: this.openid,
          body: "报告查询",
          userId: this.userId,
          name: this.username,
          mobile: this.mobile,
          idcard: this.idcard
        }).then(res => {
          if (res.code == 0) {
            const params = {
              appId: res.data.appId,
              timeStamp: res.data.timeStamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package,
              signType: res.data.signType,
              prepay_id: res.data.prepay_id,
              sign: res.data.sign
            };
            const token = res.data.token;
            this.myWXPay(
              params,
              res => {
                window.location.href = `http://wlm.dazhongdianjin.cn/creditReport/creditReportNew/creditSearchNew.html?token=${token}`;
              },
              err => {
                showMsg("支付失败，请重新支付", 3000);
              },
              cancel => {
                showMsg("支付已取消", 3000);
              }
            );
          } else if (res.code == 110) {
            // 已经支付过了
            window.location.href = `http://wlm.dazhongdianjin.cn/creditReport/creditReportNew/creditSearchNew.html?token=${token}`;
          } else {
            hideLoading();
            showMsg(res.msg + "</br>请确保在微信浏览器中打开", 3000);
          }
        });
      }
    }
  },
  computed: {
    active() {
      if (this.checkForm(false)) {
        return true;
      }

      return false;
    }
  }
};
</script>

<style lang="less" scoped>
.creditPage {
  background-color: #f7f7f7;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  // BASE COLOR START
  .blue {
    color: #3790f4;
  }

  .sign {
    color: #fe4343;
    font-size: 0.22rem;
    font-weight: 500;
  }

  .pd20 {
    padding: 0 0.2rem;
  }

  .fz22 {
    font-size: 0.22rem;
    font-weight: 500;
    color: #999;
  }

  // BASE COLOR END
  .banner {
    width: 100%;
    height: 3.7rem;
  }

  // FORM
  .form {
    .title {
      line-height: 0.8rem;
    }

    .inputs {
      background-color: #fff;
      padding: 0 0.22rem 0.28rem 0.62rem;

      .inputs-item {
        height: 0.74rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;

        .icon {
          background-position: center center;
          background-repeat: no-repeat;
          width: 0.48rem;
          height: 0.36rem;
          margin-right: 0.38rem;

          &.icon-username {
            background-image: url("../assets/image/creditReport/user_name_icon.png");
            background-size: 0.26rem 0.33rem;
          }

          &.icon-idcard {
            background-image: url("../assets/image/creditReport/idcard_icon.png");
            background-size: 0.47rem 0.33rem;
          }

          &.icon-mobile {
            background-image: url("../assets/image/creditReport/mobile_icon.png");
            background-size: 0.24rem 0.36rem;
          }
        }

        .input {
          height: 0.6rem;
          line-height: 0.6rem;
          -webkit-box-flex: 1;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          border-bottom: 1px solid #ebebeb;

          input {
            font-size: 0.28rem;
          }
        }
      }
    }

    .agree {
      height: 0.82rem;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;

      span {
        display: block;
      }

      .is-agree-icon {
        width: 0.32rem;
        height: 0.32rem;
        margin-right: 0.08rem;
        border-radius: 50%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 80% 80%;
        background-image: url("../assets/image/creditReport/unselect.png");

        &.active {
          background-image: url("../assets/image/creditReport/select.png");
        }
      }

      .agree-desc {
        line-height: 0.32rem;
        a {
          display: inline;
        }
      }
    }

    .submit {
      background-color: #ddd;
      color: #999;
      font-size: 0.28rem;
      font-weight: bold;
      text-align: center;
      width: 5.69rem;
      line-height: 0.65rem;
      margin: 0.5rem auto 0;
      border-radius: 0.33rem;
      user-select: none;
      pointer-events: none;

      &.active {
        background: -o-linear-gradient(
          bottom,
          rgba(233, 101, 74, 1),
          rgba(242, 168, 68, 1)
        );
        background: -webkit-gradient(
          linear,
          left bottom,
          left top,
          from(rgba(233, 101, 74, 1)),
          to(rgba(242, 168, 68, 1))
        );
        background: linear-gradient(
          0deg,
          rgba(233, 101, 74, 1),
          rgba(242, 168, 68, 1)
        );
        color: #fff;
        pointer-events: auto;
      }
      &:active {
        background: #f3802b;
        -webkit-tap-highlight-color: transparent;
      }
    }
  }

  // DECLARATION
  .declaration {
    margin-top: 0.96rem;

    p {
      text-align: center;
      line-height: 0.4rem;
    }

    .decdt {
      font-size: 0.3rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 0.15rem;
      position: relative;

      .safety {
        display: inline-block;
        vertical-align: top;
        width: 0.35rem;
        height: 0.37rem;
        background: url("../assets/image/creditReport/safety.png") no-repeat
          center center / 100% 100%;
        margin-right: 0.18rem;
      }
    }

    .decdd {
      font-size: 0.24rem;
      color: #999999;
    }
  }
}
</style>