<script setup>
definePageMeta({
  title: "My Purchases",
  layout: "default",
});

const tabs = [
  { name: "All", count: null },
  { name: "To Pay", count: null },
  { name: "To Ship", count: null },
  { name: "To Receive", count: 1 },
  { name: "Completed", count: null },
  { name: "Cancelled", count: null },
  { name: "Return Refund", count: null },
];

const activeTab = ref("All");
const searchQuery = ref("");

// Mock data for purchases (replace this with actual API calls in a real application)
const purchases = ref([
  {
    id: "1001",
    date: "2023-05-15",
    total: 329.99,
    status: "To Receive",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 199.99 },
      { name: "Phone Case", quantity: 2, price: 65.0 },
    ],
  },
  {
    id: "1002",
    date: "2023-06-02",
    total: 1299.99,
    status: "Completed",
    items: [{ name: "Laptop", quantity: 1, price: 1299.99 }],
  },
  {
    id: "1003",
    date: "2023-06-10",
    total: 79.99,
    status: "To Ship",
    items: [
      { name: "Smart Watch Band", quantity: 1, price: 49.99 },
      { name: "Screen Protector", quantity: 2, price: 15.0 },
    ],
  },
]);

const filteredPurchases = computed(() => {
  return purchases.value.filter((purchase) => {
    if (activeTab.value !== "All" && purchase.status !== activeTab.value) {
      return false;
    }
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return (
        purchase.id.toLowerCase().includes(query) ||
        purchase.items.some((item) => item.name.toLowerCase().includes(query))
      );
    }
    return true;
  });
});

const expandedOrders = ref(new Set());

const toggleOrderDetails = (orderId) => {
  if (expandedOrders.value.has(orderId)) {
    expandedOrders.value.delete(orderId);
  } else {
    expandedOrders.value.add(orderId);
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <rs-card>
        <template #header>
          <h1 class="text-2xl font-bold text-gray-900 mb-4">My Purchases</h1>
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8 overflow-x-auto">
              <a
                v-for="tab in tabs"
                :key="tab.name"
                :class="[
                  activeTab === tab.name
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer',
                ]"
                @click="activeTab = tab.name"
              >
                {{ tab.name }}
                <span
                  v-if="tab.count"
                  class="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs"
                  >{{ tab.count }}</span
                >
              </a>
            </nav>
          </div>
          <div class="mt-4">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="You can search by Seller Name, Order ID or Product name"
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </template>
        <template #body>
          <div v-if="filteredPurchases.length === 0" class="text-center py-8">
            <p class="text-gray-500">No purchases found.</p>
          </div>
          <div v-else class="space-y-4 mt-4">
            <div
              v-for="order in filteredPurchases"
              :key="order.id"
              class="border rounded-lg overflow-hidden"
            >
              <div
                @click="toggleOrderDetails(order.id)"
                class="bg-gray-50 px-4 py-3 flex justify-between items-center cursor-pointer"
              >
                <div>
                  <p class="font-semibold">Order #{{ order.id }}</p>
                  <p class="text-sm text-gray-500">
                    {{ formatDate(order.date) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-semibold">RM {{ order.total.toFixed(2) }}</p>
                  <p
                    :class="{
                      'text-green-600': order.status === 'Completed',
                      'text-blue-600': order.status === 'To Ship',
                      'text-yellow-600': order.status === 'To Receive',
                      'text-red-600':
                        order.status === 'To Pay' ||
                        order.status === 'Cancelled',
                      'text-purple-600': order.status === 'Return Refund',
                    }"
                  >
                    {{ order.status }}
                  </p>
                </div>
                <Icon
                  :name="
                    expandedOrders.has(order.id)
                      ? 'mdi:chevron-up'
                      : 'mdi:chevron-down'
                  "
                  size="24"
                />
              </div>
              <div
                v-if="expandedOrders.has(order.id)"
                class="px-4 py-3 bg-white"
              >
                <h3 class="font-semibold mb-2">Order Items:</h3>
                <ul class="space-y-2">
                  <li
                    v-for="item in order.items"
                    :key="item.name"
                    class="flex justify-between"
                  >
                    <span>{{ item.name }} (x{{ item.quantity }})</span>
                    <span
                      >RM {{ (item.price * item.quantity).toFixed(2) }}</span
                    >
                  </li>
                </ul>
                <div class="mt-4 flex justify-end">
                  <rs-button variant="primary">View Order Details</rs-button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </rs-card>
    </div>
  </div>
</template>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.overflow-x-auto::-webkit-scrollbar {
  display: none;
}

@media (max-width: 640px) {
  .overflow-x-auto {
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
