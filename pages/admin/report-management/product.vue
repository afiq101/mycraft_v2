<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Product Report</div>

    <!-- Total Products Card -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium">Total Products</div>
      <div class="flex items-center justify-between mt-4">
        <div class="text-2xl font-semibold">{{ totalProducts }}</div>
        <button
          @click="generateExcel"
          class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500"
        >
          Generate Excel
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Filters</div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Seller Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Seller</label
          >
          <select
            v-model="selectedSeller"
            @change="filtering"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="Seller 1">Seller 1</option>
            <option value="Seller 2">Seller 2</option>
            <!-- Add more sellers as needed -->
          </select>
        </div>

        <!-- Price Range Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Price (Min)</label
          >
          <input
            v-model="minPrice"
            @change="filtering"
            type="number"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter minimum price"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Price (Max)</label
          >
          <input
            v-model="maxPrice"
            @change="filtering"
            type="number"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter maximum price"
          />
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="selectedStatus"
            @change="filtering"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <div v-if="!tableLoading">
        <rs-table
          v-if="filteredProducts.length > 0"
          :data="filteredProducts"
          :options="{
            variant: 'default',
            striped: true,
            borderless: true,
          }"
          :options-advanced="{
            sortable: true,
            responsive: true,
            filterable: false,
          }"
          advanced
        >
          <template v-slot:price="data">
            <div>RM {{ numberFormat(data.value.price) }}</div>
          </template>
          <template v-slot:status="data">
            <div class="flex gap-2">
              <span
                :class="{
                  'bg-green-100 text-green-800': data.value.status === 'active',
                  'bg-yellow-100 text-yellow-800':
                    data.value.status === 'inactive',
                }"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                <span class="first-letter:uppercase">
                  {{ data.value.status }}
                </span>
              </span>
            </div>
          </template>
        </rs-table>

        <div v-else>No products found.</div>
      </div>
      <div v-else>
        <div class="p-10 text-center">
          <Icon
            name="eos-icons:loading"
            class="animate-spin text-gray-500"
            size="20"
          />
        </div>
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

// Total number of products
const totalProducts = ref(20); // Update this as per your data

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

// Loading state
const tableLoading = ref(false);

// Filters
const selectedSeller = ref("");
const minPrice = ref(null);
const maxPrice = ref(null);
const selectedStatus = ref("");

// Computed filtered and paginated products
const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesSeller = selectedSeller.value
      ? product.seller === selectedSeller.value
      : true;
    const matchesStatus = selectedStatus.value
      ? product.status === selectedStatus.value
      : true;
    const matchesMinPrice =
      minPrice.value !== null ? product.price >= minPrice.value : true;
    const matchesMaxPrice =
      maxPrice.value !== null ? product.price <= maxPrice.value : true;

    return matchesSeller && matchesStatus && matchesMinPrice && matchesMaxPrice;
  });
});

// Method to handle filtering
const filtering = () => {
  tableLoading.value = true;

  setTimeout(() => {
    tableLoading.value = false;
  }, 1000); // 1 second loading state before displaying the table
};

// Method to generate Excel report
const generateExcel = () => {
  alert("Generating Excel report...");
  // Implement Excel generation logic here
};

const navigateToDetail = async (data) => {
  await navigateTo(`/product-report/detail/${data.id}`);
};

function numberFormat(val) {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
</script>

<style scoped>
/* Add custom styles here */
</style>
