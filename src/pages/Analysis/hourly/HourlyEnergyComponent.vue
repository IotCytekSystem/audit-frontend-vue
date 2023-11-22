<template>
  <div class="container mx-auto p-8 flex flex-col items-center">
    <h2 class="text-4xl font-semibold mb-8">Hourly Energy Consumption</h2>

    <!-- Meter and Date Range Selection -->
    <div class="mb-6 flex flex-col md:flex-row items-center">
      <div class="mb-4 md:mb-0 md:mr-4 flex items-center">
        <label for="meter" class="mr-2 text-lg">Meter:</label>
        <select v-model="selectedMeter" id="meter" class="p-3 border rounded-md">
          <!-- Populate this with your available meters -->
          <option value="meter1">Meter 1</option>
          <option value="meter2">Meter 2</option>
          <!-- Add more options as needed -->
        </select>
      </div>
      <div class="flex items-center">
        <label for="startDate" class="mr-2 text-lg">Start Date:</label>
        <input type="date" v-model="startDate" id="startDate" class="p-3 border rounded-md mr-4">

        <label for="endDate" class="mr-2 text-lg">End Date:</label>
        <input type="date" v-model="endDate" id="endDate" class="p-3 border rounded-md">
      </div>
    </div>

    <!-- Display Selected Meter and Date Range -->
    <div class="mb-6">
      <p class="text-lg">Selected Meter: {{ selectedMeter }}</p>
      <p class="text-lg">Selected Date Range: {{ startDate }} - {{ endDate }}</p>
    </div>

    <!-- Add Hourly Energy Consumption data display here -->
    <!-- You may want to include a chart or table for hourly data -->

    <!-- Buttons for View and Export -->
    <div class="mb-8 flex">
      <button @click="viewReport" class="px-6 py-3 bg-blue-500 text-white rounded-md mr-4 hover:bg-blue-600 transition duration-300">View</button>
      <button @click="exportReport" class="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">Export</button>
    </div>

    <!-- Full Report Component (Hidden by default) -->
    <FullReport v-if="showFullReport" :selectedMeter="selectedMeter" :startDate="startDate" :endDate="endDate" />

    <!-- Export Report Component (Hidden by default) -->
    <ExportReport v-if="showExportReport" :selectedMeter="selectedMeter" :startDate="startDate" :endDate="endDate" />

    <!-- Chart -->
    <div class="mb-6" v-if="showChart">
      <vue-chartjs-line :data="chartData" :options="chartOptions" ref="chart"></vue-chartjs-line>
    </div>
  </div>
</template>

<script>
import axios from '../../../axios';
import HourlyFullReport from './HourlyFullReport.vue';
import ExportReport from './ExportReport.vue';
import { Line } from 'vue3-charts';

export default {
  components: {
    VueChartJs: Line,
  },
  data() {
    return {
      selectedMeter: '',
      startDate: '',
      endDate: '',
      showFullReport: false,
      showExportReport: false,
      showChart: false,
      chartData: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    async viewReport() {
      try {
        const response = await axios.get('/api/realtime/data', {
          params: {
            selectedMeter: this.selectedMeter,
            startDate: this.startDate,
            endDate: this.endDate,
          },
        });

        const backendData = response.data;
        this.chartData = this.prepareChartData(backendData);

        this.showChart = true;
        this.showFullReport = false;
        this.showExportReport = false;
      } catch (error) {
        console.error('Error fetching data from the backend:', error);
      }
    },
    prepareChartData(backendData) {
      const labels = backendData.consumption.map(item => item.reportTime);
      const downTotalData = backendData.consumption.map(item => item.downTotal);
      const upTotalData = backendData.consumption.map(item => item.upTotal);

      return {
        labels: labels,
        datasets: [
          {
            label: '(↓)319E44EE_a',
            data: downTotalData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
          {
            label: '(↑)319E44EE_a',
            data: upTotalData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      };
    },
    renderChart() {
      const ctx = this.$refs.chart.getContext('2d');
      new this.VueChartJs(ctx, {
        type: 'line',
        data: this.chartData,
        options: this.chartOptions,
      });
    },
  },
  watch: {
    showChart(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.renderChart();
        });
      }
    },
  },
  mounted() {
    this.renderChart();
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
