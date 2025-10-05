<template>
  <div class="normal-select-root" :style="dynamicStyle" @click="handleSelectClick">
    <span v-if="title" class="normal-select-title">{{ title }}</span>
    <select class="select-box" v-model="selectedValue" @change="handleSelectChange">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  emits: ["OnSelectClick", "OnSelectChange"],
  props: {
    options: {
      type: Array,
      default: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" }
      ]
    },
    title: {
      type: String,
      default: null
    },
    titleSize: {
      type: String,
      default: "14px"
    },
    placeholder: {
      type: String,
      default: "請輸入"
    },
    icon: {
      type: String,
      default: null
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    color: {
      type: String,
      default: "#000000"
    },
    borderRadius: {
      type: String,
      default: "0px"
    },
    border: {
      type: String,
      default: "1px solid #000000"
    },
    fontSize: {
      type: String,
      default: "18px"
    },
    iconSize: {
      type: String,
      default: "20px"
    },
    iconColor: {
      type: String,
      default: "#000000"
    },
    disable: {
      type: Boolean,
      default: false
    },
    inputValue: {
      type: [String, Number, Object],
      default: null
    },
  },
  watch: {
    selectedValue(newValue, oldValue) {
      this.$emit("update:inputValue", newValue);
    },
    inputValue(newValue, oldValue) {
      this.selectedValue = newValue;
    }
  },
  data() {
    return {
      selectedValue: null
    };
  },
  methods: {},
  computed: {
    dynamicStyle() {
      return {
        "--dynamic-bgcolor": this.backgroundColor,
        "--dynamic-color": this.color,
        "--dynamic-border-radius": this.borderRadius,
        "--dynamic-border": this.border,
        "--dynamic-font-size": this.fontSize,
        "--dynamic-icon-size": this.iconSize,
        "--dynamic-icon-color": this.iconColor,
        "--dynamic-title-size": this.titleSize
      };
    },
    handleSelectClick() {
      this.$emit("OnSelectClick");
    },
    handleSelectChange(event) {
      this.$emit("OnSelectChange", event.inputValue);
    }
  },
  mounted() {
    this.selectedValue = this.inputValue;
  }
};
</script>

<style scoped lang="scss">
.normal-select-root {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 0px;
}
.normal-select-title {
  width: 100%;
  font-size: var(--dynamic-title-size);
  color: var(--dynamic-color);
}
.select-box {
  width: 100%;
  // height: 100%;
  flex: 1;
  border: var(--dynamic-border);
  border-radius: var(--dynamic-border-radius);
  background-color: var(--dynamic-bgcolor);
  color: var(--dynamic-color);
}
.disable {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f0f0f0;
  input {
    pointer-events: none;
  }
}
</style>