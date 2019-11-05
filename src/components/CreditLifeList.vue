<template>
  <section class="credit-life-list-area">
    <div class="credit-life-title">
      <div class="left">
        <span class="fc201D mr5">{{title}}</span>
        <span class="fc138A">{{subtitle}}</span>
      </div>
      <div class="right goMore" @click="goToLifeMore(type)">更多</div>
    </div>
    <ul class="content-list">
      <li
        class="list-item"
        v-for="(item,index) in lifeList"
        :key="index"
        @click="goJump(item.goodsId,item.url)"
      >
        <div class="img">
          <img :src="item.goodsImg" alt />
        </div>
        <p class="life-title">{{item.goodsName}}</p>
        <div class="price-area" v-if="item.money!=0">
          <span class="now-price">￥{{item.money}}</span>
          <span class="old-price" v-if="item.volume && item.volume != item.money">￥{{item.volume}}</span>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "CreditLifeList",
  props: ["lifeList", "title", "subtitle", "type"],
  data() {
    return {};
  },
  created() {},
  methods: {
    //信用生活更多
    goToLifeMore(type) {
      if (type == 4) {
        //大健康
        window.location.href =
          "https://jkt.jkwlx.net/wx/index.jhtml?from=singlemessage&isappinstalled=0";
        return;
      }
      if (type == 3) {
        //智金融
        window.location.href = "http://dkcs.dazhongdianjin.com/";
        return;
      }

      this.$router.push({ name: "GoodShopList", query: { type: type } });
    },
    // 列表跳转
    goJump(id, url) {
      // 判断是否是其他渠道用户mark
      let store = localStorage.getItem("store")
        ? JSON.parse(localStorage.getItem("store"))
        : null;
      let mark;
      if (store) {
        mark = store.mark;  
      }
      if (url) {
        window.location.href = url;
        return;
      }
      if (!id) return;
      if (mark == "bianlimao") {
        this.$router.push({
          name: "ChangeForBianlimao",
          query: { goodsId: id }
        });
      } else {
        this.$router.push({ name: "ChangeDetails", query: { goodsId: id } });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.credit-life-list-area {
  padding: 0 0.2rem;
  // 公共样式
  .goMore {
    position: relative;
    padding-right: 0.16rem;
    color: #f17d0a;
    cursor: pointer;
    user-select: none;
    &::after {
      content: "";
      width: 0.12rem;
      height: 0.24rem;
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      background: url("../assets/image/creditLife/arrow_back@2x.png") no-repeat
        center center / 100% 100%;
    }
  }
  .fc201D {
    color: #1d1d1d;
    font-size: 0.4rem;
    font-weight: 500;
  }
  .fc138A {
    color: #8a8a8a;
  }
  .mr5 {
    margin-right: 0.1rem;
  }

  .right {
    height: 0.6rem;
    line-height: 0.6rem;
  }
  // 标题
  .credit-life-title {
    height: 1.08rem;
    line-height: 1.08rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  // 内容列表
  .content-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.1rem;
    .list-item {
      width: 2.14rem;
      margin-right: 0.23rem;
      margin-bottom: 0.2rem;
      cursor: pointer;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &:active {
        background-color: #f5f5f5;
        -webkit-tap-highlight-color: transparent;
      }
      .img {
        width: 100%;
        height: 1.24rem;
        background: url("../assets/image/mescrolloptions/img_default@2x.png")
          no-repeat center center / 100% 100%;
      }
      .life-title {
        margin-top: 0.12rem;
        line-height: 0.32rem;
        text-align: center;
        color: #1d1d1d;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .price-area {
        text-align: center;
        line-height: 0.36rem;
        .now-price {
          color: #f17d0a;
          margin-right: 0.08rem;
        }
        .old-price {
          color: #8a8a8a;
          text-decoration: line-through;
        }
      }
    }
  }
}
</style>