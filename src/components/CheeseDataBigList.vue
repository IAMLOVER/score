<template>
  <section class="cheese-data-big-list">
    <div class="newsImgStyle" @click="goCheeseDetail(msg.id)" :id="msg.id">
      <a href="javascript:void(0);">
        <h4>{{msg.title}}</h4>
        <div class="newsBigImg">
          <img src="../assets/image/mescrolloptions/img_default@2x.png" :imgurl="msg.picture"/>
        </div>
        <div class="newsInfoWrapper" style="display: block;">
          <div class="newsInfo">
            <span class="newsAuthor">{{msg.author}}</span>
            <span class="newsComments">
              <span class="commentsNumber">{{msg.commentCount}}</span>&nbsp;评论
            </span>
            <span class="newsLabel"></span>
          </div>
        </div>
      </a>
    </div>
  </section>
</template>


<script>
export default {
  name:"CheeseDataBigList",
  props: {
    msg: {}
  },
  methods: {
    goCheeseDetail(id) {
      this.$router.push({
        name: "CreditCheeseDetail",
        query: { id: id }
      });
    }
  }
};
</script>


<style lang="less" scoped>
.cheese-data-big-list {
  padding: 0rem 0.3rem 0rem 0.3rem;
}
.newsImgStyle a {
  padding: 0.3rem 0rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-direction: normal;
  -webkit-box-orient: vertical;
  -moz-flex-direction: column;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 0;
  border-bottom: 1px solid #f5f5f5;
  h4 {
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 0.2rem;
    line-height: 0.44rem;
    color: #333;
    font-weight: normal;
    font-size: 0.32rem;
  }
  .newsBigImg {
    width: 100%;
    height: 3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .newsInfo {
    margin-top: 0.22rem;
    display: -webkit-box;
    /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
    /* 老版本语法: Firefox (buggy) */
    display: -ms-flexbox;
    /* 混合版本语法: IE 10 */
    display: -webkit-flex;
    /* 新版本语法: Chrome 21+ */
    display: flex;
    /* 新版本语法: Opera 12.1, Firefox 22+ */
    -webkit-box-align: flex-end;
    -moz-align-items: flex-end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
    font-size: 0.26rem;
    color: #999;
    height: 0.36rem;
    .newsAuthor,
    .newsComments {
      margin-right: 0.2rem;
    }
  }
}
</style>