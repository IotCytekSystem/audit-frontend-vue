<!-- EnergyConsumptionSelectedHoursPage.vue -->

<template>
  <div class="container mx-auto p-8">
    <h2 class="text-2xl font-semibold mb-4">Energy Consumption During Selected Hours</h2>

    <!-- Meter Selection -->
    <div class="mb-4">
      <label for="meter" class="mr-2">Meter:</label>
      <select v-model="selectedMeter" id="meter" class="p-2 border">
        <!-- Populate this with your available meters -->
        <option value="meter1">Meter 1</option>
        <option value="meter2">Meter 2</option>
        <!-- Add more options as needed -->
      </select>
    </div>

    <!-- Date Range Selection -->
    <div class="mb-4">
      <label for="startDate" class="mr-2">Start Date:</label>
      <input type="date" v-model="startDate" id="startDate" class="p-2 border mr-4">

      <label for="endDate" class="mr-2">End Date:</label>
      <input type="date" v-model="endDate" id="endDate" class="p-2 border">
    </div>

    <!-- Hour Selection -->
    <div class="mb-4">
      <label for="hours" class="mr-2">Select Hours:</label>
      <select v-model="selectedHours" id="hours" class="p-2 border">
        <!-- Populate this with available hours -->
        <option value="1">1:00 AM</option>
        <option value="2">2:00 AM</option>
        <!-- Add more options as needed -->
      </select>
    </div>

    <!-- Group By Selection -->
    <div class="mb-4">
      <label for="groupBy" class="mr-2">Group By:</label>
      <select v-model="groupBy" id="groupBy" class="p-2 border">
        <option value="day">Day</option>
        <!-- Add more options as needed -->
      </select>
    </div>

    <!-- Display Selected Options -->
    <div>
      <p>Selected Meter: {{ selectedMeter }}</p>
      <p>Selected Date Range: {{ startDate }} - {{ endDate }}</p>
      <p>Selected Hours: {{ selectedHours }}</p>
      <p>Group By: {{ groupBy }}</p>

      <!-- Add Energy Consumption data display here -->
      <!-- You may want to include a chart or table for the selected data -->
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            selectedMeter: '', // Default selected meter
            startDate: '', // Default start date
            endDate: '', // Default end date
            selectedHours: '', // Default selected hours
            groupBy: 'day', // Default group by option
        };
    },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
