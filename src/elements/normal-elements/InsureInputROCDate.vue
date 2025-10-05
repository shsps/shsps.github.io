<template>
  <div class="insure-input-roc-date">
    <div class="insure-input-roc-date-title">
      <span>{{ title }}</span>
      <span v-if="isShowSpecialText" class="special-text">{{ specialText }}</span>
      <span v-if="isRequired" style="color: red">*</span>
    </div>
    <div class="date-input-container">
      <el-select class="calendar-year-type-select" v-model="_calendarYearType" placeholder="請選擇日期" @change="handleCalendarYearTypeChange">
        <el-option
          v-for="item in calendarYearTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input 
      class="date-input"
      v-model="_inputvalue"
      @click="handleDatePickerClick"
      @change="handleInputChange"
      />
      <ROCDatePicker 
      ref="datePicker"
      v-if="isShowDatePicker"
      class="date-picker"
      v-model="_datePickerValue" 
      :calendarYearType="_calendarYearType" 
      placeholder="請選擇日期" 
      @change="handleDateChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputValue: {
      type: String,
      default: null
    },
    calendarYearType: {
      type: String,
      default: "CommonEra"
    },
    title: {
      type: String,
      default: null
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    specialText: {
      type: String,
      default: null
    },
    isShowSpecialText: {
      type: Boolean,
      default: false
    },
    specialTextColor: {
      type: String,
      default: "#5CC4B1"
    }
  },
  watch: {
    inputValue(newValue, oldValue) {
      if(this.isUpdating) {
        return;
      }
      if(newValue !== oldValue) {
        this._inputvalue = newValue
      }
    },
    calendarYearType(newValue) {
      this._calendarYearType = newValue
      this.refresh()
    },
    _datePickerValue(newValue) {
      if(this.isUpdating) {
        return;
      }

      this.isUpdating = true
      const date = new Date(newValue)
      const dateArr = date.toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' }).split('/')
      let labelCommonEra = `${dateArr[0]}-${dateArr[1]}-${dateArr[2]}`
      let labelRepublicEra = `${Number.parseInt(dateArr[0]) - 1911}-${dateArr[1]}-${dateArr[2]}`
      if(this._calendarYearType === 'RepublicEra') {
        this._inputvalue = labelRepublicEra
      } else {
        this._inputvalue = labelCommonEra
      }

      this.$emit('update:inputValue', labelCommonEra)
      setTimeout(() => {
        this.isUpdating = false
      }, 100)
    },
  },
  data() {
    return {
      isShowDatePicker: true,
      calendarYearTypes: [
        { label: "民國", value: "RepublicEra" },
        { label: "西元", value: "CommonEra" }
      ],
      _calendarYearType: this.calendarYearType,
      _datePickerValue: this.inputValue,
      _inputvalue: this.inputValue,
      isUpdating: false,
    }
  },
  methods: {
    handleCalendarYearTypeChange(newValue) {
      this._calendarYearType = newValue
      this.refresh()
    },
    refresh() {
      this.isShowDatePicker = false
      this.$nextTick(() => {
        this.isShowDatePicker = true
      })
    },
    handleDatePickerClick() {
      this.$refs.datePicker.toggleCalender()
      setTimeout(() => {
        window.addEventListener('click', this.toggleDatePicker)
      }, 100)
    },
    toggleDatePicker(e) {
      if(!e) return;
      // 點日曆裡面的年月不做任何事
      if(e.target.classList.contains('year-cell') || e.target.classList.contains('month-cell')) {
        return;
      }

      // 點日曆裡面的空白日期他是true
      // 但點日曆裡面有天數的日期卻是false
      if(!this.$refs.datePicker?.$el?.contains(e.target)) {
        if(!e.target.classList.contains('date-cell')) {
          this.$refs.datePicker.toggleCalender()
        }
        this.removeDatePickerEvent()
      }
    },
    removeDatePickerEvent() {
      window.removeEventListener('click', this.toggleDatePicker)
    },
    handleInputChange(val) {
      let value = val;
      const clearFunction = () => {
        this._inputvalue = null;
        this.$emit('update:inputValue', null)
      }

      // 檢查是否符合 YYYY-MM-DD 格式
      const dateRegex = /^\d{1,4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        clearFunction()
        return;
      }

      const valueArr = value.split('-')
      if(this._calendarYearType === 'CommonEra' && valueArr[0].length < 4) {
        clearFunction()
        return;
      }

      if(this._calendarYearType === 'RepublicEra') {
        value = `${Number.parseInt(valueArr[0]) + 1911}-${valueArr[1]}-${valueArr[2]}`
      }

      // 檢查日期是否有效
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        clearFunction()
        return;
      }

      if(date.getFullYear() < 1911 || date.getFullYear() > new Date().getFullYear() + 100) {
        clearFunction()
        return;
      }

      this.isUpdating = true
      this._datePickerValue = value;
      this._inputvalue = val;
      this.$emit('update:inputValue', value)
      this.refresh()
      this.removeDatePickerEvent()
      setTimeout(() => {
        this.isUpdating = false
      }, 100)
    }
  },
}
</script>

<style lang="scss" scoped>
.insure-input-roc-date {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  .insure-input-roc-date-title {
    width: 100%;
    height: 27px;
    font-size: 18px;
    display: flex;
    align-items: flex-start;
    gap: 2px;
    color: #919191;
    .special-text {
      color: v-bind(specialTextColor);
      font-size: 18px;
      margin-left: 10px;
    }
  }
  .date-input-container {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: flex-start;
    gap: 4px;
    position: relative;
    .calendar-year-type-select {
      width: 100px;
      height: 100%;
      :deep(.el-select__wrapper) {
        height: 100%;
      }
    }
    .date-input {
      flex: 1;
      height: 100%;
    }
    .date-picker {
      position: absolute;
      bottom: 0;
      left: 100px;
      width: 100%;
      :deep(.input-container) {
        display: none;
        border: none;
        border-radius: 10px;
      }
    }
  }
}
</style>