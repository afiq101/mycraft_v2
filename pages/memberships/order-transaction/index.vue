<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  title: "Order Transactions",
  layout: "default",
});

const orders = ref([]);
const isLoading = ref(true);

const fetchOrders = async () => {
  // Simulating an API call with setTimeout
  setTimeout(() => {
    orders.value = [
      { 
        id: 1, 
        orderNumber: 'ORD123456', 
        customerName: 'John Doe', 
        orderDateTime: '2023-04-01 09:30:00', 
        orderStatus: 'Completed', 
        paymentMethod: 'Credit Card', 
        totalAmount: 150.00, 
        shippingAddress: '123 Main St, Cityville', 
        itemsOrdered: 'Item1, Item2, Item3', 
        transactionNumber: 'TXN987654',
        shippingMethod: 'Express',
        deliveryDateTime: '2023-04-05 12:00:00',
        contactNumber: '+1 234 567 8901'
      },
      { 
        id: 2, 
        orderNumber: 'ORD654321', 
        customerName: 'Jane Smith', 
        orderDateTime: '2023-04-02 14:45:00', 
        orderStatus: 'Pending', 
        paymentMethod: 'PayPal', 
        totalAmount: 200.00, 
        shippingAddress: '456 Elm St, Townsville', 
        itemsOrdered: 'Item4, Item5', 
        transactionNumber: 'TXN654321',
        shippingMethod: 'Standard',
        deliveryDateTime: '2023-04-08 14:00:00',
        contactNumber: '+1 234 567 8902'
      },
      { 
        id: 3, 
        orderNumber: 'ORD789012', 
        customerName: 'Bob Johnson', 
        orderDateTime: '2023-04-03 10:10:00', 
        orderStatus: 'Shipped', 
        paymentMethod: 'Bank Transfer', 
        totalAmount: 350.00, 
        shippingAddress: '789 Oak St, Villagetown', 
        itemsOrdered: 'Item6, Item7, Item8', 
        transactionNumber: 'TXN789012',
        shippingMethod: 'Express',
        deliveryDateTime: '2023-04-06 09:30:00',
        contactNumber: '+1 234 567 8903'
      },
      { 
        id: 4, 
        orderNumber: 'ORD890123', 
        customerName: 'Alice Brown', 
        orderDateTime: '2023-04-04 12:00:00', 
        orderStatus: 'Cancelled', 
        paymentMethod: 'Credit Card', 
        totalAmount: 100.00, 
        shippingAddress: '101 Pine St, Hamletton', 
        itemsOrdered: 'Item9', 
        transactionNumber: 'TXN890123',
        shippingMethod: 'Standard',
        deliveryDateTime: '2023-04-10 16:00:00',
        contactNumber: '+1 234 567 8904'
      },
      { 
        id: 5, 
        orderNumber: 'ORD012345', 
        customerName: 'Charlie Davis', 
        orderDateTime: '2023-04-05 14:30:00', 
        orderStatus: 'Completed', 
        paymentMethod: 'Debit Card', 
        totalAmount: 250.00, 
        shippingAddress: '202 Cedar St, Metropolis', 
        itemsOrdered: 'Item10, Item11', 
        transactionNumber: 'TXN012345',
        shippingMethod: 'Express',
        deliveryDateTime: '2023-04-09 11:00:00',
        contactNumber: '+1 234 567 8905'
      },
      // Add more orders as needed
    ];
    isLoading.value = false;
  }, 1000); // Simulate a 1-second delay
};

onMounted(fetchOrders);

const getOrderStatusVariant = (status) => {
  switch (status) {
    case 'Completed': return 'success';
    case 'Pending': return 'warning';
    case 'Shipped': return 'info';
    case 'Cancelled': return 'danger';
    default: return 'secondary';
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">ORDER TRANSACTIONS</h1>

    <!-- Filters Card -->
    <rs-card class="mb-8 p-4 bg-white shadow-md rounded-lg">
      <div class="flex justify-between items-center space-x-4">
        <nuxt-link to="/memberships/coin-transaction">
        <rs-button variant="primary" class="flex-1 p-2">
          Coin Transactions
        </rs-button></nuxt-link>
        <nuxt-link to="/memberships/voucher-transaction">
        <rs-button variant="primary" class="flex-1 p-2">
          Voucher Transactions
        </rs-button></nuxt-link>
        <nuxt-link to="/administrators/create-admin/audit-trails">
        <rs-button variant="primary" class="flex-1 p-2">
          Activity Logs
        </rs-button></nuxt-link>
        <nuxt-link to="/memberships/social-activity">
        <rs-button variant="primary" class="flex-1 p-2">
          Social Activities
        </rs-button></nuxt-link>
        <nuxt-link to="/memberships/referral">
        <rs-button variant="primary" class="flex-1 p-2">
          Referral Listing
        </rs-button></nuxt-link>
      </div>
    </rs-card>

    <rs-card>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Order Listings</h2>
        </div>
      </template>
      <template #body>
        <div v-if="isLoading" class="text-center py-4">
          Loading...
        </div>
        <rs-table 
          v-else
          :data="orders" 
          :field="['Order Number', 'Customer Name', 'Order DateTime', 'Order Status', 'Payment Method', 'Total Amount', 'Shipping Address', 'Items Ordered', 'Transaction Number', 'Shipping Method', 'Delivery Date/Time', 'Contact Number', 'Action']" 
          advanced
        >
          <template #OrderNumber="{ value }">{{ value.orderNumber }}</template>
          <template #OrderDateTime="{ value }">{{ value.orderDateTime }}</template>
          <template #OrderStatus="{ value }">
            <rs-badge :variant="getOrderStatusVariant(value.orderStatus)">{{ value.orderStatus }}</rs-badge>
          </template>
          <template #PaymentMethod="{ value }">{{ value.paymentMethod }}</template>
          <template #TotalAmount="{ value }">RM {{ value.totalAmount.toFixed(2) }}</template>
          <template #ShippingAddress="{ value }">{{ value.shippingAddress }}</template>
          <template #ItemsOrdered="{ value }">{{ value.itemsOrdered }}</template>
          <template #TransactionNumber="{ value }">{{ value.transactionNumber }}</template>
          <template #ShippingMethod="{ value }">{{ value.shippingMethod }}</template>
          <template #DeliveryDateTime="{ value }">{{ value.deliveryDateTime }}</template>
          <template #ContactNumber="{ value }">{{ value.contactNumber }}</template>
          <template #Action="{ row }">
            <div class="flex space-x-2">
              <rs-button 
                variant="primary" 
                size="sm"
                @click="viewOrderDetails(row)"
              >
                View Details
              </rs-button>
              <rs-button 
                variant="danger" 
                size="sm"
                @click="deleteOrder(row)"
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

<style scoped>
/* Add any custom styles here */
</style>
