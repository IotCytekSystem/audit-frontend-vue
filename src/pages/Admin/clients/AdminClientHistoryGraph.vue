<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-3xl w-full">
      <h1 class="text-2xl font-semibold mb-4">Admin Client History Graph</h1>
      <div class="bg-white p-4 rounded shadow">
        <LineChart :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script>
// Import the LineChart component from the charting library you choose (e.g., Chart.js)
import { Line } from 'vue-chartjs';

export default {
  name: 'AdminClientHistoryGraph',

  components: {
    LineChart: Line,
  },

  data() {
    return {
      chartData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Client History',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: [
            {
              type: 'category',
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            },
          ],
          y: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
};
</script>

<style scoped>
/* Add your Tailwind CSS classes here */
</style>
