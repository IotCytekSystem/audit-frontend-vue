<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-center space-x-3 my-4">
      <router-link to="/admin/clients/22/history/table" class="text-blue-500 border px-2 py-1 rounded bg-green-500 text-white text-semibold hover:bg-green-300">Table</router-link>
       <router-link to="/admin/clients/22/history/day_vs_night" class="text-blue-500 border px-2 py-1 rounded bg-green-500 text-white text-semibold hover:bg-green-300">Analysis</router-link>
       <router-link to="/admin/clients/22/history/graphs" class="text-blue-500 border px-2 py-1 rounded bg-green-500 text-white text-semibold hover:bg-green-300">Graphs</router-link>
    </div>
    <div class="flex justify-center">
      <div class="w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { ref } from 'vue';
import Nav from '../../../components/Nav.vue';
import AdminClientNav from './AdminClientNav.vue';
import DesktopSideBar from '../../../components/DesktopSideBar.vue';
import Footer from '../../../components/Footer.vue';
import ClientPersonalInfo from './ClientPersonalInfo.vue';
import { useRouter } from 'vue-router';
</script>

<style scoped>
/* Add your custom styles here */
</style>
