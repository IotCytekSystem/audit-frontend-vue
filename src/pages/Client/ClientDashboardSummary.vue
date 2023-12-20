<template>
  <main class="p-4">
<header class="text-center mb-6">
  <div class="flex flex-col items-center">
    <p class="text-2xl font-bold text-indigo-700">{{ realTimeData.date }}</p>
    <p class="text-xl text-blue-700 font-semibold">{{ realTimeData.day }}</p>
    <p class="text-xl text-blue-700 font-semibold">{{ realTimeData.time }}</p>
  </div>

  <!-- Additional Information -->
  <div class="mt-4 flex items-center justify-center space-x-2 text-gray-500">
    <p><span class="text-2xl">Summury of Energy data for</span><span class="text-4xl font-semibold mx-1"> {{client.firstname}}</span> <span class="text-4xl font-semibold">{{client.lastname}}</span></p>
  </div>
</header>



    <!-- Small Cards Section -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <!-- Small Card 1 -->
      <div class="card bg-purple-700 shadow-xl">
        <i class="fas fa-bolt text-3xl text-yellow-300"></i>
        <p class="text-sm font-bold">Power Now</p>
        <p class="text-md text-semibold">{{ sumPower}} <span class="text-white">W</span></p>
      </div>

      <!-- Small Card 2 -->
      <div class="card bg-orange-400 shadow-xl">
        <i class="fas fa-sun text-3xl text-blue-800"></i>
        <p class="text-sm font-bold">Today's Energy</p>
        <p class="text-sm text-green-700 text-bold">Total:{{daylyEnergy.total}}</p>
      </div>

      <!-- Small Card 3 -->
      <div class="card bg-green-500 shadow-xl">
        <i class="fas fa-calendar text-3xl text-white"></i>
        <p class="text-sm font-bold">Monthly Energy</p>
        <p class="text-sm text-green-700 text-bold">Total:{{monthlyEnergy.total}}</p>
      </div>

      <!-- Small Card 4 -->
      <div class="card bg-gray-300 border border-purple-800 shadow-xl">
        <i class="fas fa-chart-line text-3xl text-purple-800"></i>
        <p class="text-sm font-bold text-purple-800">Yearly Energy</p>
        <p class="text-sm text-green-700 text-bold">Total: {{annualEnergy.total}}</p>
      </div>
    </div>




    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <!-- Small Card 5 -->
      <div class="card bg-teal-400 shadow-xl">
        <i class="fas fa-chart-line text-3xl text-blue-800"></i>
        <p class="text-sm font-bold text-blue-800">Total Energy</p>
        <p class="text-sm text-semibold">{{annualEnergy.total}}W</p>
      </div>

      <!-- Small Card 6 -->
      <div class="card bg-indigo-500 border border-purple-800 shadow-xl">
        <i class="fas fa-chart-line text-3xl text-white"></i>
        <p class="text-sm font-bold text-white">Peak current</p>
        <p class="text-sm text-semibold">{{peakCurrent }} V</p>
      </div>

      <!-- Small Card 7 -->
      <div class="card bg-pink-700 shadow-xl">
        <i class="fas fa-chart-line text-3xl text-white"></i>
        <p class="text-sm font-bold text-white">Peak Power</p>
        <p class="text-sm text-semibold">{{ peakPower }} W</p>
      </div>
    </div>

    <!-- Tables Section (unchanged) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- First Table (unchanged) -->
      <div class="w-full p-4">
        <table class="w-full border-collapse border">
        
        </table>
      </div>

      <!-- Second Table (unchanged) -->
      <div class="w-full p-4">
        <table class="w-full border-collapse border">
          <!-- Table content -->
        </table>
      </div>
    </div>
  </main>
</template>

<style scoped>
.card {
  @apply p-6 rounded-xl text-center text-white;
}

.card i {
  @apply text-3xl;
}

.card p {
  @apply text-sm;
}

.card.shadow-xl {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

header p {
  @apply mb-2;
}
</style>



<script setup>
import { computed, ref,onMounted } from 'vue';
import { useAuthStore } from "../../stores/auth";
const authStore = useAuthStore();
const userId=authStore.user.id;
import axios from '../../axios.js';

const peakCurrent = ref([]);
const peakPower = ref({});
const client = ref({});
const annualEnergy = ref({});
const monthlyEnergy = ref({});
const daylyEnergy = ref({});
const meterId = ref({});
const realTimeData = ref({});

const sumPower = computed(() => {
  return realTimeData.value.bluePower + realTimeData.value.redPower + realTimeData.value.yellowPower;
});




onMounted(async () => {
  try {
    // Fetch the meterId from the first endpoint
    const response1 = await axios.get(`/meters/user/${userId}`);
    meterId.value = response1.data; // Extract data from the response
    console.log("meter id =", meterId.value);

    // Fetch annual energy data using the obtained meterId
    const response2 = await axios.get(`/annualEnergy/${meterId.value}`);
    annualEnergy.value = response2.data; // Extract data from the response
    console.log("Annual data =", annualEnergy);

    // Fetch monthly energy data using the obtained meterId
    const response3 = await axios.get(`/monthlyEnergy/${meterId.value}`);
    monthlyEnergy.value = response3.data; // Extract data from the response
    console.log("Monthly data =", monthlyEnergy);

    // Fetch dayly energy data using the obtained meterId
    const response4 = await axios.get(`/dailyEnergy/${meterId.value}`);
    daylyEnergy.value = response4.data;

    // Fetch dayly energy data using the obtained meterId
    const response5 = await axios.get(`/power/peak/${meterId.value}`);
    peakPower.value = response5.data;


    // Fetch dayly energy data using the obtained meterId
    const response7 = await axios.get(`/current/peak/${meterId.value}`);
    peakCurrent.value = response7.data;
     console.log("peakCurrent =", peakCurrent.value);

    // Fetch realtime energy data using the obtained meterId
    const response6 = await axios.get(`/realtime/data/${meterId.value}`);
    realTimeData.value = response6.data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const clients = 50; // Replace with the actual number of clients
const meters = 1; // Replace with the actual number of meters

</script>

