<template>
  <div class="flex justify-center items-center space-x-4">
    <!-- Clients Box -->
    <div class="p-4 w-60 h-32 border rounded-md shadow-lg bg-blue-400 text-center">
      <i class="fas fa-users text-3xl text-white mb-2"></i>
      <div class="text-2xl font-semibold text-white">{{ clients }}</div>
      <div class="text-gray-200">Clients</div>
    </div>

    <!-- Meters Box -->
    <div class="p-4 w-60 h-32 border rounded-md shadow-lg bg-green-400 text-center">
      <i class="fas fa-tachometer-alt text-3xl text-white mb-2"></i>
      <div class="text-2xl font-semibold text-white">{{ meters }}</div>
      <div class="text-gray-200">Meters</div>
    </div>

    <!-- Pending Accounts Box -->
    <div v-if="isAdmin" class="p-4 w-60 h-32 border rounded-md shadow-lg bg-red-400 text-center">
      <i class="fas fa-clock text-3xl text-white mb-2"></i>
      <div class="text-2xl font-semibold text-white">{{ pendingAccounts }}</div>
      <div class="text-gray-200">Pending Accounts</div>
    </div>

    <!-- Sub Admins -->
    <div v-if="isAdmin" class="p-4 w-60 h-32 border rounded-md shadow-lg bg-green-400 text-center">
      <i class="fas fa-clock text-3xl text-white mb-2"></i>
      <div class="text-2xl font-semibold text-white">{{ technicians }}</div>
      <div class="text-gray-200">Technicians</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from "../../axios.js";
import { useAuthStore } from "../../stores/auth";

const clients = ref(0);
const meters = ref(0);
const pendingAccounts = ref(0);
const technicians = ref(0);

const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user.role === "ADMIN");

onMounted(async () => {
  try {
    // Assuming you have appropriate API endpoints for each metric
    const clientsResponse = await axios.get('/clients');
    clients.value = clientsResponse.data.length;

    const metersResponse = await axios.get('/meters');
    meters.value = metersResponse.data.length;

    const pendingAccountsResponse = await axios.get('/subadmins/pending');
    pendingAccounts.value = pendingAccountsResponse.data.length;

    const techniciansResponse = await axios.get('/subadmins/approved');
    technicians.value = techniciansResponse.data.length;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>
