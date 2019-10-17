<template>
  <section class="cheese-section">
    <div class="list" @click="goCheeseDetail(msg.id)" :id="msg.id">
      <!-- 左侧内容 -->
      <div class="list-left">
        <div class="title">{{msg.title}}</div>
        <div class="tip">
          <span>{{msg.author}}</span>
          <span>{{msg.commentCount}}评论</span>
          <span v-if="msg.hot === 1">热点</span>
        </div>
      </div>
      <!-- 右侧内容 -->
      <div class="list-right">
        <img :imgurl="msg.picture" />
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
    goCheeseDetail(id){
      this.$router.push({
        name: "CreditCheeseDetail",
        query:{id:id}
      })
    }
  },
};
</script>

<style lang="less" scoped>
.cheese-section {
  width: 100vw;
  padding: 0rem 0.3rem;
  box-sizing: border-box;
}
.list {
  display: flex;
  justify-content: space-between;
  height: 2.1rem;
  padding: 0.3rem 0rem;
  background-color: #fff;
  box-sizing: border-box;
  border-bottom: 0.02rem solid #eee;
  .list-left {
    width: 4.2rem;
    .title {
      overflow: hidden;
      -o-text-overflow: ellipsis;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 0.26rem;
      color: #333;
      line-height: 0.44rem;
      font-weight: normal;
      font-size: 0.32rem;
    }
    span {
      font-size: 0.24rem;
      color: #999;
      display: inline-block;
      margin-right: 0.2rem;
    }
  }
  .list-right {
    width: 2.2rem;
    img {
      width: 2.2rem;
      height: 1.5rem;
    }
  }
}
</style>