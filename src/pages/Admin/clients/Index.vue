<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";
import Nav from "../../../components/Nav.vue";
import AdminClientNav from "./AdminClientNav.vue";
import DesktopSideBar from "../../../components/DesktopSideBar.vue";
import Footer from "../../../components/Footer.vue";
import ClientPersonalInfo from "./ClientPersonalInfo.vue";
import { useRouter } from 'vue-router';

</script>

<template>
  <main>
    <!-- TOP BAR -->
    <div>
      <Nav />
    </div>

    <div class="flex">
      <div><DesktopSideBar /></div>
      <div class="flex flex-col w-full">
        <AdminClientNav />
        <div class="w-full"><RouterView /></div>
      </div>
    </div>
  </main>
</template>
