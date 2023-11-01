<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <div class="bg-green-100"><Nav /></div>

    <div class="flex">
      <div><DesktopSideBar /></div>
      <div class="">
        <h1 class="text-center text-lg font-bold text-white">Clients</h1>
        <div class="flex items-center space-x-2 mt-4 text-center">
          <!-- Search Input -->
          <input
            v-model="searchTerm"
            class="px-2 py-1 border rounded-md"
            placeholder="Search clients"
          />
          <!-- Sorting Dropdown -->
          <select v-model="sortKey" class="px-2 py-1 border rounded-md ">
            <option value="fullName">Sort by Name</option>
            <option value="phoneNumber">Sort by Phone</option>
            <option value="email">Sort by Email</option>
            <option value="associatedMeter">Sort by Meter</option>
          </select>
        </div>
        <!-- Center the Table -->
        <div class="mx-auto">
          <!-- Loading Indicator -->
          <div v-if="isLoading" class="text-center mt-4">
            <i class="fas fa-spinner fa-spin text-blue-900"></i> Loading...
          </div>
          <!-- Data Table -->
          <table v-else class="divide-y divide-gray-500 border border-1 border-gray-700 mx-2 my-2">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Full Name</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Phone Number</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Email</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">county</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Location</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Associated Meter</th>
                <th class="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedItems" :key="item.id">
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.phone }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.county }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.location }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-gray-900">{{ item.associatedMeter }}</td>
                <td class="px-6 py-4 whitespace-nowrap space-x-4">
                  <router-link
                    :to="{ name: 'ClientViewById', params: { id: item.id } }"
                    class="text-blue-500 hover:text-blue-800"
                  >
                    <i class="fas fa-eye"></i>
                  </router-link>
                  <button @click="editItem(item.id)" class="text-yellow-500 hover:text-yellow-800">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteItem(item.id)" class="text-red-500 hover:text-red-800">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Pagination -->
        <div class="mt-4" v-if="!isLoading">
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

const backendAPIUrl = '/clients';

const items = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const totalItems = ref(0);
const searchTerm = ref("");
const sortKey = ref("fullName");
const isLoading = ref(false);

const fetchClients = async () => {
  isLoading.value = true; // Set loading to true while fetching data
  try {
    const response = await axios.get(backendAPIUrl);
    items.value = response.data;
    totalItems.value = items.value.length;
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {
    isLoading.value = false; // Set loading to false when data is loaded or in case of an error
  }
};

onMounted(fetchClients);

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  let filteredItems = items.value;

  if (searchTerm.value) {
    const lowerSearchTerm = searchTerm.value.toLowerCase();
    filteredItems = filteredItems.filter((item) => {
      return (
        item.fullName.toLowerCase().includes(lowerSearchTerm) ||
        item.email.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }

  filteredItems = filteredItems.sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return -1;
    if (a[sortKey.value] > b[sortKey.value]) return 1;
    return 0;
  });

  const endIndex = startIndex + itemsPerPage;
  return filteredItems.slice(startIndex, endIndex);
});
</script>
