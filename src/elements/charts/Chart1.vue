<template>
  <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  components: {
    Doughnut,
  },
  data() {
    return {
      chartData: {
        labels: ["新安東京", "旺旺友聯", "國泰產險", "台灣產物", "安達產物"],
        datasets: [
          {
            data: [160, 160, 160, 160, 160], // 各公司賣出的張數
            backgroundColor: [
              "#f7931e",
              "#00bcd4",
              "#f8b0b0",
              "#1d2b64",
              "#3c5cff",
            ], // 各區塊的顏色
            borderWidth: 0,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        cutout: "50%", // 這個是 donut 的中空程度，50%大概就是圖中那種厚度
        plugins: {
          legend: {
            position: "right",
            labels: {
              generateLabels: (chart) => {
                const data = chart.data;
                return data.labels.map((label, index) => ({
                  text: `${label} ${data.datasets[0].data[index]}張`,
                  fillStyle: data.datasets[0].backgroundColor[index],
                }));
              },
            },
          },
          tooltip: {
            enabled: true, // 滑過會有提示
          },
          datalabels: {
            color: "#000", // 百分比文字是黑色
            backgroundColor: "#f0f0f0", // 灰色圈圈
            borderRadius: 50,
            padding: 6,
            font: {
              weight: "bold",
              size: 12,
            },
            formatter: (value, ctx) => {
              const dataset = ctx.chart.data.datasets[0].data;
              const total = dataset.reduce((sum, val) => sum + val, 0);
              const percentage = ((value / total) * 100).toFixed(0);
              return `${percentage}%`;
            },
          },
        },
      },
    };
  },
  methods: {
    initChart() {
      ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);
    },
  },
  mounted() {},
  beforeMount() {
    this.initChart();
  },
};
</script>

<style>
</style>