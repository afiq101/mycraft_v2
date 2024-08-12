<script setup>
definePageMeta({
  title: "Shopping Cart",
  layout: "default",
});

const cartItems = ref([
  {
    id: 1,
    name: "BEG BIMBIT",
    price: 120,
    quantity: 2,
    image: "https://i.imgur.com/y3nj4JJ.jpeg",
  },
  {
    id: 2,
    name: "(PRE-ORDER) - CINCIN LELAKI PERAK",
    price: 120,
    quantity: 1,
    image: "https://i.imgur.com/G49ZT1V.jpg",
  },
]);

const updateQuantity = (id, newQuantity) => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) {
    item.quantity = Math.max(1, newQuantity);
  }
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
};

const subtotal = computed(() => {
  return cartItems.value.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
});

const shipping = 5.0; // Fixed shipping cost
const total = computed(() => subtotal.value + shipping);

const checkoutForm = ref({
  email: "",
  name: "",
  address: "",
  city: "",
  country: "",
  zipCode: "",
});

const handleCheckout = () => {
  // Implement checkout logic here
  console.log("Checkout form data:", checkoutForm.value);
  console.log("Cart items:", cartItems.value);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <rs-card>
        <template #header>
          <h1 class="text-2xl font-bold">Shopping Cart</h1>
        </template>
        <template #body>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="md:col-span-2">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center border-b py-4"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-20 h-20 object-cover mr-4"
                />
                <div class="flex-grow">
                  <h3 class="font-semibold">{{ item.name }}</h3>
                  <p class="text-gray-600">RM {{ item.price.toFixed(2) }}</p>
                  <div class="flex items-center mt-2">
                    <rs-button
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      variant="primary-outline"
                      class="px-2 py-1"
                      >-</rs-button
                    >
                    <span class="mx-2">{{ item.quantity }}</span>
                    <rs-button
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      variant="primary-outline"
                      class="px-2 py-1"
                      >+</rs-button
                    >
                  </div>
                </div>
                <rs-button
                  @click="removeItem(item.id)"
                  variant="danger-outline"
                  class="ml-4"
                  >Remove</rs-button
                >
              </div>
            </div>
            <div>
              <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
              <div class="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>RM {{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span>Shipping:</span>
                <span>RM {{ shipping.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-bold mt-4">
                <span>Total:</span>
                <span>RM {{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card class="mt-8">
        <template #header>
          <h2 class="text-2xl font-bold">Checkout</h2>
        </template>
        <template #body>
          <FormKit
            type="form"
            @submit="handleCheckout"
            submit-label="Proceed Checkout"
          >
            <FormKit
              type="email"
              name="email"
              label="Email"
              validation="required|email"
              v-model="checkoutForm.email"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  Email
                  <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <FormKit
              type="text"
              name="name"
              label="Full Name"
              validation="required"
              v-model="checkoutForm.name"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  Full Name
                  <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <FormKit
              type="text"
              name="address"
              label="Address"
              validation="required"
              v-model="checkoutForm.address"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  Address
                  <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <FormKit
              type="text"
              name="city"
              label="City"
              validation="required"
              v-model="checkoutForm.city"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  City
                  <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <FormKit
              type="text"
              name="country"
              label="Country"
              validation="required"
              v-model="checkoutForm.country"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  Country
                  <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <FormKit
              type="text"
              name="zipCode"
              label="Zip Code"
              validation="required"
              v-model="checkoutForm.zipCode"
            >
              <template #label>
                <label
                  class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                >
                  Zip Code
                  <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
            <div class="info border-2 rounded-lg p-5 mb-6">
              <h5 class="mb-2">Important!</h5>
              <ul class="list-decimal px-5">
                <li class="mb-1">
                  You will be directed to the payment page after clicking the
                  "Checkout" button.
                </li>
              </ul>
            </div>
          </FormKit>
        </template>
      </rs-card>
    </div>
  </div>
</template>
