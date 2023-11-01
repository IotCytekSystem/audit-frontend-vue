<template>
  <div class="w-full">
    <line-chart :data="chartData" :options="chartOptions"></line-chart>
  </div>
</template>

<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: Object,
    chartOptions: Object,
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>
