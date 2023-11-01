<template>
  <div class="bg-gray-800 p-4 flex justify-between items-center border-b">
    <div class="relative flex items-center space-x-3">
      <!-- Navigation Menu -->
      <ul class="flex space-x-6">
      
       <li><router-link to="/overview" class="text-white font-medium hover:text-yellow-300">Info</router-link></li>
        <li><router-link :to="{ name: 'AdminClientOverview', params: { id: $route.params.id } }"><span class="text-white hover:text-yellow-300">Overview</span></router-link></li>
        <li><router-link to="/history" class="text-white font-medium hover:text-yellow-300">History Record</router-link></li>
        <li><router-link to="/report" class="text-white font-medium hover:text-yellow-300">Report Analysis</router-link></li>
      </ul>
    </div>
  </div>
</template>
