<template>
  <div class="bg-gray-800 p-4 flex justify-between items-center border-b">
    <div class="relative flex items-center space-x-3">
      <!-- Navigation Menu -->
      <ul class="flex space-x-6">
        <li>
          <router-link :to="{ name: 'info', params: { id: clientId } }">
            <span class="text-white hover:text-yellow-300">Info</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AdminClientOverview', params: { id: clientId } }">
            <span class="text-white hover:text-yellow-300">Overview</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AdminClientHistory', params: { id: clientId } }">
             <span class="text-white hover:text-yellow-300"> History Record</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AdminClientReport', params: { id: clientId } }">
             <span class="text-white hover:text-yellow-300">  Report Analysis</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Use computed property to get the client ID from the route params
const route = useRoute();
const clientId = computed(() => route.params.id);
</script>
