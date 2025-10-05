<template>
  <div class="button-page-layout">
    <NormalButton></NormalButton>
  </div>
</template>

<script>
import NormalButton from '@/components/normal/button/NormalButton.vue';

export default {
  components: {
    NormalButton
  }
}
</script>

<style scoped lang="scss">
.button-page-layout {
  width: 100%;
  height: auto;
  padding: 40px 20px;
}
</style>