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
        <h2 class="text-2xl font-semibold text-center">Client Details</h2>
        <div class="mt-4">
          <table class="w-full mx-auto">
            <tbody>
              <tr>
                <td class="text-center"><strong>Full Name:</strong></td>
                <td class="text-center">{{ client.fullName }}</td>
              </tr>
              <tr>
                <td class="text-center"><strong>Email:</strong></td>
                <td class="text-center">{{ client.email }}</td>
              </tr>
              <tr>
                <td class="text-center"><strong>Phone:</strong></td>
                <td class="text-center">{{ client.phoneNumber }}</td>
              </tr>
              <tr>
                <td class="text-center"><strong>Role:</strong></td>
                <td class="text-center">{{ client.role }}</td>
              </tr>
              <tr>
                <td class="text-center"><strong>Date Created:</strong></td>
                <td class="text-center">{{ client.dateCreated }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import DesktopSidebar from '../../components/DesktopSidebar.vue';
import Nav from '../../components/Nav.vue';
import Footer from '../../components/Footer.vue';

const client = ref({
  fullName: "John Doe",
  email: "johndoe@example.com",
  phoneNumber: "24799463301",
  role: "client",
  dateCreated: "2023-10-27",
});
</script>
