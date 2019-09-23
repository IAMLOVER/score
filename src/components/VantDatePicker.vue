<template>
  <!-- 日期选择组件 -->
  <section class="date-picker-area">
    <span class="date-picker-label">{{label}}</span>
    <div
      class="data-picker-select-area"
      :class="active?'active':null"
      @click="selectDatePicker"
    >
      <span class="place-val">{{placeVal}}</span>
      <i
        class="van-icon van-icon-arrow right-icon"
        :style="{color:arrowColor}"
      ></i>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :title="pickerTitle"
        @confirm="confirmFn"
        @cancel="cancelFn"
      />
    </van-popup>
  </section>
</template>

<script>
export default {
  name: "VantDatePicker",
  props: {
    label: {
      type: String
    },
    pickerTitle: {
      type: String
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    arrowColor: {
      type: String
    },
    minDate: {
      type: Date
    }
  },
  data() {
    return {
      showPopup: false, //显示弹出层
      currentDate: new Date(), //当前时间
      placeVal: this.placeholder,
      active: false //是否选择了时间
    };
  },
  created() {},
  methods: {
    // 选择日期
    selectDatePicker() {
      this.showPopup = true;
    },
    // 选择器确认按钮
    confirmFn(val) {
      this.showPopup = false;
      this.active = true;
      this.placeVal = this.$tools.dateFormat(val, "yyyy-mm-dd");
      this.$emit("selectDatePickerVal", this.placeVal);
    },
    // 选择器取消按钮
    cancelFn() {
      this.showPopup = false;
    }
  }
};
</script>

<style lang="less" scoped>
.date-picker-area {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  .date-picker-label {
    font-size: 0.3rem;
    font-weight: 500;
    line-height: 0.42rem;
  }
  .data-picker-select-area {
    position: relative;
    height: 0.4rem;
    color: #9a9a9a;
    text-align: right;
    font-size: 0.28rem;
    &.active {
      color: #333;
    }
    .place-val {
      display: inline-block;
      vertical-align: middle;
      line-height: 0.4rem;
    }
    .right-icon {
      line-height: 0.4rem;
      vertical-align: middle;
    }
  }
}
</style>