<template>
  <section class="house-info-area">
    <div class="house-info-title">请拍摄实体房产证，并录入信息</div>

    <Camear
      tip="房屋所有权页"
      height="10rem"
      @savePicPath="savePicPathF"
    ></Camear>
  </section>
</template>

<script>
import Camear from "./Camear";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "HouseInfo",
  components: {
    Camear
  },
  data() {
    return {
      idcardF: "" //正面
    };
  },
  created() {},
  methods: {
    ...mapMutations(["SET_HOUSE_INFO_STATUS"]),
    savePicPathF(successPicPath) {
      const { callServer, showMsg, showLoading, hideLoading } = this.$tools;
      this.idcardF = successPicPath;
      showLoading();
      callServer("post", "/djh/user_info/update_deed", {
        userId: this.userInfo.userId,
        token: this.userInfo.token,
        deedImg: this.idcardF,
        deedStatus: 1
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          showMsg("状态更新成功");
          this.SET_HOUSE_INFO_STATUS(1);
        } else {
          showMsg(res.msg);
        }
      });
    }
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="less" scoped>
.house-info-area {
  min-height: 100vh;
  background-color: #f5f5f5;
  .house-info-title {
    line-height: 1.3rem;
    text-align: center;
    color: #666;
    font-size: 0.28rem;
  }
  .camear-box {
    height: 5.9rem;
    margin: 0 auto;
  }
}
</style>