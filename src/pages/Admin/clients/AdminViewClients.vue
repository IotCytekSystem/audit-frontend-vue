<template>
  <div class="h-screen bg-gray-100 flex flex-col">
    <div class="bg-green-500 text-white p-4">
      <Nav />
    </div>

    <div class="flex">
      <div class="w-1/4 p-4">
        <DesktopSideBar />
      </div>
      <div class="w-3/4 p-4">
        <button @click="openModal" class="bg-green-500 text-white px-1 py-2 rounded-md mt-4">
          <i class="fas fa-plus"></i> Add Client
        </button>

        <h1 class="text-2xl font-semibold text-blue-900 mt-4">Clients</h1>
        <div class="flex items-center space-x-4 mt-4">
          <input
            v-model="searchTerm"
            class="px-1 py-2 border rounded-md"
            placeholder="Search clients"
          />
          <select v-model="sortKey" class="px-1 py-2 border rounded-md">
            <option value="fullName">Sort by Name</option>
            <option value="phoneNumber">Sort by Phone</option>
            <option value="email">Sort by Email</option>
            <option value="associatedMeter">Sort by Meter</option>
          </select>
        </div>
        <div class="mt-4 overflow-x-auto">
          <table class="w-full divide-y divide-gray-500 border border-1 border-gray-700">
            <thead>
              <tr>
                <th class="px-1 py-2 text-start">Full Name</th>
                <th class="px-1 py-2 text-start">Contact</th>
                <th class="px-1 py-2 text-start">Email</th>
                <th class="px-1 py-2 text-start">Country</th>
                <th class="px-1 py-2 text-start">Town</th>
                <th class="px-1 py-2 text-start">Location</th>
               
                 <th v-if="role=ADMIN" class="px-1 py-2 text-start">Added By</th>
                <th class="px-1 py-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedItems" :key="item.id">
                <td class="px-1 py-2">{{ item.firstname }}  {{ item.lastname }}</td>
                <td class="px-1 py-2">{{ item.phone }}</td>
                <td class="px-1 py-2">{{ item.email }}</td>
                <td class="px-1 py-2">{{ item.country }}</td>
                <td class="px-1 py-2">{{ item.town }}</td>
                <td class="px-1 py-2">{{ item.location }}</td>
                <td class="px-2 py-2">
     <button @click="viewClientInfo(item.id)" class="text-green-500">
   
      <i class="fas fa-eye"></i>
    </button>
   <button v-if="isAdmin" @click="openUserModal(item.id)" class="text-blue-600">
  
  <i class="fas fa-edit"></i>
</button>

     <button v-if="isAdmin" @click="deleteItem(item.id)" class="text-red-600">
     <i class="fas fa-trash-alt "></i>
     </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 bg-red-600">
          <pagination :total-items="totalItems" :items-per-page="itemsPerPage" v-model="currentPage" />
        </div>
      </div>
    </div>


    <!--ADD NEW CLIENT-->
    <div v-if="showModal" class="modal">
      <div class="modal-content bg-white p-2 rounded-md">
        <h2 class="text-2xl font-semibold mb-4">Add Client</h2>
        <form @submit.prevent="addClient" class="space-y-2">
          <input v-model="newClient.firstname" type="text" placeholder="First Name" class="w-full px-2 py-1 border rounded-md" />
          <input v-model="newClient.lastname" type="text" placeholder="Last Name" class="w-full px-2 py-1 border rounded-md" />
          <input v-model="newClient.phone" type="text" placeholder="Phone Number" class="w-full px-2 py-1 border rounded-md" />
          <input v-model="newClient.email" type="text" placeholder="Email" class="w-full px-2 py-1 border rounded-md" />

          <input v-model="newClient.county" type="text" placeholder="Country" class="w-full px-2 py-1 border rounded-md" />

           <input v-model="newClient.town" type="text" placeholder="town" class="w-full px-2 py-1 border rounded-md" />
          <input v-model="newClient.location" type="text" placeholder="Location" class="w-full px-2 py-1 border rounded-md" />
            <div class="relative">
        <label for="meterTypeSelection" class="block font-medium">Client Type</label>
        <select  class="w-full px-2 py-1 border rounded-md">
          <option value="residential">Residential</option>
          <option value="commercial">Comercial</option>

        </select>
      </div>
      <button class="bg-red-900 p-1 rounded">Get the Current Location</button>
           <div class="relative">
      <label for="meterTypeSelection" class="block font-medium">Meter</label>
      <select v-model="newClient.meterId" class="w-full px-2 py-1 border rounded-md">
        <option v-for="meter in availableMeters" :key="meter.id" :value="meter.id">{{ meter.serialNumber }}</option>
      </select>
    </div>
          <button type="submit" class="bg-green-500 text-white px-2 py-1 rounded-md">
            <i class="fas fa-save"></i> Save
          </button>
        </form>
        <button @click="closeModal" class="mt-2 text-red-500">
          <i class="fas fa-times"></i> Close
        </button>
      </div>
    </div>

    <!--EDIT THE CLIENT DETAILS-->
   <div v-if="showEditUserModal" class="modal">
  <div class="modal-content bg-white p-4 rounded-md">
    <h2 class="text-2xl font-semibold mb-4">Edit User Information</h2>
   <form @submit.prevent="editUser" class="space-y-4">
      <input v-model="editedUserData.name" type="text" placeholder="Full Name" class="w-full px-2 py-1 border rounded-md" />
      <input v-model="editedUserData.phone" type="text" placeholder="Phone Number" class="w-full px-1 py-1 border rounded-md" />
      <input v-model="editedUserData.email" type="text" placeholder="Email" class="w-full px-1 py-1 border rounded-md" />
      <input v-model="editedUserData.county" type="text" placeholder="County" class="w-full px-1 py-1 border rounded-md" />
      <input v-model="editedUserData.location" type="text" placeholder="Location" class="w-full px-1 py-1 border rounded-md" />
      <input v-model="editedUserData.associatedMeter" type="text" placeholder="Associated Meter" class="w-full px-1 py-1 border rounded-md" />
      <button type="submit" class="bg-green-500 text-white px-1 py-1 rounded-md">
        <i class="fas fa-save"></i> Save
      </button>
    </form>
    <button @click="closeUserModal" class="mt-2 text-red-500">
      <i class="fas fa-times"></i> Close
    </button>
  </div>
</div>


  </div>
</template>


<script setup>
import Nav from "../../../components/Nav.vue";
import DesktopSideBar from "../../../components/DesktopSideBar.vue";
import axios from "../../../axios.js";
import { onMounted } from 'vue';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from "../../../stores/auth";

const availableMeters = ref([]);

onMounted(async () => {
  try {
    // Fetch the available meters from your backend
    const response = await axios.get('/meters/idle'); // Replace with your actual API endpoint for meters
    availableMeters.value = response.data;
  } catch (error) {
    console.error('Error fetching meters:', error);
  }
});




const authStore = useAuthStore();
const isAdmin = computed(() => authStore.user.role === "ADMIN");

const loggeduser=authStore.user.firstname;

const clients = ref([]);

// Initialize the router
const router = useRouter();
const editedUserData = ref(null);


const editUser = async (userId) => {
  try {
    const url = `/clients/${userId}`;
    console.log('Request URL:', url);
    await axios.put(url, editedUserData.value);


    // Update the user data in your clients array with the edited data.
    const editedIndex = clients.value.findIndex((client) => client.id === userId);
    if (editedIndex !== -1) {
      clients.value[editedIndex] = editedUserData.value;
    }

    // Close the edit modal.
    showEditUserModal.value = false;

    // Reset the editedUserData object.
    editedUserData.value = null;
  } catch (error) {
    console.error('Error editing user:', error);
  }
};






const viewClientInfo = (clientId) => {
  // Construct the route path based on the client's ID
  const routePath = `/admin/clients/${clientId}/info`;

  // Navigate to the client information page
  router.push(routePath);
};

// Data property to control the visibility of the modal form
const showModal = ref(false);

// Method to open the modal form
const openModal = () => {
  showModal.value = true;
};

// Method to close the modal form
const closeModal = () => {
  showModal.value = false;
};


// Data property to control the visibility of the modal form
const showEditUserModal = ref(false);

const openUserModal = async (userId) => {
  try {
    // Fetch the user data based on the userId from your backend
    const response = await axios.get(`/clients/${userId}`); // Replace with your actual API endpoint

    // Set the retrieved user data to populate the form
    editedUserData.value = response.data;

    // Set showEditUserModal to true to display the edit modal
    showEditUserModal.value = true;

    // Pass the userId to the editUser function
    editUser(userId);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};



// Method to close the user edit modal
const closeUserModal = () => {
  // Set showEditUserModal to false to hide the edit modal
  showEditUserModal.value = false;
};


// Data property to store the new client data
const newClient = ref({
  lastname: '',
  firstname:'',
  phoneNumber: '',
  email: '',
  county: '',
  location: '',
  associatedMeter: ''

});

onMounted(async () => {
  try {
    loading.value = true;
    const response = await axios.get('/clients');
    clients.value = response.data; // Update clients with the received data
    totalItems.value = clients.value.length;
  } catch (error) {
    console.error('Error fetching client data:', error);
  } finally {
    loading.value = false;
  }
});

// Other data and methods you have in your component
const searchTerm = ref('');
const sortKey = ref('fullName');
const loading = ref(false);
const totalItems = ref(clients.value.length);
const itemsPerPage = ref(20);
const currentPage = ref(1);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return clients.value.slice(start, end);
});

const editItem = (itemId) => {
  // Implement your edit logic here
};

const deleteItem = async (itemId) => {
  try {
    // Send a DELETE request to your API to delete the client with the specified itemId
    await axios.post(`/client/archive/${itemId}`);

    // Find the index of the item with the specified ID
    const index = clients.value.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      // Remove the item from the clients array
      clients.value.splice(index, 1);

      // Update the totalItems count
      totalItems.value = clients.value.length;

      // Check if the current page is now greater than the number of pages after deletion
      if (currentPage.value > Math.ceil(totalItems.value / itemsPerPage.value)) {
        // Adjust the current page to the last page
        currentPage.value = Math.ceil(totalItems.value / itemsPerPage.value);
      }
    }
  } catch (error) {
    console.error('Error deleting client:', error);
  }
};


// Method to add a new client
const addClient = async () => {
  try {
    const response = await axios.post('/clients/add', newClient.value);

    // Assuming your API returns the newly created client data, you can update your clients array
    const createdClient = response.data;
    clients.value.push(createdClient);

    // Clear the form
    newClient.value = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      country: '',
      town: '',
      location: '',
      meter: ''
      
    };

    // Close the modal
    closeModal();

    // Update total items and reset pagination
    totalItems.value = clients.value.length;
    currentPage.value = 1;
  } catch (error) {
    console.error('Error adding client:', error);
  }
};

</script>

<style scoped>
/* Add your CSS styles for the modal and other components here */
.modal {
  position: fixed;
  top: 50%; /* Vertically center the modal */
  left: 50%; /* Horizontally center the modal */
  transform: translate(-50%, -50%); /* Center the modal both horizontally and vertically */
  width: 60%;
  max-width: 40vw; /* Set a maximum width for the modal */
  max-height: 60vh; /* Set a maximum height for the modal */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

/* You can add more styles as needed */
</style>
