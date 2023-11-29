<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

const authStore = useAuthStore();

const form = ref({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  password_confirmation: "",
});
</script>

<template>
  <!-- Forms Section Start -->
  <section class="bg-[#F4F7FF] py-20 lg:py-[120px]">
    <div class="container mx-auto">
      <div class="-mx-4 flex flex-wrap">
        <div class="w-full px-4">
          <div
            class="
              relative
              mx-auto
              max-w-[525px]
              overflow-hidden
              rounded-lg
              bg-white
              py-16
              px-10
              text-center
              sm:px-12
              md:px-[60px]
            "
          >
            <div class="bg-red-500 text-center rounded-lg py-1 text-white mb-3" v-if="authStore.errors.phone_number">{{ authStore.errors.phone }}</div>
            <div class="mb-10 text-center md:mb-16">Create Acc as a Cytek Staff</div>
            <form @submit.prevent="authStore.handleRegisterTasker(form)">
              <div class="mb-6">
                <input
                  type="text"
                  placeholder="First Name"
                  v-model="form.first_name"
                  required
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
                <div v-if="authStore.errors.name" class="flex">
                  <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.name }}</span>
                </div>
              </div>

                 <div class="mb-6">
                <input
                  type="text"
                  placeholder="Last Name"
                  v-model="form.last_name"
                  required
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
                <div v-if="authStore.errors.name" class="flex">
                  <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.name }}</span>
                </div>
              </div>
              <div class="mb-6">
                <input
                  type="text"
                  required
                  placeholder="0712345678"
                  v-model="form.phone"
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
                <div v-if="authStore.errors.phone" class="flex">
                  <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.phone }}</span>
                </div>
              </div>
              <div class="mb-6">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  v-model="form.email"
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
                <div v-if="authStore.errors.email" class="flex">
                  <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.email }}</span>
                </div>
              </div>

                 <div class="mb-6">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  v-model="form.password"
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
                <div v-if="authStore.errors.password" class="flex">
                  <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.password }}</span>
                </div>
              </div>
              <div class="mb-6">
                <input
                  type="password"
                  required
                  placeholder="Password Confirmation"
                  v-model="form.password_confirmation"
                  class="border-[#E9EDF4] w-full rounded-md border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:border-primary focus-visible:shadow-none"
                />
                <div v-if="authStore.errors.password_confirmation" class="flex">
                  <span class="text-red-400 text-sm m-2 p-2">{{ authStore.errors.password_confirmation }}</span>
                </div>
              </div>
              <div class="mb-10">
                <button type="submit" class="w-full px-4 py-3 bg-indigo-500 hover:bg-indigo-700 rounded-md text-white">
                  <div v-if="authStore.isLoading">
                    <v-progress-circular indeterminate color="amber"></v-progress-circular>
                  </div>
                  <div v-else>Register</div>
                </button>
              </div>
            </form>
            <p class="text-base text-[#adadad]">
              <router-link to="/" class="text-primary hover:underline">Sign In</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
