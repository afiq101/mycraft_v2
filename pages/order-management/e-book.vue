<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">E-book Order Management</div>

    <!-- Dropdown for Status Selection -->
    <div class="relative w-64">
      <select
        v-model="selectedStatus"
        @change="handleStatusChange"
        class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Statuses</option>
        <option
          v-for="(data, index) in orderStatuses"
          :key="index"
          :value="data.code"
        >
          {{ data.label }}
        </option>
      </select>
    </div>

    <!-- Dropdown for Date Filter Selection -->
    <div class="relative w-64 mt-4">
      <select
        v-model="selectedDateFilter"
        @change="handleDateFilterChange"
        class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Dates</option>
        <option value="today">Today</option>
        <option value="thisMonth">This Month</option>
        <option value="dateRange">Date Range</option>
        <option value="monthRange">Month Range</option>
      </select>
    </div>

    <!-- Date Range Picker -->
    <div v-if="selectedDateFilter === 'dateRange'" class="flex space-x-2 mt-4">
      <input
        type="date"
        v-model="dateRange.start"
        class="p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="date"
        v-model="dateRange.end"
        class="p-2 border border-gray-300 rounded-lg"
      />
      <button
        @click="applyDateRange"
        class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Apply
      </button>
    </div>

    <!-- Month Range Picker -->
    <div v-if="selectedDateFilter === 'monthRange'" class="flex space-x-2 mt-4">
      <input
        type="month"
        v-model="monthRange.start"
        class="p-2 border border-gray-300 rounded-lg"
      />
      <input
        type="month"
        v-model="monthRange.end"
        class="p-2 border border-gray-300 rounded-lg"
      />
      <button
        @click="applyMonthRange"
        class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Apply
      </button>
    </div>

    <!-- Reset Filters Button -->
    <div class="mt-4">
      <button
        @click="resetFilters"
        class="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-500"
      >
        Reset Filters
      </button>
    </div>

    <div
      class="my-5 bg-white p-6 rounded-lg shadow-md flex flex-col items-center"
    >
      <span class="mb-4 first-letter:uppercase">
        {{ selectedStatus || "All" }} Orders
      </span>
      <span class="text-2xl font-semibold">{{ filteredOrders.length }} </span>
    </div>

    <div class="bg-white p-6 rounded-lg shadow-md mb-20">
      <div class="text-lg font-medium mb-4 first-letter:uppercase">
        {{ selectedStatus || "All" }} Order list
      </div>

      <div class="mb-4">
        <input
          type="text"
          v-model="filter"
          placeholder="Search orders..."
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order ID
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(data, index) in paginatedOrders" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ data.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ data.customer }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ data.date }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ data.total }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="{
                    'bg-green-100 text-green-800': data.status === 'paid',
                    'bg-yellow-100 text-yellow-800': data.status === 'unpaid',
                    'bg-red-100 text-red-800': data.status === 'cancelled',
                    'bg-blue-100 text-blue-800': data.status === 'shipped',
                    'bg-indigo-100 text-indigo-800':
                      data.status === 'delivered',
                    'bg-purple-100 text-purple-800': data.status === 'refund',
                    'bg-orange-100 text-orange-800': data.status === 'return',
                    'bg-teal-100 text-teal-800': data.status === 'completed',
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  <span class="first-letter:uppercase">
                    {{ data.status }}
                  </span>
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2 flex justify-center"
              >
                <div class="flex gap-2">
                  <div
                    class="cursor-pointer"
                    @click="navigateToDetail(data.id)"
                  >
                    <Icon
                      name="material-symbols:list-alt"
                      class="text-indigo-500 hover:text-indigo-800"
                      size="19"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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
import {
  startOfToday,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  parseISO,
} from "date-fns";

definePageMeta({
  title: "Order Management",
});

const orderStatuses = ref([
  { value: 0, label: "Paid", code: "paid" },
  { value: 0, label: "Unpaid", code: "unpaid" },
  { value: 0, label: "Cancelled", code: "cancelled" },
  { value: 0, label: "Shipped", code: "shipped" },
  { value: 0, label: "Delivered", code: "delivered" },
  { value: 0, label: "Refund", code: "refund" },
  { value: 0, label: "Return", code: "return" },
  { value: 0, label: "Completed", code: "completed" },
]);

const filter = ref("");
const currentPage = ref(1);
const itemsPerPage = 10;
const selectedStatus = ref("");
const selectedDateFilter = ref("");
const showDateRange = ref(false);
const dateRange = ref({ start: "", end: "" });
const monthRange = ref({ start: "", end: "" });

const orders = ref([
  {
    id: 1,
    customer: "John Doe",
    date: "2023-01-01",
    total: 100,
    status: "paid",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 2,
    customer: "Jane Doe",
    date: "2023-01-02",
    total: 200,
    status: "unpaid",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 3,
    customer: "Bob Smith",
    date: "2023-01-03",
    total: 300,
    status: "shipped",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 4,
    customer: "Alice Jones",
    date: "2023-01-04",
    total: 400,
    status: "delivered",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 5,
    customer: "Jane Smith",
    date: "2023-01-05",
    total: 500,
    status: "refund",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 6,
    customer: "Bob Johnson",
    date: "2023-01-06",
    total: 600,
    status: "return",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 7,
    customer: "John Doe",
    date: "2023-01-07",
    total: 700,
    status: "completed",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },

  {
    id: 8,
    customer: "Alice White",
    date: "2023-01-08",
    total: 800,
    status: "paid",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 9,
    customer: "Jane Black",
    date: "2023-01-09",
    total: 900,
    status: "unpaid",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 10,
    customer: "Bob Brown",
    date: "2023-01-10",
    total: 1000,
    status: "cancelled",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
  {
    id: 11,
    customer: "John Blue",
    date: "2023-01-11",
    total: 1100,
    status: "shipped",
    actions: [
      { label: "View", onClick: () => console.log("View") },
      { label: "Update", onClick: () => console.log("Update") },
    ],
  },
]);

const filteredOrders = computed(() => {
  let filtered = orders.value.filter((order) => {
    return (
      (!selectedStatus.value || order.status === selectedStatus.value) &&
      (!filter.value ||
        order.customer.toLowerCase().includes(filter.value.toLowerCase()))
    );
  });

  if (selectedDateFilter.value === "today") {
    filtered = filtered.filter((order) =>
      isWithinInterval(parseISO(order.date), {
        start: startOfToday(),
        end: startOfToday(),
      })
    );
  } else if (selectedDateFilter.value === "thisMonth") {
    filtered = filtered.filter((order) =>
      isWithinInterval(parseISO(order.date), {
        start: startOfMonth(new Date()),
        end: endOfMonth(new Date()),
      })
    );
  } else if (selectedDateFilter.value === "dateRange") {
    filtered = filtered.filter((order) => {
      const orderDate = parseISO(order.date);
      return (
        orderDate >= parseISO(dateRange.value.start) &&
        orderDate <= parseISO(dateRange.value.end)
      );
    });
  } else if (selectedDateFilter.value === "monthRange") {
    filtered = filtered.filter((order) => {
      const orderMonth = order.date.slice(0, 7);
      return (
        orderMonth >= monthRange.value.start &&
        orderMonth <= monthRange.value.end
      );
    });
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredOrders.value.length / itemsPerPage)
);

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredOrders.value.slice(start, start + itemsPerPage);
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

const handleStatusChange = () => {
  currentPage.value = 1; // Reset to first page on status change
};

const handleDateFilterChange = () => {
  showDateRange.value = selectedDateFilter.value === "dateRange";
  currentPage.value = 1; // Reset to first page on date filter change
};

const applyDateRange = () => {
  handleDateFilterChange();
};

const applyMonthRange = () => {
  handleDateFilterChange();
};

const resetFilters = () => {
  selectedStatus.value = "";
  selectedDateFilter.value = "";
  filter.value = "";
  dateRange.value = { start: "", end: "" };
  monthRange.value = { start: "", end: "" };
  currentPage.value = 1; // Reset to first page after resetting filters
};

const navigateToDetail = async (orderId) => {
  await navigateTo(`/order-management/detail/${orderId}`);
};
</script>

<style scoped></style>
