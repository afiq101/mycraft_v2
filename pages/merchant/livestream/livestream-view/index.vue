<script setup>

definePageMeta({
  title: "Streamer Dashboard",
  layout: "default",
});

import { ref } from 'vue';

const streamTitle = ref("Blue Shirt Summer Promotion from X Brand");
const viewerCount = ref(2277);
const streamDuration = ref("0:15:15");
const followers = ref(0);
const subscribers = ref(0);

const recentEvents = ref([
  { type: 'follow', user: 'NewFollower123', message: 'just followed!' },
  { type: 'subscription', user: 'SubUser456', message: 'subscribed for 3 months!' },
  { type: 'donation', user: 'GenerousDonor789', message: 'donated $5: Keep up the great content!' },
]);

const chatMessages = ref([
  { user: 'Shopper001', message: 'How much is the red dress?' },
  { user: 'BargainHunter', message: 'Can I get a discount on the shoes?' },
  { user: 'FashionLover', message: 'I love the blue jacket! Is it still available?' },
  { user: 'QuickBuyer', message: 'I’ll take the leather bag, please!' },
  { user: 'CuriousCat', message: 'What sizes are available for the black jeans?' },
  { user: 'DealSeeker', message: 'Is there a buy one get one free offer?' },
  { user: 'NewShopper', message: 'First time here! How does the shipping work?' },
]);


const newChatMessage = ref('');

const sendChatMessage = () => {
  if (newChatMessage.value.trim()) {
    chatMessages.value.push({ user: 'Streamer', message: newChatMessage.value });
    newChatMessage.value = '';
  }
};
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-4 gap-4">
      <!-- Stream Preview -->
      <div class="col-span-3">
        <rs-card class="mb-4">
          <template #header>
            <h2 class="text-lg font-semibold">Stream Preview</h2>
          </template>
          <template #body>
            <img src="https://picsum.photos/seed/buds/1080/480" class="aspect-video bg-gray-800 flex items-center justify-center text-white" />
          </template>
        </rs-card>

        <!-- Stream Info -->
        <rs-card>
          <template #body>
            <br>
            <FormKit
              type="text"
              v-model="streamTitle"
              label="Stream Title"
            />
            <div class="mt-4 flex justify-between">
              <p>Viewers: {{ viewerCount }}</p>
              <p>Duration: {{ streamDuration }}</p>
            </div>
            <div class="mt-2 flex justify-between">
              <p>Followers: {{ followers }}</p>
              <p>Subscribers: {{ subscribers }}</p>
            </div>
          </template>
        </rs-card>
      </div>

      <!-- Chat -->
      <div class="col-span-1">
        <rs-card class="h-[calc(80vh-2rem)]">
          <template #header>
            <h2 class="text-lg font-semibold">Chat</h2>
          </template>
          <template #body>
            <div class="h-[calc(100vh-12rem)] overflow-y-auto mb-4">
              <div v-for="message in chatMessages" :key="message.user + message.message" class="mb-2">
                <strong>{{ message.user }}:</strong> {{ message.message }}
              </div>
              <FormKit
              type="text"
              v-model="newChatMessage"
              placeholder="Type a message..."
              @keyup.enter="sendChatMessage"
            >
              <template #suffix>
                <rs-button @click="sendChatMessage" size="sm">Send</rs-button>
              </template>
            </FormKit>
            </div>
           
          </template>
        </rs-card>
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold">Recent Events</h2>
          </template>
          <template #body>
            <ul class="space-y-2">
              <li v-for="event in recentEvents" :key="event.user" class="text-sm">
                <strong>{{ event.user }}</strong> {{ event.message }}
              </li>
            </ul>
          </template>
        </rs-card>
      </div>

      <!-- Recent Events -->
      <div class="col-span-1">
       
      </div>
    </div>
  </div>
</template>