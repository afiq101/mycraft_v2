<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Financial Management</div>

    <div class="flex gap-2">
      <!-- Sales by Category (Pie Chart) -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-lg font-medium mb-4">Sales by Category</div>

        <div class="w-full">
          <canvas id="salesByCategoryChart" class=""></canvas>
        </div>
      </div>

      <!-- Sales by Month (Line Graph) -->

      <div class="flex-grow bg-white p-6 rounded-lg shadow-md">
        <div class="text-lg font-medium mb-4">
          Sales by Month (Current Year)
        </div>
        <canvas id="salesByMonthChart" class="w-full h-64"></canvas>
      </div>
    </div>

    <!-- Payment Gateway and Shipping Cost by Month (Stacked Bar Chart) -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">
        Payment Gateway & Shipping Cost by Month
      </div>
      <canvas id="paymentShippingChart" class="w-full h-64"></canvas>
    </div>

    <!-- Refund & Return by Month (Line Chart) -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Refund & Return by Month</div>
      <canvas id="refundReturnChart" class="w-full h-64"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { Chart } from "chart.js";

// Sample data for the charts
const salesByCategoryData = {
  labels: [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Toys",
    "Health & Beauty",
  ],
  datasets: [
    {
      label: "Sales by Category",
      data: [30000, 25000, 20000, 15000, 10000],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    },
  ],
};

const salesByMonthData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Sales by Month",
      data: [
        12000, 15000, 14000, 13000, 16000, 17000, 18000, 19000, 21000, 22000,
        23000, 24000,
      ],
      fill: false,
      borderColor: "#36A2EB",
      tension: 0.1,
    },
  ],
};

// Sample data for Payment Gateway & Shipping Cost by Month (Stacked Bar Chart)
const paymentShippingData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Payment Gateway Fees",
      data: [
        1000, 1200, 1100, 1000, 1300, 1400, 1300, 1500, 1600, 1700, 1600, 1800,
      ],
      backgroundColor: "#FF6384",
    },
    {
      label: "Shipping Cost",
      data: [
        2000, 2500, 2300, 2200, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300,
      ],
      backgroundColor: "#36A2EB",
    },
  ],
};

// Sample data for Refund & Return by Month (Line Chart)
const refundReturnData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Refunds",
      data: [500, 600, 550, 500, 650, 700, 600, 750, 800, 700, 850, 900],
      fill: false,
      borderColor: "#FF6384",
      tension: 0.1,
    },
    {
      label: "Returns",
      data: [300, 400, 350, 300, 450, 500, 400, 550, 600, 500, 650, 700],
      fill: false,
      borderColor: "#36A2EB",
      tension: 0.1,
    },
  ],
};

onMounted(() => {
  // Initialize the Sales by Category Pie Chart
  const ctxCategory = document
    .getElementById("salesByCategoryChart")
    .getContext("2d");
  new Chart(ctxCategory, {
    type: "pie",
    data: salesByCategoryData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Initialize the Sales by Month Line Chart
  const ctxMonth = document
    .getElementById("salesByMonthChart")
    .getContext("2d");
  new Chart(ctxMonth, {
    type: "line",
    data: salesByMonthData,
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Initialize the Payment Gateway & Shipping Cost by Month Stacked Bar Chart
  const ctxPaymentShipping = document
    .getElementById("paymentShippingChart")
    .getContext("2d");
  new Chart(ctxPaymentShipping, {
    type: "bar",
    data: paymentShippingData,
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Initialize the Refund & Return by Month Line Chart
  const ctxRefundReturn = document
    .getElementById("refundReturnChart")
    .getContext("2d");
  new Chart(ctxRefundReturn, {
    type: "line",
    data: refundReturnData,
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
});
</script>

<style scoped>
/* Add custom styles here */
</style>
