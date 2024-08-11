<script setup>
import { ref } from 'vue';

definePageMeta({
  title: "Store Profile",
  layout: "default",
});

const storeInfo = ref({
  name: 'TechHaven',
  avatar: 'https://picsum.photos/seed/store/200',
  lastActive: '2 days ago',
  products: 45,
  followers: '2.1k',
  following: 108,
  rating: 5.0,
  totalReviews: 687,
  chatPerformance: 84,
  memberSince: '6 Years Ago'
});

const categories = ref([
  'Home', 'All Products', 'Computers & Accessories', 'Audio', 'Cases & Bags', 'Home Entertainment', 'More'
]);

const featuredProducts = ref([
  {
    id: 1,
    name: 'Google Pixel Buds Pro',
    image: 'https://picsum.photos/seed/buds/300/200',
    discount: 10,
    freeShipping: true,
    price: '$199.99',
    rating: 4.8,
    sold: 234
  },
  {
    id: 2,
    name: 'Google Pixel Watch 2',
    image: 'https://picsum.photos/seed/watch/300/200',
    discount: 15,
    freeShipping: true,
    price: '$349.99',
    rating: 4.5,
    sold: 132
  },
  {
    id: 3,
    name: 'Amazon All-New 11th (latest)',
    image: 'https://picsum.photos/seed/kindle/300/200',
    discount: 10,
    freeShipping: true,
    price: '$129.99',
    rating: 4.6,
    sold: 189
  },
  {
    id: 4,
    name: 'Official Google Pixel 8/8',
    image: 'https://picsum.photos/seed/pixel/300/200',
    discount: 15,
    freeShipping: true,
    price: '$899.99',
    rating: 4.9,
    sold: 98
  },
]);

const activeCategory = ref('Home');
</script>

<template>
  <div class="w-full max-w-[1920px] mx-auto p-4">
    <!-- Store Profile Card -->
    <rs-card class="mb-4 p-4">
      <template #body>
        <div class="flex items-center space-x-4 mb-4">
          <img :src="storeInfo.avatar" :alt="storeInfo.name" class="w-24 h-24 rounded-full">
          <div>
            <h1 class="text-2xl font-bold">{{ storeInfo.name }}</h1>
            <p class="text-gray-500">Active {{ storeInfo.lastActive }}</p>
            <div class="flex space-x-2 mt-2">
              <rs-button variant="primary">+ Follow</rs-button>
              <rs-button variant="secondary">Chat</rs-button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Icon name="mdi:package" />
            Products: {{ storeInfo.products }}
          </div>
          <div>
            <Icon name="mdi:account-group" />
            Followers: {{ storeInfo.followers }}
          </div>
          <div>
            <Icon name="mdi:account-plus" />
            Following: {{ storeInfo.following }}
          </div>
          <div>
            <Icon name="mdi:star" />
            Rating: {{ storeInfo.rating }} ({{ storeInfo.totalReviews }} Reviews)
          </div>
          <div>
            <Icon name="mdi:chat" />
            Chat Performance: {{ storeInfo.chatPerformance }}% (Within a Few Hours)
          </div>
          <div>
            <Icon name="mdi:calendar" />
            Member Since: {{ storeInfo.memberSince }}
          </div>
        </div>
      </template>
    </rs-card>


    <div class="mb-4">
      <h2 class="text-xl font-bold mb-2">Featured for You</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <rs-card v-for="product in featuredProducts" :key="product.id">
          <template #body>
            <img :src="product.image" :alt="product.name" class="w-full h-32 object-cover mb-2 mt-4 ">
            <b class="font-semibold ">{{ product.name }}</b>
            <p class="text-gray-600">{{ product.price }}</p>
            <div class="flex justify-between items-center mt-2">

            </div>
            <div class="text-sm text-gray-500">Rating: {{ product.rating }}</div> 
              <rs-badge variant="danger">{{ product.discount }}% OFF</rs-badge>
              <rs-badge v-if="product.freeShipping" variant="success" class="mb-2">Free Shipping</rs-badge>
              <br>
              <div class="text-sm text-gray-500">{{ product.sold }} sold</div>
          </template>
        </rs-card>
      </div>
    </div>

    <div class="text-right">
      <rs-button variant="primary-text">See All ></rs-button>
    </div>
  </div>
</template>
