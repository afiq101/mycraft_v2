<script setup>

definePageMeta({
  title: "Dashboard",
  layout: "default",
});

import { ref } from 'vue';

const summaryData = ref([
  { title: 'Total Sales', value: 'RM 200,000', icon: 'mdi:trending-up', color: 'text-green-500 bg-green-100' },
  { title: 'Total Orders', value: '1,234', icon: 'mdi:cart', color: 'text-blue-500 bg-blue-100' },
  { title: 'Active Customers', value: '567', icon: 'mdi:account-group', color: 'text-yellow-500 bg-yellow-100' },
  { title: 'Products', value: '150', icon: 'mdi:package', color: 'text-red-500 bg-red-100' },
]);

const recentOrders = ref([
  { id: 'ORD123', customer: 'John Doe', date: '2024-08-01', amount: 'RM 100', status: 'Completed' },
  { id: 'ORD124', customer: 'Jane Smith', date: '2024-08-02', amount: 'RM 150', status: 'Pending' },
  { id: 'ORD125', customer: 'Bob Johnson', date: '2024-08-03', amount: 'RM 200', status: 'Processing' },
  { id: 'ORD126', customer: 'Alice Brown', date: '2024-08-04', amount: 'RM 75', status: 'Completed' },
  { id: 'ORD127', customer: 'Charlie Davis', date: '2024-08-05', amount: 'RM 300', status: 'Pending' },
]);

const alerts = ref([
  { title: 'Low Inventory', message: 'Product A inventory is running low.' },
  { title: 'Pending Orders', message: 'You have 5 orders pending review.' },
]);

// Revenue Trends Chart
const revenueTrendsOptions = ref({
  chart: {
    type: 'line',
    height: 80,
    toolbar: {
      show: false
    }
  },
  series: [{
    name: 'Revenue',
    data: [30000, 40000, 35000, 50000, 49000, 60000, 70000, 91000, 125000]
  }],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  },
  yaxis: {
    title: {
      text: 'Revenue (RM)'
    }
  },
  title: {
    text: 'Monthly Revenue Trend',
    align: 'left',
    style: {
      fontSize: '16px',
      fontWeight: 'bold'
    }
  }
});

// Sales by Product Chart
const salesByProductOptions = ref({
  chart: {
    type: 'pie',
    height: 80,
  },
  series: [44, 55, 13, 43, 22],
  labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'],
  title: {
    text: 'Sales Distribution by Product',
    align: 'left',
    style: {
      fontSize: '16px',
      fontWeight: 'bold'
    }
  }
});
</script>

<template>
  <div class="w-full max-w-[1920px] mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <rs-card v-for="item in summaryData" :key="item.title" class="shadow-sm p-2">
        <template #body>
          <div class="flex items-center mt-3">
            <div :class="[item.color, 'p-3 rounded-full mr-4']">
              <Icon :name="item.icon" size="24" />
            </div>
            <div>
              <h2 class="text-2xl font-bold">{{ item.value }}</h2>
              <p class="text-sm text-gray-500">{{ item.title }}</p>
            </div>
          </div>
        </template>
      </rs-card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
      <rs-card class="shadow-md p-4">
        <template #body>
          <VueApexCharts :options="revenueTrendsOptions" :series="revenueTrendsOptions.series" height="250"/>
        </template>
      </rs-card>

      <rs-card class="shadow-md p-4">
        <template #body>
          <VueApexCharts :options="salesByProductOptions" :series="salesByProductOptions.series" height="250" />
        </template>
      </rs-card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <rs-card class="shadow-sm">
        <template #header>
          <h2 class="text-xl font-bold">Recent Orders</h2>
        </template>
        <template #body>
          <rs-table
            :data="recentOrders"
            :field="['Order ID', 'Customer', 'Date', 'Amount', 'Status']"
            advanced
            :options-advanced="{ sortable: true, responsive: true }"
          >
            <template #Status="{ text }">
              <rs-badge :variant="text === 'Completed' ? 'success' : text === 'Pending' ? 'warning' : 'info'">
                {{ text }}
              </rs-badge>
            </template>
          </rs-table>
        </template>
      </rs-card>

      <rs-card class="shadow-sm">
        <template #header>
          <h2 class="text-xl font-bold">Alerts</h2>
        </template>
        <template #body>
          <div v-for="alert in alerts" :key="alert.title" class="bg-yellow-100 p-4 mb-2 rounded">
            <h3 class="font-bold">{{ alert.title }}</h3>
            <p>{{ alert.message }}</p>
          </div>
        </template>
      </rs-card>
    </div>
  </div>
</template>