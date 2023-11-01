<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <div class="bg-green-100"><Nav /></div>

    <div class="flex">
      <div><DesktopSideBar /></div>
      <div class="">
        <h1 class="text-center text-lg font-bold text-white">Meters</h1>
        <div class="flex items-center space-x-2 mt-4 text-center">
          <!-- Search Input -->
          <input
            v-model="searchTerm"
            class="px-2 py-1 border rounded-md"
            placeholder="Search meters"
          />
          <!-- Sorting Dropdown -->
          <select v-model="sortKey" class="px-2 py-1 border rounded-md">
            <option value="serialNumber">Sort by Serial Number</option>
            <option value="macAddress">Sort by MAC Address</option>
            <option value="dateAdded">Sort by Date Added</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <!-- Center the Table -->
        <div class="mx-auto">
          <table class="divide-y divide-gray-500 border border-1 border-gray-700 mx-2 my-2">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Serial Number</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">MAC Address</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Date Added</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Status</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody v-if="loading">
              <tr>
                <td colspan="5" class="text-center">Loading...</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr v-for="item in paginatedItems" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.serialNumber }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.macAddress }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.dateAdded }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.status }}</td>
                <td class="px-6 py-4 whitespace-nowrap space-x-3">
                  <button @click="editItem(item)" class="text-yellow-500 hover:text-yellow-800">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteItem(item)" class="text-red-500 hover:text-red-800">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="mt-4">
          <pagination :total-items="totalItems" :items-per-page="itemsPerPage" v-model="currentPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from '../../../axios.js';
import Nav from "../../../components/Nav.vue";
import DesktopSideBar from "../../../components/DesktopSideBar.vue";

const backendAPIUrl = '/meters';

const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const totalItems = ref(0);
const searchTerm = ref("");
const sortKey = ref("serialNumber");
const loading = ref(true); // Initialize loading to true

const fetchMeters = async () => {
  try {
    const response = await axios.get(backendAPIUrl);
    items.value = response.data;
    totalItems.value = items.value.length;
    loading.value = false; // Set loading to false after data is loaded
  } catch (error) {
    console.error('Error fetching meter data:', error);
    loading.value = false; // Set loading to false in case of an error
  }
};

onMounted(fetchMeters);

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  let filteredItems = items.value;

  // Apply search filter
  if (searchTerm.value) {
    const lowerSearchTerm = searchTerm.value.toLowerCase();
    filteredItems = filteredItems.filter((item) => {
      return (
        item.serialNumber.toLowerCase().includes(lowerSearchTerm) ||
        item.macAddress.toLowerCase().includes(lowerSearchTerm) ||
        item.dateAdded.toLowerCase().includes(lowerSearchTerm) ||
        item.status.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }

  // Apply sorting
  filteredItems = filteredItems.sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return -1;
    if (a[sortKey.value] > b[sortKey.value]) return 1;
    return 0;
  });

  const endIndex = startIndex + itemsPerPage;
  return filteredItems.slice(startIndex, endIndex);
});
</script>
