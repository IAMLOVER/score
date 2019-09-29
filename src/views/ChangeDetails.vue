<template>
  <section class="change-detail-area">
    <nav
      class="banner-area"
      :style="{backgroundColor:'#'+navBg}"
    >
      <div class="banner-left">45</div>
      <div class="banner-right">
        <p class="voucher">代金券</p>
        <p class="coupon">COUPON</p>
      </div>
    </nav>
    <div class="detail-desc-area">
      <p class="desc-area">
        <span class="desc">爱电影45元观影代金券</span>
        <span class="time">有效期至2019年09月26日</span>
      </p>
      <p class="price-area">
        <span class="now-price"><span class="fz14">￥</span>45</span>
        <span class="old-price"><span class="fz14">￥</span>50</span>
      </p>
    </div>
    <div class="goods-content-area">
      <p class="goods-title">商品详情：</p>
      <div class="goods-main">
        <p class="goos-subtitle">爱电影通卡兑换规则</p>
        <p>1. 兑换规则：持本卡1张可兑换45元及以下2D或3D电影票1张，超出45元需叠加使用；
          <br /> 2.规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则；
          <br />3.规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则。</p>
      </div>
    </div>
    <div
      class="submit-info active"
      @click="submitGoodsInfo"
    >
      立即兑换
    </div>

    <!-- toast -->
    <GoodsToast
      v-show="isShowToast"
      :typeIcon="typeIcon"
      @sure="sureFn"
    ></GoodsToast>
  </section>
</template>

<script>
import GoodsToast from "../components/GoodsToast";
export default {
  name: "ChangeDetails",
  components: { GoodsToast },
  data() {
    return {
      navBg: "#FFBF00",
      typeIcon: "success", //显示是否成功图标
      isShowToast: false //是否显示toast
    };
  },
  created() {
    this.navBg = this.$route.query.bgc;
  },
  methods: {
    submitGoodsInfo() {
      // 提交商品信息
      setTimeout(() => {
        this.isShowToast = true;
        this.typeIcon = "success";
      });
    },
    sureFn(val) {
      // 关闭弹出层
      this.isShowToast = false;

      if (val) return;
      // 如果兑换失败，重新发起兑换
      this.submitGoodsInfo();
    }
  }
};
</script>

<style lang="less" scoped>
.change-detail-area {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  // 公共样式
  .fz14 {
    font-size: 0.28rem;
  }
  .banner-area {
    width: 100%;
    height: 2.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .banner-left {
      font-size: 1.3rem;
      line-height: 1.82rem;
      color: #fff;
    }
    .banner-right {
      .voucher {
        color: #fff;
        font-size: 0.48rem;
        line-height: 0.66rem;
      }
      .coupon {
        padding: 0 0.16rem;
        line-height: 0.4rem;
        background-color: #fff;
        color: #f5a455;
        font-size: 0.28rem;
        font-weight: 600;
        border-radius: 0.2rem;
      }
    }
  }
  .detail-desc-area {
    width: 100%;
    height: 1.32rem;
    padding: 0.2rem 0.3rem 0.2rem 0.4rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 0.02rem solid #f5f7f8;
    p {
      display: flex;
      flex-direction: column;
    }
    .desc {
      line-height: 0.48rem;
      color: #333333;
      font-size: 0.28rem;
      font-weight: 500;
    }
    .time {
      line-height: 0.4rem;
      color: #8a8a8a;
      font-weight: 500;
    }
    .now-price {
      line-height: 0.48rem;
      color: #f17d0a;
      font-size: 0.48rem;
    }
    .old-price {
      line-height: 0.4rem;
      font-size: 0.36rem;
      color: #8a8a8a;
      text-decoration: line-through;
    }
  }
  .goods-content-area {
    padding: 0.4rem;
    .goods-title {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #333;
    }
    .goods-main {
      margin-top: 0.2rem;
      color: #8a8a8a;
      p {
        line-height: 0.36rem;
      }
      .goos-subtitle {
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>