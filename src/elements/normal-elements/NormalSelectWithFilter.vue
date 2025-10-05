<template>
  <div class="normal-select-root" :style="dynamicStyle" @click="handleSelectClick">
    <span v-if="title" class="normal-select-title">{{ title }}</span>
    <NSelect 
    :filterable="filterable"
    v-model:value="selectedValue" 
    :options="options"
    :placeholder="placeholder"
    :disabled="disable"
    />
  </div>
</template>

<script>
import { NSelect } from "naive-ui";

export default {
  emits: ["OnIconClick"],
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
    filterable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NSelect
  },
  watch: {
    selectedValue(newValue, oldValue) {
      this.$emit('update:inputValue', newValue);
    },
    inputValue(newValue, oldValue) {
      this.selectedValue = newValue;
    },
  },
  data() {
    return {
      selectedValue: null,
    }
  },
  methods: {
  },
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
      }
    }
  },
  mounted() {
    this.selectedValue = this.inputValue;
  }
}
</script>

<style scoped lang="scss">
.normal-select-root {
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 10px;
}
.normal-select-title {
  width: 100%;
  font-size: var(--dynamic-title-size);
  color: var(--dynamic-color);
}
:deep(.n-select) {
  width: 100%;
  height: 100%;
}
:deep(.n-select .n-base-selection) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: var(--dynamic-border);
  border-radius: var(--dynamic-border-radius);
  background-color: var(--dynamic-bgcolor);
}
:deep(.n-base-selection-label) {
  background-color: var(--dynamic-bgcolor);
}
:deep(.n-base-selection-input__content) {
  color: var(--dynamic-color);
}
:deep(.n-base-selection-input) {
  color: var(--dynamic-color);
}
:deep(.n-base-select-option__content) {
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