<template>
  <div class="flex justify-center items-center space-x-4 ">
    <!-- Clients Box -->
    <div class="p-4 w-60 h-32 border rounded-md shadow-lg bg-blue-400 text-center">
      <i class="fas fa-users text-3xl text-white mb-2"></i>
      <div class="text-2xl font-semibold text-white">{{ clients }}</div>
      <div class="text-gray-200">Peak Power</div>
    </div>
      <div class="p-4 w-60 h-32 border rounded-md shadow-lg bg-blue-400 text-center">
      <i class="fas fa-users text-3xl text-white mb-2"></i>
      <div class="text-2xl font-semibold text-white">{{ clients }}</div>
      <div class="text-gray-200">Peak current</div>
    </div>
    <!-- Meters Box -->
    <div class="p-4 w-60 h-32 border rounded-md shadow-lg bg-green-400 text-center">
      <i class="fas fa-tachometer-alt text-3xl text-white mb-2"></i>
      <div class="text-2xl font-semibold text-white">{{ meters }}</div>
      <div class="text-gray-200">My Meters</div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const clients = 50; // Replace with the actual number of clients
const meters = 1; // Replace with the actual number of meters

</script>
