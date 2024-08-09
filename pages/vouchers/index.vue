<script setup>
definePageMeta({
  title: "Vouchers",
  layout: "default",
});
</script>

<template>
  <div class="space-y-6">
    <LayoutsBreadcrumbV2 />
    <div
      class="flex items-center justify-between bg-gradient-to-r from-teal-400 to-blue-500 text-white p-6 rounded-lg shadow-lg"
    >
      <h1 class="text-2xl font-bold">Available Vouchers</h1>
      <button
        class="btn btn-primary bg-white text-teal-600 hover:bg-teal-100 transition p-2"
      >
        Redeem Selected
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-yellow-700">🎁</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">10% Off</h3>
              <p class="text-sm text-gray-500">
                Get 10% off on your next purchase. Valid until
                <b>31-Aug-2024</b>.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            class="form-checkbox h-6 w-6 text-teal-600 transition"
          />
        </div>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-pink-300 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-pink-700">💸</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">$15 Off</h3>
              <p class="text-sm text-gray-500">
                Get $15 off on orders over $100. Valid until <b>15-Sep-2024</b>.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            class="form-checkbox h-6 w-6 text-teal-600 transition"
          />
        </div>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-blue-300 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-blue-700">🚚</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Free Shipping</h3>
              <p class="text-sm text-gray-500">
                Enjoy free shipping on your next order. Valid until
                <b>30-Sep-2024</b>.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            class="form-checkbox h-6 w-6 text-teal-600 transition"
          />
        </div>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-green-300 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-green-700">🌟</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">20% Off</h3>
              <p class="text-sm text-gray-500">
                Get 20% off on your first order. Valid until <b>10-Oct-2024</b>.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            class="form-checkbox h-6 w-6 text-teal-600 transition"
          />
        </div>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-orange-300 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-orange-700">🛍️</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">
                Buy 1 Get 1 Free
              </h3>
              <p class="text-sm text-gray-500">
                Buy one item and get another for free. Valid until
                <b>25-Aug-2024</b>.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            class="form-checkbox h-6 w-6 text-teal-600 transition"
          />
        </div>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-purple-300 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-purple-700">🎉</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">
                Special Discount
              </h3>
              <p class="text-sm text-gray-500">
                Unlock a special discount on selected items. Valid until
                <b>01-Oct-2024</b>.
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            class="form-checkbox h-6 w-6 text-teal-600 transition"
          />
        </div>
      </rs-card>
    </div>
  </div>
</template>
