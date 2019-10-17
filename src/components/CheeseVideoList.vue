<template>
  <section class="cheese-video-list">
    <div class="list" @click="goCheeseVideoDetail(msg.id)">
      <div class="list-right">
        <div class="title">{{msg.title}}</div>
        <div class="playBox">
          <div class="playNum">{{msg.viewCount}}次播放</div>
          <div class="payTime">{{msg.publishTimeStr}}</div>
        </div>
      </div>
      <div class="list-left">
        <img
          :src="msg.picture"
        />
        <span class="iconPlay"></span>
      </div>
    </div>
  </section>
</template>


<script>
export default {
   props:{
    msg:{}
  },
  methods: {
    goCheeseVideoDetail(id) {
      this.$router.push({
        name: "CreditCheeseVideoDetail",
        query:{id:id}
      });
    }
  },
  created() {
  },
};
</script>

<style lang="less" scoped>
.cheese-video-list {
  width: 100%;
  padding: 0 0.2rem;
  .list {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem 0;
    border-bottom: 1px solid #f5f5f5;
    .list-left {
      width: 2.2rem;
      height: 1.5rem;
      margin-left: 0.2rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.1rem;
      }
      .iconPlay {
        position: absolute;
        width: 0.9rem;
        height: 0.9rem;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        background: url("http://m.dazhongdianjin.com/video/images/ic_play.png")
          no-repeat center center / 100% 100%;
      }
    }
    .list-right {
      flex: 1;
      .title {
        width: 100%;
        font-size: 0.3rem;
        color: #333;
        font-weight: 500;
        height: 1rem;
        line-height: 0.5rem;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-bottom: 0.16rem;
      }
      .playBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #999999;
        font-size: 0.26rem;
        .playNum {
          height: 0.4rem;
          line-height: 0.4rem;
          position: relative;
          padding-left: 0.32rem;
          &::before {
            content: "";
            width: 0.26rem;
            height: 0.26rem;
            position: absolute;
            top: 50%;
            left: 0;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
            background: url("http://m.dazhongdianjin.com/video/images/ic_view2@2x.png")
              no-repeat center center / 100% 100%;
          }
        }
        .payTime {
          line-height: 0.4rem;
        }
      }
    }
  }
}
</style>