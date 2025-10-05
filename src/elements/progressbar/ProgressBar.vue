<template>
  <div class="step">
        <div class="line-box" v-for="(data, index) in datas">
            <div class="step1">
                <p :style="data.isLeftActive? 'color: #42B3CC' : 'color: #B9B9B9'">{{ data.title }}</p>
                <p :style="data.isLeftActive? 'color: #42B3CC' : 'color: #B9B9B9'">{{ data.date }}</p>
                <div class="progress-circle-outline line-dot-position" 
                :style="data.isLeftActive? getActiveColor : getNotActiveColor">
                    <div class="progress-circle" 
                    :style="data.isLeftActive? getActiveColor : getNotActiveColor"></div>
                </div>
                <div class="step-line-left line-dot-position" 
                v-if="index != 0"
                :style="data.isLeftActive? getActiveColor : getNotActiveColor"></div>
                <div class="step-line-right line-dot-position" 
                v-if="index != (datas.length-1)"
                :style="data.isRightActive? getActiveColor : getNotActiveColor"></div>
                <div v-if="data.button1" class="w-140px h-34px">
                    <NormalButton
                    :title="data.button1.text" 
                    :icon="data.button1.icon"
                    :borderRadius="'18px'"
                    :color="'#FFFFFF'"
                    :backgroundColor="data.isLeftActive? '#42b3cc' : '#B9B9B9'"
                    :border="`1px solid ${data.isLeftActive? '#42b3cc' : '#B9B9B9'}`"
                    :disable="!data.isLeftActive"
                    :disableAnimation="!data.isLeftActive"
                    @OnClick="data.button1.onClick"
                    ></NormalButton>
                </div>
                <div v-if="data.button2" class="w-140px h-34px">
                    <NormalButton
                    :title="data.button2.text" 
                    :icon="data.button2.icon"
                    :borderRadius="'18px'"
                    :color="'#FFFFFF'"
                    :backgroundColor="data.isLeftActive? '#42b3cc' : '#B9B9B9'"
                    :border="`1px solid ${data.isLeftActive? '#42b3cc' : '#B9B9B9'}`"
                    :disable="!data.isLeftActive"
                    :disableAnimation="!data.isLeftActive"
                    @OnClick="data.button2.onClick"
                    ></NormalButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NormalButton from '@/element/tools/NormalButton.vue';
export default {
    components: {
        NormalButton
    },
    data() {
        return {
            datas: [
                {title:'送出詢價單', date:'2024/01/01', isLeftActive: false, isRightActive: false, button1: {text: '確認', onClick: () => {}}, button2: {text: '取消', onClick: () => {}}},
                {title:'送出詢價單', date:'2024/01/01', isLeftActive: false, isRightActive: false, button1: {text: '確認', onClick: () => {}}, button2: {text: '取消', onClick: () => {}}},
                {title:'送出詢價單', date:'2024/01/01', isLeftActive: false, isRightActive: false, button1: {text: '確認', onClick: () => {}}, button2: {text: '取消', onClick: () => {}}},
                {title:'送出詢價單', date:'2024/01/01', isLeftActive: false, isRightActive: false, button1: {text: '確認', onClick: () => {}}, button2: {text: '取消', onClick: () => {}}},
            ]
        }
    },
    methods: {
        stepController(step) {
            for(let i = 0; i <= step; i++) {
                this.datas[i].isLeftActive = true;
                if(i < step) {
                    this.datas[i].isRightActive = true;
                }
            }
        }
    },
    computed: {
        getActiveColor() {
            return {'--step-color': '#42b3cc'}
        },
        getNotActiveColor() {
            return {'--step-color': '#B9B9B9'}
        },
    },
    mounted() {
        this.stepController(2);
    },
}
</script>

<style scoped lang="scss">
.step {
    display: flex;
    position: relative;
    width: 100%;
    background-color: #FFF;
}

.step1 {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    grid-template-columns: 100%;
    justify-items: center;
    align-items: center;
    row-gap: 16px;
    .line-dot-position {
        grid-row: 3 / 4;
        grid-column: 1 / 2;
    }
    .step-line-left {
        width: 50%;
        border-top: 2px dashed var(--step-color);
        justify-self: flex-start;
    }
    .step-line-right {
        width: 50%;
        border-top: 2px dashed var(--step-color);
        justify-self: flex-end;
    }
    .progress-circle {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--step-color);
    }
    .progress-circle-outline {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 2px solid var(--step-color);
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
.line-box {
    width: 100%;
    display: flex;
}
.line-box p {
    color: #cacaca;
    font-size: 16px;
    white-space: nowrap;
}
</style>