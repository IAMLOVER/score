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
            >
          </div>
        </div>
        <div class="input-wrap">
          <span>校验码</span>
          <div class="check-code">
            <input
              type="number"
              placeholder="点击输入"
              v-model="checkCode"
            >
            <div
              class="send-code "
              @click="sendCode"
              v-if="!hassent"
            >发送校验码</div>
            <div
              class="wait-code"
              v-else
            >
              重新发送({{totalTime}})
            </div>
          </div>
        </div>
      </section>
      <!-- BTN AREA -->
      <section class="btn-area">
        <Footertip></Footertip>
        <div
          class="submit button"
          :class="isActive?'isActive':null"
          @click="submitInfo"
        >绑定</div>
      </section>
    </template>
    <!-- 绑定成功时显示 -->
    <template v-else>
      <section class="success-area">
        <p class="success-icon"></p>
        <p class="success-title">绑定成功</p>
        <p class="success-email">{{email}}</p>
        <p class="success-footer">
          <span>提交时间：2019年06月21日</span>
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

  </section>
</template>

<script>
import Security from "./Security";
import Footertip from "./Footertip";
export default {
  name: "EMail",
  components: { Security, Footertip },
  data() {
    return {
      email: "",
      checkCode: "",
      hassent: false, //控制校验码按钮是否可以点击 false表示未发送，ture表示已发送
      totalTime: 60, //倒计时
      isSuccess: false //控制是否绑定成功
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
    }
  },
  methods: {
    sendCode() {
      let { isEmpty, showMsg, regEmail } = this.$tools;
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
    },
    submitInfo() {
      this.checkCode = null;
      setTimeout(() => {
        this.isSuccess = true;
        this.checkCode = null;
        this.hassent = false;
      }, 1000);
    },
    delInfo() {
      //删除邮箱，复原初始设置
      this.email = "";
      this.hassent = false;
      this.isSuccess = false;
      this.totalTime = 60;
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
        line-height: 0.4rem;
        font-size: 0.3rem;
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
  .btn-area {
    margin-top: 0.6rem;
    .submit {
      margin: 0.28rem auto 0;
      width: 6.8rem;
      height: 0.92rem;
      line-height: 0.92rem;
      text-align: center;
      background-color: #dedede;
      color: #9a9a9a;
      font-size: 0.36rem;
      border-radius: 0.08rem;
      pointer-events: none;
      &.isActive {
        pointer-events: auto;
        background-color: #f4552c;
        color: #fff;
        &:active {
          background: #f3802b;
          -webkit-tap-highlight-color: transparent;
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