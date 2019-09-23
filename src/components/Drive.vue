<template>
  <section class="drive-area">
    <Security />
    <!-- NO SUCCESS -->
    <section v-if="!isSuccess">
      <!-- FORM AREA -->
      <div class="form-area">
        <div class="form-group">
          <span class="label">证号</span>
          <div class="input-area">
            <input
              v-focus
              type="text"
              v-model="driverNum"
              placeholder="请输入您的驾驶证号"
            />
          </div>
        </div>
        <span class="form-group">
          <span class="label">姓名</span>
          <div class="input-area">
            <input
              type="text"
              v-model="userName"
              placeholder="请输入您的姓名"
            />
          </div>
        </span>
        <div class="form-group">
          <span class="label">准驾车型</span>
          <div class="input-area">
            <input
              type="text"
              v-model="carModel"
              placeholder="请输入您的准驾车型"
            />
          </div>
        </div>
        <div class="form-group-picker">
          <VantDatePicker
            label="生效日期"
            pickerTitle="生效日期"
            placeholder="请选择生效日期"
            :minDate="minDate"
            @selectDatePickerVal="effectiveDates"
          ></VantDatePicker>
        </div>
        <div class="form-group-picker">
          <VantDatePicker
            label="失效日期"
            pickerTitle="失效日期"
            placeholder="请选择失效日期"
            :minDate="minDate"
            @selectDatePickerVal="expirationDates"
          ></VantDatePicker>
        </div>
        <div class="form-group">
          <span class="label">档案编号</span>
          <div class="input-area">
            <input
              type="text"
              v-model="fileNumber"
              placeholder="请输入您的档案编号"
            />
          </div>
        </div>
        <div class="form-group-picker">
          <VantPicker
            label="性别（选填）"
            pickerTitle="性别选择"
            placeholder="请选择您的性别"
            height="35%"
            :columns="sexList"
            @selectPickerVal="sexVal"
          ></VantPicker>
        </div>
        <div class="form-group">
          <span class="label">国籍（选填）</span>
          <div class="input-area">
            <input
              type="text"
              v-model="citizenship"
              placeholder="请输入您的国籍"
            />
          </div>
        </div>
        <div class="form-group-picker">
          <VantDatePicker
            label="初次领证日期"
            pickerTitle="初次领证日期"
            placeholder="请选择您的初次领证日期"
            :minDate="minDate"
            @selectDatePickerVal="initDates"
          ></VantDatePicker>
        </div>
      </div>
      <!-- PIC AREA -->
      <div class="pic-area">
        <p class="pic-title">证件图片</p>
        <div class="pic-1">
          <Camear
            tip="拍摄驾驶证主页"
            @savePicPath="picFront"
          ></Camear>
        </div>
        <div class="pic-2">
          <Camear
            tip="拍摄驾驶证副业"
            @savePicPath="picRear"
          ></Camear>
        </div>
      </div>
      <!-- FOOTER TIP AREA -->
      <Footertip></Footertip>
      <!-- BTN AREA -->
      <div
        class="submit-info button"
        :class="isActive?'active':null"
        @click="submitInfo"
      >提交</div>
    </section>
    <!-- SUCCESS -->
    <section v-else>
      <!-- SUCCESS MAIN AREA -->
      <div class="success-main-area">
        <div class="success-tips">
          <p class="success-icon"></p>
          <p class="success-title">提交成功</p>
        </div>
        <!-- Main CONTENT -->
        <div class="success-main">
          <div class="main-item">
            <span class="item-lable">证 号</span>
            <span class="item-desc">{{driverNum}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">姓 名</span>
            <span class="item-desc">{{userName}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">准驾车型</span>
            <span class="item-desc">{{carModel}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">生效日期</span>
            <span class="item-desc">{{effectiveDate}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">失效日期</span>
            <span class="item-desc">{{expirationDate}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">档案编号</span>
            <span class="item-desc">{{fileNumber}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">性 别</span>
            <span class="item-desc">{{sex}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">国 籍</span>
            <span class="item-desc">{{citizenship}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">初次领证日期</span>
            <span class="item-desc">{{initDate}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">证件图片</span>
          </div>
          <div class="item-pic-area">
            <div class="suc-pic-area">
              <img
                :src="mainPic"
                alt
              />
            </div>
            <div class="suc-pic-area">
              <img
                :src="subPic"
                alt
              />
            </div>
          </div>
        </div>

        <!-- DEL AREA -->
        <div class="del-area">
          <span class="sub-time">提交时间：{{null|dataFm("年-月-日")}}</span>
          <span
            class="del button"
            @click="delInfo"
          >删除</span>
        </div>
      </div>
      <!-- FOOTER TIP AREA -->
      <Footertip></Footertip>
    </section>
  </section>
</template>

<script>
import Security from "./Security";
import Footertip from "./Footertip";
import Camear from "./Camear";
import VantDatePicker from "./VantDatePicker";
import VantPicker from "./VantPicker";
export default {
  name: "Drive",
  components: { Security, Footertip, Camear, VantDatePicker, VantPicker },
  data() {
    return {
      minDate: new Date(Date.parse("1959-01-01")), //最小可选时间，默认是10年前
      sexList: ["男", "女"],
      driverNum: "", //驾驶证号
      userName: "", //姓名
      carModel: "", //车型
      effectiveDate: "", //生效日期
      expirationDate: "", //失效日期
      fileNumber: "", //档案编号
      sex: "", //性别
      citizenship: "", //国籍
      mainPic: "", //主页照片
      subPic: "", //副页照片
      initDate: "", //初次领证日期
      isSuccess: false // 判断信息是否提交成功
    };
  },
  created() {},
  methods: {
    effectiveDates(val) {
      // 生效日期选择的值
      this.effectiveDate = val;
    },
    expirationDates(val) {
      // 失效日期选择的值
      this.expirationDate = val;
    },
    sexVal(val) {
      // 性别选择
      val == "男" ? (this.sex = 1) : (this.sex = 2);
    },
    initDates(val) {
      // 初次领证日期
      this.initDate = val;
    },
    picFront(val) {
      // 主页照片
      this.mainPic = val;
    },
    picRear(val) {
      //副页照片
      this.subPic = val;
    },
    submitInfo() {
      // 提交信息
      if (this.checkForm()) {
        this.$tools.showLoading();
        setTimeout(() => {
          this.$tools.hideLoading();
          this.isSuccess = true;
        }, 1000);
      }
    },
    checkForm(noShow = true) {
      // 信息验证
      let { isEmpty, showMsg } = this.$tools;
      if (isEmpty(this.driverNum)) {
        noShow && showMsg("驾驶证号不能为空");
        return false;
      }
      if (isEmpty(this.userName)) {
        noShow && showMsg("姓名不能为空");
        return false;
      }
      if (isEmpty(this.carModel)) {
        noShow && showMsg("车型不能为空");
        return false;
      }
      if (isEmpty(this.effectiveDate)) {
        noShow && showMsg("生效日期不能为空");
        return false;
      }
      if (isEmpty(this.expirationDate)) {
        noShow && showMsg("失效日期不能为空");
        return false;
      }
      if (isEmpty(this.fileNumber)) {
        noShow && showMsg("档案编号不能为空");
        return false;
      }
      if (isEmpty(this.initDate)) {
        noShow && showMsg("初次领证日期不能为空");
        return false;
      }
      if (isEmpty(this.mainPic)) {
        noShow && showMsg("驾驶证主页不能为空");
        return false;
      }
      if (isEmpty(this.subPic)) {
        noShow && showMsg("驾驶证副页不能为空");
        return false;
      }
      return true;
    },
    resetForm() {
      // 还原表单信息
      this.driverNum = "";
      this.userName = "";
      this.carModel = "";
      this.effectiveDate = "";
      this.expirationDate = "";
      this.fileNumber = "";
      this.sex = "";
      this.citizenship = "";
      this.mainPic = "";
      this.subPic = "";
      this.initDate = "";
      this.isSuccess = false;
    },
    delInfo() {
      // 删除提交成功的信息所有信息还原
      this.$tools.showLoading();
      setTimeout(() => {
        this.resetForm();
        this.$tools.hideLoading();
      },400);
    }
  },
  computed: {
    isActive() {
      if (this.checkForm(false)) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/common.css";
.drive-area {
  width: 100%;
  min-height: 100%;
  padding-bottom: 0.68rem;
  background-color: #f7f7f7;
  .form-area {
    background-color: #fff;
    .form-group {
      display: grid;
      height: 1.04rem;
      width: 100%;
      padding: 0 0.36rem;
      grid-template-columns: 30% 70%;
      align-items: center;
      border-bottom: 0.02rem solid #eee;
      .label {
        font-size: 0.3rem;
        font-weight: 500;
        line-height: 0.42rem;
      }
      .input-area {
        height: 0.4rem;
      }
      input {
        font-size: 0.28rem;
        line-height: 0.4rem;
        text-align: right;
      }
      &:last-child {
        border-bottom: none;
      }
    }
    .form-group-picker {
      width: 100%;
      height: 1.04rem;
      padding: 0 0.36rem;
      border-bottom: 0.02rem solid #eee;
    }
  }
  .pic-area {
    background-color: #fff;
    padding-bottom: 0.4rem;
    margin-bottom: 0.4rem;
    .pic-title {
      padding: 0 0.36rem;
      line-height: 1.04rem;
      font-size: 0.3rem;
    }
    .pic-1 {
      margin-bottom: 0.3rem;
    }
  }
}
</style>