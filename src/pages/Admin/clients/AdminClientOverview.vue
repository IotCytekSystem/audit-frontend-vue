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
        <p class="text-md text-semibold">{{totalPower}} <span class="text-white">W</span></p>
      </div>

      <!-- Small Card 2 -->
      <div class="card bg-orange-400 shadow-xl">
        <i class="fas fa-sun text-3xl text-blue-800"></i>
        <p class="text-sm font-bold">Today's Energy</p>
       <p class="text-sm text-blue-700 text-semibold">Red Phase: {{daylyEnergy.redPhase}}</p>
         <p class="text-sm text-blue-700 text-semibold">Blue Phase: {{daylyEnergy.bluePhase}}kWh</p>
          <p class="text-sm text-blue-700 text-semibold">Yellow Phase: {{daylyEnergy.yellowPhase}}kWh</p>
        <p class="text-sm text-green-700 text-bold">Total:{{daylyEnergy.total}}kWh</p>
      </div>

      <!-- Small Card 3 -->
      <div class="card bg-green-500 shadow-xl">
        <i class="fas fa-calendar text-3xl text-white"></i>
        <p class="text-sm font-bold">Monthly Energy</p>
        <p class="text-sm text-white text-semibold">Red Phase: {{monthlyEnergy.redPhase}}kWh</p>
         <p class="text-sm text-white text-semibold">Blue Phase: {{monthlyEnergy.bluePhase}}kWh</p>
          <p class="text-sm text-white text-semibold">Yellow Phase: {{monthlyEnergy.yellowPhase}}kWh</p>
        <p class="text-sm text-green-700 text-bold">Total:{{monthlyEnergy.total}}kWh</p>
      </div>

      <!-- Small Card 4 -->
      <div class="card bg-gray-300 border border-purple-800 shadow-xl">
        <i class="fas fa-chart-line text-3xl text-purple-800"></i>
        <p class="text-sm font-bold text-purple-800">Yearly Energy</p>
        <p class="text-sm text-blue-700 text-semibold">Red Phase: {{annualEnergy.redPhase}}kWh</p>
         <p class="text-sm text-blue-700 text-semibold">Blue Phase: {{annualEnergy.bluePhase}}kWh</p>
          <p class="text-sm text-blue-700 text-semibold">Yellow Phase: {{annualEnergy.yellowPhase}}kWh</p>
        <p class="text-sm text-green-700 text-bold">Total: {{annualEnergy.total}}kWh</p>
      </div>
    </div>




    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <!-- Small Card 5 -->
      <div class="card bg-teal-400 shadow-xl">
        <i class="fas fa-chart-line text-3xl text-blue-800"></i>
        <p class="text-sm font-bold text-blue-800">Total Energy</p>
        <p class="text-sm text-semibold">{{annualEnergy.total}}kWh</p>
      </div>

      <!-- Small Card 6 -->
      <div class="card bg-indigo-500 border border-purple-800 shadow-xl">
        <i class="fas fa-chart-line text-3xl text-white"></i>
        <p class="text-sm font-bold text-white">Peak current</p>
        <p class="text-sm text-semibold">{{peakCurrent }} A</p>
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
import { computed,ref, onMounted } from 'vue';
import axios from '../../../axios.js';
import { useRoute } from 'vue-router';
const realTimeData = ref({});

const peakCurrent = ref([]);
const peakPower = ref({});

const totalPower = computed(() => {
  if (realTimeData.value) {
    const { redPower, bluePower, yellowPower } = realTimeData.value;
    // Add up the individual power values
    return redPower + bluePower + yellowPower;
  }
  return 0; // Default value or handle accordingly if realTimeData is not available
});

const client = ref({});


const annualEnergy = ref({});
const monthlyEnergy = ref({});
const daylyEnergy = ref({});

const route = useRoute();

const userId = computed(() => {
  return Number(route.params.id);
});


const meterId = ref(0);


onMounted(async () => {
  try {
    // Fetch the meterId from the first endpoint
    const response1 = await axios.get(`/meters/user/${userId.value}`);
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
    const response5 = await axios.get(`/power/peak?userId=${userId.value}&meterId=${meterId.value}`);
    peakPower.value = response5.data;

     // Fetch realtime energy data using the obtained meterId
    const response6 = await axios.get(`/realtime/data/${meterId.value}`);
    realTimeData.value = response6.data;

    // Fetch dayly energy data using the obtained meterId
    const response7 = await axios.get(`/current/peak?userId=${userId.value}&meterId=${meterId.value}`);
    peakCurrent.value = response7.data;

    console.log("peak currnt as per overview");

      
   
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});



onMounted(async () => {
  try {
    const response = await axios.get(`/power/peak?userId=${userId}`);
    peakPower.value = response.data; 
  } catch (error) {
    console.error('Error fetching power data:', error);
  } finally {
    // Optional: Any cleanup or finalization logic
  }
});

onMounted(async () => {
  try {
    const response = await axios.get(`/clients/${userId.value}`);
    client.value = response.data;
    console.log("client info=" +client.value); 
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {
    
  }
});



</script>
