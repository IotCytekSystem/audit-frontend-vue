<template>
  <nav class="w-64 h-screen bg-green-700 text-white">
    <ul class="py-4 space-y-4">
      <!-- ADMIN SECTION -->
      <li class="text-white">
        <router-link to="/admin/dashboard" class="sidebar-link">
        <div class="space-x-3">
         <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </div>
        
        </router-link>
      </li>
      <li class="group cursor-pointer">
        <a class="sidebar-link space-x-3" @click="toggleClientsMenu">
          <i class="fas fa-user"></i>
          <span>Clients</span>
          <i class="ml-auto" :class="{'fas fa-caret-up': isClientsMenuOpen, 'fas fa-caret-down': !isClientsMenuOpen}"></i>
        </a>
        <ul v-show="isClientsMenuOpen" class="ml-8 space-y-2">
          <li>
            <router-link to="/admin/add-client" class="sidebar-link space-x-3">
              <i class="fas fa-user-plus"></i>
              <span>Add Client</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/clients" class="sidebar-link space-x-3">
              <i class="fas fa-users"></i>
              <span>View Clients</span>
            </router-link>
          </li>
        </ul>
      </li>
      <li class="group cursor-pointer">
        <a class="sidebar-link space-x-3" @click="toggleMetersMenu">
      <i class="fas fa-tachometer-alt"></i>
          <span>Meters</span>
          <i class="ml-auto" :class="{'fas fa-caret-up': isMetersMenuOpen, 'fas fa-caret-down': !isMetersMenuOpen}"></i>
        </a>
        <ul v-show="isMetersMenuOpen" class="ml-8 space-y-2">
          <li>
            <router-link to="/admin/add-meter" class="sidebar-link space-x-3">
              <i class="fas fa-plus"></i>
              <span>Add Meters</span>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/meters" class="sidebar-link space-x-3">
              <i class="fas fa-eye"></i>
              <span>View Meters</span>
            </router-link>
          </li>
        </ul>
      </li>
      
      <!-- CORE SECTION -->
      <li class="text-white">
        <router-link to="/settings" class="sidebar-link space-x-3">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
        </router-link>
      </li>
      <li class="text-white">
        <router-link to="/admin/profile" class="sidebar-link space-x-3">
          <i class="fas fa-user-circle"></i>
          <span>Profile</span>
        </router-link>
      </li>
   
      <li class="text-white">
      
         
         <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700">
                <i class="fas fa-sign-out-alt"></i> Logout
              </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthStore } from "../stores/auth";
const authStore = useAuthStore();

const isClientsMenuOpen = ref(false);
const isMetersMenuOpen = ref(false);

function toggleClientsMenu() {
  isClientsMenuOpen.value = !isClientsMenuOpen.value;
}

function toggleMetersMenu() {
  isMetersMenuOpen.value = !isMetersMenuOpen.value;
}


const logout = () => {
  Swal.fire({
    title: 'Logout',
    text: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Logout',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // Call your logout function here
      authStore.handleLogout();
      Swal.fire('Logged Out', 'You have been successfully logged out.', 'success');
    }
  });
};
</script>



<style scoped>
.sidebar-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  text-decoration: none;
  transition: background-color 0.3s;
}

.sidebar-link:hover {
  background-color: #333;
}
</style>
