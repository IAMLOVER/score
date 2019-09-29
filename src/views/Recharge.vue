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
        <!-- 快速话费选择区域 -->
        <div class="call-charge-area">
          <p class="charge-title">
            <span class="title-line"></span>
            <span>请选择充值金额</span>
            <span class="title-line"></span>
          </p>
          <ul class="charge-amount-area">
            <li
              v-for="(item,index) in normalChargeList"
              :key="item.price"
              class="amount-item"
              :class="normalselect==index?'select':null"
              @click="goToPay(item.sale,index)"
            >
              <span class="price">{{item.price/100}}元</span>
              <span class="price-desc">售价：{{item.sale/100}}.00元</span>
            </li>
          </ul>

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

        <!-- 话费慢充区域 -->
        <div class="slow-charge-area">
          <div class="slow-table-area">
            <p
              class="table"
              :class="slowActive==0?'active':null"
              @click="tableSwitch(0,CMMARK)"
            >
              <span
                class="mark"
                :class="CMMARK"
              ></span>
              广东移动慢充
            </p>
            <p
              class="table"
              :class="slowActive==1?'active':null"
              @click="tableSwitch(1,CUMARK)"
            >
              <span
                class="mark"
                :class="CUMARK"
              ></span>
              联通慢充
            </p>
          </div>
          <ul
            class="charge-amount-area"
            v-show="slowChargeList.length>0"
          >
            <li
              v-for="(item,index) in slowChargeList"
              :key="item.price"
              class="amount-item"
              :class="normalselect==index?'select':null"
              @click="goToPay(item.sale,index)"
            >
              <span class="price">{{item.price/100}}元</span>
              <span class="price-desc">售价：{{item.sale/100}}.00元</span>
            </li>
          </ul>
          <div
            class="soldout-empty-area"
            v-show="slowChargeList.length<=0"
          >
            <div class="empty-img"></div>
            <p>暂无商品</p>
          </div>
        </div>

      </van-tab>
    </van-tabs>

    <!-- action sheet area -->
    <van-action-sheet
      v-model="show"
      :round=false
      title="确认支付"
      @close="closeActionSheet"
    >
      <p class="sure-price-area">￥<span class="sure-price">{{surePrice}}.00</span></p>
      <div class="form-group">
        <span>手机号</span>
        <span>{{mobile}}</span>
      </div>
      <div class="form-group">
        <span>充值券</span>
        <span class="c8a">无可用</span>
      </div>
      <div class="form-group">
        <span>支付方式</span>
        <span>微信</span>
      </div>

      <div
        class="submit active"
        @click="surePay"
      >
        立即支付
      </div>
    </van-action-sheet>

    <!-- 支付成功或失败弹出层 -->
    <RechagreToast
      v-show="isShowToast"
      :typeIcon="typeIcon"
      @sure="sureFn"
    ></RechagreToast>

  </section>
</template>

<script>
import WX_SDK from "@/assets/js/WX_SDK.js";
import RechagreToast from "../components/RechargeToast";
export default {
  name: "Rechagre",
  mixins: [WX_SDK],
  components: { RechagreToast },
  data() {
    return {
      isShowToast: false, //成功失败弹出层显示控制
      typeIcon: "success", //成功失败弹出层线图的图标
      show: false, //action sheet显示控制
      active: 0, //table
      openid: "",
      userId: "",
      mobile: "",
      normalChargeList: [
        { price: 2000, sale: 2000 },
        { price: 3000, sale: 3000 },
        { price: 5000, sale: 5000 },
        { price: 10000, sale: 10000 },
        { price: 20000, sale: 20000 },
        { price: 30000, sale: 30000 },
        { price: 50000, sale: 50000 }
      ],
      normalselect: null, //正常充值是否选中
      surePrice: "", //确认充值金额
      slowChargeList: [
        { price: 10000, sale: 9100 },
        { price: 20000, sale: 18200 },
        { price: 30000, sale: 27300 },
        { price: 50000, sale: 45500 }
      ],
      slowActive: 0, //慢充table切换
      CMMARK: "rebate", //慢充移动标记 soldout：售罄 rebate：折扣
      CUMARK: "soldout" //慢充联通标记
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

    const { regPhone, regPhoneType } = this.$tools;
    // 从localstorage中获取手机号码
    this.mobile = localStorage.getItem("wlmMobile") || null;
  },
  methods: {
    // 调起支付actionsheet
    goToPay(price, index) {
      const { showMsg } = this.$tools;
      if (!this.mobileType) {
        showMsg("不支持此电话号码，请重新输入", 3000);
        return;
      }
      this.surePrice = price / 100;
      this.normalselect = index;
      this.show = true;
    },
    // 确认支付
    surePay() {
      const { callServer, showMsg, showLoading, hideLoading } = this.$tools;
      showLoading();
      callServer("post", "/djh/wx_pay/prepay_info", {
        money: this.surePrice,
        openid: this.openid,
        body: "充值支付",
        userId: this.userId,
        mobile: this.mobile
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
          this.myWXPay(
            params,
            res => {
              showMsg("支付成功", 3000);
              this.isShowToast = true;
              this.typeIcon = "success";
            },
            err => {
              showMsg("支付失败，请重新支付", 3000);
            },
            cancel => {
              showMsg("支付已取消", 3000);
            }
          );
        }
      });
    },

    // 话费慢充table切换
    tableSwitch(index, mark) {
      this.slowActive = index;
      let CMCULIST = [];
      if (index == 0) {
        if (mark == "soldout") {
          // 表示售罄
          CMCULIST = [];
        } else {
          // CM 移动充值金额数据 91折
          CMCULIST = [
            { price: 10000, sale: 9100 },
            { price: 20000, sale: 18200 },
            { price: 30000, sale: 27300 },
            { price: 50000, sale: 45500 }
          ];
        }
        this.slowChargeList = CMCULIST;
        return;
      }
      if (index == 1) {
        if (mark == "soldout") {
          CMCULIST = [];
        } else {
          // CU 联通充值金额数据
          CMCULIST = [
            { price: 10000, sale: 8000 },
            { price: 20000, sale: 16000 },
            { price: 30000, sale: 27000 },
            { price: 50000, sale: 45000 },
            { price: 60000, sale: 55000 }
          ];
        }

        this.slowChargeList = CMCULIST;
        return;
      }
    },
    // 关闭actionsheet
    closeActionSheet() {
      // 取消选中
      this.normalselect = null;
    },
    // 关闭成功失败弹出层
    sureFn(val) {
      this.isShowToast = false;
      if (val) return;
      const { showMsg } = this.$tools;
      showMsg("支付失败,退款功能正在开发，敬请期待...",3000);
    }
  },
  computed: {
    mobileTypeName() {
      return this.$tools.regPhoneType(this.mobile).name;
    },
    mobileType() {
      return this.$tools.regPhoneType(this.mobile).type;
    }
  }
};
</script>

<style lang="less" scoped>
.recharge-area {
  min-height: 100vh;
  background-color: #f5f7f8;
  // 公共样式
  .c8a {
    color: #8a8a8a !important;
  }
  // 手机号填写区域
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
  // 话费选择区域
  .charge-amount-area {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    .amount-item {
      width: 2.2rem;
      height: 1.36rem;
      padding-left: 0.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border: 0.02rem solid #dedede;
      border-radius: 0.16rem;
      margin-bottom: 0.2rem;
      margin-right: 0.2rem;
      cursor: pointer;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &.select {
        background-color: #f17d0a;
        .price {
          color: #fff;
        }
        .price-desc {
          color: #fff;
        }
      }
      .price {
        line-height: 0.44rem;
        font-weight: 500;
        color: #333;
        font-size: 0.32rem;
      }
      .price-desc {
        line-height: 0.36rem;
        color: #8a8a8a;
      }
    }
  }
  // 话费快充区域
  .call-charge-area {
    margin-top: 0.1rem;
    width: 100%;
    padding: 0.3rem 0.24rem;
    background-color: #fff;

    .charge-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #8a8a8a;
      font-size: 0.28rem;
      line-height: 1.16rem;
      .title-line {
        width: 2.3rem;
        height: 0.02rem;
        background-color: #eaedf2;
      }
    }
  }
  // 慢充话费选择区域
  .slow-charge-area {
    margin-top: 0.1rem;
    background-color: #fff;
    padding: 0.3rem 0.24rem;
    .slow-table-area {
      height: 0.68rem;
      margin-bottom: 0.3rem;
      display: flex;
      justify-content: center;
      .table {
        position: relative;
        width: 1.88rem;
        line-height: 0.68rem;
        text-align: center;
        border: 0.02rem solid #cdcdcd;
        user-select: none;
        &:nth-of-type(1) {
          border-radius: 0.08rem 0 0 0.08rem;
          border-right: 0 none;
        }
        &:nth-of-type(2) {
          border-radius: 0 0.08rem 0.08rem 0;
          border-left: 0 none;
        }
        &.active {
          background-color: #f17d0a;
          border-color: #f17d0a;
          color: #fff;
        }
        .mark {
          position: absolute;
          width: 0.86rem;
          height: 0.24rem;
          right: 0;
          transform: translateY(-50%);
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &.rebate {
            background-image: url("../assets/image/creditLife/rebate@2x.png");
          }
          &.soldout {
            background-image: url("../assets/image/creditLife/soldout@2x.png");
          }
        }
      }
    }
  }

  // 慢充话费无数据时展示
  .soldout-empty-area {
    padding: 0.6rem 0 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .empty-img {
      width: 1.6rem;
      height: 1.48rem;
      background: url("../assets/image/creditLife/soldout_empty@2x.png")
        no-repeat center center / 100% 100%;
    }
    p {
      margin-top: 0.2rem;
      font-size: 0.32rem;
      color: #666666;
      line-height: 0.44rem;
    }
  }

  // action sheet area
  .sure-price-area {
    line-height: 0.4rem;
    font-weight: 600;
    color: #f17d0a;
    text-align: center;
    margin: 0.2rem 0;
    .sure-price {
      font-size: 0.48rem;
    }
  }
  .form-group {
    height: 0.8rem;
    padding: 0 0.36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.02rem solid #f7f7f7;
    span {
      line-height: 0.4rem;
      color: #1d1d1d;
      font-size: 0.28rem;
    }
  }
  .submit {
    width: 6.76rem;
    height: 0.88rem;
    line-height: 0.88rem;
    margin: 0.8rem auto 0.4rem;
    left: 0.88rem;
    text-align: center;
    border-radius: 0.16rem;
    background-color: #f17d0a;
    cursor: pointer;
    color: #fff;
    font-size: 0.32rem;
    user-select: none;
    &:active {
      background: #f3802b;
      -webkit-tap-highlight-color: transparent;
    }
  }
}
</style>