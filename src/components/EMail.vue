<template>
  <section class="email-area">
    <Security></Security>
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
            :class="hassent?'hassent':null"
            @click="sendCode"
          >发送校验码</div>
        </div>
      </div>
    </section>
    <!-- BTN AREA -->
    <section class="btn-area">
      <p class="btn-tip">请确保你本人的信息真实有效 上传虚假信息将对你的信用产生负面影响</p>
      <div
        class="submit button"
        :class="hasSucess?'hasSucess':null"
        @click="submitInfo"
      >绑定</div>
    </section>
  </section>
</template>

<script>
import Security from "./Security";
export default {
  name: "EMail",
  components: { Security },
  data() {
    return {
      email: "",
      checkCode: "",
      hassent: false, //控制校验码按钮是否可以点击
    };
  },
  created() {},
  computed: {
    hasSucess(){
      let { isEmpty, regEmail } = this.$tools;
      if(isEmpty(this.email)||isEmpty(this.checkCode)){
        return false
      }
      if(!regEmail(this.email)){
        return false
      }
      return true
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
        return
      }
      this.hassent = true;
    },
    submitInfo(){
      setTimeout(()=>{
         this.$tools.showMsg('提交成功')
         this.email=null;
         this.checkCode=null;
         this.hassent=false;
      },1000)
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
          &.hassent {
            background-color: #eee;
            color: #999;
          }
          &:active {
            background: #f3802b;
            -webkit-tap-highlight-color: transparent;
          }
        }
      }
    }
  }
  .btn-area {
    margin-top: 0.6rem;
    .btn-tip {
      width: 5.04rem;
      margin: 0 auto;
      text-align: center;
      color: #9a9a9a;
      font-size: 0.28rem;
      line-height: 0.4rem;
    }
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
      &.hasSucess {
        background-color: #f4552c;
        color: #fff;
        &:active {
          background: #f3802b;
          -webkit-tap-highlight-color: transparent;
        }
      }
    }
  }
}
</style>