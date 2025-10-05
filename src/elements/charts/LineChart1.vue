<template>
  <canvas ref="chartRef" width="700" height="400"></canvas>
</template>

<script>
import { Chart, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default {
  name: 'MixedChart',
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartRef.getContext('2d');

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          datasets: [
            {
              type: 'line',
              label: '月增率',
              data: [0, 70, -50, 80, 60, -60, 30, -50, 90, -60, 50, -100],
              borderColor: '#00BCD4', // 藍綠色
              backgroundColor: '#00BCD4',
              yAxisID: 'y1',
              tension: 0,
              pointBackgroundColor: '#00BCD4',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              fill: false,
              datalabels: {
                display: false
              }
            },
            {
              type: 'bar',
              label: '金額',
              data: [1000, 1700, 800, 1400, 1600, 700, 1000, 600, 1600, 700, 1300, 800],
              backgroundColor: '#E5E5E5', // 灰白色
              yAxisID: 'y',
              borderRadius: 6,
              barThickness: 20,
              datalabels: {
                display: false
              }
            },
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: '#666'
              },
              grid: {
                color: '#444'
              }
            },
            y: {
              position: 'left',
              ticks: {
                color: '#666',
                callback: function(value) {
                  return value + '元';
                }
              },
              grid: {
                color: '#444'
              }
            },
            y1: {
              position: 'right',
              ticks: {
                color: '#666',
                callback: function(value) {
                  return value + '%';
                }
              },
              grid: {
                drawOnChartArea: false
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false
            }
          }
        }
      });
    }
  }
};
</script>

<style>

</style>