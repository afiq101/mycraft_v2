<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">User Report</div>

    <!-- Total Users Card -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium">Total Users</div>
      <div class="flex items-center justify-between mt-4">
        <div class="text-2xl font-semibold">{{ totalUsers }}</div>
        <button
          @click="generateExcel"
          class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500"
        >
          Generate Excel
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Filters</div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- User Type Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >User Type</label
          >
          <select
            v-model="selectedUserType"
            @change="filtering"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="seller">Seller</option>
            <option value="user">User</option>
          </select>
        </div>

        <!-- Registration Date Range Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Registration Date (Start)</label
          >
          <input
            v-model="startDate"
            @change="filtering"
            type="date"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Registration Date (End)</label
          >
          <input
            v-model="endDate"
            @change="filtering"
            type="date"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Status Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="selectedStatus"
            @change="filtering"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <div v-if="!tableLoading">
        <rs-table
          v-if="filteredUsers.length > 0"
          :data="filteredUsers"
          :options="{
            variant: 'default',
            striped: true,
            borderless: true,
          }"
          :options-advanced="{
            sortable: true,
            responsive: true,
            filterable: false,
          }"
          advanced
        >
          <template v-slot:status="data">
            <div class="flex gap-2">
              <span
                :class="{
                  'bg-green-100 text-green-800': data.value.status === 'active',
                  'bg-yellow-100 text-yellow-800':
                    data.value.status === 'inactive',
                }"
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              >
                <span class="first-letter:uppercase">
                  {{ data.value.status }}
                </span>
              </span>
            </div>
          </template>
        </rs-table>

        <div v-else>No users found.</div>
      </div>
      <div v-else>
        <div class="p-10 text-center">
          <Icon
            name="eos-icons:loading"
            class="animate-spin text-gray-500"
            size="20"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { parseISO, isWithinInterval } from "date-fns";

// Page metadata
definePageMeta({
  title: "User Report",
});

// Total number of users
const totalUsers = ref(1050);

// Sample user data (replace with actual data fetching)
const users = ref([
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "seller",
    registeredDate: "2023-01-01",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    type: "user",
    registeredDate: "2023-01-02",
    status: "inactive",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob@example.com",
    type: "user",
    registeredDate: "2023-01-03",
    status: "active",
  },
  // Add more users...
]);

// Loading state
const tableLoading = ref(false);

// Filters
const filter = ref("");
const selectedUserType = ref("");
const startDate = ref("");
const endDate = ref("");
const selectedStatus = ref("");

// Computed filtered and paginated users
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesType = selectedUserType.value
      ? user.type === selectedUserType.value
      : true;
    const matchesStatus = selectedStatus.value
      ? user.status === selectedStatus.value
      : true;
    const matchesDateRange =
      startDate.value && endDate.value
        ? isWithinInterval(parseISO(user.registeredDate), {
            start: parseISO(startDate.value),
            end: parseISO(endDate.value),
          })
        : true;
    const matchesSearch = filter.value
      ? user.name.toLowerCase().includes(filter.value.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.value.toLowerCase())
      : true;

    return matchesType && matchesStatus && matchesDateRange && matchesSearch;
  });
});

// Method to handle filtering
const filtering = () => {
  tableLoading.value = true;

  setTimeout(() => {
    tableLoading.value = false;
  }, 1000); // 1 second loading state before displaying the table
};

// Method to generate Excel report
const generateExcel = () => {
  alert("Generating Excel report...");
  // Implement Excel generation logic here
};

const navigateToDetail = async (data) => {
  await navigateTo(`/user-report/detail/${data.id}`);
};
</script>

<style scoped>
/* Add custom styles here */
</style>
