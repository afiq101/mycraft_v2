<script setup>
definePageMeta({
  title: "Coins Management",
  layout: "default",
});
</script>

<template>
  <div class="space-y-6">
    <LayoutsBreadcrumbV2 />
    <div
      class="flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg"
    >
      <h1 class="text-2xl font-bold">Coins Management</h1>
      <button
        class="btn btn-primary bg-white text-indigo-600 hover:bg-indigo-100 transition p-3"
      >
        Redeem Coins
      </button>
    </div>

    <rs-card class="p-6 rounded-lg shadow-md">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <div
            class="w-14 h-14 bg-yellow-300 rounded-full flex items-center justify-center shadow-inner"
          >
            <span class="text-2xl font-bold text-yellow-700">💰</span>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-700">Total Coins</h3>
            <p class="text-sm text-gray-500">
              You have <b>1200</b> coins available.
            </p>
          </div>
        </div>
        <button
          class="btn btn-secondary bg-indigo-600 text-white hover:bg-indigo-700 transition p-2"
        >
          View Transactions
        </button>
      </div>
    </rs-card>

    <h2 class="text-xl font-semibold text-gray-700">Recent Transactions</h2>

    <div class="space-y-4">
      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-green-600">➕</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">Earned Coins</h3>
              <p class="text-sm text-gray-500">
                You earned <b>500</b> coins from your purchase of order
                <b>240807SDF2B8HL</b>. Date: <b>08-Aug-2024</b>.
              </p>
            </div>
          </div>
        </div>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-red-200 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-red-600">➖</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">
                Redeemed Coins
              </h3>
              <p class="text-sm text-gray-500">
                You redeemed <b>300</b> coins for a discount on your purchase of
                order <b>240808JHK3A9XY</b>. Date: <b>07-Aug-2024</b>.
              </p>
            </div>
          </div>
        </div>
      </rs-card>

      <rs-card
        class="p-5 bg-white rounded-lg shadow-lg hover:shadow-xl transition"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-14 h-14 bg-green-200 rounded-full flex items-center justify-center shadow-inner"
            >
              <span class="text-2xl font-bold text-green-600">➕</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-700">
                Referral Bonus
              </h3>
              <p class="text-sm text-gray-500">
                You earned <b>200</b> coins from referring a friend. Date:
                <b>05-Aug-2024</b>.
              </p>
            </div>
          </div>
        </div>
      </rs-card>
    </div>
  </div>
</template>
