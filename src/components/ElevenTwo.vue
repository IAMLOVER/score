<template>
  <section class="eleven">
    <div class="eleven-content">
      <img src="../assets/image/creditLife/bg_popup2@2x.png" alt />
      <div class="goods">
        <div class="item" v-for="(item,index) in goodsList" :key="index">
          <div class="item-left">
            <img :src="item.goodsImg.includes('http')?item.goodsImg:(imgPrePath + item.goodsImg)" alt />
          </div>
          <div class="item-right">
            <p class="item-name">{{item.goodsName}}</p>
            <p class="item-count">限量{{item.amount}}</p>
            <p>
              <span class="money">￥{{item.money}}</span>
              <span class="old">￥{{item.goodsPrice}}</span>
               <span class="active" v-if="item.amount != item.receiveCount">已抢{{item.receiveCount}}</span>
              <span class="over" v-else>已抢光</span>
            </p>
          </div>
        </div>
      </div>
      <button :disabled="disabled" class="receive" @click="receiveElevenGoods">一键领取</button>
      <img src="../assets/image/creditLife/ic_close@2x.png" alt class="close" @click="showEleven" />
    </div>
  </section>
</template>

<script>
export default {
  name: "ElevenTwo",
  props: {
    goodsList: Array,
    disabled: Boolean
  },
  created() {},
  computed: {
    imgPrePath() {
      let baseURL = window.location.origin;
      baseURL =
        baseURL.indexOf(".com") > -1
          ? "http://xyf.dazhongdianjin.com"
          : "http://xyf.dazhongdianjin.cn";
      return baseURL;
    }
  },
  methods: {
    showEleven() {
      this.$emit("showEleven");
    },
    receiveElevenGoods() {
      this.$emit("receiveElevenGoods");
    }
  }
};
</script>

<style lang="less" scoped>
.eleven {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 999;
  padding-top: 1rem;
  .eleven-content {
    width: 100vw;
    height: 9.4rem;
    box-sizing: border-box;
    position: relative;
    img {
      width: 100%;
      height: 9.4rem;
    }
    .goods {
      width: 4rem;
      position: absolute;
      left: 1.75rem;
      top: 5.05rem;
      .item {
        width: 4rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.55rem;
        .item-left {
          img {
            width: 1.7rem;
            height: 1rem;
            border-radius: 0.1rem;
          }
        }
        .item-right {
          height: 1rem;
             p {
            padding-bottom: 0.12rem;
          }
          .item-name {
            width: 2.15rem;
            font-size: 0.24rem;
            color: #080421;
            font-family: PingFang SC;
            font-weight: 500;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
             padding-bottom: 0;
            line-height: .3rem;
          }
          .money {
            color: #ff7650;
            font-size: 0.32rem;
            margin-right: 0.1rem;
          }
          .old {
            color: #999;
            font-size: 0.24rem;
            text-decoration: line-through;
            display: inline-block;
          }
            .active,.over {
            font-size: .24rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 118, 80, 1);
            float: right;
          }
          .over{
            color: #999;
          }
        }
      }
    }
    .receive {
      width: 3.23rem;
      height: 0.8rem;
      line-height: 0.8rem;
      font-size: 0.4rem;
      border-radius: 0.4rem;
      text-align: center;
      font-weight: 500;
      color: #fff;
      font-family: PingFang SC;
      background: linear-gradient(
        90deg,
        rgba(255, 138, 68, 1) 0%,
        rgba(255, 68, 110, 1) 100%
      );
      box-shadow: 1px 2px 8px 2px rgba(16, 8, 70, 0.2);
      position: absolute;
      left: 50%;
      transform: translateX(-1.615rem);
      bottom: 0.5rem;
      outline: none;
      border: none;
    }
    .close {
      width: 0.75rem;
      height: 0.75rem;
      margin: 0 auto;
      margin-top: 0.4rem;
    }
  }
}
</style>