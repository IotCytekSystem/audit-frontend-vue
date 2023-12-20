<template>
  <div class="container mx-auto my-8 p-8 bg-white shadow-lg rounded-md">
    <h2 class="text-2xl font-bold mb-4">History Records</h2>

    <div class="flex space-x-3">
      <div class="mb-4 rounded">
        <DatePicker v-model="selectedDate" :disabled-dates="disabledDates" />
      </div>

       <button @click="exportToExcel" class="bg-blue-500 text-white px-4 py-2 rounded">
      Export to Excel
    </button>
    </div>

    <div class="overflow-x-auto ">
      <p class="text-center rounded bg-green-500 py-2 my-2 text-white font-bold">Red Phase </p>
     <table class="min-w-full border border-gray-300">

        <thead>
          <tr class="bg-gray-200">
            
            <th class="py-2 px-4">Voltage</th>
            <th class="py-2 px-4">Current</th>
            <th class="py-2 px-4">Power</th>
            <th class="py-2 px-4">Power Consumption</th>
            <th class="py-2 px-4">Exported Energy</th>
          
            <th class="py-2 px-4">Last Updated Date</th>
            <th class="py-2 px-4">Last Updated Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dataRow in results" :key="dataRow.id">
            
            <td class="py-2 px-4">{{ dataRow.redVoltage }}</td>
            <td class="py-2 px-4">{{ dataRow.redCurrent }}</td>
            <td class="py-2 px-4">{{ dataRow.redPower }}</td>
            <td class="py-2 px-4">{{ dataRow.redPowerConsumption }}</td>
            <td class="py-2 px-4">{{ dataRow.redExportedEnergy }}</td>
           
            <td class="py-2 px-4">{{ dataRow.date }}</td>
            <td class="py-2 px-4">{{ dataRow.time }}</td>
          </tr>
          <!-- Repeat the above row structure for 'Yellow' and 'Blue' phases if needed -->
        </tbody>
      </table>



      <p class="text-center rounded bg-green-500 py-2 my-2 text-white font-bold">Blue Phase</p>
      <table class="min-w-full border border-gray-300">
      
        <!-- Table headers -->
        <thead>
          <tr class="bg-gray-200">
            
            <th class="py-2 px-4">Voltage</th>
            <th class="py-2 px-4">Current</th>
            <th class="py-2 px-4">Power</th>
            <th class="py-2 px-4">Power Consumption</th>
            <th class="py-2 px-4">Exported Energy</th>
     
            <th class="py-2 px-4">Last Updated Date</th>
            <th class="py-2 px-4">Last Updated Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dataRow in results" :key="dataRow.id">
            
            <td class="py-2 px-4">{{ dataRow.blueVoltage }}</td>
            <td class="py-2 px-4">{{ dataRow.blueCurrent }}</td>
            <td class="py-2 px-4">{{ dataRow.bluePower }}</td>
            <td class="py-2 px-4">{{ dataRow.bluePowerConsumption }}</td>
            <td class="py-2 px-4">{{ dataRow.blueExportedEnergy }}</td>
           
            <td class="py-2 px-4">{{ dataRow.date }}</td>
            <td class="py-2 px-4">{{ dataRow.time }}</td>
          </tr>
          <!-- Repeat the above row structure for 'Yellow' and 'Blue' phases if needed -->
        </tbody>
      </table>



      

      <p class="text-center rounded bg-green-500 py-2 my-2 text-white font-bold">Yellow Phase</p>
      <table class="min-w-full border border-gray-300">
      
        <!-- Table headers -->
        <thead>
          <tr class="bg-gray-200">
            
            <th class="py-2 px-4">Voltage</th>
            <th class="py-2 px-4">Current</th>
            <th class="py-2 px-4">Power</th>
            <th class="py-2 px-4">Power Consumption</th>
            <th class="py-2 px-4">Exported Energy</th>
        
            <th class="py-2 px-4">Last Updated Date</th>
            <th class="py-2 px-4">Last Updated Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dataRow in results" :key="dataRow.id">
            
            <td class="py-2 px-4">{{ dataRow.yellowVoltage }}</td>
            <td class="py-2 px-4">{{ dataRow.yellowCurrent }}</td>
            <td class="py-2 px-4">{{ dataRow.yellowPower }}</td>
            <td class="py-2 px-4">{{ dataRow.yellowPowerConsumption }}</td>
            <td class="py-2 px-4">{{ dataRow.yellowExportedEnergy }}</td>
          
          
            <td class="py-2 px-4">{{ dataRow.date }}</td>
            <td class="py-2 px-4">{{ dataRow.time }}</td>
          </tr>
          <!-- Repeat the above row structure for 'Yellow' and 'Blue' phases if needed -->
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue';
import axios from '../../../axios';
import { useRoute } from 'vue-router';
import DatePicker from "vue3-datepicker";
import { format, addDays } from 'date-fns';
import * as XLSX from 'xlsx';

const route = useRoute();
const userId = computed(() => Number(route.params.id));
const meterId = ref(0);
const selectedDate = ref(new Date());
const results = ref([]);

// Compute disabledDates to disable future dates
const disabledDates = computed(() => {
  const today = new Date();
  return { to: addDays(today, 1) }; // Disable dates starting from tomorrow
});

onMounted(async () => {
  try {
    const response1 = await axios.get(`/meters/user/${userId.value}`);
    meterId.value = response1.data;
    console.log("meterId =", meterId.value);
  } catch (error) {
    console.error('Error fetching meterId:', error);
  }
});

const fetchData = async () => {
  try {
    const formattedDate = format(selectedDate.value, 'yyyy-MM-dd');
    const response5 = await axios.get('/selected', {
      params: {
        userId: userId.value,
        meterId: meterId.value,
        selectedDate: formattedDate,
      },
    });

    results.value = response5.data;
    console.log("results obtained =", results.value);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Dynamically set the disabledDates property using watchEffect
watchEffect(() => {
  DatePicker.props['disabled-dates'] = disabledDates.value;
});

// Call fetchData on selectedDate change
watchEffect(() => {
  fetchData();
});



const exportToExcel = () => {
  try {
    // Ensure results is not empty before exporting
    if (results.value.length === 0) {
      console.warn('No data to export');
      return;
    }

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert each table to a worksheet
    const sheets = {
      RedPhase: XLSX.utils.json_to_sheet(results.value.map(row => ({
        Voltage: row.redVoltage,
        Current: row.redCurrent,
        Power: row.redPower,
        // ... add other fields as needed
        Date: row.date,
        Time: row.time,
      }))),
      BluePhase: XLSX.utils.json_to_sheet(results.value.map(row => ({
        Voltage: row.blueVoltage,
        Current: row.blueCurrent,
        Power: row.bluePower,
        // ... add other fields as needed
        Date: row.date,
        Time: row.time,
      }))),
      YellowPhase: XLSX.utils.json_to_sheet(results.value.map(row => ({
        Voltage: row.yellowVoltage,
        Current: row.yellowCurrent,
        Power: row.yellowPower,
        // ... add other fields as needed
        Date: row.date,
        Time: row.time,
      }))),
    };

    // Add each sheet to the workbook
    XLSX.utils.book_append_sheet(workbook, sheets.RedPhase, 'RedPhase');
    XLSX.utils.book_append_sheet(workbook, sheets.BluePhase, 'BluePhase');
    XLSX.utils.book_append_sheet(workbook, sheets.YellowPhase, 'YellowPhase');

    // Save the workbook and trigger download
    XLSX.writeFile(workbook, 'exported_data.xlsx');
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
};

</script>
