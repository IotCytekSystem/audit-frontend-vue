<template>
  <div class="bg-green-700 p-4 flex justify-between items-center border-b">
    <!-- Company Logo -->
    <div class="flex items-center">
      <i class="fas fa-building text-white text-xl mr-2"></i>
      <a href="/admin/dashboard" class="text-white text-xl font-bold">Cytek logo</a>
    </div>

    <!-- User Menu and Bell Icon (Right-aligned) -->
    <div class="relative flex items-center space-x-3">
 <!-- Bell Icon -->
      <div class="relative">
        <i @click="toggleNotifications" class="fas fa-bell text-white text-2xl cursor-pointer hover:text-yellow-300"></i>
        <!-- Notification Dropdown (Right-aligned) -->
        <div v-if="showNotifications" @click="toggleNotifications" class="absolute right-0 mt-8 w-64 bg-yellow-600 shadow-lg rounded-lg p-2 z-10">
          <!-- Notifications go here -->
          <!-- Example: <div class="py-2">New notification</div> -->
        </div>
      </div>
      <!-- User Menu -->
      <div class="relative mr-4">
        <i @click="toggleUserMenu" class="fas fa-user-circle text-white text-2xl cursor-pointer hover:text-yellow-300"></i>
        <!-- User Menu Dropdown (Right-aligned) -->
        <div v-if="showUserMenu" @click="toggleUserMenu" class="absolute right-0 mt-8 w-48 bg-white shadow-lg rounded-lg p-2 z-10">
          <a href="/admin/profile" class="block py-2 hover:bg-gray-100">Profile</a>
          <a href="/settings" class="block py-2 hover:bg-gray-100">Settings</a>
          <a href="/logout" class="block py-2 hover:bg-gray-100">Logout</a>
        </div>
      </div>

     
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const showNotifications = ref(false);
const showUserMenu = ref(false);

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  showUserMenu.value = false;
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
  showNotifications.value = false;
};
</script>
