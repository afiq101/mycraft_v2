<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  title: "Courier Service Management",
  layout: "default",
});


</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Courier Service Management</h1>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Courier Service Management</h2>
      </template>
      <template #body>
        <FormKit type="form" @submit="updateProfile" :actions="false">
            <div class="flex space-y-6">
              <label class="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Courier Service</span>
            </label>
            </div>
            <div class="flex space-y-6">
              <label class="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Enable Thermal Printing Consignment Notes for Seller</span>
            </label>
            </div>
          <div class="flex justify-start mt-6">
            <rs-button type="submit">Update</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>