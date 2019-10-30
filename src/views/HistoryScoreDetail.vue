<template>
  <section class="history-score-detail">
    <ul v-for="(item,index) in computerDataDetail" :key="index">
      <li v-for="(liItem, liIndex) in item.changeScore" :key="liIndex">
        <div class="detail-left">
          <div class="detail-title">{{
              liIndex === "addBasicScore" ? "用户基础分" : 
              liIndex === "addInfoScore" ? "用户信息分" : 
              liIndex === "addKpiScore" ? "KPI分" : 
              liIndex === "addPointsScore" ? "猫粮分" : "信用报告" }}</div>
          <div class="detail-time">{{item.updateTime}}</div>
        </div>
        <div class="detail-right">+{{liItem}}</div>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      creatTime: "",
      userId: "",
      token: "",
      dataDetail: []
    };
  },
  computed: {
      // 清除每次更新项目还是0的字段
      computerDataDetail(){
          let dataDetail = this.dataDetail;
          // 循环数组dataDetail的每一项，找到changeScore对象，遍历对象的属性，判断如果属性值为0，直接delete掉该属性
          dataDetail.forEach(element => {
              for (const key in element.changeScore) {
                 if(element.changeScore[key] == 0){
                     delete element.changeScore[key]
                 }
              }
          });
          return dataDetail;
      }
  },
  created() {
    this.creatTime = this.$route.query.creatTime;
    const store = JSON.parse(
      localStorage.getItem("store") ? localStorage.getItem("store") : null
    );
    this.userId = store ? store.userId : null;
    this.token = store ? store.token : null;
    this.getHistoryScoreDetail();
  },
  methods: {
    getHistoryScoreDetail() {
      const { callServer, showMsg } = this.$tools;
      let params = {};
      params.userId = this.userId;
      params.token = this.token;
      params.createTime = this.creatTime;
      callServer("post", "/djh/user_credit_score/change_list",params).then((res) => {
          if(res.code == 0){
              this.dataDetail = res.data.list
          }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.history-score-detail {
  width: 100vw;
  background: #fff;
  ul {
    width: 100%;
    padding: 0rem 0.3rem;
    box-sizing: border-box;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1.2rem;
      line-height: 0.5rem;
      border-bottom: 1px solid #eee;
      .detail-left {
        .detail-title {
          font-size: 0.32rem;
          font-weight: 500;
        }
        .detail-time {
          color: #999;
        }
      }
      .detail-right {
        font-size: 0.36rem;
        font-weight: 500;
      }
    }
  }
}
</style>