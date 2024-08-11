<script setup>
definePageMeta({
  title: "Customer Service Management",
  layout: "default",
});

import { ref } from 'vue';

const performanceOverview = ref("Higher customer service ratings help increase sales. Learn more about how to manage customer service in Lazada University.");

const tools = ref([
  { icon: 'mdi:clock-outline', title: 'Pending Replies', description: 'Number of chats waiting for response', value: 15 },
  { icon: 'mdi:check-circle-outline', title: 'Replied Chats', description: 'Total chats responded to today', value: 87 },
  { icon: 'mdi:archive-outline', title: 'Closed Chats', description: 'Chats resolved and closed today', value: 62 },
  { icon: 'mdi:chart-line', title: 'Engagement Rate', description: 'Percentage of customer queries engaged', value: '94%' },
]);

const filters = ref({
  status: '',
  content: '',
  rating: '',
  productQuality: '',
  shippingService: '',
  sellerService: '',
  productId: '',
  orderId: '',
  buyerName: '',
  startDate: '',
  endDate: '',
});

const reviews = ref([
  { id: 1, content: 'Great product and fast shipping!', rating: 5, productQuality: 'Excellent', showOnStoreFront: true },
  { id: 2, content: 'The item was damaged upon arrival.', rating: 2, productQuality: 'Poor', showOnStoreFront: false },
  { id: 3, content: 'Average product, but good customer service.', rating: 3, productQuality: 'Average', showOnStoreFront: true },
]);

const resetFilters = () => {
  Object.keys(filters.value).forEach(key => filters.value[key] = '');
};
</script>

<template>
  <div class="w-full max-w-[1920px] mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">Customer Service Management</h1>



    <rs-card class="mb-6">
      <template #header>
        <h2 class="text-lg font-semibold">Engagement Counters</h2>
      </template>
      <template #body>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <rs-card v-for="tool in tools" :key="tool.title" class="bg-gray-50 p-2">
            <template #body>
              <div class="flex items-center">
                <Icon :name="tool.icon" size="36" class="mr-4 text-blue-500" />
                <div>
                  <h4 class="font-semibold">{{ tool.title }}</h4>
                  <p class="text-sm text-gray-600">{{ tool.description }}</p>
                  <p class="text-xl font-bold mt-2">{{ tool.value }}</p>
                </div>
              </div>
            </template>
          </rs-card>
        </div>
      </template>
    </rs-card>

    <rs-card>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">Customer Feedback Detail</h2>
          <rs-tab>
            <rs-tab-item title="To Be Reviewed" :active="true"></rs-tab-item>
            <rs-tab-item title="Reviewed"></rs-tab-item>
          </rs-tab>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
          <FormKit type="select" label="Status" :options="['Replied', 'No Reply']" v-model="filters.status" />
          <FormKit type="select" label="Content" :options="['With Content', 'With Image or Video']" v-model="filters.content" />
          <FormKit type="select" label="Overall Rating" :options="['1 star', '2 star', '3 star', '4 star', '5 star']" v-model="filters.rating" />
          <FormKit type="select" label="Product Quality" :options="['Excellent', 'Good', 'Average', 'Poor']" v-model="filters.productQuality" />
          <FormKit type="select" label="Shipping Service" :options="['Fast', 'On Time', 'Delayed']" v-model="filters.shippingService" />
          <FormKit type="select" label="Seller Service" :options="['Excellent', 'Good', 'Average', 'Poor']" v-model="filters.sellerService" />
        </div>

        <rs-table
          :data="reviews"
          :field="['Content', 'Product Quality', 'Rating', 'Show Store Front', 'Action']"
          advanced
          :options-advanced="{ sortable: true, responsive: true }"
        >
        <template #Content="text">
            {{ text.value.content }}
        </template>
        <template #ProductQuality="text">
            {{ text.value.productQuality }}
        </template>
          <template #Rating="{ text }">
            <rs-badge :variant="text >= 4 ? 'success' : text >= 3 ? 'warning' : 'danger'">
              {{ text }} ★
            </rs-badge> 
          </template>
          <template #ShowStoreFront = "{text}">
            <Icon :name="text ? 'mdi:check' : 'mdi:close'" :class="text ? 'text-green-500' : 'text-red-500'" />
          </template>
          <template #Action>
            <rs-button variant="primary-outline" size="sm">Reply</rs-button>
          </template>
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>