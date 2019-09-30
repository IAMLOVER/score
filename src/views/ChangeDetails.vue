<template>
  <section class="change-detail-area">
    <nav class="banner-area">
      <!-- <div class="banner-left">45</div>
      <div class="banner-right">
        <p class="voucher">代金券</p>
        <p class="coupon">COUPON</p>
      </div> -->
      <img
        :src="goodsDetail.goodsImg"
        alt=""
      >
    </nav>
    <div class="detail-desc-area">
      <p class="desc-area">
        <span class="desc">{{goodsDetail.goodsName}}</span>
      </p>
      <p class="price-area">
        <span
          class="old-price"
          v-if="goodsDetail.volume"
        ><span class="fz14">￥</span>{{goodsDetail.volume}}</span>
        <span class="now-price"><span class="fz14">￥</span>{{goodsDetail.goodsPrice}}</span>
      </p>
    </div>
    <div class="goods-content-area">
      <p class="goods-title">商品详情：</p>
      <div class="goods-main">
        {{goodsDetail.goodsInfo}}

        <!-- <p class="goos-subtitle">爱电影通卡兑换规则</p>
        <p>1. 兑换规则：持本卡1张可兑换45元及以下2D或3D电影票1张，超出45元需叠加使用；
          <br /> 2.规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则；
          <br />3.规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则。</p> -->
      </div>
    </div>
    <div
      class="submit-info active"
      @click="submitGoodsInfo(goodsDetail.goodsPrice)"
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
import WX_SDK from "@/assets/js/WX_SDK.js";
import GoodsToast from "../components/GoodsToast";
export default {
  name: "ChangeDetails",
  mixins: [WX_SDK],
  components: { GoodsToast },
  data() {
    return {
      openid: "",
      userId: "",
      goodsId: "",
      goodsDetail: "",
      typeIcon: "success", //显示是否成功图标
      isShowToast: false //是否显示toast
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

    this.goodsId = this.$route.query.goodsId;
    this.getGoodsDetail(this.goodsId);
  },
  methods: {
    getGoodsDetail(id) {
      const { callServer, showLoading, hideLoading, showMsg } = this.$tools;
      showLoading();
      callServer("POST", "/djh/zhongchenGoods/detail", {
        goodsId: id
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          this.goodsDetail = res.data;
        } else {
          showMsg(res.msg);
        }
      });
    },
    submitGoodsInfo(money) {
      const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
      showLoading();
      callServer("POST", "/djh/wx_pay/zhongchen/prepay", {
        userId: this.userId,
        openid: this.openid,
        money: (this.goodsDetail.goodsPrice * 100).toFixed(2),
        body: "卡券购买",
        type: 2, //1话费 2卡券
        goodsId: this.goodsId,
        goodsNum: 1 //商品数量
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
              this.isShowToast = true;
              this.typeIcon = "fail";
            },
            cancel => {
              showMsg("支付已取消", 3000);
            }
          );
        } else {
          hideLoading();
          showMsg(res.msg);
        }
      });
    },
    sureFn(val) {
      // 关闭弹出层
      this.isShowToast = false;
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
    height: 1rem;
    padding: 0 0.3rem 0 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 0.02rem solid #f5f7f8;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .desc {
      line-height: 0.48rem;
      color: #333333;
      font-size: 0.32rem;
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