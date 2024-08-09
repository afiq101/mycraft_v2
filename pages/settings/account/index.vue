<script setup>
definePageMeta({
  title: "Account Settings",
  layout: "default",
});

const form = reactive({
  name: "",
  email: "",
  gender: "",
  phone: "",
  birthdate: "",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumbV2 />

    <rs-card class="p-4 px-6">
      <FormKit type="form">
        <FormKit
          type="text"
          name="name"
          label="Name"
          validation="required"
          v-model="form.name"
        >
          <template #label>
            <label
              class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
            >
              Name
              <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>
        <FormKit type="text" name="email" label="Email" v-model="form.email">
          <template #label>
            <label
              class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
            >
              Email
              <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>
        <FormKit
          type="radio"
          name="gender"
          label="Gender"
          v-model="form.gender"
          :options="['Lelaki', 'Perempun']"
        >
        </FormKit>
        <FormKit type="text" name="phone" label="Phone" v-model="form.phone">
          <template #label>
            <label
              class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
            >
              Phone
              <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>
        <FormKit
          type="date"
          name="birthdate"
          label="Birthdate"
          v-model="form.birthdate"
        ></FormKit>
      </FormKit>
    </rs-card>
  </div>
</template>
