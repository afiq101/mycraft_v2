<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold flex flex-col justify-between gap-4">
      <div>Order Details</div>

      <!-- Other Actions -->
      <!-- Genrate consignment button, print button, etc. -->
      <div class="">
        <div class="flex flex-wrap gap-2">
          <button
            @click="generateConsignment"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Generate Consignment

            <span><Icon name="material-symbols:download" size="19" /></span>
          </button>

          <button
            @click="printOrder"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Print Order

            <span><Icon name="material-symbols:print" size="19" /></span>
          </button>

          <button
            @click="sendEmail"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Send Email

            <span
              ><Icon name="material-symbols:alternate-email" size="19"
            /></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Order Information -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Order Information</div>
      <div class="grid grid-cols-2 gap-4">
        <div><span class="font-semibold">Order ID:</span> {{ order.id }}</div>
        <div>
          <span class="font-semibold">Order Date:</span> {{ order.date }}
        </div>
        <div>
          <span class="font-semibold">Status:</span>
          <span
            :class="{
              'bg-green-100 text-green-800': order.status === 'paid',
              'bg-yellow-100 text-yellow-800': order.status === 'unpaid',
              'bg-red-100 text-red-800': order.status === 'cancelled',
              'bg-blue-100 text-blue-800': order.status === 'shipped',
              'bg-indigo-100 text-indigo-800': order.status === 'delivered',
              'bg-purple-100 text-purple-800': order.status === 'refund',
              'bg-orange-100 text-orange-800': order.status === 'return',
              'bg-teal-100 text-teal-800': order.status === 'completed',
            }"
            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
          >
            {{ order.status }}
          </span>
        </div>
        <div>
          <span class="font-semibold">Total Amount:</span>
          {{ order.total | currency }}
        </div>
      </div>
    </div>

    <!-- Customer Information -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Customer Information</div>
      <div class="grid grid-cols-2 gap-4">
        <div><span class="font-semibold">Name:</span> {{ customer.name }}</div>
        <div>
          <span class="font-semibold">Email:</span> {{ customer.email }}
        </div>
        <div>
          <span class="font-semibold">Phone:</span> {{ customer.phone }}
        </div>
        <div>
          <span class="font-semibold">Address:</span> {{ customer.address }}
        </div>
      </div>
    </div>

    <!-- Product List -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Products</div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(product, index) in order.products" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.quantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.price | currency }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ (product.quantity * product.price) | currency }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Status Update -->
    <div class="pb-20">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-lg font-medium mb-4">Update Order Status</div>
        <div class="grid grid-cols-2 gap-4 items-center">
          <select
            v-model="order.status"
            class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="cancelled">Cancelled</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="refund">Refund</option>
            <option value="return">Return</option>
            <option value="completed">Completed</option>
          </select>
          <button
            @click="updateStatus"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  title: "Order Management - Detail",
});

// Mock data for order and customer details
const order = ref({
  id: "12345",
  date: "2023-08-09",
  status: "paid",
  total: 150.0,
  products: [
    { name: "Product 1", quantity: 2, price: 25.0 },
    { name: "Product 2", quantity: 3, price: 30.0 },
  ],
});

const customer = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  address: "123 Main St, Springfield, IL",
});

const updateStatus = () => {
  console.log("Order status updated to:", order.value.status);
};
</script>

<style scoped>
/* Add custom styles here */
</style>
