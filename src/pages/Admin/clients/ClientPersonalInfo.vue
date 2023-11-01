<template>
  <div >
 
    <div class="flex">

    
<div class="flex flex-col w-full">
    <div class="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-8  w-full">

      <h2 class="text-2xl font-semibold">Client Details</h2>
      <div class="mt-4">
        <p class="mb-2">
          <i class="fas fa-user text-gray-500 mr-2"></i> <strong>Full Name:</strong> {{ client.fullName }}
        </p>
        <p class="mb-2">
          <i class="fas fa-phone text-gray-500 mr-2"></i> <strong>Phone Number:</strong> {{ client.phoneNumber }}
        </p>
        <p class="mb-2">
          <i class="fas fa-envelope text-gray-500 mr-2"></i> <strong>Email:</strong> {{ client.email }}
        </p>
        <p class="mb-2">
          <i class="fas fa-calendar-alt text-gray-500 mr-2"></i> <strong>Date Added:</strong> {{ client.dateAdded }}
        </p>
        <!-- Other client details -->
          <!-- Edit Button -->
    <div class="max-w-lg mx-auto text-center mt-8">
      <button @click="editClient" class="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
        <i class="fas fa-edit mr-2"></i>Edit Client
      </button>
    </div>
      </div>

    </div>
 </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { useRouter } from 'vue-router';


const route = useRouter();
const { id } = toRefs(route.params);

// You should have a prop "client" passed to this component with the specific client data to view.

const client = ref({
  // Replace with your actual client data
  fullName: "John Doe",
  phoneNumber: "123-456-7890",
  email: "johndoe@example.com",
  dateAdded: "2023-10-01",
  // Other client details
});

const editClient = () => {
 router.push(`/admin/clients/1`);
};
</script>
