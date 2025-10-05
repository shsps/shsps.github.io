<template>
  <div class="normal-button-layout">
    <div class="normal-button-title">
      NormalButton
    </div>
    <div class="normal-button-container">
      <NormalButton></NormalButton>
    </div>
    <PropertyController :properties="properties"/>
  </div>
</template>

<script>
import NormalButton from '@/elements/normal-elements/NormalButton.vue';
import PropertyController from '@/components/PropertyController.vue';

export default {
  components: {
    NormalButton,
    PropertyController
  },
  data() {
    return {
      properties: [
        {title: '寬度', propertyName: 'dataWidth', controllerType: 'input', suffix: 'px', defaultValue: '150'},
        {title: '高度', propertyName: 'dataHeight', controllerType: 'input', suffix: 'px', defaultValue: '50'},
        {title: '是否顯示動畫', propertyName: 'dataIsShowAnimation', controllerType: 'checkBox', defaultValue: true},
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.normal-button-layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.normal-button-title {
  font-size: 20px;
  font-weight: bold;
}
.normal-button-container {
  width: 150px;
  height: 50px;
}
</style>