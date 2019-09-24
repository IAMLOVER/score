<template>
  <section class="email-area">
    <Security></Security>

    <!-- 未绑定成功时显示 -->
    <template v-if="!isSuccess">
      <!-- INPUTS AREA -->
      <section class="inputs-area">
        <div class="input-wrap">
          <span>单位邮箱</span>
          <div class="email">
            <input
              type="eamil"
              placeholder="所在单位的个人邮箱地址"
              v-model="email"
              v-focus
            />
          </div>
        </div>
        <div class="input-wrap">
          <span>校验码</span>
          <div class="check-code">
            <input
              type="number"
              placeholder="点击输入"
              v-model="checkCode"
            />
            <div
              class="send-code"
              @click="sendCode"
              v-if="!hassent"
            >发送校验码</div>
            <div
              class="wait-code"
              v-else
            >重新发送({{totalTime}})</div>
          </div>
        </div>
      </section>

      <Footertip class="mt20"></Footertip>
      <!-- BTN AREA -->
      <div
        class="submit-info button"
        :class="isActive?'active':null"
        @click="submitInfo"
      >绑定</div>
    </template>
    <!-- 绑定成功时显示 -->
    <template v-else>
      <section class="success-area">
        <p class="success-icon"></p>
        <p class="success-title">绑定成功</p>
        <p class="success-email">{{email}}</p>
        <p class="success-footer">
          <span>提交时间：{{null|dataFm("年-月-日")}}</span>
          <span
            class="button del"
            @click="delInfo"
          >删除</span>
        </p>
      </section>
      <footer>
        <Footertip />
      </footer>
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
import Footertip from "./Footertip";
import DeleteToast from "./DeleteToast";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "EMail",
  components: { Security, Footertip, DeleteToast },
  data() {
    return {
      email: "",
      checkCode: "",
      hassent: false, //控制校验码按钮是否可以点击 false表示未发送，ture表示已发送
      totalTime: 60, //倒计时
      isSuccess: false, //控制是否绑定成功
      isShowDeletConfirm: false //是否显示删除确认框
    };
  },
  created() {},
  computed: {
    isActive() {
      let { isEmpty, regEmail } = this.$tools;
      if (isEmpty(this.email) || isEmpty(this.checkCode)) {
        return false;
      }
      if (!regEmail(this.email)) {
        return false;
      }
      return true;
    },
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapMutations(["SET_EMAIL_STATUS"]),
    sendCode() {
      let { isEmpty, showMsg, regEmail, callServer } = this.$tools;
      if (isEmpty(this.email)) {
        showMsg("邮箱不能为空");
        return;
      }
      if (!regEmail(this.email)) {
        showMsg("邮箱格式错误");
        return;
      }
      this.hassent = true;
      // 开启计时器
      this.timerId = setInterval(() => {
        if (this.totalTime <= 0) {
          clearInterval(this.timerId);
          this.hassent = false;
          this.totalTime = 60;
          return;
        }
        this.totalTime--;
      }, 1000);
      // 发送验证码
      callServer("post", "/djh/user_info/email_authcode", {
        email: this.email,
        type: 1
      }).then(res => {
        if (res.code == 0) {
        } else {
          showMsg(res.msg);
        }
      });
    },
    submitInfo() {
      const {
        isEmpty,
        showMsg,
        showLoading,
        hideLoading,
        callServer
      } = this.$tools;
      if (isEmpty(this.email) || isEmpty(this.checkCode)) {
        showMsg("请检查信息是否填写完整");
        return;
      }
      callServer("post", "/djh/user_info/update_email", {
        userId: this.userInfo.userId,
        token: this.userInfo.token,
        email: this.email,
        authcode: this.checkCode,
        emailStatus: 1
      }).then(res => {
        if (res.code == 0) {
          this.isSuccess = true;
          this.checkCode = null;
          this.hassent = false;
          this.totalTime = 60;
          this.SET_EMAIL_STATUS(1);
        } else {
          showMsg(res.msg);
        }
      });
    },
    resetForm() {
      //删除邮箱，复原初始设置
      this.email = "";
      this.hassent = false;
      this.isSuccess = false;
      this.totalTime = 60;
      this.isShowDeletConfirm = false;
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
      this.$tools.showLoading();
      setTimeout(() => {
        this.resetForm();
        this.$tools.hideLoading();
      });
    }
  }
};
</script>

<style lang="less" scoped>
.email-area {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
  .inputs-area {
    background-color: #fff;
    .input-wrap {
      width: 100%;
      height: 1.04rem;
      padding: 0 0.4rem;
      display: grid;
      grid-template-columns: 25% 75%;
      align-items: center;
      border-bottom: 0.02rem solid #eee;
      span {
        line-height: 0.4rem;
        font-size: 0.3rem;
        font-weight: 500;
      }
      input {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.28rem;
      }
      .check-code {
        display: flex;
        align-items: center;
        input {
          width: 3rem;
        }
        .send-code {
          width: 1.96rem;
          font-size: 0.3rem;
          line-height: 0.72rem;
          text-align: center;
          cursor: pointer;
          color: #fff;
          background-color: #f4552c;
          border-radius: 0.08rem;
          &:active {
            background: #f3802b;
            -webkit-tap-highlight-color: transparent;
          }
        }
        .wait-code {
          width: 1.96rem;
          font-size: 0.3rem;
          line-height: 0.72rem;
          text-align: center;
          border-radius: 0.08rem;
          background-color: #dedede;
          color: #9a9a9a;
          user-select: none;
        }
      }
    }
  }

  // 绑定成功时样式
  .success-area {
    width: 6.9rem;
    height: 4.14rem;
    margin: 0 auto;
    padding: 0.4rem 0.4rem 0 0.4rem;
    background-color: #fff;

    .success-icon {
      width: 1rem;
      height: 1rem;
      margin: 0 auto;
      border-radius: 50%;
      background: url("../assets/image/editInfo/ic_success@2x.png") no-repeat
        center center / 100% 100%;
    }
    .success-title,
    .success-email {
      line-height: 0.44rem;
      font-size: 0.32rem;
      text-align: center;
    }
    .success-title {
      margin: 0.24rem 0 0.4rem 0;
    }
    .success-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.3rem;
      line-height: 0.9rem;
      border-top: 0.02rem solid #eeeeee;
      color: #9a9a9a;
      .del {
        padding: 0 0.2rem;
        color: #f4552c;
        user-select: none;
        &:active {
          background: #dedede;
          -webkit-tap-highlight-color: transparent;
        }
      }
    }
  }
  footer {
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0.4rem;
  }
}
</style>