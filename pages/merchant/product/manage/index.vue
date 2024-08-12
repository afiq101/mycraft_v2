<script setup>
definePageMeta({
  title: "Manage Products",
  layout: "default",
});

const products = ref([
  { name: 'Cincin Lelaki Perak', category: 'Logam', price: 'RM10.00', stock: 50, status: 'Active', abTesting: 'A' },
  { name: 'Rantai Loket Helena', category: 'Logam', price: 'RM20.00', stock: 30, status: 'Active', abTesting: 'B' },
  { name: 'Document Bag', category: 'Anyaman', price: 'RM285.00', stock: 150, status: 'Inactive', abTesting: 'A' },
  { name: 'Baju T Batik Ikat & Celup', category: 'Kain & Tenunan', price: 'RM48.00', stock: 75, status: 'Active', abTesting: 'None' },
  ]);

const activeTab = ref('All');
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('');
const abTesting = ref('');

const categories = ['Logam', 'Kain & Tenunan', 'Anyaman', 'Kraf Seni', 'Buku'];
const sortOptions = ['Name A-Z', 'Name Z-A', 'Price Low to High', 'Price High to Low'];
const abTestingOptions = ['A', 'B', 'None'];



const filteredProducts = computed(() => {
  return products.value.filter(product => 
    (activeTab.value === 'All' || product.status === activeTab.value) &&
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (selectedCategory.value === '' || product.category === selectedCategory.value) &&
    (abTesting.value === '' || product.abTesting === abTesting.value)
  );
});

// Function to add a new product (dummy function for now)
const addNewProduct = () => {
  console.log('Adding new product');
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">Manage Products</h1>
          <rs-button @click="addNewProduct" variant="primary">
            + New Product
          </rs-button>
        </div>
      </template>
      <template #body>
        <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
          <p>Welcome to Product Management Page. <a href="#" class="underline">Learn More</a></p>
          <p>Your products are not yet visible to buyers. Please add address to make them visible.</p>
        </div>

        <rs-tab>
          <rs-tab-item title="All" :active="activeTab === 'All'" @click="activeTab = 'All'">
          </rs-tab-item>
          <rs-tab-item title="Active" :active="activeTab === 'Active'" @click="activeTab = 'Active'">
          </rs-tab-item>
          <rs-tab-item title="Inactive" :active="activeTab === 'Inactive'" @click="activeTab = 'Inactive'">
          </rs-tab-item>
          <rs-tab-item title="Violation" :active="activeTab === 'Violation'" @click="activeTab = 'Violation'">
          </rs-tab-item>
          <rs-tab-item title="Deleted" :active="activeTab === 'Deleted'" @click="activeTab = 'Deleted'">
          </rs-tab-item>
        </rs-tab>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
          <FormKit
            type="text"
            v-model="searchQuery"
            placeholder="Search Product Name"
            :classes="{
              outer: 'mb-0',
              input: 'w-full'
            }"
          />
          <FormKit
            type="select"
            v-model="selectedCategory"
            :options="['Please Select', ...categories]"
            placeholder="Select Category"
            :classes="{
              outer: 'mb-0',
              input: 'w-full'
            }"
          />
          <FormKit
            type="select"
            v-model="sortBy"
            :options="['Please Select', ...sortOptions]"
            placeholder="Sort By"
            :classes="{
              outer: 'mb-0',
              input: 'w-full'
            }"
          />
          <FormKit
            type="select"
            v-model="abTesting"
            :options="['Please Select', ...abTestingOptions]"
            placeholder="A/B Testing"
            :classes="{
              outer: 'mb-0',
              input: 'w-full'
            }"
          />
        </div>

        <rs-table
          v-if="filteredProducts.length > 0"
          :data="filteredProducts"
          :field="['Name', 'Category', 'Price', 'Stock', 'Status', 'Action']"
          advanced
          :options-advanced="{
            sortable: true,
            responsive: true
          }"
        >
          <template #Status="{ text }">
            <rs-badge :variant="text === 'Active' ? 'success' : 'warning'">
              {{ text }}
            </rs-badge>
          </template>
          <template #Action>
            <div class="flex items-center">
              <rs-button variant="primary-outline" size="sm">
                <Icon name="material-symbols:edit-outline"></Icon>
              </rs-button>
              <rs-button variant="danger-outline" size="sm" class="ml-2">
                <Icon name="material-symbols:delete-outline-rounded"></Icon>
              </rs-button>
            </div>
          </template>

        </rs-table>

        <div v-else class="text-center py-8">
          <img src="/path-to-your-no-product-image.png" alt="No products" class="mx-auto mb-4" />
          <p class="text-xl font-semibold">No product under this status or filter</p>
          <p class="text-gray-500">Please check other product status or use other filter.</p>
        </div>
      </template>
    </rs-card>
  </div>
</template>