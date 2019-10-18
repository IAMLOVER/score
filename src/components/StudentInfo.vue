<template>
  <section class="student-info-area">
    <Security></Security>
    <!-- NO SUCCESS -->
    <template v-if="!isSuccess">
      <router-link
        to="VantIndexAnchor?type=region"
        class="form-group"
      >
        <span class="form-label">地区</span>
        <div class="form-content">
          <span class="form-val">{{region}}</span>
          <i
            data-v-13d26bc6
            class="van-icon van-icon-arrow right-icon"
          ></i>
        </div>
      </router-link>
      <div
        class="form-group"
        @click="goToStudentName"
      >
        <span class="form-label">院校名称</span>
        <div class="form-content">
          <span class="form-val">{{studentName}}</span>
          <i
            data-v-13d26bc6
            class="van-icon van-icon-arrow right-icon"
          ></i>
        </div>
      </div>
      <div class="form-group-picker">
        <VantPicker
          label="当前状态"
          pickerTitle="当前状态"
          placeholder=""
          arrowColor="#333"
          :columns="statusList"
          @selectPickerVal="stateSelectPickerVal"
        ></VantPicker>
      </div>
      <template v-if="status">
        <div class="form-group-picker">
          <VantPicker
            label="学历"
            pickerTitle="学历选择"
            placeholder=""
            arrowColor="#333"
            :columns="educationList"
            @selectPickerVal="educationSelectPickerVal"
          ></VantPicker>
        </div>
        <div
          class="form-group-picker"
          v-if="status==='在读'"
        >
          <VantDatePicker
            label="入学时间"
            pickerTitle="入学时间"
            placeholder=""
            arrowColor="#333"
            @selectDatePickerVal="admissionTimePickerVal"
          ></VantDatePicker>
        </div>
        <div
          class="form-group-picker"
          v-else
        >
          <VantDatePicker
            label="毕业时间"
            pickerTitle="毕业时间"
            placeholder=""
            arrowColor="#333"
            @selectDatePickerVal="graduationTimePickerVal"
          ></VantDatePicker>
        </div>
      </template>

      <Footertip class="mt20"></Footertip>
      <div
        class="button submit-info"
        :class="isActive?'active':null"
        @click="submitInfo"
      >提交</div>
    </template>

    <!-- SUCCESS -->
    <template v-else>
      <div class="success-main-area">
        <div class="success-tips">
          <p class="success-icon"></p>
          <p class="success-title">提交成功</p>
        </div>
        <!-- Main CONTENT -->
        <div class="success-main">
          <div class="main-item">
            <span class="item-lable">地 区</span>
            <span class="item-desc">{{region}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">院校名称</span>
            <span class="item-desc">{{studentName}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">当前状态</span>
            <span class="item-desc">{{status}}</span>
          </div>
          <div class="main-item">
            <span class="item-lable">最高学历</span>
            <span class="item-desc">{{education}}</span>
          </div>
          <div
            class="main-item"
            v-if="status=='毕业'"
          >
            <span class="item-lable">毕业时间</span>
            <span class="item-desc">{{graduationTime}}</span>
          </div>
          <div
            class="main-item"
            v-else
          >
            <span class="item-lable">入学时间</span>
            <span class="item-desc">{{admissionTime}}</span>
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
      <div class="footer-position">
        <Footertip></Footertip>
      </div>
    </template>

    <DeleteToast
      v-if="isShowDeletConfirm"
      @closeFn="closeFn"
      @sure="sureFn"
    ></DeleteToast>
  </section>
</template>

<script>
import Security from "./Security";
import Footertip from "./Footertip";
import VantPicker from "./VantPicker";
import VantDatePicker from "./VantDatePicker";
import DeleteToast from "./DeleteToast";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "StudentInfo",
  components: { Security, Footertip, VantPicker, VantDatePicker, DeleteToast },
  data() {
    return {
      region: "", //地区
      studentName: "", //院校名称
      status: "", //当前状态
      education: "", //当前学历
      admissionTime: "", //入学时间
      graduationTime: "", //毕业时间
      isSuccess: false, //判断信息是否提交成功
      isShowDeletConfirm: false, //是否显示删除确认框
      statusList: ["在读", "毕业"], //当前状态列表
      educationList: [
        "初中及以下",
        "中专/中技",
        "高中",
        "大专",
        "本科",
        "硕士",
        "博士"
      ] //学历列表
    };
  },
  created() {
    // 通过计算属性获取选择的地区，若未选择则为空
    this.region = this.studentRegion.studentRegionName;
    this.regionId = this.studentRegion.studentRedionId;
    // 通过计算属性获取选择地区之后选中的学校名字，若未选择则为空

    this.studentName = this.studentInfo.studentName;
  },
  methods: {
    ...mapMutations(["SET_STUDENT_INFO_STATUS"]),
    // 选择院校
    goToStudentName() {
      if (this.region && this.regionId) {
        this.$router.push({
          name: "VantIndexAnchor",
          query: {
            type: "studentName",
            provinceId: this.regionId,
            provinceName: this.region
          }
        });
        return;
      }
      this.$tools.showMsg("请先选择地区");
    },
    // 状态选择结果
    stateSelectPickerVal(val) {
      this.status = val;
    },
    // 学历选择结果
    educationSelectPickerVal(val) {
      this.education = val;
    },
    // 入学时间结果
    admissionTimePickerVal(val) {
      this.admissionTime = val;
    },
    // 毕业时间结果
    graduationTimePickerVal(val) {
      this.graduationTime = val;
    },
    // 提交信息
    submitInfo() {
      const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
      showLoading();
      callServer("post", "/djh/user_info/update_education", {
        userId: this.userIdToken.userId,
        token: this.userIdToken.token,
        area: this.region,
        institutionName: this.studentName,
        education: this.education,
        enrollmentTime: this.admissionTime?this.admissionTime:null,
        graduationTime: this.graduationTime?this.graduationTime:null,
        studentStatus: this.status == "在读" ? 1 : 2,
        educationStatus: 1
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          this.isSuccess = true;
          this.SET_STUDENT_INFO_STATUS(1);
        } else {
          showMsg(res.msg);
        }
      });
    },
    // 还原表单信息
    resetForm() {
      this.region = "";
      this.studentName = "";
      this.status = "";
      this.education = "";
      this.admissionTime = "";
      this.graduationTime = "";
      this.isSuccess = false;
      this.isShowDeletConfirm = false;
    },
    // 删除信息
    delInfo() {
      this.isShowDeletConfirm = true;
    },
    // 关闭删除确认
    closeFn(val) {
      this.isShowDeletConfirm = val;
    },
    // 确认删除
    sureFn() {
      const { showMsg, showLoading, hideLoading, callServer } = this.$tools;
      showLoading();
      // 提交状态信息
      callServer("post", "/djh/user_info/update_education", {
        userId: this.userIdToken.userId,
        token: this.userIdToken.token,
        area: this.region,
        institutionName: this.studentName,
        education: this.education,
        enrollmentTime: this.admissionTime,
        graduationTime: this.graduationTime,
        studentStatus: this.status == "在读" ? 1 : 2,
        educationStatus: 0
      }).then(res => {
        hideLoading();
        if (res.code == 0) {
          this.resetForm();
          this.SET_STUDENT_INFO_STATUS(0);
        }
      });
    }
  },
  // 从vuex的store中获取topMusicList的id 使用this.$store.getters.****方法
  // 语法糖 把vuex.store中的gettters 映射到vuex提供的一个方法mapGetters(['getters中定义的方法名','方法名2'])
  // 如果要把getters中的方法取一个别的名字,那么mapGetters({region,'studentRegion'})--中使用对象  这样就相当于把studentRegion取名为region
  // 由于getters 相当于vuex中的computed 当依赖发生变化时getter中也会发生变化,
  // 所以通过对象拓展的方法,把getter混入到computed中
  computed: {
    ...mapGetters(["studentRegion", "studentInfo", "userIdToken"]),
    isActive() {
      let { isEmpty } = this.$tools;
      if (
        isEmpty(this.region) ||
        isEmpty(this.studentName) ||
        isEmpty(this.status) ||
        isEmpty(this.education)
      ) {
        return false;
      }
      if (this.status === "在读") {
        if (isEmpty(this.admissionTime)) {
          return false;
        }
      } else {
        if (isEmpty(this.graduationTime)) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/common.css";
.student-info-area {
  min-height: 100vh;
  background-color: #f7f7f7;
  .form-group {
    display: grid;
    grid-template-columns: 30% 70%;
    align-items: center;
    height: 1.04rem;
    padding: 0 0.36rem;
    border-bottom: 0.02rem solid #f7f7f7;
    background-color: #fff;
    .form-label {
      line-height: 0.4rem;
      font-size: 0.3rem;
    }
    .form-content {
      height: 0.4rem;
      font-size: 0.28rem;
      text-align: right;
      .form-val {
        display: inline-block;
        vertical-align: middle;
        line-height: 0.4rem;
      }
      .right-icon {
        vertical-align: middle;
        line-height: 0.4rem;
      }
    }
  }
  .form-group-picker {
    height: 1.04rem;
    padding: 0 0.36rem;
    border-bottom: 0.02rem solid #f7f7f7;
    background-color: #fff;
  }

  // 成功之后的底部样式

  .footer-position {
    position: fixed;
    width: 100%;
    bottom: 0.4rem;
  }
}
</style>