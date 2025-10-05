<template>
  <div class="check-box" :style="dynamicStyle">
    <div class="check-box-container check-box-clickable" @click="click">
      <div v-if="isChecked" class="check-box-content"></div>
    </div>
    <span class="title" :class="{'check-box-clickable': isTextClickable}" @click="click">{{ title }}</span>
  </div>
</template>

<script>

export default {
  props: {
    isChecked: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '預設'
    },
    color: {
      type: String,
      default: '#868A93'
    },
    contentColor: {
      type: String,
      default: '#868A93'
    },
    textColor: {
      type: String,
      default: '#868A93'
    },
    boxSize: {
      type: String,
      default: '22px'
    },
    disable: {
      type: Boolean,
      default: false
    },
    disableText: {
      type: String,
      default: '預設'
    },
    isTextClickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dynamicStyle() {
      return {
        '--color': this.color,
        '--contentColor': this.contentColor,
        '--textColor': this.textColor,
        '--boxSize': this.boxSize
      }
    }
  },
  methods: {
    click() {
      if (this.disable) {
        throw new Error(this.disableText);
      } else {
        this.$emit('update:isChecked', !this.isChecked);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.check-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  .check-box-container{
    width: var(--boxSize);
    height: var(--boxSize);
    padding: 2px;
    border: 1px solid var(--color);
    border-radius: 2px;
    .check-box-content{
      width: 100%;
      height: 100%;
      background-color: var(--contentColor);
    }
  }
  .title{
    font-size: 16px;
    color: var(--textColor);
  }
}

.check-box-clickable {
  cursor: pointer;
}
</style>