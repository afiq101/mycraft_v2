<script setup>
definePageMeta({
  title: "Chat",
  layout: "default",
});

const searchQuery = ref("");
const selectedFilter = ref("All");
const selectedShop = ref("Ali (Support)");

const chats = ref([
  {
    id: 1,
    name: "Ali (Support)",
    lastMessage: "Hello, thank you for sh...",
    date: "23/04/23",
    avatar: "https://picsum.photos/seed/tech/40",
  },
]);

const currentChat = ref({
  messages: [
    {
      id: 1,
      text: "Dear customer, thank you for contacting us. How can we assist you today?",
      sender: "support",
      time: "02:38",
    },
    {
      id: 2,
      text: "Delivery Concern",
      sender: "support",
      time: "02:38",
      isButton: true,
    },
    {
      id: 3,
      text: "Product Concern",
      sender: "support",
      time: "02:38",
      isButton: true,
    },
    {
      id: 4,
      text: "Tax Invoice, Warranty & Rating Related",
      sender: "support",
      time: "02:38",
      isButton: true,
    },
    {
      id: 5,
      text: "Chat with Seller",
      sender: "system",
      time: "02:39",
      isSpecial: true,
    },
    {
      id: 6,
      text: 'FAQ Assistant is serving you now. To contact seller, tap "Chat with Seller".',
      sender: "system",
      time: "02:39",
    },
  ],
});

const faqs = ref([
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by logging into your account and visiting the 'My Orders' section. There you'll find real-time updates on your order status and shipping information.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be in their original condition and packaging. Please visit our Returns page for more detailed information and to initiate a return.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team through various channels: Live chat on our website, email at support@example.com, or phone at 1-800-123-4567. Our support hours are Monday to Friday, 9 AM to 6 PM.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we do offer international shipping to many countries. Shipping costs and delivery times vary depending on the destination. You can check available shipping options during the checkout process.",
  },
]);

const newMessage = ref("");

const sendMessage = () => {
  if (newMessage.value.trim()) {
    currentChat.value.messages.push({
      id: currentChat.value.messages.length + 1,
      text: newMessage.value,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
    newMessage.value = "";
  }
};
</script>

<template>
  <div>
    <div class="w-full h-screen max-w-[1920px] mx-auto flex bg-gray-100">
      <!-- Chat List Sidebar -->
      <div class="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200">
          <h1 class="text-xl font-semibold mb-4">Chat</h1>
          <FormKit
            type="text"
            v-model="searchQuery"
            placeholder="Search"
            :prefix-icon="'mdi:magnify'"
            :classes="{
              outer: 'mb-3',
              input: 'w-full bg-gray-100 border-gray-300 rounded-md',
            }"
          />
          <FormKit
            type="select"
            v-model="selectedFilter"
            :options="['All', 'Unread', 'Spam']"
            placeholder="All"
            :classes="{
              outer: 'mb-0',
              input: 'w-full bg-gray-100 border-gray-300 rounded-md',
            }"
          />
        </div>
        <div class="flex-grow overflow-y-auto">
          <div
            v-for="chat in chats"
            :key="chat.id"
            class="p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
            :class="{ 'bg-gray-100': selectedShop === chat.name }"
            @click="selectedShop = chat.name"
          >
            <div class="flex items-center">
              <img
                :src="chat.avatar"
                :alt="chat.name"
                class="w-10 h-10 rounded-full mr-3"
              />
              <div class="flex-grow overflow-hidden">
                <h3 class="font-semibold text-sm text-gray-800">
                  {{ chat.name }}
                </h3>
                <p class="text-xs text-gray-600 truncate">
                  {{ chat.lastMessage }}
                </p>
              </div>
              <span class="text-xs text-gray-500 ml-2">{{ chat.date }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Window -->
      <div class="w-3/4 flex flex-col bg-white">
        <!-- Chat Header -->
        <div
          class="bg-white border-b border-gray-200 p-4 flex justify-between items-center"
        >
          <h2 class="text-lg font-semibold text-gray-800">
            {{ selectedShop }}
          </h2>
          <div>
            <Icon
              name="mdi:dots-vertical"
              size="20"
              class="cursor-pointer text-gray-600 hover:text-gray-800"
            />
            <Icon
              name="mdi:cog"
              size="20"
              class="cursor-pointer ml-2 text-gray-600 hover:text-gray-800"
            />
          </div>
        </div>

        <!-- Chat Messages -->
        <div class="flex-grow overflow-y-auto p-4 space-y-4">
          <div
            v-for="message in currentChat.messages"
            :key="message.id"
            :class="{ 'flex justify-end': message.sender === 'user' }"
          >
            <div
              :class="{
                'bg-blue-100 rounded-lg p-3 max-w-xs':
                  message.sender === 'user',
                'bg-gray-100 rounded-lg p-3 max-w-xs':
                  message.sender === 'support',
                'bg-yellow-50 rounded-lg p-3 max-w-xs text-center':
                  message.sender === 'system',
                'bg-white border border-blue-500 text-blue-500 rounded-lg p-2 cursor-pointer hover:bg-blue-50':
                  message.isButton,
                'bg-red-50 text-red-500 rounded-lg p-2 cursor-pointer hover:bg-red-100':
                  message.isSpecial,
              }"
            >
              <p class="text-sm">{{ message.text }}</p>
              <div class="text-xs text-gray-500 mt-1 text-right">
                {{ message.time }}
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input -->
        <div class="bg-white border-t border-gray-200 p-3">
          <div class="flex items-center bg-gray-100 rounded-lg p-2">
            <FormKit
              type="text"
              v-model="newMessage"
              placeholder="Type a message"
              @keyup.enter="sendMessage"
              :classes="{
                outer: 'flex-grow mr-2 mb-0',
                input: 'w-full bg-transparent border-none focus:ring-0',
              }"
            />
            <div class="flex space-x-2">
              <Icon
                name="mdi:emoticon"
                size="20"
                class="cursor-pointer text-gray-600 hover:text-gray-800"
              />
              <Icon
                name="mdi:image"
                size="20"
                class="cursor-pointer text-gray-600 hover:text-gray-800"
              />
              <Icon
                name="mdi:paperclip"
                size="20"
                class="cursor-pointer text-gray-600 hover:text-gray-800"
              />
              <Icon
                name="mdi:file-document"
                size="20"
                class="cursor-pointer text-gray-600 hover:text-gray-800"
              />
              <Icon
                name="mdi:printer"
                size="20"
                class="cursor-pointer text-gray-600 hover:text-gray-800"
              />
            </div>
            <rs-button
              @click="sendMessage"
              class="ml-2 bg-red-500 hover:bg-red-600 text-white"
              >Send</rs-button
            >
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="w-full bg-white p-8 mt-8">
      <h2 class="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
      <div class="space-y-6">
        <rs-collapse accordion>
          <rs-collapse-item
            v-for="(faq, index) in faqs"
            :key="index"
            :title="faq.question"
          >
            <p class="text-gray-700">{{ faq.answer }}</p>
          </rs-collapse-item>
        </rs-collapse>
      </div>
    </div>
  </div>
</template>
