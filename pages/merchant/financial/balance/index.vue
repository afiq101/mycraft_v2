<script setup>
definePageMeta({
  title: "My Balance",
  layout: "default",
});

import { ref, computed } from 'vue';

const totalBalance = ref(2450.75);
const transactionTypes = ['Deposit', 'Withdrawal', 'Payment', 'Penalty', 'Adjustment'];
const selectedTypes = ref([]);
const startDate = ref('2024-02-10');
const endDate = ref('2024-08-10');
const transactionNumber = ref('');
const itemsPerPage = ref(10);
const currentPage = ref(1);

const transactions = ref([
  {
    number: 'TXN001',
    date: '2024-03-01',
    time: '10:30 AM',
    type: 'Deposit',
    subType: 'Bank Transfer',
    amount: '1000.00',
    remarks: 'Initial deposit',
  },
  {
    number: 'TXN002',
    date: '2024-03-15',
    time: '02:45 PM',
    type: 'Withdrawal',
    subType: 'Bank Transfer',
    amount: '-500.00',
    remarks: 'Withdrawal to bank account',
  },
  {
    number: 'TXN003',
    date: '2024-04-10',
    time: '01:20 PM',
    type: 'Payment',
    subType: 'Service Payment',
    amount: '-150.00',
    remarks: 'Service fee payment',
  },
  {
    number: 'TXN004',
    date: '2024-05-05',
    time: '09:00 AM',
    type: 'Penalty',
    subType: 'Late Payment',
    amount: '-50.00',
    remarks: 'Late fee for missed payment',
  },
  {
    number: 'TXN005',
    date: '2024-06-20',
    time: '04:00 PM',
    type: 'Adjustment',
    subType: 'Balance Adjustment',
    amount: '200.00',
    remarks: 'Adjustment due to overcharge',
  },
  {
    number: 'TXN006',
    date: '2024-07-10',
    time: '11:15 AM',
    type: 'Deposit',
    subType: 'Bank Transfer',
    amount: '750.00',
    remarks: 'Additional deposit',
  },
  {
    number: 'TXN007',
    date: '2024-07-25',
    time: '03:30 PM',
    type: 'Payment',
    subType: 'Service Payment',
    amount: '-100.00',
    remarks: 'Monthly service fee',
  },
  {
    number: 'TXN008',
    date: '2024-08-05',
    time: '10:00 AM',
    type: 'Withdrawal',
    subType: 'Bank Transfer',
    amount: '-300.00',
    remarks: 'Partial withdrawal to bank',
  },
]);

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => 
    (selectedTypes.value.length === 0 || selectedTypes.value.includes(transaction.type)) &&
    transaction.date >= startDate.value &&
    transaction.date <= endDate.value &&
    (transactionNumber.value === '' || transaction.number.includes(transactionNumber.value))
  );
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage.value));

const resetFilters = () => {
  selectedTypes.value = [];
  startDate.value = '2024-02-10';
  endDate.value = '2024-08-10';
  transactionNumber.value = '';
};

const exportTransactions = () => {
  console.log('Exporting transactions...');
};

const withdraw = () => {
  console.log('Initiating withdrawal...');
};

const manageAccount = () => {
  console.log('Managing account...');
};
</script>


<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">My Balance</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <rs-card class="col-span-2">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">Total Balance</h2>
            <a href="#" class="text-blue-500 text-sm">Learn more about balance account</a>
          </div>
        </template>
        <template #body>
          <div class="flex justify-between items-center">
            <p class="text-3xl font-bold">MYR {{ totalBalance.toFixed(2) }}</p>
            <rs-button @click="withdraw">Withdraw</rs-button>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            Your balance will be auto paid to your bank account once a week, and shop owner can initiate withdraw once a day.
          </p>
        </template>
      </rs-card>

      <rs-card>
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">Payee Account</h2>
            <rs-button variant="primary-outline" size="sm" @click="manageAccount">Manage Account</rs-button>
          </div>
        </template>
        <template #body>
          <div class="flex items-center justify-center h-24">
            <div class="text-center">
              <Icon name="mdi:information-outline" size="48" class="text-blue-500 mb-2" />
              <p class="text-sm">You don't have bank account yet, please add bank account first</p>
            </div>
          </div>
        </template>
      </rs-card>
    </div>

    <rs-card>
      <template #header>
        <h2 class="text-lg font-semibold">Balance Transactions</h2>
      </template>
      <template #body>
        <p class="text-sm text-gray-600 mb-4">
          You can review history transactions listed below for the past 180 days, and if you want to trace back more transactions, can select relevant time period.
        </p>

        <div class="flex flex-wrap gap-2 mb-4">
          <rs-button 
            v-for="type in transactionTypes" 
            :key="type"
            :variant="selectedTypes.includes(type) ? 'primary' : 'primary-outline'"
            size="sm"
            @click="selectedTypes.includes(type) ? selectedTypes = selectedTypes.filter(t => t !== type) : selectedTypes.push(type)"
          >
            {{ type }}
          </rs-button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <FormKit type="date" v-model="startDate" label="Start Date" />
          <FormKit type="date" v-model="endDate" label="End Date" />
          <FormKit type="text" v-model="transactionNumber" label="Transaction Number" />
        </div>

        <div class="flex justify-between mb-4">
          <rs-button @click="resetFilters" variant="secondary">Reset</rs-button>
          <rs-dropdown title="Export">
            <rs-dropdown-item @click="exportTransactions">Export Transactions</rs-dropdown-item>
          </rs-dropdown>
        </div>

        <rs-table
          :data="paginatedTransactions"
          :field="['Transaction Number', 'Transaction Time', 'Type', 'Sub Type', 'Amount', 'Remarks']"
          advanced
          :options-advanced="{ sortable: true, responsive: true }"
        />

        <div v-if="paginatedTransactions.length === 0" class="text-center py-4">
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
                outer: 'inline-block',
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
      </template>
    </rs-card>
  </div>
</template>