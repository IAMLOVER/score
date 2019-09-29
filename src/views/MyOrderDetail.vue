<template>
  <section class="myorder-detail-area">
    <!-- ORDER INFO AREA -->
    <div class="order-info-area">
      <p class="order-num">
        <span>订单号：</span>
        <span>20190927162739</span>
      </p>
      <div class="order-info-desc">
        <div class="good-img">
          <img
            src="../assets/image/creditLife/djq_20_1@2x.png"
            alt=""
          >
        </div>
        <div class="good-desc">
          <p>天猫购物券10元</p>
          <p class="deadline">（截止时间：2019年09月29日）</p>
        </div>
      </div>
    </div>

    <!-- ORDER CARD -->
    <div class="order-card-area">
      <div class="order-card-area">
        <p>
          <span class="label">卡号：</span>
          <span>876376547613</span>
        </p>
        <p
          class="copy"
          @click="doCopy('876376547613')"
        >复制</p>
      </div>
      <div class="order-card-password-area">
        <p>
          <span class="label">卡号密码：</span>
          <span>876376547613</span>
        </p>
        <p
          class="copy"
          @click="doCopy('87637654')"
        >复制</p>
      </div>
    </div>

    <!-- ORDER DETAIL -->
    <div class="order-detail-area">
      <p class="detail-title">商品详情</p>
      1.了咖啡店三句两句开了家大方块科利达放假了； 2.拉开发动机肯德基撒； 兑换路径： 1）打卡就撒放大镜 大力开发商敬爱的发； 2）考虑到撒娇剪短发的雷克萨发就发SDK龙卷风sad了 打了卡就打卡； 3）了解对方卡发大立科技发。
    </div>
  </section>
</template>

<script>
export default {
  name: "MyOrderDetail",
  data() {
    return {};
  },
  methods: {
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