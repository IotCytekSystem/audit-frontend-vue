<template>
  <div class="flex flex-col">
    <div>
      <Nav />
    </div>
    

    <div class="flex">
      <div>
        <DesktopSidebar />
      </div>

      <div class="container mx-auto mt-8">
        <DashboardSummary />
        <div v-if="role === 'ADMIN'" class="mt-8 mx-2 my-3 rounded border border-1 border-gray-400 p-5">
    <h2 class="text-2xl font-semibold text-center text-gray-900">New Users Pending Approval</h2>
    <table class="w-full mx-auto mt-4">
      <thead>
        <tr>
          <th class="text-center text-gray-900 text-lg font-bold">First Name</th>
          <th class="text-center text-gray-900 text-lg font-bold">Last Name</th>
          <th class="text-center text-gray-900 text-lg font-bold">Email</th>
          <th class="text-center text-gray-900 text-lg font-bold">Phone</th>
          <th class="text-center text-gray-900 text-lg font-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in clients" :key="user.id" class="border-t border-gray-400">
          <td class="text-center text-gray-900 font-semibold">{{ user.firstname }}</td>
          <td class="text-center text-gray-900 font-semibold">{{ user.lastname }}</td>
          <td class="text-center text-gray-900 font-semibold">{{ user.email }}</td>
          <td class="text-center text-gray-900 font-semibold">{{ user.phone }}</td>
          <td class="text-center text-gray-900 font-semibold">
            <button @click="approveUser(user.id)" class="bg-green-500 text-white px-3 py-1 mx-2 my-1 rounded">
              <i class="fas fa-check"></i> Approve
            </button>
            <button @click="rejectUser(user.id)" class="bg-red-600 text-white px-3 py-1 mx-2 rounded">
              <i class="fas fa-times"></i> Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
      
        <div class="flex justify-center my-10">
          <ClientGrowthChart />
        </div>
      </div>
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import DesktopSidebar from '../../components/DesktopSideBar.vue';
import ClientGrowthChart from '../../components/ClientGrowthChart.vue';
import Nav from '../../components/Nav.vue';
import Footer from '../../components/Footer.vue';
import DashboardSummary from "./DashboardSummary.vue";
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useAuthStore } from "../../stores/auth";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const authStore = useAuthStore();

const role = authStore.user.role;
const clients = ref([]);
const loading = ref(false);
const totalUsers = ref(0);

const approveUser = async (userId) => {
  try {
    // Display a confirmation dialog using SweetAlert
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to approve this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!'
    });

    // If the user clicks the confirm button
    if (isConfirmed.isConfirmed) {
      // Call the backend API to approve the user
      await axios.post(`/subadmins/approve/${userId}`);
      
      // Update the clients.value after approval
      clients.value = clients.value.filter(user => user.id !== userId);

      // Display a success message
      Swal.fire('Approved!', 'The user has been approved.', 'success');
    } else {
      // Display a message if the user cancels the action
      Swal.fire('Action Canceled', 'The user approval has been canceled.', 'info');
    }
  } catch (error) {
    console.error('Error approving user:', error);
    // Handle errors or provide user feedback
    Swal.fire('Error', 'An error occurred while approving the user.', 'error');
  }
};

const rejectUser = async (userId) => {
  try {
    // Display a confirmation dialog using SweetAlert
    const isConfirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to reject this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Reject'
    });

    // If the user clicks the confirm button
    if (isConfirmed.isConfirmed) {
      // Call the backend API to reject the user
      await axios.post(`/subadmins/reject/{userId}`);
      
      // Update the clients.value after rejection
      clients.value = clients.value.filter(user => user.id !== userId);

      // Display a success message
      Swal.fire('Rejected!', 'The user has been rejected.', 'success');
    } else {
      // Display a message if the user cancels the action
      Swal.fire('Action Canceled', 'The user rejection has been canceled.', 'info');
    }
  } catch (error) {
    console.error('Error rejecting user:', error);
    // Handle errors or provide user feedback
    Swal.fire('Error', 'An error occurred while rejecting the user.', 'error');
  }
};





onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get('/subadmins/pending');
    clients.value = response.data;
     totalUsers.value = clients.value.length; 
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {
    loading.value = false;
  }
});
</script>
