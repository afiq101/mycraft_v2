<script setup>
definePageMeta({
  title: "Notifications",
  layout: "default",
});
</script>

<template>
  <div>
    <LayoutsBreadcrumbV2 />
    <rs-card class="p-4 px-6">
      <div class="flex items-center justify-between">
        <h1 class="text-xl font-semibold">Notifications</h1>
        <button class="btn btn-primary">Mark all as read</button>
      </div>
      <div class="mt-4 space-y-4">
        <rs-card class="p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="ml-4">
                <h3 class="font-semibold">Shipped Out</h3>
                <p class="text-sm text-gray-500">
                  Parcel <b>MY244762275780V</b> for your order
                  <b>240806JUV1A9KT</b> has been shipped out by
                  <b>lokaloidad.my</b> via <b>5-Day Delivery</b>. Click here to
                  see order details and track your parcel.
                </p>
              </div>
            </div>
          </div>
        </rs-card>
        <rs-card class="p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="ml-4">
                <h3 class="font-semibold">Order Delivered</h3>
                <p class="text-sm text-gray-500">
                  Your order <b>240806JUV1A9KT</b> has been delivered. We hope
                  you are satisfied with your purchase! Click here to rate your
                  experience.
                </p>
              </div>
            </div>
          </div>
        </rs-card>
        <rs-card class="p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="ml-4">
                <h3 class="font-semibold">Payment Received</h3>
                <p class="text-sm text-gray-500">
                  Payment for order <b>240806JUV1A9KT</b> has been received.
                  Your order is now being processed. Click here to view the
                  order status.
                </p>
              </div>
            </div>
          </div>
        </rs-card>
        <rs-card class="p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div class="ml-4">
                <h3 class="font-semibold">New Message</h3>
                <p class="text-sm text-gray-500">
                  You have a new message from <b>Customer Support</b>. Click
                  here to read the message.
                </p>
              </div>
            </div>
          </div>
        </rs-card>
      </div>
    </rs-card>
  </div>
</template>
