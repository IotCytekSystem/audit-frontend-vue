<template>
  <div class="container mx-auto my-8 p-8 bg-white shadow-lg rounded-md">
   
     <div class="flex space-x-4 mb-4">
      <!-- Day Time Card -->
      <div class="flex-1 bg-blue-700 p-4 rounded-md text-white">
        <h3 class="text-lg font-semibold mb-2 text-center">Day Time (6AM-6PM)</h3>
        <p>Peak Power: {{ DayData.peakPower }}</p>
        <p>Peak Current: {{ DayData.peakCurrent }}</p>
        <p>Total Energy Consumption: {{ DayData.total }}</p>
      </div>

      <!-- Night Time Card -->
      <div class="flex-1 bg-purple-600 p-4 rounded-md text-white">
        <h3 class="text-lg font-semibold mb-2 text-center">Night Time (6PM-6AM)</h3>
        <p>Peak Power: {{ NightData.peakPower }}</p>
        <p>Peak Current: {{ NightData.peakCurrent }}</p>
        <p>Total Energy Consumption: {{ NightData.total}}</p>
      </div>
        <!-- Night Time Card -->
      <div class="flex-1 bg-green-500 p-4 rounded-md text-white">
        <h3 class="text-lg font-semibold mb-2 text-center">24 Hours (12:00 AM-12:00 AM)</h3>
        <p>Peak Power: {{FullDayData.peakPower }}</p>
        <p>Peak Current: {{ FullDayData.peakCurrent }}</p>
        <p>Total Energy Consumption: {{ FullDayData.total }}</p>
      </div>




    
      <div class="flex-1 bg-yellow-700 p-4 rounded-md text-white">
      <p class="text-center text-xl font-bold text-center">The Highest Since {{Duration?.date}} </p>
      <div class="flex">
     
      
     
      </div>
        <p>Highest Peak Power: {{ Duration?.peakPower }}</p>
        <p>Highest Peak Current: {{  Duration?.peakCurrent  }}</p>
        <p>Total Energy Consumption: {{FullDayData.total}}</p>
      </div>
    </div>
     <h2 class="text-2xl font-bold mb-4">Day Time, Night Time, and 24 hours Energy Consumption Analysis</h2>

    <!-- Date picker component -->
    <div class="flex space-x-3 mb-4">
      <DatePicker v-model="selectedDate" />
    </div>

    <!-- Table to display energy consumption data -->
    <div class="overflow-x-auto flex">
      <table class="min-w-full border border-gray-300">
        <!-- Table headers -->
        <thead>
          <tr class="bg-gray-200">
            <th class="py-2 px-4 text-start">Phases</th>
            <th class="py-2 px-4 text-start">Day Time Energy(6AM-6PM)</th>
            <th class="py-2 px-4 text-start">Night Time Energy (6PM-6AM)</th>
            <th class="py-2 px-4 text-start">24 Hours Energy (12:00 AM-12:00 AM)</th>
          </tr>
        </thead>
        <tbody>
          
          <tr>
       
            <td class="py-2 px-4 text-start">Red</td>
            <td class="py-2 px-4">{{ DayData.redPhase }}</td>
            <td class="py-2 px-4">{{NightData}}</td>
            <td class="py-2 px-4">{{ FullDayData.redPhase }}</td>
          </tr>
          <tr>
            <td class="py-2 px-4 text-start">Blue</td>
            <td class="py-2 px-4">{{ DayData.bluePhase }}</td>
            <td class="py-2 px-4">{{ NightData }}</td>
            <td class="py-2 px-4">{{ FullDayData.bluePhase }}</td>
          </tr>
          <tr>
            <td class="py-2 px-4 text-start">Yellow</td>
            <td class="py-2 px-4">{{ DayData.yellowPhase }}</td>
            <td class="py-2 px-4">{{NightData}}</td>
            <td class="py-2 px-4">{{FullDayData.yellowPhase}}</td>
          </tr>
           <tr>
            <td class="py-2 px-4 text-start">Total</td>
            <td class="py-2 px-4">{{ DayData.total }}</td>
            <td class="py-2 px-4">{{NightData}}</td>
            <td class="py-2 px-4">{{FullDayData.total}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue3-datepicker";
import { ref, onMounted, computed, watch } from 'vue';
import axios from '../../../axios';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';

export default {
  components: {
    DatePicker,
  },
  setup() {
    const route = useRoute();
    const userId = computed(() => Number(route.params.id));
    const meterId = ref(0);
    const selectedDate = ref(new Date());
    const FullDayData = ref([]);
    const DayData = ref([]);
    const NightData = ref([]);
    const Duration = ref({});



    onMounted(async () => {
      try {
        const response1 = await axios.get(`/meters/user/${userId.value}`);
        meterId.value = response1.data;
        console.log("meterId =", meterId.value);
      } catch (error) {
        console.error('Error fetching meterId:', error);
      }
    });

    const fetchDayTime = async () => {
      try {
        const formattedDate = format(selectedDate.value, 'yyyy-MM-dd');
        const response2 = await axios.get('/day-time-data', {
          params: {
            userId: userId.value,
            meterId: meterId.value,
            selectedDate: formattedDate,
          },
        });
        
        DayData.value = response2.data;
      } catch (error) {
        console.error('Error fetching day time data:', error);
      }
    };

    const fetchNightTime = async () => {
      try {
        const formattedDate = format(selectedDate.value, 'yyyy-MM-dd');
        const response3 = await axios.get('/night-time-data', {
          params: {
            userId: userId.value,
            meterId: meterId.value,
            selectedDate: formattedDate,
          },
        });
        
        NightData.value = response3.data;
      } catch (error) {
        console.error('Error fetching night time data:', error);
      }
    };

    const fetchFullDay = async () => {
      try {
        const formattedDate = format(selectedDate.value, 'yyyy-MM-dd');
        const response4 = await axios.get('/full-day-data', {
          params: {
            userId: userId.value,
            meterId: meterId.value,
            selectedDate: formattedDate,
          },
        });
        
        FullDayData.value = response4.data;
      } catch (error) {
        console.error('Error fetching full day data:', error);
      }
    };

      const fetchDuration = async () => {
      try {
      
        const response6 = await axios.get('/peak/power-and-duration', {
          params: {
            userId: userId.value,
            meterId: meterId.value,
           
          },
        });
        
Duration.value = response6.data;
        console.log("Duration="+Duration);
      } catch (error) {
        console.error('Error fetching full day data:', error);
      }
    };

    // Watch for changes in selectedDate and call fetchData
    watch(selectedDate, () => {
      fetchDayTime();
      fetchNightTime();
      fetchFullDay();
      fetchDuration();
    });

    return {
      userId,
      selectedDate,
      DayData,
      NightData,
      FullDayData,
      fetchDayTime,
      fetchNightTime,
      fetchFullDay,
      Duration,
    };
  },
};
</script>
