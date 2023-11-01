<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";
import Nav from "../../components/Nav.vue";

const authStore = useAuthStore();

const adminProfile = ref({
  name: authStore.user.name || "",
  phone_number: authStore.user.phone || "",
  country: authStore.user.country || "",
  gender: authStore.gender || "",
  email: authStore.user.email || "",

});

const editMode = ref(false);

const toggleEditMode = () => {
  editMode.value = !editMode.value;
};
</script>

<template>
  <Nav />
  <!-- ====== Profile Display Section Start -->
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
            <div class="mb-10 text-center md:mb-16">Admin Profile</div>

            <div class="mb-6">
              <p><strong>Full Name:</strong> {{ adminProfile.name }}</p>
            </div>

            <div class="mb-6">
              <p><strong>Phone Number:</strong> {{ adminProfile.phone }}</p>
            </div>
            <div class="mb-4">
              <p><strong>Gender:</strong> {{ adminProfile.gender }}</p>
            </div>
            <div class="mb-6">
              <p><strong>Country:</strong> {{ adminProfile.country }}</p>
            </div>
            <div class="mb-6">
              <p><strong>Email:</strong> {{ adminProfile.email }}</p>
            </div>

            <div class="mb-6" v-if="!editMode">
              <button @click="toggleEditMode" class="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                <i class="fas fa-edit"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
