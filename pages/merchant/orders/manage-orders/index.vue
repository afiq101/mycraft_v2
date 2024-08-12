<script setup>
definePageMeta({
  title: "Order Management",
  layout: "default",
});

const orders = ref([
  { id: 'ORD1234', customer: 'John Doe', total: 'RM299', status: 'Completed', date: '2024-08-01' },
  { id: 'ORD5678', customer: 'Jane Smith', total: 'RM149', status: 'Pending', date: '2024-08-02' },
  { id: 'ORD9101', customer: 'Alice Johnson', total: 'RM499', status: 'Placed', date: '2024-08-03' },
  { id: 'ORD1121', customer: 'Bob Brown', total: 'RM89', status: 'Returned', date: '2024-08-04' },
  { id: 'ORD3141', customer: 'Charlie White', total: 'RM249', status: 'Completed', date: '2024-08-05' },
  { id: 'ORD5161', customer: 'Diane Green', total: 'RM399', status: 'Pending', date: '2024-08-06' },
]);

const activeTab = ref('All');
const searchQuery = ref('');
const selectedStatus = ref('');

const statuses = ['All', 'Placed', 'Completed', 'Pending'];

const filteredOrders = computed(() => {
  // Ensure orders array is initialized and not undefined
  if (!orders.value) return [];
  
  return orders.value.filter(order => 
    (activeTab.value === 'All' || order.status === activeTab.value) &&
    order.id.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
    (selectedStatus.value === '' || order.status === selectedStatus.value)
  );
});

// Function to add a new order (dummy function for now)
const addNewOrder = () => {
  console.log('Adding new order');
};
</script>

<template>
  <div class="container mx-auto p-4">
    <rs-card>
      <template #header>
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold">Customer Order Management</h1>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4 justify-center">
          <rs-card>
            <template #header>
              <h2 class="text-lg font-semibold">Placed Orders</h2>
            </template> 
            <template #body>
              <p class="text-3xl">{{ orders.value?.filter(order => order.status === 'Placed').length || 0 }}</p>
            </template>
          </rs-card>
          <rs-card>
            <template #header>
              <h2 class="text-lg font-semibold">Completed Orders</h2>
            </template>
            <template #body>
              <p class="text-3xl">{{ orders.value?.filter(order => order.status === 'Completed').length || 0 }}</p>
            </template>
          </rs-card>
          <rs-card>
            <template #header>
              <h2 class="text-lg font-semibold">Pending Orders</h2>
            </template>
            <template #body>
              <p class="text-3xl">{{ orders.value?.filter(order => order.status === 'Pending').length || 0 }}</p>
            </template>
          </rs-card>
        </div>

        <rs-tab>
          <rs-tab-item title="All" :active="activeTab === 'All'" @click="activeTab = 'All'">
          </rs-tab-item>
          <rs-tab-item title="Placed" :active="activeTab === 'Placed'" @click="activeTab = 'Placed'">
          </rs-tab-item>
          <rs-tab-item title="Completed" :active="activeTab === 'Completed'" @click="activeTab = 'Completed'">
          </rs-tab-item>
          <rs-tab-item title="Pending" :active="activeTab === 'Pending'" @click="activeTab = 'Pending'">
          </rs-tab-item>
        </rs-tab>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <FormKit
            type="text"
            v-model="searchQuery"
            placeholder="Search Order ID"
            :classes="{
              outer: 'mb-0',
              input: 'w-full'
            }"
          />
          <FormKit
            type="select"
            v-model="selectedStatus"
            :options="['Please Select', ...statuses]"
            placeholder="Select Status"
            :classes="{
              outer: 'mb-0',
              input: 'w-full'
            }"
          />
        </div>

        <rs-table
          v-if="filteredOrders.length > 0"
          :data="filteredOrders"
          :field="['Order ID', 'Customer', 'Total', 'Status', 'Date', 'Action']"
          advanced
          :options-advanced="{
            sortable: true,
            responsive: true
          }"
        >
          <template #Status="{ text }">
            <rs-badge :variant="text === 'Completed' ? 'success' : (text === 'Pending' ? 'warning' : 'danger')">
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
          <img src="/path-to-your-no-order-image.png" alt="No orders" class="mx-auto mb-4" />
          <p class="text-xl font-semibold">No orders under this status or filter</p>
          <p class="text-gray-500">Please check other order status or use other filter.</p>
        </div>
      </template>
    </rs-card>
  </div>
</template>
