<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  title: "Action Logs",
  layout: "default",
});

const actionLogs = ref([]);
const isLoading = ref(true);

const fetchActionLogs = async () => {
  // Simulating an API call with setTimeout
  setTimeout(() => {
    actionLogs.value = [
      { id: 1, user: 'John Doe', action: 'Login', details: 'User logged in successfully.', timestamp: '2023-04-01 09:30:00' },
      { id: 2, user: 'Jane Smith', action: 'Logout', details: 'User logged out.', timestamp: '2023-04-01 17:45:00' },
      { id: 3, user: 'Bob Johnson', action: 'Payment', details: 'Processed payment of $200.', timestamp: '2023-04-01 12:20:00' },
      { id: 4, user: 'John Doe', action: 'Button Click', details: 'Clicked on "Save" button.', timestamp: '2023-04-02 09:10:00' },
      { id: 5, user: 'Jane Smith', action: 'Profile Update', details: 'Updated profile information.', timestamp: '2023-04-02 14:30:00' },
    ];
    isLoading.value = false;
  }, 1000); // Simulate a 1-second delay
};

onMounted(fetchActionLogs);

const getActionVariant = (action) => {
  switch (action) {
    case 'Login': return 'success';
    case 'Logout': return 'danger';
    case 'Payment': return 'primary';
    case 'Button Click': return 'info';
    case 'Profile Update': return 'warning';
    default: return 'secondary';
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">ACTION LOGS</h1>

    <rs-card>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">User Activity Logs</h2>
        </div>
      </template>
      <template #body>
        <div v-if="isLoading" class="text-center py-4">
          Loading...
        </div>
        <rs-table 
          v-else
          :data="actionLogs" 
          :field="['User', 'Action', 'Details', 'Timestamp']" 
          advanced
        >
          <template #User="{ value }">{{ value.user }}</template>
          <template #Action="{ value }">
            <rs-badge :variant="getActionVariant(value.action)">{{ value.action }}</rs-badge>
          </template>
          <template #Details="{ value }">{{ value.details }}</template>
          <template #Timestamp="{ value }">{{ value.timestamp }}</template>
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>
