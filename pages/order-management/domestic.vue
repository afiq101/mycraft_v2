<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Domestic Order Management</div>

    <!-- Dropdown for Status Selection -->
    <div class="relative w-64">
      <select
        v-model="selectedStatus"
        @change="filtering"
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
        @change="filtering"
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
      <div v-if="!tableLoading">
        <rs-table
          v-if="filteredOrders.length > 0"
          :data="filteredOrders"
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
          <template v-slot:actions="data">
            <div class="flex gap-2">
              <div class="cursor-pointer" @click="navigateToDetail(data)">
                <Icon
                  name="material-symbols:list-alt"
                  class="text-indigo-500 hover:text-indigo-800"
                  size="19"
                />
              </div>
            </div>
          </template>
        </rs-table>

        <div v-else>No orders found.</div>
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
import { ref } from "vue";
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

const tableLoading = ref(false);

const selectedStatus = ref("");
const selectedDateFilter = ref("");
const dateRange = ref({ start: "", end: "" });
const monthRange = ref({ start: "", end: "" });
const filter = ref("");
const currentPage = ref(1); // This line was missing
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

const filteredOrders = ref([]);

const filtering = () => {
  tableLoading.value = true;

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

  filteredOrders.value = filtered;

  setTimeout(() => {
    tableLoading.value = false;
  }, 500);
};

const applyDateRange = () => {
  filtering();
};

const applyMonthRange = () => {
  filtering();
};

const resetFilters = () => {
  selectedStatus.value = "";
  selectedDateFilter.value = "";
  filter.value = "";
  dateRange.value = { start: "", end: "" };
  monthRange.value = { start: "", end: "" };
  currentPage.value = 1; // Reset to first page after resetting filters
  filtering();
};

const navigateToDetail = async (orderId) => {
  console.log(orderId);
  if (orderId) {
    await navigateTo(`/order-management/detail/${orderId}`);
  }
};

onMounted(() => {
  tableLoading.value = true;

  filtering();

  setTimeout(() => {
    tableLoading.value = false;
  }, 500);
});
</script>

<style scoped></style>
