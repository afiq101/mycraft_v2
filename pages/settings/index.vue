<script setup>
definePageMeta({
  title: "Settings",
  layout: "default",
});

const path = reactive([
  {
    name: "My Account",
    path: "/settings/account",
    icon: "ph:user-circle-duotone",
  },
  {
    name: "My Notifications",
    path: "/notifications",
    icon: "ph:notification-duotone",
  },
  {
    name: "My Purchases",
    path: "/purchases",
    icon: "ph:list-bullets-duotone",
  },
  {
    name: "My Coins",
    path: "/coins",
    icon: "ph:coin-duotone",
  },
  {
    name: "My Vouchers",
    path: "/vouchers",
    icon: "ph:cards-duotone",
  },
  {
    name: "My Games",
    path: "/games",
    icon: "ph:game-controller-duotone",
  },
  {
    name: "Livestreaming",
    path: "/livestreaming",
    icon: "ph:video-camera-duotone",
  },
  {
    name: "Craft Video",
    path: "/craft-video",
    icon: "ph:video-camera-duotone",
  },
  {
    name: "My Bookings",
    path: "/bookings",
    icon: "ph:calendar-duotone",
  },
  {
    name: "Help Centre",
    path: "/help",
    icon: "ph:circle-wavy-question-duotone",
  },
]);
</script>

<template>
  <div class="grid grid-cols-4 gap-5 m-5">
    <rs-card
      @click="navigateTo(item.path)"
      class="h-[100px] p-3 hover:bg-primary hover:text-white cursor-pointer"
      v-for="item in path"
    >
      <Icon :name="item.icon" class="!w-8 !h-8 mr-2" />
      {{ item.name }}
    </rs-card>
  </div>
</template>
