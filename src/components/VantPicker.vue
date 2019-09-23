<template>
  <section class="picker-area">
    <span class="picker-label">{{label}}</span>
    <div
      class="picker-select-area"
      :class="active?'active':null"
      @click="selectPicker"
    >
      <span class="place-val">{{placeVal}} </span>
      <i
        class="van-icon van-icon-arrow right-icon"
        :style="{color:arrowColor}"
      ></i>
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
    arrowColor: {
      type: String
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
  .picker-label {
    font-size: 0.3rem;
    font-weight: 500;
    line-height: 0.42rem;
  }
  .picker-select-area {
    position: relative;
    height: 0.4rem;
    color: #9a9a9a;
    text-align: right;
    font-size: 0.28rem;
    &.active {
      color: #333;
    }
    .place-val {
      line-height: 0.4rem;
      display: inline-block;
      vertical-align: middle;
    }
    .right-icon {
      line-height: 0.4rem;
      vertical-align: middle;
    }
  }
}
</style>