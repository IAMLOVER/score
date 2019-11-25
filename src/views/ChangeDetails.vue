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
      </div>
    </section>
    <!-- toast -->
    <GoodsToast v-show="isShowToast" :typeIcon="typeIcon" @sure="sureFn" @goToTarget="goToTargetFn"></GoodsToast>

    <!-- 手动确认是否完成了支付 -->
    <div class="pay-result-shadow" v-show="showPayShadow">
      <div class="content">
        <div>请确认微信支付是否已完成</div>
        <div style="color:red" @click="checkOrderPayResult">已完成支付</div>
        <div @click="payAgain">支付遇到问题，重新支付</div>
      </div>
    </div>
  </section>
</template>

<script>
import WX_SDK from "@/assets/js/WX_SDK.js";
import GoodsToast from "../components/GoodsToast";
import { mapMutations } from "vuex";
export default {
  name: "ChangeDetails",
  mixins: [WX_SDK],
  components: { GoodsToast },
  data() {
    return {
      fromId: "",
      openid: "",
      userId: "",
      token: "",
      goodsId: "",
      goodsDetail: "",
      typeIcon: "success", //显示是否成功图标
      isShowToast: false, //是否显示toast
      showPayShadow: false
    };
  },
  created() {
    //获取当前连接，根据fromId判断是从哪一个公众号进入的当前页面;1:大众点金 2:微联盟
    let fromId = this.$route.query.fromId;
    let store = localStorage.getItem("store")
      ? JSON.parse(localStorage.getItem("store"))
      : null;
    this.userId = store.userId;
    this.token = store.token;
    this.fromId = fromId;
    if (fromId == 1) {
      // 判断大众点金是否已经授权
      let wxDianJinUserInfo = JSON.parse(
        localStorage.getItem("wxDianJinUserInfo")
          ? localStorage.getItem("wxDianJinUserInfo")
          : null
      );
      if (wxDianJinUserInfo && wxDianJinUserInfo.openid) {
        this.openid = wxDianJinUserInfo.openid;
      } else {
        // 保存当前路由地址，授权后跳回到此地址
        sessionStorage.setItem(
          "wxDianJinRedirectUrl",
          `${location.pathname}${location.search}`
        );
        let appId = "wxf0ab4b0f8353c4bf";
        let redirectUrl = encodeURIComponent(
          `${window.location.host}/redirect.html?type=WxDianJinAuth`
        );
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=http://${redirectUrl}&response_type=code&scope=snsapi_base&state=state#wechat_redirect`;
      }
    } else {
      // 如果from不等于1
      const wxUserInfo = JSON.parse(
        localStorage.getItem("wxUserInfo")
          ? localStorage.getItem("wxUserInfo")
          : null
      );
      this.openid = wxUserInfo ? wxUserInfo.openid : null;
    }
    this.goodsId = this.$route.query.goodsId;
    this.getGoodsDetail(this.goodsId);
    let payResult = this.$route.query.payResult;
    window.history.replaceState(
      null,
      null,
      `${window.location.href.replace("&payResult=1", "")}`
    );
    if (payResult) {
      this.showPayShadow = true;
    }
  },
  methods: {
    getGoodsDetail(id) {
      const { callServer, showLoading, hideLoading, showMsg } = this.$tools;
      showLoading();
      let mark = localStorage.getItem("store")
        ? JSON.parse(localStorage.getItem("store")).mark
        : "";
      callServer("POST", "/djh/zhongchenGoods/detail", {
        goodsId: id,
        mark: mark
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
      if (money == 0) {
        // 如果是大众点金用户购买
        if (this.fromId == 1) {
          // 从本地获取大众点金userId
          const store = JSON.parse(
            localStorage.getItem("store") ? localStorage.getItem("store") : null
          );
          this.userId = store ? store.userId : null;
          this.token = store ? store.token : null;
          if (this.userId == null || this.token == null) {
            sessionStorage.setItem(
              "wxDianJinRedirectUrl",
              `${location.pathname}${location.search}`
            );
            let appId = "wxf0ab4b0f8353c4bf";
            let redirectUrl = encodeURIComponent(
              `${window.location.host}/redirect.html?type=WxDianJinAuth`
            );
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=http://${redirectUrl}&response_type=code&scope=snsapi_base&state=state#wechat_redirect`;
            return;
          }
          // 如果价格是0的时候调用另外一个接口
          callServer("POST", "/djh/zhongchenOrder/buyFreeGoods", {
            userId: this.userId,
            token: this.token,
            goodsId: this.goodsId,
            wxMsgStatus: 1
          }).then(res => {
            if (res.code == 0) {
              this.isShowToast = true;
              this.typeIcon = "success";
            } else {
              showMsg(res.msg);
            }
          });
          return;
        } else {
          // 如果价格是0的时候调用另外一个接口
          // 从本地获取userId
          const store = JSON.parse(
            localStorage.getItem("store") ? localStorage.getItem("store") : null
          );
          this.userId = store ? store.userId : null;
          this.token = store ? store.token : null;
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
      }
      // 从本地获取userId
      const store = JSON.parse(
        localStorage.getItem("store") ? localStorage.getItem("store") : null
      );
      this.userId = store ? store.userId : null;
      this.token = store ? store.token : null;
      if (this.openid) {
        callServer("POST", "/djh/wx_pay/zhongchen/prepay", {
          userId: this.userId,
          openid: this.openid,
          money: (money * 100).toFixed(2) * 1,
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
            // 预支付订单号
            const outTradeNo = res.data.outTradeNo;
            this.myWXPay(
              params,
              res => {
                this.isShowToast = true;
                this.typeIcon = "success";
              },
              err => {
                this.isShowToast = true;
                this.typeIcon = "fail";
              },
              cancel => {
                callServer("POST", "/djh/wx_pay/zhongchen/cancel", {
                  outTradeNo: outTradeNo,
                  userId: this.userId,
                  token: this.token
                }).then(res => {
                  if (res.code == 0) {
                    showMsg("支付已取消", 2000);
                  } else {
                    showMsg(res.msg);
                  }
                });
              }
            );
          } else {
            hideLoading();
            showMsg(res.msg);
          }
        });
      } else {
        callServer("POST", "/djh/wx_pay/zhongchen/webPrepay", {
          userId: this.userId,
          money: (money * 100).toFixed(2) * 1,
          body: "卡券购买",
          type: 2, //1话费 2卡券
          goodsId: this.goodsId,
          goodsNum: 1 //商品数量
        }).then(res => {
          console.log(res);
          if (res.code == 0) {
            let baseURL = window.location.origin;
            baseURL =
              baseURL.indexOf(".com") > -1
                ? "http://xyf.dazhongdianjin.com"
                : "http://xyf.dazhongdianjin.cn";

            let redirect_url = encodeURIComponent(
              `${baseURL}/ChangeDetails?goodsId=${this.goodsId}&payResult=1`
            );
            localStorage.setItem("outTradeNo", res.data.outTradeNo);
            let payUrl = `${res.data.mweb_url}&redirect_url=${redirect_url}`;
            localStorage.setItem("payUrl", payUrl);
            window.location.href = payUrl;
          } else {
            showMsg(res.msg);
          }
        });
      }
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
    // 查单操作
    checkOrderPayResult() {
      let outTradeNo = localStorage.getItem("outTradeNo");
      let { callServer, showMsg } = this.$tools;
      callServer("POST", "/djh/zhongchenOrder/h5PayStatus", {
        outTradeNo: outTradeNo,
        userId: this.userId,
        token: this.token
      }).then(res => {
        this.showPayShadow = false;
        if (res.code == 0) {
          // orderStatus
          // PREPAY(1, "预支付"),
          // SUCCESS(2, "支付成功"),
          // FAILURE(3, "支付失败"),
          if (res.data.orderStatus == 1 || res.data.orderStatus == 3) {
            this.isShowToast = true;
            this.typeIcon = "fail";
          }
          if (res.data.orderStatus == 2) {
            this.isShowToast = true;
            this.typeIcon = "success";
          }
        }
      });
    },
    // 点击重新支付
    payAgain() {
      this.showPayShadow = false;
      let payUrl = localStorage.getItem("payUrl");
      window.location.href = payUrl;
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
  .pay-result-shadow {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.12);
    .content {
      width: 5.5rem;
      height: 3rem;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 0.3rem;
      div {
        height: 1rem;
        width: 100%;
        box-sizing: border-box;
        line-height: 1rem;
        font-size: 0.28rem;
        text-align: center;
        border-bottom: 0.01rem solid #eee;
        &:last-child {
          border-bottom: none;
          color: #666;
        }
      }
    }
  }
}
</style>