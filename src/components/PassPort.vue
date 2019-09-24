<template>
  <section class="passport-area">
    <p class="passport-title">- 请拍摄实体护照，并录入信息 -</p>
    <Camear
      tip="拍摄护照主页"
      @savePicPath="savePicPathF"
    ></Camear>
  </section>
</template>

<script>
import Camear from "./Camear";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "PassPort",
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
    savePicPathF(successPicPath) {
      const { callServer, showMsg, showLoading, hideLoading } = this.$tools;
      this.idcardF = successPicPath;
      showLoading();
      // 提交状态给后台
      callServer("post", "/djh/user_info/update_passport", {
        token: this.userInfo.token,
        userId: this.userInfo.userId,
        passportImg: this.idcardF,
        passportStatus: 1
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          showMsg("状态更新成功");
          this.SET_PASSPORT_STATUS(1);
        } else {
          showMsg(res.msg);
        }
      });
    },
    ...mapMutations(["SET_PASSPORT_STATUS"])
  },
  computed: {
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="less" scoped>
.passport-area {
  height: 100%;
}
.passport-title {
  line-height: 0.94rem;
  text-align: center;
  color: #9a9a9a;
}
</style>