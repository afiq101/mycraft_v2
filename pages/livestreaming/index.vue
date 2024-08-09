<script setup>
definePageMeta({
  title: "Livestreaming",
  layout: "default",
});
</script>

<template>
  <div class="space-y-6">
    <LayoutsBreadcrumbV2 />

    <!-- Livestream Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Video Player -->
      <div class="lg:col-span-2 bg-black rounded-lg shadow-sm">
        <div class="h-[500px]"></div>
      </div>

      <!-- Stream Information -->
      <div class="space-y-4">
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">Seller 1</h2>
          <p class="text-sm text-gray-600 mt-2">
            Streaming: How to make DIY Shirt
          </p>
          <p class="text-sm text-gray-600">Viewers: 2,340</p>
          <button
            class="mt-4 btn btn-primary bg-blue-600 text-white hover:bg-blue-700 transition w-full"
          >
            Follow
          </button>
        </div>

        <!-- Chat Section -->
        <div
          class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-[350px] flex flex-col"
        >
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Live Chat</h2>
          <div class="flex-1 overflow-y-auto">
            <!-- Chat messages here -->
          </div>
          <div class="mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              class="form-input w-full"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Recommended Streams -->
    <div class="space-y-4">
      <h2 class="text-2xl font-semibold text-gray-800">Recommended Streams</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div class="h-[200px] bg-black">
            <img
              src="stream_thumbnail_1.jpg"
              alt="Stream Thumbnail"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-800">Seller 1</h3>
            <p class="text-sm text-gray-600">DIY</p>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div class="h-[200px] bg-black">
            <img
              src="stream_thumbnail_1.jpg"
              alt="Stream Thumbnail"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-800">Seller 1</h3>
            <p class="text-sm text-gray-600">DIY</p>
          </div>
        </div>
        <div
          class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          <div class="h-[200px] bg-black">
            <img
              src="stream_thumbnail_1.jpg"
              alt="Stream Thumbnail"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="p-4">
            <h3 class="text-lg font-medium text-gray-800">Seller 1</h3>
            <p class="text-sm text-gray-600">DIY</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
