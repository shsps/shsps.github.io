<template>
  <canvas width="500" height="500" ref="chartCanvas"></canvas>
</template>

<script>
export default {
  methods: {
    initChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");
      const data = [30, 70, 100];
      const colors = ["#FF6384", "#36A2EB", "#FFCE56"];
      const labels = ["公司A", "公司B", "公司C"];

      const total = data.reduce((a, b) => a + b, 0);
      let startAngle = -0.5 * Math.PI;
      const centerX = this.$refs.chartCanvas.width / 2;
      const centerY = this.$refs.chartCanvas.height / 2;
      const radius = 100;
      const innerRadius = 60; // 中空甜甜圈的半徑

      data.forEach((value, index) => {
        const sliceAngle = (value / total) * (Math.PI * 2);

        // 畫每塊扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();

        // 畫外圈小圓圈+文字
        const midAngle = startAngle + sliceAngle / 2;
        const labelX = centerX + (radius + 20) * Math.cos(midAngle);
        const labelY = centerY + (radius + 20) * Math.sin(midAngle);

        // 畫小圓圈
        const circleRadius = 5; // 小圈圈半徑
        ctx.beginPath();
        ctx.arc(labelX, labelY, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = colors[index];
        ctx.fill();
        ctx.closePath();

        // 畫文字
        ctx.fillStyle = "#000";
        ctx.font = "12px Arial";
        ctx.textAlign = "left"; // 文字左對齊
        ctx.textBaseline = "middle";

        const padding = 8; // 小圈圈跟文字的間距
        const labelText = `${labels[index]} ${value}張`;
        ctx.fillText(labelText, labelX + circleRadius + padding, labelY);

        startAngle += sliceAngle;
      });

      // 畫中空圓
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
    },
  },
  mounted() {
    this.initChart();
  },
};
</script>

<style>
</style>