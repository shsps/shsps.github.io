<template>
  <Doughnut
    :data="chartData"
    :options="chartOptions"
    plugins="[ChartDataLabels]"
  />
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
            // 第二組是專門畫中間百分比的
            data: [160, 160, 160, 160, 160],
            backgroundColor: ["transparent"], // 這層不用顏色，只要 label
            datalabels: {
              align: "start",
              anchor: "start",
              offset: -10,
              color: "#000",
              backgroundColor: "#ECEAF8", // 灰色圈圈
              borderRadius: 50,
              padding: 6,
              font: {
                weight: "bold",
                size: 14,
              },
              formatter: (value, ctx) => {
                const dataset = ctx.chart.data.datasets[0].data;
                const total = dataset.reduce((sum, val) => sum + val, 0);
                const percentage = ((value / total) * 100).toFixed(0);
                return `${percentage}%`;
              },
            },
          },
          {
            data: [160, 160, 160, 160, 160],
            backgroundColor: [
              "#f7931e",
              "#00bcd4",
              "#f8b0b0",
              "#1d2b64",
              "#3c5cff",
            ],
            borderWidth: 0,
            datalabels: {
              align: "end",
              anchor: "end",
              offset: 10,
              color: "#000",
              backgroundColor: "transparent",
              borderRadius: 6,
              padding: 6,
              font: {
                weight: "bold",
                size: 12,
              },
              formatter: (value, ctx) => {
                const label = ctx.chart.data.labels[ctx.dataIndex];
                return `${label}\n${value}張`;
              },
            },
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "40%",
        layout: {
          padding: 60,
        },
        hover: {
          mode: null,
        },
        interaction: {
          mode: null,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          datalabels: {
            display: true, // 🔥全域先關掉，我們用 datasets 裡單獨設定
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