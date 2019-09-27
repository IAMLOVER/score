<template>
  <section class="recharge-area">
    <van-tabs
      v-model="active"
      line-width="42"
    >
      <van-tab title="充话费">
        <!-- 手机号填写区域 -->
        <div class="mobile-box-area">
          <div class="mobile-box">
            <input
              type="text"
              placeholder="请输入充值手机号码"
              autocomplete="off"
              pattern="[0-9]*"
              maxlength="11"
              v-model="mobile"
            >
          </div>
          <p class="mobile-tip">账号绑定号码({{mobileTypeName}})</p>
        </div>
        <!-- 话费选择区域 -->
        <div class="call-charge-area">
          <p class="charge-title">
            <span class="title-line"></span>
            <span>请选择充值金额</span>
            <span class="title-line"></span>
          </p>
        </div>

      </van-tab>
      <van-tab title="话费慢充">
        <div class="mobile-box-area">
          <div class="mobile-box">
            <input
              type="text"
              placeholder="请输入充值手机号码"
              autocomplete="off"
              pattern="[0-9]*"
              maxlength="11"
              v-model="mobile"
            >
          </div>
          <p class="mobile-tip">账号绑定号码({{mobileTypeName}})</p>
        </div>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script>
export default {
  name: "Rechagre",
  components: {},
  data() {
    return {
      active: 0,
      mobile: "",
      mobileType: "",
      mobileTypeName: ""
    };
  },
  created() {
    const { regPhone, regPhoneType } = this.$tools;
    // 从localstorage中获取手机号码
    this.mobile = localStorage.getItem("wlmMobile") || null;
    this.mobileTypeName = regPhoneType(this.mobile).name;
    this.mobileType = regPhoneType(this.mobile).type;
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.recharge-area {
  min-height: 100vh;
  background-color: #f5f7f8;
  .mobile-box-area {
    width: 100%;
    height: 1.5rem;
    padding: 0.3rem 0.3rem 0.2rem 0.24rem;
    margin-top: 0.04rem;
    background-color: #fff;
    .mobile-box {
      height: 0.56rem;
      color: #333;
      input {
        line-height: 0.56rem;
        font-size: 0.4rem;
      }
    }
    .mobile-tip {
      margin-top: 0.1rem;
      line-height: 0.36rem;
      color: #8a8a8a;
    }
  }
  .call-charge-area {
    margin-top: 0.1rem;
    width: 100%;
    padding: 0.4rem 0.28rem;
    background-color: #fff;

    .charge-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #8a8a8a;
      font-size: 0.28rem;
      line-height: 0.4rem;
    }
    .title-line {
      width: 2.3rem;
      height: 0.02rem;
      background-color: #eaedf2;
    }
  }
}
</style>