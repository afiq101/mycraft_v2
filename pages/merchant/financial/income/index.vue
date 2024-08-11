<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from "vue3-apexcharts";

definePageMeta({
  title: "My Income",
  layout: "default",
});

const activeTab = ref('Income Overview');

const toReleaseAmount = ref(0);
const ordersToBeConfirmed = ref(0);
const toBeReleasedAmount = ref(0);
const releaseDate = ref('12 Aug 2024');

const startDate = ref('');
const endDate = ref('');
const releaseStatus = ref('');
const orderNumber = ref('');

const incomeReportType = ref('Weekly Report');

// Dummy data for the chart
const chartOptions = ref({
  chart: {
    type: 'line',
    height: 200,
  },
  series: [{
    name: 'Balance',
    data: [100, 150, 200, 180, 220, 280, 250]
  }],
  xaxis: {
    categories: ['Jun 1', 'Jun 8', 'Jun 15', 'Jun 22', 'Jun 29', 'Jul 6', 'Jul 13']
  },
  yaxis: {
    title: {
      text: 'Balance (RM)'
    }
  }
});

// Dummy data for the table
const orders = ref([
  { id: '001', creationDate: '2024-06-01', status: 'Completed', releaseAmount: 100, releaseStatus: 'Released', statementNumber: 'ST001' },
  { id: '002', creationDate: '2024-06-15', status: 'Pending', releaseAmount: 150, releaseStatus: 'To Release', statementNumber: 'ST002' },
  { id: '003', creationDate: '2024-07-01', status: 'Completed', releaseAmount: 200, releaseStatus: 'Released', statementNumber: 'ST003' },
]);

const filteredIncome = ref([
      {
        transactionDate: '2024-08-01',
        feeName: 'Processing Fee',
        statementNumber: 'STMT123456',
        amount: '150.00',
        orderDetails: 'Order #1234, Product ABC',
        comment: 'Processed successfully',
        action: 'View'
      },
      {
        transactionDate: '2024-08-02',
        feeName: 'Service Fee',
        statementNumber: 'STMT123457',
        amount: '200.00',
        orderDetails: 'Order #1235, Product XYZ',
        comment: 'Pending approval',
        action: 'View'
      },
      {
        transactionDate: '2024-08-03',
        feeName: 'Transaction Fee',
        statementNumber: 'STMT123458',
        amount: '75.00',
        orderDetails: 'Order #1236, Product LMN',
        comment: 'Completed',
        action: 'View'
      },
      {
        transactionDate: '2024-08-04',
        feeName: 'Late Fee',
        statementNumber: 'STMT123459',
        amount: '50.00',
        orderDetails: 'Order #1237, Product DEF',
        comment: 'Late payment',
        action: 'View'
      },
      {
        transactionDate: '2024-08-05',
        feeName: 'Refund Fee',
        statementNumber: 'STMT123460',
        amount: '100.00',
        orderDetails: 'Order #1238, Product GHI',
        comment: 'Refund processed',
        action: 'View'
      }
    ]);

const filteredOrders = computed(() => {
  return orders.value.filter(order => 
    (!startDate.value || order.creationDate >= startDate.value) &&
    (!endDate.value || order.creationDate <= endDate.value) &&
    (!releaseStatus.value || order.releaseStatus === releaseStatus.value) &&
    (!orderNumber.value || order.id.includes(orderNumber.value))
  );
});

const resetFilters = () => {
  startDate.value = '';
  endDate.value = '';
  releaseStatus.value = '';
  orderNumber.value = '';
};

const downloadOptions = [
  { label: 'June 2024', value: '2024-06' },
  { label: 'July 2024', value: '2024-07' },
  { label: 'August 2024', value: '2024-08' },
];

const downloadReport = (month) => {
  console.log(`Downloading report for ${month}`);
};

onMounted(() => {
  // In a real application, you would fetch data here
  toReleaseAmount.value = 0.00;
  ordersToBeConfirmed.value = 0.00;
  toBeReleasedAmount.value = 0.00;
});
</script>

<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">My Income</h1>
      
      <rs-tab>
        <rs-tab-item title="Income Overview" :active="activeTab === 'Income Overview'" @click="activeTab = 'Income Overview'">

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <rs-card>
              <template #header>
                <h2 class="text-lg font-semibold">Income Overview</h2>
              </template>
              <template #body>
                <div class="mb-4">
                  <h3 class="font-semibold">To Release</h3>
                  <p class="text-2xl font-bold">RM {{ toReleaseAmount.toFixed(2) }}</p>
                </div>
                <div>
                  <p>Orders to be confirmed: RM {{ ordersToBeConfirmed.toFixed(2) }}</p>
                  <p>To be released on {{ releaseDate }}: RM {{ toBeReleasedAmount.toFixed(2) }}</p>
                </div>
              </template>
            </rs-card>
  
            <rs-card class="col-span-2">
              <template #header>
                <div class="flex justify-between items-center">
                  <h2 class="text-lg font-semibold">Income Report</h2>
                  <div class="flex space-x-2"> <!-- Adjusted for one line -->
                    <rs-button variant="primary-outline" size="sm" @click="incomeReportType = 'Weekly Report'">Weekly Report</rs-button>
                    <rs-button variant="primary-outline" size="sm" @click="incomeReportType = 'Monthly Report'">Monthly Report</rs-button>
                  </div>
                </div>
              </template>
              <template #body>
                <VueApexCharts :options="chartOptions" :series="chartOptions.series" height="160" /> <!-- Reduced graph height -->
              </template>
            </rs-card>
          </div>
  
          <rs-card>
            <template #header>
                <div class="flex justify-between items-center">
                <h2 class="text-lg font-semibold">To Release</h2>
                <div class="flex space-x-4">
                    <rs-tab>
                    <rs-tab-item title="To Release" :active="true">
                   
                    </rs-tab-item>
                    <rs-tab-item title="Released">
                    </rs-tab-item>
                    </rs-tab>
                </div>
                </div>
            </template>
            <template #body>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FormKit type="date" v-model="startDate" label="Start Date" />
                <FormKit type="date" v-model="endDate" label="End Date" />
                <FormKit
                  type="select"
                  v-model="releaseStatus"
                  :options="['Please Select', 'To Release', 'Released']"
                  label="Release Status"
                />
                <FormKit type="text" v-model="orderNumber" label="Order No./Order ID" />
              </div>
              <div class="flex justify-between mb-4">
                <rs-button @click="resetFilters">Reset</rs-button>
                <rs-dropdown title="Download">
                  <rs-dropdown-item v-for="option in downloadOptions" :key="option.value" @click="downloadReport(option.value)">
                    {{ option.label }}
                  </rs-dropdown-item>
                </rs-dropdown>
              </div>
              <rs-table
                :data="filteredOrders"
                :field="['Order Details', 'Order Creation Date', 'Order Status', 'Est Release Amount', 'Release Status', 'Statement Number', 'Action']"
                advanced
                :options-advanced="{ sortable: true, responsive: true }"
              >
                <template #Action>
                  <rs-button variant="primary-outline" size="sm">View</rs-button>
                </template>
              </rs-table>
              <div v-if="filteredOrders.length === 0" class="text-center py-4">
                There is no data in the time range you selected
              </div>
            </template>
          </rs-card>
        </rs-tab-item>
  
        <rs-tab-item title="Income Statement" :active="activeTab === 'Income Statement'" @click="activeTab = 'Income Statement'">
            <rs-card>
                <template #header>
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold">View Statements</h2>
                </div>
                </template>
                <template #body>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <FormKit
                    type="select"
                    v-model="releaseStatus"
                    :options="['Please Select', 'Settle to Balance', 'Historically Weekly Statement']"
                    label="Settlement Type"
                    />
                    <FormKit
                    type="select"
                    v-model="releaseStatus"
                    :options="['Please Select', 'Ready to Release', 'Released to Payee Account']"
                    label="Release Status"
                    />
                    <FormKit
                    type="select"
                    v-model="releaseStatus"
                    :options="['Please Select', 'To Release', 'Released']"
                    label="Release Status"
                    />
                    <FormKit type="text" v-model="orderNumber" label="Statement Number" />
                </div>
                <!-- Combine Reset button and Download dropdowns in a single row -->
                <div class="flex justify-between items-center mb-4">
                    <rs-button @click="resetFilters">Reset</rs-button>
                    <rs-dropdown title="Download">
                    <rs-dropdown-item v-for="option in downloadOptions" :key="option.value" @click="downloadReport(option.value)">
                        {{ option.label }}
                    </rs-dropdown-item>
                    </rs-dropdown>
                </div>
                <rs-table
                    :data="filteredOrders"
                    :field="['Statement Number', 'Statement Period', 'Released Amount', 'Release Status', 'Action']"
                    advanced
                    :options-advanced="{ sortable: true, responsive: true }"
                >
                    <template #Action>
                    <rs-button variant="primary-outline" size="sm">View</rs-button>
                    </template>
                </rs-table>
                <div v-if="filteredOrders.length === 0" class="text-center py-4">
                    There is no data in the time range you selected
                </div>
                </template>
            </rs-card>
            </rs-tab-item>

        <rs-tab-item title="Income Details" :active="activeTab === 'Income Details'" @click="activeTab = 'Income Details'">
          <rs-card class="p-4">
            <h2 class="text-lg font-semibold p-3">Income Details</h2>
            <template #body>
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 mt-4 p-4">
                <FormKit type="date" v-model="startDate" label="Start Date" />
                <FormKit type="date" v-model="endDate" label="End Date" />
                <FormKit
                  type="select"
                  v-model="releaseStatus"
                  :options="['Please Select', 'To Release', 'Released']"
                  label="Release Status"
                />
                <FormKit type="text" v-model="orderNumber" label="Order No./Order ID" />
              </div>
              <div class="flex justify-between mb-4">
                <rs-button @click="resetFilters">Reset</rs-button>
                <rs-dropdown title="Download">
                  <rs-dropdown-item v-for="option in downloadOptions" :key="option.value" @click="downloadReport(option.value)">
                    {{ option.label }}
                  </rs-dropdown-item>
                </rs-dropdown>
              </div>
              <div class="flex flex-1 gap-6 items-center justify-center">
                <rs-card class="flex flex-1">
              <template #body>
                <div class="p-2 mt-4">
                  <h4 class="font-semibold">Total Amount</h4>
                  <p class="text-2xl font-bold">RM {{ toReleaseAmount.toFixed(2) }}</p>
                </div>
              </template>
            </rs-card>
            <rs-card class="flex flex-1">
              <template #body>
                <div class="p-2 mt-4">
                  <h4 class="font-semibold">Revenue</h4>
                  <p class="text-2xl font-bold">RM {{ toReleaseAmount.toFixed(2) }}</p>
                </div>
              </template>
            </rs-card>
            <rs-card class="flex flex-1">
              <template #body>
                <div class="p-2 mt-4">
                  <h4 class="font-semibold">Deductions</h4>
                  <p class="text-2xl font-bold">RM {{ toReleaseAmount.toFixed(2) }}</p>
                </div>
              </template>
            </rs-card>
              </div>
            
                <rs-table
                    :data="filteredIncome"
                    :field="['Transaction Date', 'Fee Name', 'Statement Number','Amount', 'Order Details', 'Comment','Action']"
                    advanced
                    :options-advanced="{ sortable: true, responsive: true }"
                >
                    <template #Action>
                    <rs-button variant="primary-outline" size="sm">View</rs-button>
                    </template>
                </rs-table>
              <div v-if="filteredIncome.length === 0" class="text-center py-4">
                There is no data in the time range you selected
              </div>
            </template>
          </rs-card>
        </rs-tab-item>
        <rs-tab-item title="My Invoice" :active="activeTab === 'My Invoice'" @click="activeTab = 'My Invoice'">
          
            <rs-card>
                <template #header>
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold">Invoice List</h2>
                </div>
                </template>
                <template #body>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <FormKit
                    type="select"
                    v-model="releaseStatus"
                    :options="['Please Select', 'Invoice', 'Credit Note', 'Invoice (Month End)']"
                    label="Type"
                    />
                </div>
                <rs-table
                    :data="filteredOrders"
                    :field="['Statement Number', 'Statement Period', 'Released Amount', 'Release Status', 'Action']"
                    advanced
                    :options-advanced="{ sortable: true, responsive: true }"
                >
                    <template #Action>
                    <rs-button variant="primary-outline" size="sm">View</rs-button>
                    </template>
                </rs-table>
                <div v-if="filteredOrders.length === 0" class="text-center py-4">
                    There is no data in the time range you selected
                </div>
                </template>
            </rs-card>
        </rs-tab-item>
      </rs-tab>
    </div>
  </template>
  