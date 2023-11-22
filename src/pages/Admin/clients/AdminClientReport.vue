<template>
  <div class="container mx-auto p-8">
    <h2 class="text-2xl font-semibold mb-4">Report Page</h2>

    <!-- Dropdown Menu -->
    <div class="mb-4">
      <label for="reportType" class="mr-2">Report Type:</label>
      <select v-model="selectedReport" @change="loadComponent" id="reportType" class="p-2 border">
        <option value="HourlyEnergyComponent">Hourly Energy</option>
        <option value="EnergyDuringSelectedHoursComponent">Energy During Selected Hours</option>
        <option value="ComprehensiveAnalysisComponent">Comprehensive Analysis</option>
      </select>
    </div>

    <!-- Display Selected Component -->
    <div>
      <component :is="selectedReport" />
    </div>
  </div>
</template>

<script>
import HourlyEnergyComponent from '../../Analysis/hourly/HourlyEnergyComponent.vue';
import EnergyDuringSelectedHoursComponent from '../../Analysis/EnergyDuringSelectedHoursComponent.vue';
import ComprehensiveAnalysisComponent from '../../Analysis/ComprehensiveAnalysisComponent.vue';

export default {
  data() {
    return {
      selectedReport: 'HourlyEnergyComponent', // Updated default selected report
    };
  },
  components: {
    HourlyEnergyComponent,
    EnergyDuringSelectedHoursComponent,
    ComprehensiveAnalysisComponent,
  },
  methods: {
    loadComponent() {
        // You can perform additional logic here if needed
        // This example assumes that the components are imported and registered
        // dynamically based on the selected option in the dropdown
    },
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
