<!-- FullReportPage.vue -->

<template>
  <div class="container mx-auto p-8">
    <h2 class="text-2xl font-semibold mb-4">Full Report</h2>

    <!-- Display Full Report content here -->
    <p>Selected Meter: {{ selectedMeter }}</p>
    <p>Selected Date Range: {{ startDate }} - {{ endDate }}</p>

    <!-- Add more content as needed for the full report -->
  </div>
</template>

<script>
export default {
    props: {
        selectedMeter: String,
        startDate: String,
        endDate: String,
    },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
