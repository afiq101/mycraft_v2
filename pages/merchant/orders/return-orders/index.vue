<script setup>
definePageMeta({
  title: "Return Orders",
  layout: "default",
});

import { ref, computed } from 'vue';

const activeTab = ref('Return to Merchant');
const orderNo = ref('');
const returnReason = ref('');
const searchQuery = ref('');
const selectedCategory = ref('');
const sortBy = ref('');
const abTesting = ref('');

const returnReasons = [
  { label: 'Damaged Item', value: 'damaged' },
  { label: 'Wrong Item', value: 'wrong' },
  { label: 'Customer Changed Mind', value: 'changed_mind' },
  { label: 'Other', value: 'other' },
];

const categories = ['Electronics', 'Fashion', 'Home & Garden']; // Example categories
const sortOptions = ['Name', 'Date', 'Price']; // Example sort options

// Dummy data for return orders
const returnToMerchantOrders = ref([
  { orderNo: 'ORD001', reason: 'Damaged Item', status: 'Pending' },
  { orderNo: 'ORD002', reason: 'Wrong Item', status: 'Completed' },
  { orderNo: 'ORD003', reason: 'Customer Changed Mind', status: 'Pending' },
]);

const returnToWarehouseOrders = ref([
  { orderNo: 'ORD004', reason: 'Damaged Item', status: 'Pending' },
  { orderNo: 'ORD005', reason: 'Wrong Item', status: 'Completed' },
  { orderNo: 'ORD006', reason: 'Customer Changed Mind', status: 'Pending' },
]);

const refundOnlyOrders = ref([
  { orderNo: 'ORD007', reason: 'Other', status: 'Pending' },
  { orderNo: 'ORD008', reason: 'Damaged Item', status: 'Completed' },
  { orderNo: 'ORD009', reason: 'Wrong Item', status: 'Pending' },
]);

const filteredOrders = computed(() => {
  let orders = [];
  if (activeTab.value === 'Return to Merchant') {
    orders = returnToMerchantOrders.value;
  } else if (activeTab.value === 'Return to Warehouse') {
    orders = returnToWarehouseOrders.value;
  } else if (activeTab.value === 'Refund Only') {
    orders = refundOnlyOrders.value;
  }
  return orders.filter(order =>
    (orderNo.value === '' || order.orderNo.includes(orderNo.value)) &&
    (returnReason.value === '' || order.reason === returnReason.value)
  );
});

const itemsPerPage = ref(10);
const currentPage = ref(1);

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredOrders.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value));

const search = () => {
  console.log('Searching...');
  // Implement actual search logic here
};

const exportData = () => {
  console.log('Exporting data...');
  // Implement actual export logic here
};
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Return Orders</h1>

    <rs-tab>
      <rs-tab-item title="Return to Merchant" :active="activeTab === 'Return to Merchant'" @click="activeTab = 'Return to Merchant'">
        <div class="py-4">
          
          <div class="grid grid-cols-1 md:grid-cols-5 gap-4 my-4">
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
                v-model="returnReason"
                :options="returnReasons"
                placeholder="Return Reason"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-48'
                }"
              />
              <rs-button @click="search">Search</rs-button>
              <rs-dropdown title="Export">
                <rs-dropdown-item @click="exportData">Export Data</rs-dropdown-item>
              </rs-dropdown>
          </div>

          <rs-table
            :data="paginatedOrders"
            :field="['Order No', 'Return Reason', 'Status']"
            advanced
            :options-advanced="{ sortable: true, responsive: true }"
          >
          </rs-table>

          <div v-if="paginatedOrders.length === 0" class="text-center py-4">
            No Data
          </div>

          <div class="flex justify-between items-center mt-4">
            <div>
              Items per page: 
              <FormKit
                type="select"
                v-model="itemsPerPage"
                :options="[10, 20, 50, 100]"
                :classes="{
                  outer: 'inline-block mb-0',
                  input: 'ml-2'
                }"
              />
            </div>
            <rs-pagination
              v-model="currentPage"
              :total-pages="totalPages"
              :max-visible-pages="5"
            />
          </div>
        </div>
      </rs-tab-item>

      <rs-tab-item title="Return to Warehouse" :active="activeTab === 'Return to Warehouse'" @click="activeTab = 'Return to Warehouse'">
        <div class="py-4">
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
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
            :data="paginatedOrders"
            :field="['Order No', 'Return Reason', 'Status']"
            advanced
            :options-advanced="{ sortable: true, responsive: true }"
          >
          </rs-table>
        </div>
      </rs-tab-item>

      <rs-tab-item title="Refund Only" :active="activeTab === 'Refund Only'" @click="activeTab = 'Refund Only'">
        <div class="py-4">
          
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
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
          </div>

          <rs-table
            :data="paginatedOrders"
            :field="['Order No', 'Return Reason', 'Status']"
            advanced
            :options-advanced="{ sortable: true, responsive: true }"
          >
          </rs-table>
        </div>
      </rs-tab-item>
    </rs-tab>
  </div>
</template>
