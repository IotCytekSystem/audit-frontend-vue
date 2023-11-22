<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <div class="bg-green-500 text-white p-4">
      <Nav />
    </div>

    <div class="flex">
      <div class="w-1/4 p-4">
        <DesktopSideBar />
      </div>
      <div class="w-3/4 p-4">
        <button @click="openModal" class="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
          Add Meter
        </button>

        <h1 class="text-2xl font-semibold text-blue-900 mt-4">Meters</h1>
        <div class="flex items-center space-x-4 mt-4">
          <input
            v-model="searchTerm"
            class="px-4 py-2 border rounded-md"
            placeholder="Search meters"
          />
          <select v-model="sortKey" class="px-4 py-2 border rounded-md">
            <option value="serialNumber">Sort by Serial Number</option>
            <option value="macAddress">Sort by MAC Address</option>
            <option value="dateAdded">Sort by Date Added</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full divide-y divide-gray-500 border border-1 border-gray-700">
            <thead>
              <tr>
                <th class="px-4 py-2">Serial Number</th>
                <th class="px-4 py-2">MAC Address</th>
                <th class="px-4 py-2">Date Added</th>
                <th class="px-4 py-2">Status</th>
                <th class="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedItems" :key="item.id">
                <td class="px-4 py-2">{{ item.serialNumber }}</td>
                <td class="px-4 py-2">{{ item.macAddress }}</td>
                <td class="px-4 py-2">{{ item.dateAdded }}</td>
                <td class="px-4 py-2">{{ item.status }}</td>
                <td class="px-4 py-2">
                  <button @click="editItem(item)" class="text-blue-500">Edit</button>
                  <button @click="deleteItem(item)" class="text-red-500">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4">
          <pagination :total-items="totalItems" :items-per-page="itemsPerPage" v-model="currentPage" />
        </div>
      </div>
    </div>

<div v-if="showModal" class="modal">
  <div class="modal-content bg-white p-8 rounded-md">
    <h2 class="text-2xl font-semibold mb-4">Add Meter</h2>
    <form @submit.prevent="addMeter" class="space-y-4">
      <input v-model="newMeter.serialNumber" type="text" placeholder="Serial Number" class="w-full px-4 py-2 border rounded-md" />
      <input v-model="newMeter.macAddress" type="text" placeholder="MAC Address" class="w-full px-4 py-2 border rounded-md" />

      <!-- Dropdown for CT selection -->
      <div class="relative">
        <label for="ctSelection" class="block font-medium">CT (Current Transformer)</label>
        <select v-model="newMeter.ct" id="ctSelection" class="w-full px-4 py-2 border rounded-md">
          <option value="1">150A</option>
          <option value="2">250A</option>
          <option value="3">500A</option>
        </select>
      </div>

      <!-- Dropdown for Meter Type selection -->
      <div class="relative">
        <label for="meterTypeSelection" class="block font-medium">Meter Type</label>
        <select v-model="newMeter.meterType" id="meterTypeSelection" class="w-full px-4 py-2 border rounded-md">
          <option value="single-phase">Single Phase</option>
          <option value="three-phase">Three Phase</option>
        </select>
      </div>

      <!-- Add more input fields as needed for your meter data -->
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-md">Save</button>
    </form>
    <button @click="closeModal" class="mt-4 text-red-500">Close</button>
  </div>
</div>


      <div v-if="showEditModal" class="modal">
    <div class="modal-content bg-white p-8 rounded-md">
      <h2 class="text-2xl font-semibold mb-4">{{ editModalTitle }}</h2>
      <form @submit.prevent="saveMeter" class="space-y-4">
        <input v-model="editMeterData.serialNumber" type="text" placeholder="Serial Number" class="w-full px-4 py-2 border rounded-md" />
        <input v-model="editMeterData.macAddress" type="text" placeholder="MAC Address" class="w-full px-4 py-2 border rounded-md" />
        <!-- Add more input fields as needed for your meter data -->
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">{{ saveButtonText }}</button>
      </form>
      <button @click="closeEditModal" class="mt-4 text-red-500">Close</button>
    </div>
  </div>
  </div>
</template>

<!-- The rest of your code remains the same -->


<script setup>
import Nav from "../../../components/Nav.vue";
import DesktopSideBar from "../../../components/DesktopSideBar.vue";

import { ref, computed } from 'vue';

// Data property to control the visibility of the modal form
const showModal = ref(false);

// Method to open the modal form
const openModal = () => {
  showModal.value = true;
};

// Method to close the modal form
const closeModal = () => {
  showModal.value = false;
};

// Data property to store the new meter data
const newMeter = ref({
  serialNumber: '',
  macAddress: ''
  // Add more properties for meter data as needed
});

// Data property to store the list of meters (example data)
const meters = ref([
  {
    id: 1,
    serialNumber: 'Meter-001',
    macAddress: '00:11:22:33:44:55',
    dateAdded: '2023-01-01',
    status: 'Active'
  },
  {
    id: 2,
    serialNumber: 'Meter-002',
    macAddress: '00:AA:BB:CC:DD:EE',
    dateAdded: '2023-02-01',
    status: 'Inactive'
  }
]);

// Other data and methods you have in your component
const searchTerm = ref('');
const sortKey = ref('serialNumber');
const loading = ref(false);
const totalItems = ref(meters.value.length);
const itemsPerPage = ref(10);
const currentPage = ref(1);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return meters.value.slice(start, end);
});

const editItem = (item) => {
  // Implement your edit logic here
};

const deleteItem = (item) => {
  // Implement your delete logic here
};

// Method to add a new meter
const addMeter = () => {
  // Assign a unique ID to the new meter
  const newMeterId = meters.value.length + 1;
  newMeter.value.id = newMeterId;

  // Add the new meter to the list
  meters.value.push({ ...newMeter.value });

  // Clear the form
  newMeter.value = {
    serialNumber: '',
    macAddress: ''
    // Clear other properties as needed
  };

  // Close the modal
  closeModal();
  // Update total items and reset pagination
  totalItems.value = meters.value.length;
  currentPage.value = 1;
};


// Data property to control the visibility of the edit modal form
const showEditModal = ref(false);

// Data property to store the meter data being edited
const editMeterData = ref({
  id: null,
  serialNumber: '',
  macAddress: ''
  // Add more properties for meter data as needed
});

// Data property to indicate whether the modal is in "Add" or "Edit" mode
const isEditing = ref(false);

// Method to open the edit modal for a meter
const editMeter = (item) => {
  editMeterData.value = { ...item };
  isEditing.value = true;
  showEditModal.value = true;
};

// Method to close the edit modal
const closeEditModal = () => {
  isEditing.value = false;
  showEditModal.value = false;
};

// Method to save changes when editing or adding a meter
const saveMeter = () => {
  if (isEditing.value) {
    // Handle edit logic here
  } else {
    // Handle add logic here
  }

  // Close the edit modal
  closeEditModal();
};
</script>

<style scoped>
/* Add your CSS styles for the modal and other components here */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* You can add more styles as needed */
</style>
