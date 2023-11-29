<template>
  <div class="flex flex-col">
    <div>
      <ClientNav />
    </div>

    <div class="flex">
      <div>
        <ClientSideBar />
       
      </div>
      <div> <ClientDashboardSummary /></div>
    </div>



    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup>

import ClientNav from '../../components/ClientNav.vue';
import Footer from '../../components/Footer.vue';
import { ref, onMounted } from 'vue';
import ClientSideBar from "../../components/ClientSideBar.vue";
import ClientDashboardSummary from "./ClientDashboardSummary.vue";

const client = ref({
  fullName: "John Doe",
  email: "johndoe@example.com",
  phoneNumber: "24799463301",
  role: "client",
  dateCreated: "2023-10-27",
});
</script>
