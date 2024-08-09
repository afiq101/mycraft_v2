<script setup>
const categories = ref(["Best Sellers", "New Arrivals", "Categories"]);
</script>

<template>
  <div>
    <CommerceHeader :categories="categories" class="mb-8" />

    <div class="bg-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-40">
        <slot />
      </div>
    </div>

    <CommerceFooter class="mt-8" />
  </div>
</template>
