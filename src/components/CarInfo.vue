<template>
  <section class="car-info-area">
    <p class="car-info-title">- 请拍摄行驶证，并录入信息 -</p>
    <div class="pic-car">
      <Camear
        tip="拍摄行驶证主页"
        @savePicPath="savePicPathF"
      ></Camear>
    </div>
    <div class="pic-car">
      <Camear
        tip="拍摄行驶证副页"
        @savePicPath="savePicPathB"
      ></Camear>
    </div>
  </section>
</template>

<script>
import Camear from "./Camear";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CarInfo",
  components: {
    Camear
  },
  data() {
    return {
      idcardF: "", //正面
      idcardB: "" //背面
    };
  },
  created() {},
  methods: {
    ...mapMutations(["SET_CAR_INFO_STATUS"]),
    savePicPathF(successPicPath) {
      this.idcardF = successPicPath;
      this.successLoad && this.submitStatus();
    },
    savePicPathB(successPicPath) {
      this.idcardB = successPicPath;
      this.successLoad && this.submitStatus();
    },
    // 提交状态给后台
    submitStatus() {
      const { callServer, showMsg, showLoading, hideLoading } = this.$tools;
      callServer("post", "/djh/user_info/update_driving_license", {
        userId: this.userInfo.userId,
        token: this.userInfo.token,
        drivingLicenseHomepage: this.idcardF,
        drivingLicenseSecondary: this.idcardB,
        drivingLicenseStatus: 1
      }).then(res => {
        if (res.code == 0) {
          showMsg("状态更新成功");
          this.SET_CAR_INFO_STATUS(1);
        } else {
          showMsg(res.msg);
        }
      });
    }
  },
  computed: {
    successLoad() {
      return this.idcardF && this.idcardB;
    },
    ...mapGetters(["userInfo"])
  }
};
</script>

<style lang="less" scoped>
.car-info-area {
  height: 100%;
}
.car-info-title {
  line-height: 0.94rem;
  text-align: center;
  color: #9a9a9a;
}
.pic-car {
  margin-bottom: 0.3rem;
}
</style>