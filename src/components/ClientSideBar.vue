<template>
  <nav class="w-64 h-screen bg-green-500 text-white">
  <p class="text-center">Welcome <span class="font-semibold text-blue-400 px-2">{{name}}</span></p>
    <ul class="py-4 space-y-4">
      <!-- ADMIN SECTION -->
      <li class="text-white">
        <router-link to="/client/dashboard" class="sidebar-link">
        <div class="space-x-3">
         <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </div>
        
        </router-link>
      </li>
         <li>
            <router-link to="/client/meters" class="sidebar-link space-x-3">
            <i class="fas fa-tachometer-alt"></i>
              <span>My Meters</span>
            </router-link>
          </li>
      <li>
          <router-link to="/client/clients" class="sidebar-link space-x-3">
              <i class="fas fa-users"></i>
              <span>Reports</span>
          </router-link>
     </li>
    
      
      <!-- CORE SECTION -->
            <li class="text-white">
        <router-link to="/client/profile" class="sidebar-link space-x-3">
          <i class="fas fa-user-circle"></i>
          <span>Profile</span>
        </router-link>
      </li>
      <li class="text-white">
        <router-link to="/settings" class="sidebar-link space-x-3">
          <i class="fas fa-cog"></i>
          <span>Settings</span>
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
const name=authStore.user.firstname;

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
