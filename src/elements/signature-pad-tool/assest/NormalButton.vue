<template>
  <div class="normal-btn" 
  :class="{'no-hover' : disableAnimation, 'disable' : disable}"
  :style="dynamicStyle" 
  @click="click()">
    <div v-if="icon" :class="{'icon-background': isIconShowBackground}">
      <i :class="icon"></i>
    </div>
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    title: {
        type: String,
        default: '按鈕'
    },
    icon: {
        type: String
    },
    iconSize: {
      type: String,
      default: '12px'
    },
    isIconShowBackground: {
      type: Boolean,
      default: false
    },
    iconBackgroundSize: {
      type: String,
      default: '20px'
    },
    backgroundColor: {
        type: String,
        default: '#0169AF'
    },
    color: {
        type: String,
        default: '#ffffff'
    },
    borderRadius: {
        type: String,
        default: '12px'
    },
    border: {
      type: String,
      default: '1px solid #0169AF'
    },
    disableAnimation: {
        type: Boolean,
        default: false
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  emits: ['OnClick'],
  methods: {
    click() {
      if(this.disable) return;
      this.$emit('OnClick');
    }
  },
  computed: {
    dynamicStyle() {
        return {
            '--dynamic-bgcolor': this.backgroundColor,
            '--dynamic-color': this.color,
            '--dynamic-border-radius': this.borderRadius,
            '--dynamic-border': this.border,
            '--dynamic-animation': this.disableAnimation ? 'none' : 'background-color 0.3s, color 0.3s',
            '--dynamic-icon-size': this.iconSize,
            '--dynamic-icon-background-size': this.iconBackgroundSize
        }
    }
  },
  mounted() {
  },
  created() {
  },
};
</script>

<style scoped lang="scss">
.normal-btn{
  display: flex;
  background-color: var(--dynamic-bgcolor);
  color: var(--dynamic-color);
  width: 100%;
  height: 100%;
  padding: 8px 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: var(--dynamic-border-radius);
  border: var(--dynamic-border);
  cursor: pointer;
  transition: var(--dynamic-animation);
  &:not(.no-hover):hover {
    background-color: var(--dynamic-color);
    color: var(--dynamic-bgcolor);
    border: 1px solid var(--dynamic-bgcolor);
  }
}
.disable {
  cursor: not-allowed;
}
.icon-background {
  width: var(--dynamic-icon-background-size);
  height: var(--dynamic-icon-background-size);
  background-color: var(--dynamic-color);
  border-radius: 50%;
  color: var(--dynamic-bgcolor);
  font-size: var(--dynamic-icon-size);
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>