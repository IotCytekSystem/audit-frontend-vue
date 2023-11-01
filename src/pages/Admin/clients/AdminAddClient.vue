<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <div class="bg-green-100"><Nav /></div>

    <div class="flex">
      <div><DesktopSideBar /></div>
      <div class="flex-grow">
       <h2 class="text-2xl font-semibold mb-6 text-center">
          <i class="fas fa-plus-circle text-blue-500 mr-2"></i>Add Client
          </h2>
        <div class="mx-auto flex justify-center">
          <div class="w-1/2 px-4">
            <form @submit.prevent="addClient">
              <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold">Full Name:</label>
                <input v-model="newClient.fullName" type="text" class="form-input rounded" />
              </div>
              <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold">Phone Number:</label>
                <input v-model="newClient.phoneNumber" type="number" class="form-input rounded" />
              </div>
              <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold">Email:</label>
                <input v-model="newClient.email" type="email" class="form-input rounded" />
              </div>
            </form>
          </div>
          <div class="w-1/2 px-4">
          
            <div class="mt-4">
              <label class="block text-gray-700 text-sm font-bold">Location:</label>
              <input v-model="newClient.location" type="text" class="form-input rounded" />
            </div>
              <div class="mt-4">
              <label class="block text-gray-700 text-sm font-bold">County:</label>
              <select v-model="newClient.county" class="form-select">
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Kisumu">Kisumu</option>
                <option value="Nakuru">Nakuru</option>
                <option value="Eldoret">Eldoret</option>
                <option value="Nyeri">Nyeri</option>
                <option value="Thika">Thika</option>
                <option value="Kisii">Kisii</option>
                <!-- Add more counties here -->
              </select>
            </div>
            <div class="mt-4">
              <label class="block text-gray-700 text-sm font-bold">Associated Meter:</label>
              <select v-model="newClient.associatedMeter" class="form-select">
                <!-- Replace with your meter options -->
                <option value="Meter 1">Meter 1</option>
                <option value="Meter 2">Meter 2</option>
              </select>
            </div>
            <!-- Other client fields go here -->
          </div>
        </div>
        <div class="text-center mt-6">
          <button type="submit" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
            <i class="fas fa-check text-white mr-2"></i>Add Client
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "../../../components/Nav.vue";
import DesktopSideBar from "../../../components/DesktopSideBar.vue";

const newClient = ref({
  fullName: "",
  phoneNumber: "",
  email: "",
  county: "Nairobi",
  location: "",
  associatedMeter: "Meter 1",
  // Other client fields
});

const addClient = () => {
  // Implement the logic to add the new client to your data
};
</script>
