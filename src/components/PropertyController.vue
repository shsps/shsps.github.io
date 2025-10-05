<template>
  <div v-if="properties.length > 0" class="property-controller-layout">
    <div class="property-container" v-for="property in properties" :key="property.propertyName">
      <div class="property-title">{{ property.title }}</div>
      <div class="property-content">
        <NormalInput 
        v-if="property.controllerType === 'input'" 
        v-model="propertyDataContainer[property.propertyName]"
        />
        <NormalButton 
        v-if="property.controllerType === 'button'"
        />
        <NormalCheckBox 
        v-if="property.controllerType === 'checkBox'" 
        v-model:isChecked="propertyDataContainer[property.propertyName]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import NormalButton from '@/elements/normal-elements/NormalButton.vue';
import NormalCheckBox from '@/elements/normal-elements/NormalCheckBox.vue';
import NormalInput from '@/elements/normal-elements/NormalInput.vue';

export default {
  components: {
    NormalButton,
    NormalCheckBox,
    NormalInput
  },
  emits: ['updateProperty'],
  props: {
    properties: {
      type: Array,
      default: []
      /*
      [
        {
          title: '寬度',
          propertyName: 'dataWidth',
          controllerType: 'input',
          suffix: 'px',
          defaultValue: 100
        }
      ]
       */
    }
  },
  watch: {
    propertyDataContainer: {
      handler(newVal) {
        console.log(newVal);
        // this.$emit('updateProperty', newVal);
      },
      deep: true
    }
  },
  data() {
    return {
      controllerMap: {
        input: NormalInput,
        button: NormalButton,
        checkBox: NormalCheckBox
      },
      propertyDataContainer: {}
    }
  },
  methods: {
    init() {
      this.properties.forEach(property => {
        this.propertyDataContainer[property.propertyName] = property.defaultValue;
      });
    }
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped lang="scss">
.property-controller-layout {
  width: 100%;
  padding: 20px 10px;
  border: 1px solid #000;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.property-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  .property-title {
    font-size: 16px;
  }
  .property-content {
    width: 150px;
    height: 30px;
  }
}
</style>