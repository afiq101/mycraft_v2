<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Product Report</div>

    <!-- Filters Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Filters</div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search by Seller -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Search by Seller</label
          >
          <input
            v-model="filterSeller"
            type="text"
            placeholder="Search by seller..."
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="selectedStatus"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Product List Table -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Product List</div>

      <!-- Product Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Seller
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(product, index) in paginatedProducts" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.seller }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.price | currency }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'bg-green-100 text-green-800': product.status === 'active',
                    'bg-red-100 text-red-800': product.status === 'inactive',
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ product.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Page metadata
definePageMeta({
  title: "Product Report",
});

// Sample product data
const products = ref([
  {
    id: 1,
    name: "Product A",
    seller: "Seller 1",
    price: 100,
    status: "active",
  },
  {
    id: 2,
    name: "Product B",
    seller: "Seller 2",
    price: 200,
    status: "inactive",
  },
  {
    id: 3,
    name: "Product C",
    seller: "Seller 1",
    price: 150,
    status: "active",
  },
  // Add more products up to 20...
]);

// Filters
const filterSeller = ref("");
const selectedStatus = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Computed filtered and paginated products
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSeller = filterSeller.value
      ? product.seller.toLowerCase().includes(filterSeller.value.toLowerCase())
      : true;
    const matchesStatus = selectedStatus.value
      ? product.status === selectedStatus.value
      : true;

    return matchesSeller && matchesStatus;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>

<style scoped>
/* Add custom styles here */
</style>
