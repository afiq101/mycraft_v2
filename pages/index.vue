<script setup>
import products from "../data/products";
import events from "../data/events";

definePageMeta({
  title: "Marketplace",
  layout: "default",
});

const formatSold = (n) => {
  if (n < 1e3) return n;
  if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
};

const formatPrice = (price) => {
  return parseFloat(price)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

async function navigateProductDetail(sku) {
  await navigateTo({
    path: "/product-detail",
    query: {
      sku: sku,
    },
  });
}

async function navigateEventDetail(id) {
  await navigateTo({
    path: "/event-detail",
    query: {
      id: id,
    },
  });
}

const searchQuery = ref("");

const handleSearch = () => {
  // Implement search logic here
  console.log("Searching for:", searchQuery.value);
};
</script>

<template>
  <div>
    <rs-card class="bg-yellow-400">
      <template #body>
        <div class="py-8 px-4">
          <h1 class="text-4xl font-bold text-blue-600">8.8 FLASH SALE</h1>
          <p class="text-2xl mb-4">UP TO 70% OFF</p>
          <rs-button variant="primary">SHOP NOW</rs-button>
        </div>
      </template>
    </rs-card>

    <rs-card class="p-4">
      <div class="flex justify-between items-center text-sm text-green-600">
        <div class="flex items-center space-x-4">
          <div class="flex items-center">
            <Icon name="mdi:shield-check-outline" class="mr-2" />
            <span>Secure privacy</span>
          </div>
          <div class="flex items-center">
            <Icon name="mdi:credit-card-check-outline" class="mr-2" />
            <span>Safe payments</span>
          </div>
          <div class="flex items-center">
            <Icon name="mdi:truck-check-outline" class="mr-2" />
            <span>Delivery guarantee</span>
          </div>
        </div>
        <rs-button variant="primary-text" class="text-green-600">
          <Icon name="mdi:chevron-right" />
        </rs-button>
      </div>
    </rs-card>

    <rs-card class="mb-4 bg-red-500 text-white p-4">
      <div class="flex justify-between items-center py-2 px-4">
        <div class="flex items-center">
          <Icon name="mdi:flash" class="mr-2 text-2xl" />
          <span class="text-xl font-bold">Lightning deals</span>
        </div>
        <rs-button variant="primary-text" class="text-white">
          Limited time offer
          <Icon name="mdi:chevron-right" class="ml-2" />
        </rs-button>
      </div>
    </rs-card>
    <h3 class="mb-3">Event</h3>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <rs-card
        class="cursor-pointer hover:scale-105 transition-all"
        v-for="(event, index) in events"
        :key="index"
        @click="navigateEventDetail(event.id)"
      >
        <div class="product-image relative h-48 rounded-lg">
          <img
            class="object-scale-down w-full h-full"
            :src="event.images.length > 0 ? event.images[0] : ''"
            :alt="event.name"
          />
        </div>
        <div class="product-content-wrapper flex flex-col px-4 mb-6">
          <div class="product-title mt-4 h-12">
            <span class="line-clamp-1 text-base font-semibold">{{
              event.name
            }}</span>
            <span class="line-clamp-1 text-gray-500 text-sm">
              {{ event.description }}
            </span>
          </div>
          <div class="product-content flex flex-col">
            <div class="product-price flex justify-between">
              <div class="truncate">
                <div class="text-sm text-primary">
                  {{ event.currency
                  }}<span class="text-lg">
                    {{
                      event.discountedPrice
                        ? formatPrice(event.discountedPrice)
                        : formatPrice(event.price)
                    }}</span
                  >

                  <!-- If price 0 put free -->
                  <span v-if="event.price == 0" class="text-xs ml-1">Free</span>
                </div>
                <span
                  v-if="event.discountedPrice"
                  class="text-sm line-through text-gray-500 mt-1"
                >
                  {{ event.currency }}{{ formatPrice(event.price) }}
                </span>
              </div>
              <div class="action-button flex items-center gap-x-5">
                <div class="icon-wrapper">
                  <Icon
                    size="1.4rem"
                    fill="#A9A9A9"
                    stroke="#A9A9A9"
                    name="ph:shopping-cart-fill"
                  ></Icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </rs-card>
    </section>

    <hr class="mb-3 mt-3" />
    <h3 class="mb-3">Products</h3>

    <section
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <rs-card
        class="cursor-pointer hover:scale-105 transition-all"
        v-for="(product, index) in products"
        :key="index"
        @click="navigateProductDetail(product.sku)"
      >
        <div class="product-image relative h-48 rounded-lg">
          <img
            class="object-scale-down w-full h-full"
            :src="product.images.length > 0 ? product.images[0] : ''"
            :alt="product.name"
          />

          <span
            v-if="product.discount && product.discount != 0"
            class="product-discount text-sm bg-primary text-white absolute top-3 -right-2 px-2 py-1 rounded-md"
          >
            {{ product.discount }}% off
          </span>
        </div>
        <div class="product-content-wrapper flex flex-col px-4 mb-6">
          <div class="product-title mt-4 h-12">
            <span class="line-clamp-1 text-base font-semibold">{{
              product.name
            }}</span>
            <span class="line-clamp-1 text-gray-500 text-sm">
              {{ product.description }}
            </span>
          </div>
          <div class="product-content flex flex-col">
            <div class="product-rating flex items-center my-2">
              <Icon
                name="ic:baseline-star"
                class="text-amber-400"
                v-for="(star, index) in Math.floor(product.rating)"
                :key="index"
              />
              <Icon
                name="ic:baseline-star-half"
                class="text-amber-400"
                v-for="(star, index) in product.rating % 1 != 0 ? 1 : 0"
                :key="index"
              />
              <Icon
                name="ic:baseline-star-border"
                class="text-amber-400"
                v-for="(star, index) in 5 - Math.ceil(product.rating)"
                :key="index"
              />
              <div class="product-rating-sold ml-1">
                <span class="text-xs"> ({{ formatSold(product.sold) }}) </span>
              </div>
            </div>
            <div class="product-price flex justify-between">
              <div class="truncate">
                <div class="text-sm text-primary">
                  {{ product.currency
                  }}<span class="text-lg">
                    {{
                      product.discountedPrice
                        ? formatPrice(product.discountedPrice)
                        : formatPrice(product.price)
                    }}</span
                  >
                </div>
                <span
                  v-if="product.discountedPrice"
                  class="text-sm line-through text-gray-500 mt-1"
                >
                  {{ product.currency }}{{ formatPrice(product.price) }}
                </span>
              </div>
              <div class="action-button flex items-center gap-x-5">
                <div class="icon-wrapper">
                  <Icon
                    size="1.4rem"
                    fill="#A9A9A9"
                    stroke="#A9A9A9"
                    name="ph:shopping-cart-fill"
                  ></Icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </rs-card>
    </section>
  </div>
</template>
