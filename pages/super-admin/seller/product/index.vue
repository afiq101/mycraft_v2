<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  title: "Seller Products",
  layout: "default",
});

const products = ref([]);
const isLoading = ref(true);

const fetchProducts = async () => {
  // Simulating an API call with setTimeout
  setTimeout(() => {
    products.value = [
      {
        id: 1,
        productName: 'Wireless Earbuds',
        sku: 'SKU12345',
        price: 199.99,
        status: 'Published',
        dateAdded: '2023-04-01'
      },
      {
        id: 2,
        productName: 'Smartphone',
        sku: 'SKU23456',
        price: 999.99,
        status: 'Pending',
        dateAdded: '2023-04-02'
      },
      {
        id: 3,
        productName: 'Laptop',
        sku: 'SKU34567',
        price: 1499.99,
        status: 'Out of Stock',
        dateAdded: '2023-03-30'
      },
      {
        id: 4,
        productName: 'Smartwatch',
        sku: 'SKU45678',
        price: 299.99,
        status: 'Sold',
        dateAdded: '2023-04-03'
      },
      {
        id: 5,
        productName: 'Tablet',
        sku: 'SKU56789',
        price: 499.99,
        status: 'Draft Mode',
        dateAdded: '2023-04-04'
      },
    ];
    isLoading.value = false;
  }, 1000); // Simulate a 1-second delay
};

onMounted(fetchProducts);

const getStatusVariant = (status) => {
  switch (status) {
    case 'Published': return 'success';
    case 'Pending': return 'warning';
    case 'Approved': return 'info';
    case 'Unpublished': return 'secondary';
    case 'Rejected': return 'danger';
    case 'Sold': return 'primary';
    case 'Out of Stock': return 'danger';
    case 'Draft Mode': return 'secondary';
    default: return 'secondary';
  }
};

const editProduct = (product) => {
  console.log('Editing product:', product.productName);
  // Logic to edit the product
};

const deleteProduct = (product) => {
  console.log('Deleting product:', product.productName);
  // Logic to delete the product
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Seller Products</h1>

    <rs-card>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Product Listings</h2>
          <div class="flex space-x-4">
          <rs-button variant="primary">
            <Icon name="ph:download-simple-bold" class="w-5 h-5 mr-2" />
            Generate Report
          </rs-button>
    </div>
        </div>
      </template>
      <template #body>
        <div v-if="isLoading" class="text-center py-4">
          Loading...
        </div>
        <rs-table 
          v-else
          :data="products" 
          :field="['Product Name', 'SKU', 'Price', 'Status', 'Date Added', 'Action']" 
          advanced
        >
          <template #ProductName="{ value }">{{ value.productName }}</template>
          <template #SKU="{ value }">{{ value.sku }}</template>
          <template #Price="{ value }">RM {{ value.price.toFixed(2) }}</template>
          <template #Status="{ value }">
            <rs-badge :variant="getStatusVariant(value.status)">{{ value.status }}</rs-badge>
          </template>
          <template #DateAdded="{ value }">{{ value.dateAdded }}</template>
          <template #Action="{ row }">
            <div class="flex space-x-2">
              <rs-button 
                variant="outline-info" 
                size="sm"
                @click="editProduct(row)"
              >
                Edit
              </rs-button>
              <rs-button 
                variant="danger" 
                size="sm"
                @click="deleteProduct(row)"
              >
                Delete
              </rs-button>
            </div>
          </template>
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>
