<template>
  <section class="camear-area">
    <div class="camear-box">

      <!-- 拍照遮罩图 -->
      <div
        class="camear"
        v-if="!isUpload"
      >
        <div class="icon-camear">
          <input
            @change="upLoadPic"
            type="file"
            accept="image/*"
            capture="camera"
          >
        </div>
        <p class="camear-tip">{{tip}}</p>
      </div>

      <!-- 拍照成功后显示 -->
      <div
        class="camear-success"
        v-else
      >
        <img
          :src="successPicPath"
          alt=""
        >
        <div class="icon-success"></div>
        <p class="upload-time">提交时间：{{nowTime}}</p>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: "Camear",
  props: ["tip"],
  data() {
    return {
      isUpload: false,
      successPicPath: "",
      nowTime: ""
    };
  },
  created() {},
  methods: {
    upLoadPic(e) {
      // 获取file对象
      const file = e.target.files[0];
      this.$tools.uploadfile(file, res => {
        // 上传到服务器，返回图片路径
        this.isUpload = true;

        // 图片回显到界面
        this.successPicPath = this.$tools.getObjectURL(file);

        // 上传时间显示
        let nowDate = new Date(),
          year = nowDate.getFullYear(),
          month = (nowDate.getMonth() + 1).toString().padStart(2, "0"),
          day = nowDate
            .getDate()
            .toString()
            .padStart(2, "0"),
          ymd = year + "年" + month + "月" + day + "日";
        this.nowTime = ymd;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.camear-area {
  padding: 0 0.3rem;
  .camear-box {
    height: 4.2rem;
    border: 0.02rem dashed #979797;
    border-radius: 0.08rem;
    padding: 0.2rem;
    // 未上传时样式
    .camear {
      width: 100%;
      height: 100%;
      background-color: #cbcbcb;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon-camear {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background: url("../assets/image/editInfo/ic_shot@2x.png") no-repeat
          center center / 100% 100%;
        cursor: pointer;
        input {
          cursor: pointer;
          opacity: 0;
        }
      }
      .camear-tip {
        margin-top: 0.24rem;
        font-size: 0.32rem;
        font-weight: 500;
      }
    }
    // 上传成功的样式
    .camear-success {
      position: relative;
      width: 100%;
      height: 100%;
      .icon-success {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -70%);
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background: url("../assets/image/editInfo/ic_success@2x.png") no-repeat
          center center / 100% 100%;
      }
      .upload-time {
        position: absolute;
        width: 4.2rem;
        left: 50%;
        bottom: 0.8rem;
        transform: translateX(-50%);
        line-height: 0.48rem;
        text-align: center;
        background: linear-gradient(
          90deg,
          rgba(98, 98, 98, 0.3) 0%,
          rgba(72, 72, 72, 0.8) 52%,
          rgba(51, 51, 51, 0.3) 100%
        );
        color: #fff;
      }
    }
  }
}
</style>