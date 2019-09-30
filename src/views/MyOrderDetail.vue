<template>
  <section class="myorder-detail-area">
    <!-- ORDER INFO AREA -->
    <div class="order-info-area">
      <p class="order-num">
        <span>订单号：</span>
        <span>{{serialNo}}</span>
      </p>
      <div class="order-info-desc">
        <div class="good-img">
          <img
            :src="orderDetail.goodsImg"
            alt=""
          >
        </div>
        <div class="good-desc">
          <p>{{orderDetail.goodsName}}</p>

          <p
            class="deadline"
            v-if="expireTime"
          >（截止时间：{{expireTime}}）</p>
          <p
            class="deadline"
            v-else
          >（订单时间：{{orderDetail.orderTime}}）</p>
        </div>
      </div>
    </div>

    <!-- ORDER CARD -->
    <div
      class="order-card-area"
      v-for="(item,index) in orderDetail.cardList"
      :key="index"
    >
      <div class="order-card-area">
        <p>
          <span class="label">卡号：</span>
          <span>{{item.cardNo}}</span>
        </p>
        <p
          class="copy"
          @click="doCopy(item.cardNo)"
        >复制</p>
      </div>
      <div class="order-card-password-area">
        <p>
          <span class="label">卡号密码：</span>
          <span>{{item.cardPwd}}</span>
        </p>
        <p
          class="copy"
          @click="doCopy(item.cardPwd)"
        >复制</p>
      </div>
    </div>

    <!-- ORDER DETAIL -->
    <div
      class="order-detail-area"
      v-if="orderDetail.goodsInfo"
    >
      <p class="detail-title">商品详情</p>
      <div v-html="orderDetail.goodsInfo"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: "MyOrderDetail",
  data() {
    return {
      userId: "",
      token: "",
      serialNo: "", //订单编号
      expireTime: "", //截止时间
      orderDetail: {} //订单详情
    };
  },
  created() {
    this.serialNo = this.$route.query.serialNo;
    // 从本地获取userId
    const store = JSON.parse(
      localStorage.getItem("store") ? localStorage.getItem("store") : null
    );
    this.userId = store ? store.userId : null;
    this.token = store ? store.token : null;
    // 获取订单详情
    this.getOrderDetail();
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
      const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
      showLoading();
      callServer("POST", "/djh/zhongchenOrder/detail", {
        serialNo: this.serialNo,
        userId: this.userId,
        token: this.token
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          this.orderDetail = res.data;
          if (res.data.cardList) {
            let expireTime =
              res.data.cardList.length > 0
                ? res.data.cardList[0].expireTime
                : null;
            let strTime = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
            let timeStr = expireTime.replace(
              strTime,
              "$1年$2月$3日$4时$5分$6秒"
            );
            this.expireTime = this.timeStr;
          }
        } else {
          showMsg(res.msg);
        }
      });
    },
    doCopy(val) {
      const { showMsg } = this.$tools;
      console.log(val);
      this.$copyText(val).then(
        e => {
          console.log(e);
          showMsg(`您的兑换码已复制成功<br/>兑换码：${e.text}`, 3000);
        },
        e => {
          console.log(e);
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.myorder-detail-area {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f7f8;

  .order-info-area {
    padding: 0 0.3rem;
    background-color: #fff;
    margin-bottom: 0.1rem;
    .order-num {
      line-height: 0.8rem;
      border-bottom: 0.02rem solid #f7f7f7;
      span {
        display: inline-block;
        vertical-align: middle;
        font-size: 0.28rem;
        &:nth-of-type(1) {
          color: #8a8a8a;
        }
      }
    }
    .order-info-desc {
      padding: 0.6rem 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .good-img {
        width: 2.12rem;
        height: 1.2rem;
        margin-bottom: 0.2rem;
        background-color: #f5f5f5;
      }
      .good-desc {
        line-height: 0.4rem;
        text-align: center;
        .deadline {
          color: #8a8a8a;
        }
      }
    }
  }
  .order-card-area {
    background-color: #fff;
    margin-bottom: 0.1rem;
    .order-card-area,
    .order-card-password-area {
      padding: 0 0.28rem;
      height: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.28rem;
      .label {
        color: #8a8a8a;
      }
    }
    .copy {
      padding: 0.1rem;
      color: #f17d0a;
      cursor: pointer;
    }
  }
  .order-detail-area {
    padding: 0.24rem 0.3rem;
    line-height: 0.4rem;
    background-color: #fff;
    color: #8a8a8a;
    font-size: 0.28rem;
    .detail-title {
      color: #666666;
    }
  }
}
</style>