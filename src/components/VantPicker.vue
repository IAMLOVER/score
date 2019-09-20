<template>
  <section class="picker-area">
    <span class="label">{{label}}</span>
    <div
      class="input-area"
      :class="active?'active':null"
      @click="selectPicker"
    >
      {{placeVal}}
      <i class="van-icon van-icon-arrow right-icon"></i>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height }"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        :title="pickerTitle"
        @confirm="confirmFn"
        @cancel="cancelFn"
      />
    </van-popup>
  </section>
</template>

<script>
export default {
  name: "VantPicker",
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
    height: {
      type: String,
      default: "40%"
    },
    columns: {
      type: Array
    }
  },
  data() {
    return {
      showPopup: false, //显示弹出层
      active: false, //是否选择了
      placeVal: this.placeholder
    };
  },
  created() {},
  methods: {
    selectPicker() {
      this.showPopup = true;
    },
    confirmFn(val) {
      this.showPopup = false;
      this.active = true;
      this.placeVal = val;
      this.$emit("selectPickerVal", val);
    },
    cancelFn() {
      this.showPopup = false;
    }
  }
};
</script>

<style lang="less" scoped>
.picker-area {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  align-items: center;
  .label {
    font-size: 0.3rem;
    font-weight: 500;
    line-height: 0.42rem;
  }
  .input-area {
    position: relative;
    line-height: 0.4rem;
    color: #9a9a9a;
    text-align: right;
    font-size: 0.3rem;
    &.active {
      color: #333;
    }
    .right-icon {
      top: 5%;
    }
  }
}
</style>