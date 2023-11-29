<template>
  <div class="user-profile-container">
    <div v-if="user" class="user-details bg-white p-6 rounded-lg shadow-md">
      <div class="flex items-center mb-4">
        <div class="user-avatar text-gray-500 bg-gray-200 p-4 rounded-full">
          <i class="fas fa-user text-3xl"></i>
        </div>
        <div class="user-info ml-4">
          <p class="user-name text-2xl font-bold"><span></span><span>{{ user.name }}</span></p>
          <p class="user-email text-gray-600"><span class="font-bold px-1">Email:</span><span>{{ user.email }}</span></p>
         <p class="user-email text-gray-600"><span class="font-bold px-1">Phone Number:</span><span>{{ user.phone }}</span></p>
         <p class="user-email text-gray-600"><span class="font-bold px-1">Country:</span><span>{{ user.country }}</span></p>

         <p class="user-email text-gray-600"><span class="font-bold px-1">Location:</span><span>{{ user.town }}</span></p>

        </div>
      </div>

      <!-- Additional Fields and Meters Details -->
      <div class="additional-details mt-6">
      <p>Associated Meters</p>
        <div class="user-meter mb-4">
          <strong>Serial Number:</strong> {{ user.serialNumber }}
        </div>
        <div class="user-meter mb-4">
          <strong>MAC Address:</strong> {{ user.macAddress }}
        </div>
        <div class="user-meter mb-4">
          <strong>Current Transformer:</strong> {{ user.currentTransformer }}
        </div>
        <div class="user-meter">
          <strong>Date Added:</strong> {{ user.dateAdded }}
        </div>
        <!-- Add more meters or fields as needed... -->
      </div>
    </div>

    <div v-else>
      <div v-if="loadingUser" class="loading-spinner animate-spin rounded-full border-t-4 border-b-4 border-green-300 h-8 w-8"></div>
      <div v-else class="loading-spinner animate-spin rounded-full border-t-4 border-b-4 border-green-300 h-8 w-8"></div>
    </div>
  </div>
</template>

<style scoped>
.user-profile-container {
  max-width: 400px;
  margin: 0 auto;
}

.user-details {
  background-color: #ffffff;
}

.user-avatar {
  font-size: 24px;
}

.user-info {
  flex-grow: 1;
}

.user-name {
  font-size: 1.5rem;
}

.user-email {
  color: #555555;
}

.loading-spinner {
  @apply animate-spin rounded-full border-t-4 border-b-4 border-green-300 h-8 w-8;
}

.additional-details {
  margin-top: 20px;
}

.user-meter {
  font-size: 1rem;
}
</style>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from "../../../axios.js";
import { useRoute } from 'vue-router';

const route = useRoute();
const clientId = computed(() => route.params.id);
const user = ref(null);
const loadingUser = ref(true);

const fetchData = async () => {
  try {
    if (clientId.value) {
      console.log("Fetching user details for ID:", clientId.value);
      const userResponse = await axios.get(`/clients/${clientId.value}`);

      // Check if user data is available
      if (userResponse.data) {
        user.value = userResponse.data;
        loadingUser.value = false; // Stop the loader for user
        // Now fetch meter details using user's meterId
        await fetchMeterData(user.value.meters.data.id);
      } else {
        console.error("User data is undefined");
      }
    } else {
      console.error("ID is undefined");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const fetchMeterData = async (meterId) => {
  // Fetch meter details using the provided meterId
  try {
   
    const meterResponse = await axios.get(`/meters/${meterId}`);
   
  } catch (error) {
    console.error("Error fetching meter data:", error);
  }
};

// Watch for changes in the clientId and trigger fetchData accordingly
watch(() => clientId.value, (newId, oldId) => {
  fetchData();
});

// Fetch data on component mount
onMounted(fetchData);
</script>
