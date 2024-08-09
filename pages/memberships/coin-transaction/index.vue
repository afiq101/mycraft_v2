<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  title: "Coins Transactions",
  layout: "default",
});

const transactions = ref([]);
const isLoading = ref(true);

const fetchTransactions = async () => {
  // Simulating an API call with setTimeout
  setTimeout(() => {
    transactions.value = [
    { 
        id: 1, 
        coinsAmount: 100, 
        transactionType: 'Received', 
        convertedAmount: 25, 
        transactionNumber: 'TXN123456',
        orderNumber: 'ORD987654',
        status: 'Completed',
        datetime: '2023-04-01 09:30:00' 
      },
      { 
        id: 2, 
        coinsAmount: -50, 
        transactionType: 'Used', 
        convertedAmount: 12.5, 
        transactionNumber: 'TXN654321',
        orderNumber: 'ORD123456',
        status: 'Pending',
        datetime: '2023-04-02 14:45:00' 
      },
      { 
        id: 3, 
        coinsAmount: 200, 
        transactionType: 'Received', 
        convertedAmount: 50, 
        transactionNumber: 'TXN789012',
        orderNumber: 'ORD654321',
        status: 'Failed',
        datetime: '2023-03-30 11:20:00' 
      },
      { 
        id: 4, 
        coinsAmount: -75, 
        transactionType: 'Used', 
        convertedAmount: 18.75, 
        transactionNumber: 'TXN890123',
        orderNumber: 'ORD789012',
        status: 'Completed',
        datetime: '2023-04-03 10:10:00' 
      },
      { 
        id: 5, 
        coinsAmount: 150, 
        transactionType: 'Received', 
        convertedAmount: 37.5, 
        transactionNumber: 'TXN901234',
        orderNumber: 'ORD890123',
        status: 'Pending',
        datetime: '2023-04-04 12:00:00' 
      },
      { 
        id: 6, 
        coinsAmount: -100, 
        transactionType: 'Used', 
        convertedAmount: 25, 
        transactionNumber: 'TXN012345',
        orderNumber: 'ORD901234',
        status: 'Completed',
        datetime: '2023-04-05 14:30:00' 
      },
      { 
        id: 7, 
        coinsAmount: 50, 
        transactionType: 'Received', 
        convertedAmount: 12.5, 
        transactionNumber: 'TXN234567',
        orderNumber: 'ORD012345',
        status: 'Failed',
        datetime: '2023-04-06 16:45:00' 
      },
    ];
    isLoading.value = false;
  }, 1000); // Simulate a 1-second delay
};

onMounted(fetchTransactions);

const getStatusVariant = (status) => {
  switch (status) {
    case 'Completed': return 'success';
    case 'Pending': return 'warning';
    case 'Failed': return 'danger';
    default: return 'secondary';
  }
};

const getTransactionTypeVariant = (type) => {
  return type === 'Received' ? 'primary' : 'info';
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">COINS TRANSACTIONS</h1>

    <rs-card>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Transaction Listings</h2>
        </div>
      </template>
      <template #body>
        <div v-if="isLoading" class="text-center py-4">
          Loading...
        </div>
        <rs-table 
          v-else
          :data="transactions" 
          :field="['Coins Amount', 'Transaction Type', 'Converted Amount', 'Transaction Number', 'Order Number', 'Status', 'Date/Time', 'Action']" 
          advanced
        >
          <template #CoinsAmount="{ value }">{{ value.coinsAmount }}</template>
          <template #TransactionType="{ value }">
            <rs-badge :variant="getTransactionTypeVariant(value.transactionType)">{{ value.transactionType }}</rs-badge>
          </template>
          <template #ConvertedAmount="{ value }">RM {{ value.convertedAmount.toFixed(2) }}</template>
          <template #TransactionNumber="{ value }">{{ value.transactionNumber }}</template>
          <template #OrderNumber="{ value }">{{ value.orderNumber }}</template>
          <template #Status="{ value }">
            <rs-badge :variant="getStatusVariant(value.status)">{{ value.status }}</rs-badge>
          </template>
          <template #DateTime="{ value }">{{ value.datetime }}</template>
          <template #Action="{ row }">
            <div class="flex space-x-2">
              <rs-button 
                variant="primary" 
                size="sm"
                @click="viewTransactionDetails(row)"
              >
                View Details
              </rs-button>
            </div>
          </template>
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>
