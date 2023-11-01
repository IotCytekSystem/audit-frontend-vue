<template>
  <div>
    <!-- Meter Editing Form -->
    <div class="p-4">
      <h2 class="text-2xl font-semibold">Edit Meter</h2>
      <form @submit.prevent="saveMeter">
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold">Serial Number:</label>
          <input v-model="meter.serialNumber" type="text" class="form-input" />
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold">MAC Address:</label>
          <input v-model="meter.macAddress" type="text" class="form-input" />
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold">Date Added:</label>
          <input v-model="meter.dateAdded" type="date" class="form-input" />
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 text-sm font-bold">Status:</label>
          <select v-model="meter.status" class="form-select">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <!-- Other meter fields go here -->
        <div class="mt-6">
          <button type="submit" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// You should have a prop "meter" passed to this component with the meter data to edit.

const saveMeter = () => {
  // Implement the logic to save the edited meter data.
};
</script>
