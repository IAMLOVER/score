<template>
  <section class="change-detail-area">
    <section class="change-detail-content">
      <nav class="banner-area">
        <img :src="goodsDetail.goodsImg" alt />
      </nav>

      <div class="detail-desc-area">
        <p class="desc-area">
          <span class="desc">{{goodsDetail.goodsName}}</span>
        </p>
        <p class="price-area">
          <span class="old-price" v-if="goodsDetail.volume">
            <span class="fz14">￥</span>
            {{goodsDetail.volume}}
          </span>
          <span class="now-price">
            <span class="fz14">￥</span>
            {{goodsDetail.money}}
          </span>
        </p>
      </div>

      <div class="goods-content-area">
        <p class="goods-title">商品详情：</p>
        <div class="goods-main" v-html="goodsDetail.goodsInfo"></div>
      </div>

      <div class="goods-btn-area">
        <div
          v-if="goodsDetail.stock>0"
          class="submit-info"
          :class="userId ? 'active': ''"
          :disabled="userId ? true :false"
          @click="submitGoodsInfo(goodsDetail.money)"
        >{{goodsDetail.money==0?'免费兑换':'立即兑换'}}</div>
        <div v-else class="no-exchange" @click="showMsg">不可兑换</div>
        <div class="now-stock">
          （当前剩余库存
          <span class="stock-num">{{goodsDetail.stock}}</span>）
        </div>
      </div>
    </section>
    <!-- toast -->
    <GoodsToast v-show="isShowToast" :typeIcon="typeIcon" @sure="sureFn" @goToTarget="goToTargetFn"></GoodsToast>
  </section>
</template>

<script>
import WX_SDK from "@/assets/js/WX_SDK.js";
import GoodsToast from "../components/GoodsToast";
import { mapMutations } from "vuex";
export default {
  name: "ChangeForBianlimao",
  mixins: [WX_SDK],
  components: { GoodsToast },
  data() {
    return {
      fromId: "",
      mark: "",
      userId: "",
      token: "",
      goodsId: "",
      goodsDetail: "",
      typeIcon: "success", //显示是否成功图标
      isShowToast: false //是否显示toast
    };
  },
  created() {
    const store = JSON.parse(
      localStorage.getItem("store") ? localStorage.getItem("store") : null
    );
    this.userId = store ? store.userId : null;
    this.token = store ? store.token : null;
    this.mark = store ? store.mark : null;
    this.goodsId = this.$route.query.goodsId;
    this.getGoodsDetail(this.goodsId);

    // 后台确定支付结果，返回到此页面;
    const payResult = this.$route.query.pay_result;
    if (payResult == "success") {
      window.history.replaceState(
        null,
        null,
        `${window.location.href.replace("&pay_result=success", "")}`
      );
      // 支付成功，调取兑换接口
      this.exchange();
    }
    if (payResult == "fail") {
      // 支付失败
      this.typeIcon = "fail";
      this.isShowToast = true;
      window.history.replaceState(
        null,
        null,
        `${window.location.href.replace("&pay_result=fail", "")}`
      );
    }
    if (payResult == "cancle") {
      // 取消支付
      window.history.replaceState(
        null,
        null,
        `${window.location.href.replace("&pay_result=cancle", "")}`
      );
      this.cancleOrder();
    }
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
      // 免费兑换
      if (money == 0) {
        callServer("POST", "/djh/zhongchenOrder/buyFreeGoods", {
          userId: this.userId,
          token: this.token,
          goodsId: this.goodsId
        }).then(res => {
          hideLoading();
          if (res.code == 0) {
            this.isShowToast = true;
            this.typeIcon = "success";
          } else {
            showMsg(res.msg);
          }
        });
        return;
      }
      callServer("POST", "/djh/zhongchenOrder/preOrder", {
        userId: this.userId,
        mark: this.mark,
        money: (money * 100).toFixed(2) * 1,
        body: "卡券购买",
        type: 2, //1话费 2卡券
        goodsId: this.goodsId,
        goodsNum: 1 //商品数量
      }).then(res => {
        if (res.code == 0) {
          // 拿到订单号跳转链接交予app
          let serialNo = res.data.serialNo;
          localStorage.setItem("serialNo", serialNo);
          window.open(
            `/empty.html/#order_no=${serialNo}`
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
    },
    goToTargetFn(name) {
      // 关闭弹出层
      this.isShowToast = false;
      this.$router.push({ name: name });
    },
    showMsg() {
      const { showMsg } = this.$tools;
      showMsg("当前库存为0，不可兑换");
    },
    // 兑换接口
    exchange() {
      const { callServer, showMsg, showLoading,hideLoading } = this.$tools;
      const serialNo = localStorage.getItem("serialNo")
        ? localStorage.getItem("serialNo")
        : "";
      let params = {};
      params.serialNo = serialNo;
      showLoading();
      callServer("POST", "/djh/zhongchenOrder/getStatus", params).then(res => {
        hideLoading();
        if (res.code == 0) {
          // 兑换成功
          this.isShowToast = true;
          this.typeIcon = "success";
        } else {
          // 兑换失败
          this.isShowToast = true;
          this.typeIcon = false;
        }
      });
    },
    // 取消支付接口
    cancleOrder() {
      const { callServer, showMsg } = this.$tools;
      const serialNo = localStorage.getItem("serialNo")
        ? localStorage.getItem("serialNo")
        : "";
      let params = {};
      params.serialNo = serialNo;
      params.userId = this.userId;
      params.token = this.token;
      callServer("POST", "/djh/wx_pay/zhongchen/cancel", params).then(res => {
        if (res.code == 0) {
          showMsg("取消支付成功");
        } else {
          showMsg(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.change-detail-area {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  // 公共样式
  .fz14 {
    font-size: 0.28rem;
  }
  .change-detail-content {
    position: relative;
    width: 82%;
    height: 90%;
    box-shadow: 0 0.04rem 0.16rem 0.06rem rgba(0, 0, 0, 0.12);
    border-radius: 0.08rem;
  }

  .banner-area {
    width: 100%;
    height: 3.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url("../assets/image/mescrolloptions/img_default@2x.png")
      no-repeat center center/100% 100%;
    border-radius: 0.08rem 0.08rem 0 0;
    overflow: hidden;
  }
  .detail-desc-area {
    width: 100%;
    height: 1rem;
    padding: 0 0.3rem;
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
    padding: 0.3rem;
    height: 45%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .goods-title {
      font-size: 0.28rem;
      line-height: 0.4rem;
      color: #333;
    }
    .goods-main {
      margin-top: 0.2rem;
      color: #8a8a8a;
    }
  }

  .goods-btn-area {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0.2rem;
  }
  .submit-info {
    width: 5.6rem;
    margin: 0.2rem auto 0;
  }

  // 不可兑换样式
  .no-exchange {
    cursor: pointer;
    margin: 0.2rem auto 0;
    width: 5.6rem;
    height: 0.92rem;
    line-height: 0.92rem;
    background-color: #dedede;
    color: #9a9a9a;
    text-align: center;
    border-radius: 0.08rem;
    font-size: 0.36rem;
    user-select: none;
    &:active {
      background-color: #f5f5f5;
      -webkit-tap-highlight-color: transparent;
    }
  }
  // 剩余库存样式
  .now-stock {
    margin-top: 0.06rem;
    line-height: 0.4rem;
    text-align: center;
    color: #8a8a8a;
    font-size: 0.28rem;
    .stock-num {
      font-size: 0.32rem;
      color: #333;
      font-weight: 500;
    }
  }
}
</style>