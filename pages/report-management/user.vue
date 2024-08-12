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
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- User List Table -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">User List</div>

      <!-- Search Input -->
      <div class="mb-4">
        <input
          type="text"
          v-model="filter"
          placeholder="Search users..."
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- User Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User Type
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Registered Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(user, index) in paginatedUsers" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ user.type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ user.registeredDate }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'bg-green-100 text-green-800': user.status === 'active',
                    'bg-red-100 text-red-800': user.status === 'inactive',
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ user.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50"
        >
          Next
        </button>
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

// Filters
const filter = ref("");
const selectedUserType = ref("");
const startDate = ref("");
const endDate = ref("");
const selectedStatus = ref("");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

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

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};

// Method to generate Excel report
const generateExcel = () => {
  alert("Generating Excel report...");
  // Implement Excel generation logic here
};
</script>

<style scoped>
/* Add custom styles here */
</style>
