<template>
    <div class="normal-input-root" :style="dynamicStyle">
        <span v-if="title" class="normal-input-title">{{ title }}</span>
        <div 
        class="normal-input-container" 
        :class="{'disable': disable}"
        :style="{'flex-direction': iconPosition === 'left' ? 'row-reverse' : 'row'}">
            <input 
            class="normal-input" 
            :type="isPassword?'password':'text'" 
            :placeholder="placeholder"
            :value="modelValue" 
            @input="$emit('update:modelValue', $event.target.value)">
            
            <div 
            v-if="icon" 
            class="normal-input-icon" 
            :style="{'border-radius': isIconBackgroundCircle ? '50%' : '0%'}"
            @click="$emit('OnIconClick')">
                <i :class="icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['OnIconClick'],
    props: {
        modelValue: String,
        title: {
            type: String,
            default: null
        },
        titleSize: {
            type: String,
            default: '14px'
        },
        placeholder: {
            type: String,
            default: '請輸入'
        },
        icon: {
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
            default: '0px'
        },
        border: {
            type: String,
            default: '1px solid #000000'
        },
        fontSize: {
            type: String,
            default: '18px'
        },
        iconSize: {
            type: String,
            default: '20px'
        },
        iconColor: {
            type: String,
            default: '#000000'
        },
        iconBackground: {
            type: String,
            default: 'transparent'
        },
        isIconBackgroundCircle: {
            type: Boolean,
            default: false
        },
        iconPosition: {
            type: String,
            default: 'right' // left, right
        },
        disable: {
            type: Boolean,
            default: false
        },
        isPassword: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
        };
    },
    methods: {
    },
    computed: {
        dynamicStyle() {
            return {
                '--dynamic-bgcolor': this.backgroundColor,
                '--dynamic-color': this.color,
                '--dynamic-border-radius': this.borderRadius,
                '--dynamic-border': this.border,
                '--dynamic-font-size': this.fontSize,
                '--dynamic-icon-size': this.iconSize,
                '--dynamic-icon-color': this.iconColor,
                '--dynamic-icon-background': this.iconBackground,
                '--dynamic-title-size': this.titleSize,
            }
        },
    },
};
</script>

<style scoped lang="scss">
.normal-input-root {
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    gap: 10px;
    // flex-wrap: wrap;
}
.normal-input-title {
    width: 100%;
    font-size: var(--dynamic-title-size);
    color: var(--dynamic-color);
}
.normal-input-container {
    width: 100%;
    height: 100%;
    border: var(--dynamic-border);
    border-radius: var(--dynamic-border-radius);
    background: var(--dynamic-bgcolor);
    display: flex;
    align-items: center;
    padding: 0 5px;
    .normal-input {
        width: 100%;
        height: 100%;
        font-size: var(--dynamic-font-size);
        border: none;
        outline: none;
        background: transparent;
        color: var(--dynamic-color);
    }
    .normal-input-icon {
        font-size: var(--dynamic-icon-size);
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--dynamic-icon-background);
        color: var(--dynamic-icon-color);
        padding: 5px;
        cursor: pointer;
    }
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