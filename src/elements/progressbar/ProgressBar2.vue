<template>
  <el-steps class="progress-bar-layout" :active="getStep" align-center>
    <el-step
      class="progress-step"
      v-for="(step, index) in steps"
      :key="index"
    >
      <template v-slot:title>
        <span >{{ step }}</span>
      </template>
    </el-step>
  </el-steps>
</template>

<script>
export default {
  data() {
    return {
      steps: ["個資同意聲明", "資料填寫", "資料確認", "合約簽名", "成功送出"],
    }
  },
  computed: {
    getStep() {
      // 因為el-steps的index從0開始，所以需要減1
      return this.$store.state.step > 0 ? this.$store.state.step - 1 : 0;
    }
  }
}
</script>

<style scoped lang="scss">
.progress-bar-layout{
  width: 100%;
  max-width: 1200px;
}
/** global */
:deep(.el-step__icon){
  width: 36px;
  height: 36px;
}
:deep(.el-step.is-horizontal .el-step__line){
  top: 16px;
}

/* 已完成 */
:deep(.el-step__head.is-finish .el-step__line){
  border-color: var(--orange01);
  background-color: var(--orange01);
}
:deep(.el-step__head.is-finish .el-step__icon.is-text){
  border: 1px solid var(--orange01);
  background-color: var(--white);
  color: var(--orange01);
}
:deep(.el-step__title.is-finish){
  color: var(--orange01);
  @media (max-width: 768px) {
    display: none;
  }
}

/* 正在進行 */
:deep(.el-step__head.is-process .el-step__line){
  background-color: transparent;
}
:deep(.el-step__head.is-process .el-step__icon.is-text){
  border: 1px solid var(--orange01);
  background-color: var(--orange01);
  color: var(--white);
}
:deep(.el-step__title.is-process){
  color: var(--orange01);
  @media (max-width: 768px) {
    position: absolute;
    left: -10%;
    width: 120%;
  }
}

/* 未到達頁面 */
:deep(.el-step__head.is-wait .el-step__line){
  background-color: transparent;
}
:deep(.el-step__head.is-wait .el-step__icon.is-text){
  border: 1px solid var(--orange01-30);
  background-color: var(--orange01-30);
  color: var(--white);
}
:deep(.el-step__title.is-wait){
  color: var(--orange01-30);
  @media (max-width: 768px) {
    display: none;
  }
}
</style>
