<template>
  <div style="width: 100%; display: flex; flex-direction: row; gap: 20px">
    <div style="width: 500px; height: 500px">
      <Chart1 />
    </div>
    <div style="width: 500px; height: 500px">
      <Chart2 />
    </div>
    <div style="width: 500px; height: 500px">
      <Chart3 />
    </div>
  </div>

  <div style="width: 100%; display: flex; flex-direction: row; gap: 20px">
    <div style="width: 700px; height: 400px">
      <LineChart1 />
    </div>
  </div>
</template>

<script>
import Chart1 from "@/elements/charts/Chart1.vue";
import Chart2 from "@/elements/charts/Chart2.vue";
import Chart3 from "@/elements/charts/Chart3.vue";
import LineChart1 from "@/elements/charts/LineChart1.vue";

export default {
  components: {
    Chart1,
    Chart2,
    Chart3,
    LineChart1,
  },
};
</script>

<style>
</style>