<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  title: "Memberships",
  layout: "default",
});

const admins = ref([]);
const isLoading = ref(true);

const fetchAdmins = async () => {
  // Simulating an API call with setTimeout
  setTimeout(() => {
    admins.value = [
    { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    contactNumber: '+1 234 567 8901', 
    status: 'Active', 
    lastSeen: '2023-04-01 09:30:00' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    contactNumber: '+1 234 567 8902', 
    status: 'Active', 
    lastSeen: '2023-04-02 14:45:00' 
  },
  { 
    id: 3, 
    name: 'Bob Johnson', 
    email: 'bob.johnson@example.com', 
    contactNumber: '+1 234 567 8903', 
    status: 'Inactive', 
    lastSeen: '2023-03-30 11:20:00' 
  },
    ];
    isLoading.value = false;
  }, 1000); // Simulate a 1-second delay
};

onMounted(fetchAdmins);

const getStatusVariant = (status) => {
  return status === 'Active' ? 'success' : 'danger';
};

const getRoleVariant = (role) => {
  switch (role) {
    case 'Full Access': return 'primary';
    case 'Limited Access': return 'warning';
    case 'Read Only': return 'info';
    default: return 'secondary';
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">LIST OF MEMBERS</h1>
    <rs-card>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Membership Listings</h2>
          <div class="flex space-x-4">
          <rs-button variant="primary">
            <Icon name="ph:download-simple-bold" class="w-5 h-5 mr-2" />
            Generate Report
          </rs-button>
          <nuxt-link to="/super-admin/memberships/create-member">
          <rs-button variant="primary">
            <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
            New Member
          </rs-button></nuxt-link>
        </div></div>
      </template>
      <template #body>
        <div v-if="isLoading" class="text-center py-4">
          Loading...
        </div>
        <rs-table 
          v-else
          :data="admins" 
          :field="['Name', 'Email', 'Contact Number', 'Status', 'Last Seen', 'Action']" 
          advanced
        >
          <template #Name="{ value }">{{ value.name }}</template>
          <template #Email="{ value }">{{ value.email }}</template>
          <template #ContactNumber="{ value }">{{ value.contactNumber }}</template>
          <template #Status="{ value }">
            <rs-badge :variant="getStatusVariant(value.status)">{{ value.status }}</rs-badge>
          </template>
          <template #Role="{ value }">
            <rs-badge :variant="getRoleVariant(value.role)">{{ value.role }}</rs-badge>
          </template>
          <template #LastSeen="{ value }">{{ value.lastSeen }}</template>
          <template #Action="{ row }">
            <div class="flex space-x-2"> <!-- Added a flex container with spacing -->
              <nuxt-link to="/super-admin/memberships/create-member">
                <rs-button 
                  variant="primary" 
                  size="sm"
                >
                  Edit
                </rs-button>
              </nuxt-link>
              <nuxt-link to="/super-admin/seller/create-seller">
              <rs-button 
                  variant="primary" 
                  size="sm"
                >
                  Upgrade
                </rs-button></nuxt-link>
              <rs-button 
                variant="danger" 
                size="sm"
                @click="deleteRow(row)"
              >
                Delete
              </rs-button>
              <nuxt-link to="/super-admin/memberships/order-transaction">
              <rs-button 
                variant="warning" 
                size="sm"
                @click="deleteRow(row)"
              >
                Report
              </rs-button></nuxt-link>
            </div>
          </template>
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>