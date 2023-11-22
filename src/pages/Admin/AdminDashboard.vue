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
        <div class="mt-8 mx-2 my-3 rounded border border-1 border-gray-400 p-5">
          <h2 class="text-2xl font-semibold text-center text-gray-900">New Users Pending Approval</h2>
          <table class="w-full mx-auto mt-4">
            <thead>
              <tr>
                <th class="text-center text-gray-900 text-lg font-bold">Full Name</th>
                <th class="text-center text-gray-900 text-lg font-bold">Email</th>
                <th class="text-center text-gray-900 text-lg font-bold">Phone</th>
                <th class="text-center text-gray-900 text-lg font-bold">Role</th>
                <th class="text-center text-gray-900 text-lg font-bold">Date Created</th>
                <th class="text-center text-gray-900 text-lg font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-gray-400">
                <td class="text-center text-gray-900 font-semibold">John Doe</td>
                <td class="text-center text-gray-900 font-semibold">johndoe@example.com</td>
                <td class="text-center text-gray-900 font-semibold">24799463301</td>
                <td class="text-center text-gray-900 font-semibold"></td>
                <td class="text-center text-gray-900 font-semibold">2023-10-27</td>
                <td class="text-center text-gray-900 font-semibold">
                  <button class="bg-green-500 text-white px-3 py-1 mx-2 my-1 rounded">
                    <i class="fas fa-check"></i> Approve
                  </button>
                  <button class="bg-red-600 text-white px-3 py-1 mx-2 rounded">
                    <i class="fas fa-times"></i> Reject
                  </button>
                </td>
              </tr>
              
    <tr class="border-t border-gray-400">
                <td class="text-center text-gray-900 font-semibold">John Doe</td>
                <td class="text-center text-gray-900 font-semibold">johndoe@example.com</td>
                <td class="text-center text-gray-900 font-semibold">24799463301</td>
                <td class="text-center text-gray-900 font-semibold"></td>
                <td class="text-center text-gray-900 font-semibold">2023-10-27</td>
                <td class="text-center text-gray-900 font-semibold">
                  <button class="bg-green-500 text-white px-3 py-1 mx-2 my-1 rounded">
                    <i class="fas fa-check"></i> Approve
                  </button>
                  <button class="bg-red-600 text-white px-3 py-1 mx-2 rounded">
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
import DesktopSidebar from '../../components/DesktopSideBar.vue';
import ClientGrowthChart from '../../components/ClientGrowthChart.vue';
import Nav from '../../components/Nav.vue';
import Footer from '../../components/Footer.vue';
import DashboardSummary from "./DashboardSummary.vue";
import { ref, reactive } from 'vue';
</script>
