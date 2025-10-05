<!-- 
  BUG: 
  1. 中文輸入法下輸入鍵盤右邊的數字鍵會觸發多次onInputChange
  目前已知現象有：
    1.1 在input的v-model有東西(他可以不用被定義在data裡面)的情況下會觸發三次，前兩次是數字，第三次是undefined
    這會讓第三次undefined的時候，順便把多一個的數字刪除。
    * 雖然第三次會把第二次的刪除，但字的輸入上限是6個字。這會導致輸入第六個字的時候不會額外多輸入第七個字
      然後第六個字就會因為undefined的時候被刪除
    1.2 在input的v-model沒有東西的情況下會觸發兩次，兩次都是數字
    這會讓輸入框出現兩個數字
    1.3 當input的width、height設0，在中文輸入法下輸入的數字會無法刪除
-->
<template>
  <div  class="verify-code-input-layout" :style="getDynamicStyle">
    <div class="input-field-layout" v-for="index in fieldNumber" @click="focusInputField">
      <div class="input-field-item" :id="`inputField${index}`" :class="{'i-cursor': (isShowICursor && index === focusFieldIndex)}">
      </div>
      {{ getNumber(index) }}
    </div>
    <input 
    class="input-field" 
    ref="inputField" 
    type="text" 
    v-model="inputValueHolder"
    @blur="onBlur"
    @keydown="onKeyDown"
    >
  </div>
</template>

<script>
export default {
  props: {
    fieldNumber: {
      type: Number,
      default: 6,
      validator(value) {
        if(value < 1) {
          throw new Error('fieldNumber cant not less then 1');
        }
      }
    },
    backgroundColor: {
      type: String,
      default: '#F5F5F5'
    },
    border: {
      type: String,
      default: '1px solid #ECECEC'
    },
    color: {
      type: String,
      default: '#535353'
    },
    inputValue: {
      type: String,
    },
    inputType: {
      type: String, // digits, number, digits|number
      default: 'digits|number',
    },
    isAllUpperCase: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      isInit: false,
      isShowICursor: true,
      focusFieldIndex: 1, //start from 1
      caretBlinkInterval: null,
      inputCheckRegex: null,
      tmpFocusCheck: false,
      inputValueHolder: '',
    }
  },
  watch: {
    inputValueHolder(newValue, oldValue) {
      this.onInputChange(newValue);
    }
  },
  methods: {
    init() {
      if(!this.checkInputType()) {
        throw new Error('inputType need to include digits or number');
      }
      
      this.isInit = true;
      // 因為isInit剛true畫面還沒有渲染完，所以要晚一點focus
      setTimeout(() => this.focusInputField());
    },
    checkInputType() {
      const tmp = this.inputType.toUpperCase();
      const checkNumber = tmp.includes('NUMBER');
      const checkDigits = tmp.includes('DIGITS');

      // 選擇檢查的regex
      if(checkNumber && checkDigits) this.inputCheckRegex = /^[a-zA-Z0-9]+$/;
      else if(checkDigits) this.inputCheckRegex = /^[a-zA-Z]+$/;
      else if(checkNumber) this.inputCheckRegex = /^[0-9]+$/;

      return checkNumber || checkDigits;
    },
    onKeyDown(event) {
      // 防止使用者按到Home導致input的指標到最前面
      if(event.code == 'Home') {
        event.preventDefault();
      }
    },
    onInputChange(data) {
      let value = data;

      if(value?.length > this.fieldNumber && value) {
        value = value.slice(0, -1);
      }

      if(!this.inputCheckRegex.test(value)) {
        value = value.slice(0, -1);
      }

      if(value) {
        value = value.toUpperCase();
      }

      this.focusFieldIndex = value.length + 1;
      this.inputValueHolder = value;
      this.$emit('update:inputValue', this.inputValueHolder);
    },
    focusInputField() {
      if(this.caretBlinkInterval) return;
      
      this.tmpFocusCheck = true;
      this.caretBlinkInterval = setInterval(() => {
        this.isShowICursor = !this.isShowICursor;
        this.tmpFocusCheck = false;
      }, 700);
      this.isShowICursor = true;
      this.$refs.inputField.focus();
    },
    onBlur() {
      clearInterval(this.caretBlinkInterval);
      this.caretBlinkInterval = null;
      this.isShowICursor = false;
    },
    getNumber(index) {
      return this.inputValueHolder[index-1];
    }
  },
  computed: {
    getDynamicStyle() {
      return {
        '--dynamic-bgcolor': this.backgroundColor,
        '--dynamic-color': this.color,
        '--dynamic-border': this.border,
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped lang="scss">
.verify-code-input-layout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 12px;
  position: relative;
}

.input-field-layout {
  width: 40px;
  height: 48px;
  border-radius: 4px;
  border: var(--dynamic-border);
  background: var(--dynamic-bgcolor);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: text;
  font-size: 24px;
  font-weight: 400;
  .i-cursor {
    width: 2px;
    height: 50%;
    background-color: #535353;
  }
  .text {
    color: var(--dynamic-color);
  }
}

.input-field {
  position: absolute;
  z-index: -1; 
}
</style>