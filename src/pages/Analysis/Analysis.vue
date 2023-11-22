<template>
  <div class="container mx-auto p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-semibold mb-6">Report Page</h2>

    <!-- Dropdown Menu -->
    <div class="mb-6">
      <label for="reportType" class="text-sm text-gray-600 block mb-2">Select Report Type:</label>
      <div class="relative">
        <select v-model="selectedReport" @change="loadReport" id="reportType" class="p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300">
          <option value="billing">Billing Report</option>
          <option value="energyConsumption">Energy Consumption Analysis</option>
          <option value="otherAnalysis">Other Analysis</option>
          <option value="energyUsageBilling">Energy Usage and Billing Report</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg class="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Display Selected Report Content -->
    <div>
      <h3 class="text-2xl font-semibold mb-4">{{ reportData[selectedReport].reportType }}</h3>
      <p class="text-gray-700 mb-2">Time Period: {{ reportData[selectedReport].timePeriod }}</p>
      <!-- Additional report details go here -->

      <!-- Action buttons (View, Export, etc.) can be added here -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedReport: 'billing', // Default selected report
      reportData: {
        billing: {
          reportType: 'Billing Report',
          timePeriod: 'Monthly Report',
          // Other details for the Billing Report
        },
        energyConsumption: {
          reportType: 'Energy Consumption Analysis',
          timePeriod: 'Yearly Report',
          // Other details for Energy Consumption Analysis
        },
        otherAnalysis: {
          reportType: 'Other Analysis',
          timePeriod: 'Customize',
            // Other details for Other Analysis
        },
          energyUsageBilling: {
              reportType: 'Energy Usage and Billing Report',
              timePeriod: 'Meter - All',
              // Other details for Energy Usage and Billing Report
          },
      },
    };
  },
    methods: {
        loadReport() {
            // Use Vue Router to navigate to the selected report route
            // You need to define your routes and handle the navigation logic accordingly
            this.$router.push({ name: this.selectedReport });
        },
    },
};
</script>

<style scoped>
/* Add any additional styles if needed */
/* You can add styles for the dropdown arrow, focus styles, and other interactive elements */
</style>
