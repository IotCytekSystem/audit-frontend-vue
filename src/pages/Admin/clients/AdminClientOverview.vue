<template>
  <main class="p-4">
    <!-- Small Cards Section -->
    <p class="text-sm text-end text-bold">{{ realTimeData.date }}</p>
     <p class="text-sm text-end text-bold">{{ realTimeData.day }}</p>
    <p class="text-sm text-end text-bold">{{ realTimeData.time }}</p>
    <div class="flex justify-between space-x-4 mb-4">
      <!-- Small Card 1 -->
      <div class="px-[6vw] py-1 bg-blue-900 rounded-xl shadow-lg text-center text-white">
        <i class="fas fa-bolt text-3xl text-yellow-300"></i>
        <p class="text-sm font-bold">Power Now</p>
        <p class="text-md">{{ realTimeData.redPower }} <span class="text-white">KW</span></p>

      </div>

      <!-- Small Card 2 (Update text and data binding) -->
      <div class="px-[6vw] py-1 bg-yellow-300 rounded-xl shadow-lg text-center text-blue-900">
        <i class="fas fa-sun text-3xl text-blue-900"></i>
        <p class="text-sm font-bold">Today's Energy</p>
        <p class="text-sm">{{ realTimeData.yellowExportedEnergy }} kWh</p>
        <p class="text-sm">{{ realTimeData.day }}</p>
      </div>



      <!-- Small Card 3 (Update text and data binding) -->
      <div class="px-[6vw] py-1 bg-green-400 rounded-xl shadow-lg text-center text-white">
        <i class="fas fa-calendar text-3xl text-white"></i>
        <p class="text-sm font-bold">Monthly Energy</p>
        <p class="text-sm">{{ realTimeData.blueExportedEnergy }} kWh</p>
        <p class="text-sm">{{ realTimeData.date }}</p>
      </div>

      <!-- Small Card 4 (unchanged) -->
      <div class="px-[6vw] py-1 bg-white rounded-lg shadow-lg text-center border border-blue-900">
        <i class="fas fa-chart-line text-3xl text-blue-900"></i>
        <p class="text-sm font-bold text-blue-900">Yearly Energy</p>
        <p class="text-sm">{{ realTimeData.redExportedEnergy }} kWh</p>
        <p class="text-sm">41.56 kWh</p>
      </div>


    </div>


     <div class="flex justify-evenly space-x-4 mb-4">
        <!-- Small Card 5 (unchanged) -->
         <div class="px-[6vw] py-1 bg-yellow-300 rounded-xl shadow-lg text-center text-blue-900">
        <i class="fas fa-chart-line text-3xl text-blue-900"></i>
        <p class="text-sm font-bold text-blue-900">Total Energy</p>
        <p class="text-sm">{{ realTimeData.redExportedEnergy }} kWh</p>

      </div>
        <div class="px-[6vw] py-1 bg-green-400 rounded-lg shadow-lg text-white text-center border border-blue-900">
        <i class="fas fa-chart-line text-3xl "></i>
        <p class="text-sm font-bold ">Peak current</p>
        <p class="text-sm">{{peakCurrent[0] }} v</p>

      </div>
         <div class="px-[6vw] py-1 bg-blue-900 rounded-xl shadow-lg text-center text-white py-6">
        <i class="fas fa-chart-line text-3xl text-blue-900"></i>
        <p class="text-sm font-bold">Peak Power</p>
        <p class="text-sm">{{peakPower[0] }} W</p>

      </div>
     </div>


    <!-- Tables Section (unchanged) -->
    <div class="flex">
      <!-- First Table (unchanged) -->
      <div class="w-1/2 p-4">
        <table class="w-full border-collapse border">
          <!-- Table content -->
        </table>
      </div>

      <!-- Second Table (unchanged) -->
      <div class="w-1/2 p-4">
        <table class="w-full border-collapse border">

        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../../axios.js';

const realTimeData = ref({});

const peakCurrent = ref([]);
const peakPower = ref([]);


onMounted(async () => {
  try {

    const response = await axios.get('/realtime/data');
    realTimeData.value = response.data; // Update clients with the received data
//    totalItems.value = clients.value.length;
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {

  }
});


onMounted(async () => {
  try {

    const response = await axios.get('/power/peak');
    peakPower.value = response.data; // Update clients with the received data
    //    totalItems.value = clients.value.length;
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {

  }
});

onMounted(async () => {
  try {

    const response = await axios.get('/current/peak');
    peakCurrent.value = response.data; // Update clients with the received data
    //    totalItems.value = clients.value.length;
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {

  }
});

</script>
