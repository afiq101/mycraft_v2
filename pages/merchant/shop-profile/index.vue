<script setup>


definePageMeta({
  title: "Store Profile",
  layout: "default",
});

import { ref } from 'vue';

const storeInfo = ref({
  name: 'KrafWarisan',
  avatar: 'https://picsum.photos/seed/store/200',
  lastActive: '2 hari lepas',
  products: 45,
  followers: '2.1k',
  following: 108,
  rating: 5.0,
  totalReviews: 687,
  chatPerformance: 84,
  memberSince: '6 Tahun Lalu'
});

const categories = ref([
  'Laman Utama', 'Semua Produk', 'Kain & Tenunan', 'Seramik', 'Anyaman', 'Logam', 'Lagi'
]);

const featuredProducts = ref([
  {
    id: 1,
    name: 'Cincin Lelaki Perak',
    image: 'https://i.imgur.com/G49ZT1V.jpg',
    discount: 10,
    freeShipping: true, 
    price: 'RM10.00',
    rating: 4.8,
    sold: 234
  },
  {
    id: 2,
    name: 'Rantai Loket Helena',
    image: 'https://i.imgur.com/9G9JD5y.jpg',
    discount: 15,
    freeShipping: true,
    price: 'RM20.00',
    rating: 4.5,
    sold: 132
  },
  {
    id: 3,
    name: 'Document Bag',
    image: 'https://i.imgur.com/1FZ3xw1.jpg',
    discount: 10,
    freeShipping: true,
    price: 'RM285.00',
    rating: 4.6,
    sold: 189
  },
  {
    id: 4,
    name: 'Baju T Batik Ikat & Celup',
    image: 'https://i.imgur.com/AHptbcL.jpg',
    discount: 15,
    freeShipping: true,
    price: 'RM48.00',
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
