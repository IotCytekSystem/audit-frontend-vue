<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <div class="bg-green-100"><Nav /></div>

    <div class="flex">
      <div><DesktopSideBar /></div>
      <div class="flex-grow">
          <h2 class="text-2xl font-semibold mb-6 text-center">
          <i class="fas fa-plus-circle text-blue-500 mr-2"></i>Add Meter
          </h2>
        <div class="mx-auto">
          <table class="divide-y divide-gray-500 border border-1 border-gray-700 mx-2 my-2">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Serial Number</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">MAC Address</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Date Added</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Status</th>
                <!-- Add other meter fields here -->
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                  <input v-model="meter.serialNumber" type="text" class="form-input rounded" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                  <input v-model="meter.macAddress" type="text" class="form-input rounded" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                  <input v-model="meter.dateAdded" type="date" class="form-input rounded" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">
                  <select v-model="meter.status" class="form-select">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <!-- Add other meter fields here -->
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6 text-center">
          <button @click="saveMeter" class="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded ">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "../../../components/Nav.vue";
import DesktopSideBar from "../../../components/DesktopSideBar.vue";

const saveMeter = () => {
  // Implement the logic to save the edited meter data.
};

// You should have a prop "meter" passed to this component with the meter data to edit.
const meter = ref({
  serialNumber: "",
  macAddress: "",
  dateAdded: "",
  status: "Active",
  // Add other meter fields here
});
</script>
