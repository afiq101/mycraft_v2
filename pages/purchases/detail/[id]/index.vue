<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

definePageMeta({
  title: "Order Details",
  layout: "default",
});

const route = useRoute();
const orderId = route.params.id;

const order = ref(null);
const loading = ref(true);

// Mock function to fetch order details (replace with actual API call)
const fetchOrderDetails = async (id) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock data
  return {
    id: id,
    date: "2023-06-15T14:30:00Z",
    total: 6294,
    status: "Delivered",
    items: [
      {
        id: 1,
        name: "Iphone 13 Pro Max",
        quantity: 1,
        price: 5094,
        image:
          "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pro-max-silver-select?wid=940&hei=1112&fmt=png-alpha&.v=1645552346280",
      },
      {
        id: 2,
        name: "3060 Ti",
        quantity: 2,
        price: 1200,
        image:
          "https://my-test-11.slatic.net/p/4f150e4d33381f40868350828304622f.png",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "ST",
      zipCode: "12345",
      country: "United States",
    },
    paymentMethod: "Credit Card (Visa ****1234)",
    shippingMethod: "Standard Shipping",
    trackingNumber: "TRACK123456789",
  };
};

onMounted(async () => {
  try {
    order.value = await fetchOrderDetails(orderId);
  } catch (error) {
    console.error("Failed to fetch order details:", error);
    // Handle error (e.g., show error message to user)
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <rs-card v-if="loading">
        <template #body>
          <div class="flex justify-center items-center h-64">
            <Icon
              name="mdi:loading"
              class="animate-spin h-8 w-8 text-gray-500"
            />
          </div>
        </template>
      </rs-card>

      <rs-card v-else-if="order">
        <template #header>
          <div class="flex justify-between items-center">
            <h1 class="text-2xl font-bold text-gray-900">
              Order #{{ order.id }}
            </h1>
            <rs-badge
              :variant="order.status === 'Delivered' ? 'success' : 'primary'"
            >
              {{ order.status }}
            </rs-badge>
          </div>
        </template>
        <template #body>
          <div class="space-y-6">
            <div>
              <h2 class="text-lg font-semibold mb-2">Order Information</h2>
              <p>Date: {{ formatDate(order.date) }}</p>
              <p>Total: RM {{ order.total.toFixed(2) }}</p>
              <p>Payment Method: {{ order.paymentMethod }}</p>
              <p>Shipping Method: {{ order.shippingMethod }}</p>
              <p v-if="order.trackingNumber">
                Tracking Number: {{ order.trackingNumber }}
              </p>
            </div>

            <div>
              <h2 class="text-lg font-semibold mb-2">Items</h2>
              <div
                v-for="item in order.items"
                :key="item.id"
                class="flex items-center py-2 border-b"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded mr-4"
                />
                <div class="flex-grow">
                  <h3 class="font-medium">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">
                    Quantity: {{ item.quantity }}
                  </p>
                </div>
                <p class="font-medium">
                  RM {{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
            </div>

            <div>
              <h2 class="text-lg font-semibold mb-2">Shipping Address</h2>
              <p>{{ order.shippingAddress.name }}</p>
              <p>{{ order.shippingAddress.street }}</p>
              <p>
                {{ order.shippingAddress.city }},
                {{ order.shippingAddress.state }}
                {{ order.shippingAddress.zipCode }}
              </p>
              <p>{{ order.shippingAddress.country }}</p>
            </div>
          </div>
        </template>
        <template #footer>
          <div class="flex justify-between items-center">
            <rs-button variant="primary-outline" @click="$router.back()"
              >Back to Orders</rs-button
            >
            <rs-button v-if="order.status !== 'Delivered'" variant="primary"
              >Track Order</rs-button
            >
          </div>
        </template>
      </rs-card>

      <rs-card v-else>
        <template #body>
          <div class="text-center py-8">
            <p class="text-gray-500">Order not found.</p>
          </div>
        </template>
      </rs-card>
    </div>
  </div>
</template>
