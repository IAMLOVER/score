<template>
  <section class="welcome-toast">
    <div class="toast-content">
      <p class="head"></p>
      <ul class="content-wrap">
        <li
          class="content-list"
          v-for="(item,index) in goodList"
          :key="index"
        >
          <div class="content-left">
            <img
              :src="item.imgUrl"
              alt=""
            >
          </div>
          <div class="content-right">
            <p class="list-title">{{item.desc}}</p>
            <router-link
              class="go-use"
              :to="{name:'MyOrder'}"
            >查看</router-link>
          </div>
        </li>
      </ul>
      <p
        class="close"
        @click="closeFn"
      ></p>
    </div>
  </section>
</template>

<script>
export default {
  name: "WelcomeToast",
  props: ["goodsNoList"],
  data() {
    return {
      goodList: []
    };
  },
  created() {
    this.goodList = this.goodsNoList.map(item => {
      return {
        imgUrl: require(`../assets/image/creditLife/coupon${item}@2x.png`),
        desc: item == 1 ? "咪咕视频7天会员体验卡" : item == 2 ? "顺丰同城急送下单代金券" : "幸福西饼满减券"
      };
    });
  },
  methods: {
    closeFn() {
      this.$emit("closeToast", false);
    }
  }
};
</script>

<style lang="less" scoped>
.welcome-toast {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  .toast-content {
    position: relative;
    width: 5.6rem;
    box-shadow: 0rem 0.04rem 0.08rem 0rem rgba(0, 0, 0, 0.2);
    .head {
      width: 100%;
      height: 2.4rem;
      background: url("../assets/image/creditLife/welcome_banner@2x.png")
        no-repeat center center / 101% 100%;
      border-radius: 0.08rem 0.08rem 0 0;
    }
    .content-wrap {
      padding: 0.2rem 0.4rem;
      background-color: #fff;
      border-radius: 0 0 0.08rem 0.08rem;
      .content-list {
        padding: 0.18rem 0;
        display: flex;
        align-items: center;
        border-top: 0.02rem solid #f7f7f7;
        &:first-child {
          border-top: 0 none;
        }
        .content-left {
          width: 2.24rem;
          height: 1.36rem;
        }
        .content-right {
          height: 1.36rem;
          padding: 0.1rem;
          .list-title {
            color: #333;
            font-weight: 600;
            line-height: 0.36rem;
            margin-bottom: 0.24rem;
          }
          .go-use {
            width: 1.24rem;
            height: 0.48rem;
            border-radius: 0.24rem;
            text-align: center;
            line-height: 0.48rem;
            color: #fff;
            background: linear-gradient(
              180deg,
              rgba(255, 225, 0, 1) 0%,
              rgba(255, 191, 0, 1) 100%
            );
            cursor: pointer;
            user-select: none;
          }
        }
      }
    }
    .close {
      position: absolute;
      width: 0.68rem;
      height: 0.68rem;
      border-radius: 50%;
      left: 50%;
      bottom: -0.98rem;
      cursor: pointer;
      user-select: none;
      transform: translateX(-50%);
      background: url("../assets/image/creditLife/ic_close@2x.png") no-repeat
        center center / 100% 100%;
    }
  }
}
</style>