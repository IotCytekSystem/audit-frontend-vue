<template>
  <div>
    <h2 class="text-2xl font-semibold text-center">Client Growth Over the Year</h2>
    
    <!-- Add a dropdown for year selection -->
    <div class="text-center mb-4">
      <label for="yearSelect">Select Year:</label>
      <select id="yearSelect" v-model="selectedYear">
        <option v-for="year in availableYears" :value="year">{{ year }}</option>
      </select>
    </div>
    
    <Chart
      :size="{ width: 800, height: 400 }"
      :data="filteredData"
      :margin="margin"
      :direction="direction"
    >
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Line :dataKeys="['name', 'clients']" />
      </template>
    </Chart>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Chart, Grid, Line } from 'vue3-charts';

const clientGrowthData = [
  // Data for 2022
  { name: 'Jan', clients: 100, year: 2022 },
  { name: 'Feb', clients: 150, year: 2022 },
  { name: 'Mar', clients: 200, year: 2022 },
  { name: 'Apr', clients: 250, year: 2022 },
  { name: 'May', clients: 300, year: 2022 },
  { name: 'Jun', clients: 350, year: 2022 },
  { name: 'Jul', clients: 200, year: 2022 },
  { name: 'Aug', clients: 450, year: 2022 },
  { name: 'Sep', clients: 500, year: 2022 },
  { name: 'Oct', clients: 550, year: 2022 },
  { name: 'Nov', clients: 600, year: 2022 },
  { name: 'Dec', clients: 500, year: 2022 },
  
  // Data for 2023
  { name: 'Jan', clients: 120, year: 2023 },
  { name: 'Feb', clients: 170, year: 2023 },
  { name: 'Mar', clients: 210, year: 2023 },
  { name: 'Apr', clients: 260, year: 2023 },
  { name: 'May', clients: 310, year: 2023 },
  { name: 'Jun', clients: 360, year: 2023 },
  { name: 'Jul', clients: 220, year: 2023 },
  { name: 'Aug', clients: 470, year: 2023 },
  { name: 'Sep', clients: 520, year: 2023 },
  { name: 'Oct', clients: 570, year: 2023 },
  { name: 'Nov', clients: 620, year: 2023 },
  { name: 'Dec', clients: 520, year: 2023 }
];

const selectedYear = ref(new Date().getFullYear());  // Default to the current year
const data = ref(clientGrowthData);
const direction = ref('horizontal');
const margin = ref({
  left: 0,
  top: 20,
  right: 20,
  bottom: 0
});

// Compute available years based on data
const availableYears = computed(() => [...new Set(data.value.map(item => item.year))]);

// Filter data based on selected year
const filteredData = computed(() => data.value.filter(item => item.year === selectedYear.value));
</script>

<style>
#app {
  color: gray;
}
</style>
