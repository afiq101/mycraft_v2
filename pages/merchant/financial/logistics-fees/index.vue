<script setup>
definePageMeta({
  title: "Logistics Fee",
  layout: "default",
});

import { ref, computed } from 'vue';

const activeTab = ref('Statements');
const statementNo = ref('');
const statementPeriod = ref('');

const statementPeriods = [
  { label: 'January 2024', value: '2024-01' },
  { label: 'February 2024', value: '2024-02' },
  { label: 'March 2024', value: '2024-03' },
  { label: 'April 2024', value: '2024-04' },
];

// Dummy data for statements
const statements = ref([
  { period: '2024-01', accountStatement: 'ST001', totalFees: 150.00 },
  { period: '2024-02', accountStatement: 'ST002', totalFees: 200.50 },
  { period: '2024-03', accountStatement: 'ST003', totalFees: 175.25 },
  { period: '2024-04', accountStatement: 'ST004', totalFees: 225.75 },
]);

const filteredStatements = computed(() => {
  return statements.value.filter(statement => 
    (statementNo.value === '' || statement.accountStatement.includes(statementNo.value)) &&
    (statementPeriod.value === '' || statement.period === statementPeriod.value)
  );
});

const itemsPerPage = ref(10);
const currentPage = ref(1);

const paginatedStatements = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredStatements.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredStatements.value.length / itemsPerPage.value));

const search = () => {
  console.log('Searching...');
  // Implement actual search logic here
};

const exportData = () => {
  console.log('Exporting data...');
  // Implement actual export logic here
};

const weightSuggestion = () => {
  console.log('Opening weight suggestion...');
  // Implement weight suggestion logic here
};

// Dummy data for Order Fees
const orderFees = ref([
  { orderNo: 'ORD001', feeType: 'Shipping', amount: 50.00 },
  { orderNo: 'ORD002', feeType: 'Handling', amount: 20.00 },
  { orderNo: 'ORD003', feeType: 'Insurance', amount: 30.00 },
]);

// Dummy data for Non-order Fees
const nonOrderFees = ref([
  {
    fulfillmentSKU: 'SKU001',
    storageMonth: '2024-01',
    accountStatement: 'ST001',
    warehouse: 'Warehouse A',
    storageFees: 120.00,
    storageDuration: '30 days',
  },
  {
    fulfillmentSKU: 'SKU002',
    storageMonth: '2024-02',
    accountStatement: 'ST002',
    warehouse: 'Warehouse B',
    storageFees: 150.50,
    storageDuration: '28 days',
  },
  {
    fulfillmentSKU: 'SKU003',
    storageMonth: '2024-03',
    accountStatement: 'ST003',
    warehouse: 'Warehouse C',
    storageFees: 200.75,
    storageDuration: '31 days',
  },
  {
    fulfillmentSKU: 'SKU004',
    storageMonth: '2024-04',
    accountStatement: 'ST004',
    warehouse: 'Warehouse A',
    storageFees: 180.25,
    storageDuration: '30 days',
  },
  {
    fulfillmentSKU: 'SKU005',
    storageMonth: '2024-05',
    accountStatement: 'ST005',
    warehouse: 'Warehouse B',
    storageFees: 140.00,
    storageDuration: '29 days',
  },
]);

const formatPeriod = (period) => {
  const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };
  const [year, month] = period.split('-');
  return `${months[month]} ${year}`;
};


const formatCurrency = (amount) => `MYR ${amount.toFixed(2)}`;
</script>


<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Logistics Fee</h1>

    <rs-tab>
      <rs-tab-item title="Statements" :active="activeTab === 'Statements'" @click="activeTab = 'Statements'">
        <div class="py-4">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
              <FormKit
                type="text"
                v-model="statementNo"
                placeholder="Statement No."
                :classes="{
                  outer: 'mb-0',
                  input: 'w-40'
                }"
              />
              <FormKit
                type="select"
                v-model="statementPeriod"
                :options="statementPeriods"
                placeholder="Statement Period"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-48'
                }"
              />
              <rs-button @click="search">Search</rs-button>
            </div>
            <div class="flex items-center space-x-2">
              <rs-dropdown title="Export">
                <rs-dropdown-item @click="exportData">Export Data</rs-dropdown-item>
              </rs-dropdown>
              <rs-button variant="primary-outline" @click="weightSuggestion">Weight Suggestion</rs-button>
            </div>
          </div>

          <rs-table
            :data="paginatedStatements"
            :field="['Account Statement Period', 'Account Statement', 'Total Fees']"
            advanced
            :options-advanced="{ sortable: true, responsive: true }"
          >
            <template #AccountStatementPeriod="{ text }">
              {{ formatPeriod(text) }}
            </template>
            <template #TotalFees="{ text }">
              {{ formatCurrency(text) }}
            </template>
          </rs-table>

          <div v-if="paginatedStatements.length === 0" class="text-center py-4">
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
      <rs-tab-item title="Order Fees" :active="activeTab === 'Order Fees'" @click="activeTab = 'Order Fees'">
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
                <FormKit
                type="text"
                v-model="statementNo"
                placeholder="Order No"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-40'
                }"
              />
              <FormKit
                type="select"
                v-model="statementPeriod"
                :options="statementPeriods"
                placeholder="Statement Period"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-48'
                }"
              />

              <FormKit
                type="select"
                v-model="statementPeriod"
                :options="['No Data']"
                placeholder="Select Fee Name"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-48'
                }"
              />
              <rs-button @click="search">Search</rs-button>
            </div>
            <div class="flex items-center space-x-2">
              <rs-dropdown title="Export">
                <rs-dropdown-item @click="exportData">Export Data</rs-dropdown-item>
              </rs-dropdown>
              </div>
          </div>
        <div class="py-4">
          <rs-table
            :data="orderFees"
            :field="['Order No', 'Fee Type', 'Amount']"
            advanced
            :options-advanced="{ sortable: true, responsive: true }"
          >
            <template #Amount="{ text }">
              {{ formatCurrency(text) }}
            </template>
          </rs-table>
        </div>
      </rs-tab-item>
      <rs-tab-item title="Non-order Fees" :active="activeTab === 'Non-order Fees'" @click="activeTab = 'Non-order Fees'">
        <div class="p-4">
          <div class="flex justify-between items-center ">
            <div class="flex items-center space-x-2">
             
              <FormKit
                type="select"
                v-model="statementPeriod"
                :options="statementPeriods"
                placeholder="Statement Period"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-48'
                }"
              />
              <FormKit
                type="text"
                v-model="statementNo"
                placeholder="Fulfillment SKU"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-40'
                }"
              />
              <FormKit
                type="select"
                v-model="statementPeriod"
                :options="['Warehouse A', 'Warehouse B', 'Warehouse C']"
                placeholder="Warehouse"
                :classes="{
                  outer: 'mb-0',
                  input: 'w-48'
                }"
              />
              <rs-button @click="search">Search</rs-button>
            </div>
            <div class="flex items-center space-x-2">
              <rs-dropdown title="Export">
                <rs-dropdown-item @click="exportData">Export Data</rs-dropdown-item>
              </rs-dropdown>
              </div>
          </div>

          <div v-if="paginatedStatements.length === 0" class="text-center py-4">
            No Data
          </div>
        </div>
        <div class="py-4">
          <rs-table
            :data="nonOrderFees"
            :field="['Fulfillment SKU', 'Storage Month','Account Statement','Warehouse','Storage Fees','Storage Duration']"
            advanced
            :options-advanced="{ sortable: true, responsive: true }"
          >
            <template #Amount="{ text }">
              {{ formatCurrency(text) }}
            </template>
          </rs-table>
        </div>
      </rs-tab-item>
    </rs-tab>
  </div>
</template>
