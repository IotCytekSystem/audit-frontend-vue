<template>
 <h1 class="text-center font-bold text-3xl text-blue-900">Client Informations</h1>
  <div class="min-h-screen flex flex-col space-y-1 items-center justify-center bg-gray-100">
    <div v-if="user" class="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
      <div class="flex items-center">
        <div class="bg-blue-500 p-4 rounded-full">
          <i class="fas fa-user text-4xl text-white"></i>
        </div>
        <div class="ml-6">
          <p class="text-2xl font-bold text-gray-800">{{ user.firstname }} {{ user.lastname }}</p>
          <p class="text-gray-600"><strong>Email:</strong> {{ user.email }}</p>
          <p class="text-gray-600"><strong>Contact:</strong> {{ user.phone }}</p>
          <p class="text-gray-600"><strong>Location:</strong> {{ user.location }}</p>
          <p class="text-gray-600"><strong>Town:</strong> {{ user.town }}</p>
          <p class="text-gray-600"><strong>Status:</strong> {{ user.userStatus }}</p>
          <p class="text-gray-600"><strong>Active since:</strong> {{ user.registrationDateTime }}</p>
        </div>
      </div>
    </div>

      <div v-if="user" class="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
      <div class="flex items-center">
      
        <div class="ml-6 ">
          <p class="text-xl  font-semibold text-gray-800">Smart Meter installed for<span class="text-2xl font-bold text-gray-800 mx-1"> {{ user.firstname }}</span> </p>
          <p class="text-gray-600"><span>Mac Address:</span> <strong> {{meter.macAddress }}</strong></p>
          <p class="text-gray-600"><span>Serial Number:</span><strong> {{meter.serialNumber }}</strong></p>
          <p class="text-gray-600"><span>Meter Type:</span> <strong> {{meter.meterType }}</strong></p>
          <p class="text-gray-600"><span>Meter Current Transformer:</span> <strong> {{meter.meterCT }}</strong></p>
          <p class="text-gray-600"><span>Status:</span> <strong> {{meter.meterStatus }}</strong></p>
          <p class="text-gray-600"><span>Date Added:</span><strong> {{meter.dateTimeAdded }}</strong></p>
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="loadingUser" class="animate-spin rounded-full border-t-4 border-b-4 border-blue-300 h-8 w-8"></div>
      <div v-else class="text-red-500">Error loading user data</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from 'vue';
import axios from '../../../axios.js';
import { useRoute } from 'vue-router';

const route = useRoute();
const userId = ref(null);
const meter = ref({});
const user = ref({});
const loadingUser = ref(true);

// Use a computed property for userId
const computedUserId = computed(() => {
  return Number(route.params.id);
});

// Initialize userId with computed value
userId.value = computedUserId.value;

// Log the userId value
console.log("user id =", userId.value);

const fetchUserData = async () => {
  try {
    // Fetch user data
    const responseUser = await axios.get(`/clients/${userId.value}`);
    user.value = responseUser.data;

    // Fetch meter data using the user's meterId
    const responseMeter = await axios.get(`/meters/${user.value.meterId}`);
    meter.value = responseMeter.data;

    loadingUser.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loadingUser.value = false;
  }
};

onMounted(fetchUserData);

// Watch for changes in userId and re-fetch data
watch(computedUserId, () => {
  loadingUser.value = true;
  fetchUserData();
});

</script>

