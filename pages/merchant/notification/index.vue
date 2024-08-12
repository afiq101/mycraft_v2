<script setup>

definePageMeta({
  title: "Notification Manager",
  layout: "default",
});

import { ref } from 'vue';

const activeTab = ref('Dashboard');

const notificationTypes = ref([
  { id: 1, name: 'System Updates', enabled: true },
  { id: 2, name: 'New Messages', enabled: true },
  { id: 3, name: 'Order Status', enabled: false },
  { id: 4, name: 'Payment Reminders', enabled: true },
  { id: 5, name: 'Security Alerts', enabled: true },
]);

const recentNotifications = ref([
  { id: 1, type: 'System Update', message: 'New version 2.3 is available', date: '2024-03-15 10:30' },
  { id: 2, type: 'New Message', message: 'You have a new message from John', date: '2024-03-14 15:45' },
  { id: 3, type: 'Security Alert', message: 'Unusual login attempt detected', date: '2024-03-13 09:15' },
]);

const notificationChannels = ref([
  { id: 1, name: 'Email', enabled: true },
  { id: 2, name: 'SMS', enabled: false },
  { id: 3, name: 'Push Notification', enabled: true },
  { id: 4, name: 'In-App Notification', enabled: true },
]);

const toggleNotificationType = (id) => {
  const type = notificationTypes.value.find(t => t.id === id);
  if (type) {
    type.enabled = !type.enabled;
  }
};

const toggleChannel = (id) => {
  const channel = notificationChannels.value.find(c => c.id === id);
  if (channel) {
    channel.enabled = !channel.enabled;
  }
};

</script>

<template>
  <div class="w-full max-w-[1920px] mx-auto p-4">
    <rs-card class="mb-6">
      <template #header>
        <h1 class="text-3xl font-bold text-gray-800">Notification Manager</h1>
      </template>
      <template #body>
        <p class="text-gray-600 mb-4">
          Manage and customize your notification preferences to stay informed about important updates and activities.
        </p>
      </template>
    </rs-card>

    <rs-tab class="mb-6">
      <rs-tab-item title="Dashboard" :active="activeTab === 'Dashboard'" @click="activeTab = 'Dashboard'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <rs-card>
            <template #header>
              <h2 class="text-xl font-bold">Recent Notifications</h2>
            </template>
            <template #body>
              <ul class="divide-y divide-gray-200">
                <li v-for="notification in recentNotifications" :key="notification.id" class="py-3">
                  <div class="flex justify-between">
                    <div>
                      <p class="font-semibold">{{ notification.type }}</p>
                      <p class="text-sm text-gray-600">{{ notification.message }}</p>
                    </div>
                    <p class="text-sm text-gray-500">{{ notification.date }}</p>
                  </div>
                </li>
              </ul>
            </template>
          </rs-card>
          <rs-card>
            <template #header>
              <h2 class="text-xl font-bold">Notification Channels</h2>
            </template>
            <template #body>
              <ul class="space-y-2">
                <li v-for="channel in notificationChannels" :key="channel.id" class="flex items-center justify-between">
                  <span>{{ channel.name }}</span>
                  <rs-button @click="toggleChannel(channel.id)" :variant="channel.enabled ? 'primary' : 'secondary'">
                    {{ channel.enabled ? 'Enabled' : 'Disabled' }}
                  </rs-button>
                </li>
              </ul>
            </template>
          </rs-card>
        </div>
      </rs-tab-item>
      <rs-tab-item title="Notification Types" :active="activeTab === 'Notification Types'" @click="activeTab = 'Notification Types'">
        <rs-card class="mt-4">
          <template #header>
            <h2 class="text-xl font-bold">Manage Notification Types</h2>
          </template>
          <template #body>
            <ul class="space-y-4">
              <li v-for="type in notificationTypes" :key="type.id" class="flex items-center justify-between">
                <span>{{ type.name }}</span>
                <rs-button @click="toggleNotificationType(type.id)" :variant="type.enabled ? 'primary' : 'secondary'">
                  {{ type.enabled ? 'Enabled' : 'Disabled' }}
                </rs-button>
              </li>
            </ul>
          </template>
        </rs-card>
      </rs-tab-item>
      <rs-tab-item title="Settings" :active="activeTab === 'Settings'" @click="activeTab = 'Settings'">
        <rs-card class="mt-4">
          <template #header>
            <h2 class="text-xl font-bold">Notification Settings</h2>
          </template>
          <template #body>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Notification Frequency</label>
                <FormKit
                  type="select"
                  :options="['Immediate', 'Hourly', 'Daily', 'Weekly']"
                  placeholder="Select frequency"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Quiet Hours</label>
                <div class="flex space-x-4">
                  <FormKit
                    type="time"
                    label="Start Time"
                  />
                  <FormKit
                    type="time"
                    label="End Time"
                  />
                </div>
              </div>
              <div>
                <FormKit
                  type="checkbox"
                  label="Enable Do Not Disturb mode"
                />
              </div>
              <rs-button type="submit" variant="primary">Save Settings</rs-button>
            </form>
          </template>
        </rs-card>
      </rs-tab-item>
    </rs-tab>
  </div>
</template>