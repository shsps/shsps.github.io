<template>
    <div class="datepicker-container" :style="datepickerIconStyle">
        <div v-if="icon" class="datepicker-icon">
            <i :class="icon"></i>
        </div>
        <div class="datepicker-input" :style="{'grid-template-columns': isRange?'1fr 35px 1fr':'1fr'}">
            <span 
            class="input1 display-text"
            @click="openDatePicker(this.$refs.startDateInput)">{{ getDisplayDate(startDate) }}</span>
            <input 
            class="input1"
            style="width: 0px; height: 0px; align-self: flex-start;"
            :type="getInputType" 
            ref="startDateInput" 
            v-model="startDate"
            :max="isRange?endDate:null"
            @change="dateChange"
            />
            <span class="text" v-if="isRange">至</span>
            <span 
            v-if="isRange"
            class="input2 display-text"
            @click="openDatePicker(this.$refs.endDateInput)">{{ getDisplayDate(endDate) }}</span>
            <input 
            class="input2"
            style="width: 0px; height: 0px; align-self: flex-start;"
            v-if="isRange"
            :type="getInputType" 
            ref="endDateInput" 
            v-model="endDate"
            @change="dateChange"
            :min="isRange?startDate:null"
            />
        </div>
    </div>
</template>

<script>
import moment from "moment"

export default {
    props: {
        modelValue: {
            type: Object,
        },
        isRange: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'date' // date, year, yearMonth, month, monthDay, dateTime
        },
        placeholder: {
            type: String,
            default: null
        },
        backgroundColor: {
            type: String,
            default: '#ffffff'
        },
        color: {
            type: String,
            default: '#000000'
        },
        borderRadius: {
            type: String,
            default: '4px'
        },
        border: {
            type: String,
            default: '1px solid #000000'
        },
        fontSize: {
            type: String,
            default: '16px'
        },
        icon: {
            type: String,
            default: 'fa-solid fa-calendar-days'
        },
        iconSize: {
            type: String,
            default: '16px'
        },
        iconColor: {
            type: String,
            default: '#000000'
        },
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            dateFormat: {
                'date': "YYYY-MM-DD",
                'year': "YYYY",
                'yearMonth': "YYYY-MM",
                'month': "MM",
                'monthDay': "MM-DD",
                'dateTime': "YYYY-MM-DD HH:mm:ss"
            },
            placeholderEnum: {
                'date': '年-月-日',
                'year': '年',
                'yearMonth': '年-月',
                'month': '月',
                'monthDay': '月-日',
                'dateTime': '年-月-日 時:分:秒'
            }
        }
    },
    methods: {
        openDatePicker(input) {
            input.showPicker();
        },
        dateChange() {
            let output = null;
            const check1 = moment(this.startDate);
            const check2 = moment(this.endDate);
            let _startDate = check1.isValid() ? check1.format(this.dateFormat[this.type]) : null;
            let _endDate = check2.isValid() ? check2.format(this.dateFormat[this.type]) : null;
            if (this.isRange) {
                output = [_startDate, _endDate];
            } else {
                output = _startDate;
            }
            this.$emit('update:modelValue', output);
        },
        getDisplayDate(date) {
            const _date = moment(date);
            if (!_date.isValid()) {
                return this.placeholder || this.placeholderEnum[this.type];
            }
            const afterFormat = _date.format(this.dateFormat[this.type]);
            // console.log(afterFormat);
            return afterFormat;
        }
    },
    computed: {
        datepickerIconStyle() {
            return {
                '--dynamic-bgcolor': this.backgroundColor,
                '--dynamic-color': this.color,
                '--dynamic-border-radius': this.borderRadius,
                '--dynamic-border': this.border,
                '--dynamic-font-size': this.fontSize,
                '--dynamic-icon-size': this.iconSize,
                '--dynamic-icon-color': this.iconColor,
            }
        },
        getInputType() {
            switch (this.type) {
                case 'dateTime':
                    return 'datetime-local';
                case 'year':
                case 'month':
                    return 'month';
                default:
                    return 'date';
            }
        }
    }
}
</script>

<style scoped lang="scss">
.datepicker-container {
  width: 100%;
  height: 100%;
  border: var(--dynamic-border);
  border-radius: var(--dynamic-border-radius);
  background: var(--dynamic-bgcolor);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  .datepicker-icon {
    width: 30px;
    height: 30px;
    min-width: 30px;
    font-size: var(--dynamic-icon-size);
    color: var(--dynamic-icon-color);
    border-right: var(--dynamic-border);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .datepicker-input {
    flex: 1;
    display: grid;
    grid-template-rows: 100%;
    align-items: center;
    padding: 0 10px;
    color: var(--dynamic-color);
    font-size: var(--dynamic-font-size);
    .input1 {
      grid-area: 1 / 1 / 2 / 2;
    }
    .text {
      grid-area: 1 / 2 / 2 / 3;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .input2 {
      grid-area: 1 / 3 / 2 / 4;
    }
    .display-text {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
    input::-webkit-calendar-picker-indicator {
      display: none;
    }
    input {
      border: none;
      outline: none;
      background: transparent;
    }
  }
}
</style>