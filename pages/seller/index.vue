<script setup>
import { ref, computed } from 'vue';

const sellers = ref([
  { id: 1, name: 'Tech World', email: 'tech.world@example.com', contactNumber: '+1 234 567 8901', status: 'Pending', vacationMode: false, lastSeen: '2023-04-01 09:30:00' },
  { id: 2, name: 'Fashion Hub', email: 'fashion.hub@example.com', contactNumber: '+1 234 567 8902', status: 'Approved', vacationMode: false, lastSeen: '2023-04-02 14:45:00' },
  { id: 3, name: 'Home Essentials', email: 'home.essentials@example.com', contactNumber: '+1 234 567 8903', status: 'Rejected', vacationMode: true, lastSeen: '2023-03-30 11:20:00' },
  { id: 4, name: 'Gadget Store', email: 'gadget.store@example.com', contactNumber: '+1 234 567 8904', status: 'Suspended', vacationMode: false, lastSeen: '2023-04-05 10:00:00' },
  { id: 5, name: 'Book Haven', email: 'book.haven@example.com', contactNumber: '+1 234 567 8905', status: 'Inactive', vacationMode: true, lastSeen: '2023-04-03 08:15:00' },
]);

const currentStatusFilter = ref('All');

const filteredSellers = computed(() => {
  if (currentStatusFilter.value === 'All') {
    return sellers.value;
  }
  return sellers.value.filter(seller => seller.status === currentStatusFilter.value);
});

const getStatusVariant = (status) => {
  switch (status) {
    case 'Approved': return 'success';
    case 'Pending': return 'warning';
    case 'Rejected': return 'danger';
    case 'Suspended': return 'danger';
    case 'Inactive': return 'secondary';
    default: return 'secondary';
  }
};

const toggleVacationMode = (seller) => {
  seller.vacationMode = !seller.vacationMode;
};

const changeStatus = (seller, newStatus) => {
  seller.status = newStatus;
};

const deleteSeller = (seller) => {
  sellers.value = sellers.value.filter(s => s.id !== seller.id);
};

const previewShop = (seller) => {
  // Logic to preview the seller's shop
  console.log(`Previewing shop for: ${seller.name}`);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">List of Sellers</h1>

    <!-- Status Tabs -->
    <div class="mb-4">
      <rs-tab>
        <rs-tab-item title="All" @click="currentStatusFilter = 'All'">All</rs-tab-item>
        <rs-tab-item title="Pending" @click="currentStatusFilter = 'Pending'">Pending</rs-tab-item>
        <rs-tab-item title="Approved" @click="currentStatusFilter = 'Approved'">Approved</rs-tab-item>
        <rs-tab-item title="Rejected" @click="currentStatusFilter = 'Rejected'">Rejected</rs-tab-item>
        <rs-tab-item title="Suspended" @click="currentStatusFilter = 'Suspended'">Suspended</rs-tab-item>
        <rs-tab-item title="Inactive" @click="currentStatusFilter = 'Inactive'">Inactive</rs-tab-item>
      </rs-tab>
    </div>

    <!-- Seller List Table -->
    <rs-card>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Seller Listings</h2>
        </div>
      </template>
      <template #body>
        <rs-table :data="filteredSellers" :field="['Name', 'Email', 'Contact Number', 'Status', 'Vacation Mode', 'Last Seen', 'Action']" advanced>
          <template #Name="{ value }">{{ value.name }}</template>
          <template #Email="{ value }">{{ value.email }}</template>
          <template #ContactNumber="{ value }">{{ value.contactNumber }}</template>
          <template #Status="{ value }">
            <rs-badge :variant="getStatusVariant(value.status)">{{ value.status }}</rs-badge>
          </template>
          <template #VacationMode="{ value }">
            <div class="flex space-y-6">
              <label class="inline-flex items-center mb-5 cursor-pointer">
                <input type="checkbox" v-model="value.vacationMode" @change="toggleVacationMode(value)" class="sr-only peer">
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ value.vacationMode ? 'On' : 'Off' }}</span>
              </label>
            </div>
          </template>
          <template #LastSeen="{ value }">{{ value.lastSeen }}</template>
          <template #Action="{ row }">
            <div class="flex space-x-2">
              <nuxt-link to="/memberships/create-member">
                <rs-button 
                  variant="primary" 
                  size="sm"
                >
                  Edit
                </rs-button>
              </nuxt-link>
              <nuxt-link to="/seller/product">
              <rs-button 
                variant="warning" 
                size="sm"
                @click="deleteRow(row)"
              >
                Product
              </rs-button></nuxt-link>
              <nuxt-link to="/memberships/order-transaction">
              <rs-button 
                variant="warning" 
                size="sm"
                @click="deleteRow(row)"
              >
                Report
              </rs-button></nuxt-link>
              <rs-button variant="info" size="sm" @click="previewShop(row)">Preview</rs-button>
              <rs-dropdown text="More" variant="outline-primary" size="sm">
                <rs-dropdown-item @click="changeStatus(row, 'Approved')">Approve</rs-dropdown-item>
                <rs-dropdown-item @click="changeStatus(row, 'Rejected')">Reject</rs-dropdown-item>
                <rs-dropdown-item @click="changeStatus(row, 'Suspended')">Suspend</rs-dropdown-item>
                <rs-dropdown-item @click="changeStatus(row, 'Inactive')">Mark as Inactive</rs-dropdown-item>
                <rs-dropdown-item @click="deleteSeller(row)">Delete</rs-dropdown-item>
              </rs-dropdown>
            </div>
          </template>
        </rs-table>
      </template>
    </rs-card>
  </div>
</template>
