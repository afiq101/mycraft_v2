<script setup>
const props = defineProps({
  categories: {
    type: Array,
    default: () => ["Best Sellers", "New Arrivals", "Categories"],
  },
  productCategories: {
    type: Array,
    default: () => [
      "Gadgets",
      "Souvenirs",
      "Clothing",
      "Home & Living",
      "Beauty",
      "Sports",
      "Books",
      "Toys",
    ],
  },
});

const searchQuery = ref("");

const handleSearch = () => {
  // Implement search logic here
  console.log("Searching for:", searchQuery.value);
};

// Add these lines for horizontal scrolling functionality
const categoriesContainer = ref(null);

const scroll = (direction) => {
  if (categoriesContainer.value) {
    const scrollAmount = direction === "left" ? -200 : 200;
    categoriesContainer.value.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
};
</script>

<template>
  <div class="bg-white shadow-sm fixed z-50 w-full top-0">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <rs-card class="shadow-none border-0">
        <div
          class="flex flex-col sm:flex-row justify-between items-center py-4"
        >
          <div class="flex items-center space-x-4 mb-4 sm:mb-0">
            <nuxt-link to="/">
              <img
                src="@/assets/img/logo/mycraffshop_logo.png"
                alt="Logo"
                class="h-8"
              />
            </nuxt-link>
            <div class="flex space-x-4">
              <NuxtLink
                to="search"
                v-for="category in categories"
                :key="category"
              >
                <rs-button variant="primary-text" class="text-sm">
                  {{ category }}
                </rs-button>
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <FormKit
              type="text"
              v-model="searchQuery"
              placeholder="Search products"
              @keyup.enter="handleSearch"
              :classes="{
                outer: 'mb-0',
                input: 'w-full sm:w-64',
              }"
            >
              <template #suffix>
                <Icon
                  name="mdi:magnify"
                  class="cursor-pointer"
                  @click="handleSearch"
                />
              </template>
            </FormKit>
            <rs-button
              @click="navigateTo('/auth/login')"
              variant="primary-text"
            >
              <Icon name="mdi:account" class="mr-2" />
              Sign in / Register
            </rs-button>
            <rs-button @click="navigateTo('/cart')" variant="primary-text">
              <Icon name="mdi:cart-outline" />
            </rs-button>
          </div>
        </div>
      </rs-card>
    </div>

    <!-- Product Categories Pillbox -->
    <div class="relative bg-white py-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <button
          @click="scroll('left')"
          class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-50 rounded-full p-1 z-10 hover:bg-gray-200"
        >
          <Icon name="mdi:chevron-left" size="24" />
        </button>
        <div
          class="overflow-x-auto scrollbar-hide px-4"
          ref="categoriesContainer"
        >
          <div class="flex space-x-2 whitespace-nowrap">
            <NuxtLink
              v-for="category in productCategories"
              :key="category"
              to="/search"
              class="inline-block"
            >
              <rs-button
                variant="primary"
                class="text-sm px-4 py-1 rounded-full shadow-sm hover:bg-zinc-700"
              >
                {{ category }}
              </rs-button>
            </NuxtLink>
          </div>
        </div>
        <button
          @click="scroll('right')"
          class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-50 rounded-full p-1 z-10 hover:bg-gray-200"
        >
          <Icon name="mdi:chevron-right" size="24" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
