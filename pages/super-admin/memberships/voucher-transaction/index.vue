<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  title: "Voucher Transactions",
  layout: "default",
});

const voucherTransactions = ref([]);
const isLoading = ref(true);

const fetchVoucherTransactions = async () => {
  // Simulating an API call with setTimeout
  setTimeout(() => {
    voucherTransactions.value = [
      { 
        id: 1, 
        voucherName: 'Spring Sale 2023', 
        voucherType: 'Percentage', 
        discountPrice: '20%', 
        transactionNumber: 'TXN123456',
        orderNumber: 'ORD987654',
        status: 'Redeemed',
        datetime: '2023-04-01 09:30:00' 
      },
      { 
        id: 2, 
        voucherName: 'Black Friday Special', 
        voucherType: 'Fixed Amount', 
        discountPrice: 'RM 50', 
        transactionNumber: 'TXN654321',
        orderNumber: 'ORD123456',
        status: 'Expired',
        datetime: '2023-04-02 14:45:00' 
      },
      { 
        id: 3, 
        voucherName: 'New Year Offer', 
        voucherType: 'Percentage', 
        discountPrice: '15%', 
        transactionNumber: 'TXN789012',
        orderNumber: 'ORD654321',
        status: 'Pending',
        datetime: '2023-03-30 11:20:00' 
      },
      { 
        id: 4, 
        voucherName: 'Holiday Discount', 
        voucherType: 'Fixed Amount', 
        discountPrice: 'RM 100', 
        transactionNumber: 'TXN890123',
        orderNumber: 'ORD789012',
        status: 'Redeemed',
        datetime: '2023-04-03 10:10:00' 
      },
      { 
        id: 5, 
        voucherName: 'Summer Sale', 
        voucherType: 'Percentage', 
        discountPrice: '10%', 
        transactionNumber: 'TXN901234',
        orderNumber: 'ORD890123',
        status: 'Expired',
        datetime: '2023-04-04 12:00:00' 
      },
      { 
        id: 6, 
        voucherName: 'Flash Deal', 
        voucherType: 'Fixed Amount', 
        discountPrice: 'RM 20', 
        transactionNumber: 'TXN012345',
        orderNumber: 'ORD901234',
        status: 'Pending',
        datetime: '2023-04-05 14:30:00' 
      },
      { 
        id: 7, 
        voucherName: 'Year-End Clearance', 
        voucherType: 'Percentage', 
        discountPrice: '25%', 
        transactionNumber: 'TXN234567',
        orderNumber: 'ORD012345',
        status: 'Redeemed',
        datetime: '2023-04-06 16:45:00' 
      },
    ];
    isLoading.value = false;
  }, 1000); // Simulate a 1-second delay
};

onMounted(fetchVoucherTransactions);

const getStatusVariant = (status) => {
  switch (status) {
    case 'Redeemed': return 'success';
    case 'Expired': return 'danger';
    case 'Pending': return 'warning';
    default: return 'secondary';
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">VOUCHER TRANSACTIONS</h1>

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
          :data="voucherTransactions" 
          :field="['Voucher Name', 'Voucher Type', 'Discount Price', 'Order Number', 'Transaction Number', 'Date/Time', 'Status', 'Action']" 
          advanced
        >
          <template #VoucherName="{ value }">{{ value.voucherName }}</template>
          <template #VoucherType="{ value }">{{ value.voucherType }}</template>
          <template #DiscountPrice="{ value }">{{ value.discountPrice }}</template>
          <template #OrderNumber="{ value }">{{ value.orderNumber }}</template>
          <template #TransactionNumber="{ value }">{{ value.transactionNumber }}</template>
          <template #DateTime="{ value }">{{ value.datetime }}</template>
          <template #Status="{ value }">
            <rs-badge :variant="getStatusVariant(value.status)">{{ value.status }}</rs-badge>
          </template>
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
