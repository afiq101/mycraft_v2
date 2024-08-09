<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

definePageMeta({
  title: "Server Performance Metrics",
});

// Refs for the chart
const changeKey = ref(0);

// Data for the existing and new graphs
const seriesResponseTime = ref([
  {
    name: "Average Response Time (ms)",
    data: [120, 130, 125, 140, 135, 128, 145, 150], // Example data for average response time
  },
]);

const seriesRequestRate = ref([
  {
    name: "Request Rate (requests/min)",
    data: [300, 350, 320, 400, 380, 390, 410, 450], // Example data for request rate
  },
]);

const seriesErrorRate = ref([
  {
    name: "Error Rate (%)",
    data: [0.5, 0.8, 0.6, 1.0, 0.9, 1.2, 1.0, 0.7], // Example data for error rate
  },
]);

const seriesPageLoadTime = ref([
  {
    name: "Page Load Time (ms)",
    data: [800, 850, 820, 900, 890, 870, 920, 950], // Example data for page load time
  },
]);

const seriesThirdPartyConnections = ref([
  {
    name: "Third-Party API Connections",
    data: [50, 45, 55, 60, 58, 62, 64, 70], // Example data for third-party API connections
  },
]);

const seriesSlowestTransactions = ref([
  {
    name: "Slowest Transactions (ms)",
    data: [3000, 3200, 3100, 3300, 3500, 3400, 3600, 3700], // Example data for slowest transactions
  },
]);

// Options for each chart
const chartOptionsResponseTime = computed(() => ({
  chart: {
    id: "averageResponseTimeMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Example months or checkpoints
  },
  yaxis: {
    title: {
      text: 'Response Time (ms)',
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));

const chartOptionsRequestRate = computed(() => ({
  chart: {
    id: "requestRateMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette2",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Example months or checkpoints
  },
  yaxis: {
    title: {
      text: 'Request Rate (requests/min)',
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));

const chartOptionsErrorRate = computed(() => ({
  chart: {
    id: "errorRateMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette3",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Example months or checkpoints
  },
  yaxis: {
    title: {
      text: 'Error Rate (%)',
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));

const chartOptionsPageLoadTime = computed(() => ({
  chart: {
    id: "pageLoadTimeMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette4",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Example months or checkpoints
  },
  yaxis: {
    title: {
      text: 'Page Load Time (ms)',
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));

const chartOptionsThirdPartyConnections = computed(() => ({
  chart: {
    id: "thirdPartyConnectionsMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette5",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Example months or checkpoints
  },
  yaxis: {
    title: {
      text: 'Connections',
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));

const chartOptionsSlowestTransactions = computed(() => ({
  chart: {
    id: "slowestTransactionsMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette6",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'], // Example months or checkpoints
  },
  yaxis: {
    title: {
      text: 'Slowest Transactions (ms)',
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        legend: {
          position: "bottom",
        },
      },
    },
  ],
}));

onMounted(() => {
  setTimeout(() => {
    changeKey.value++;
  }, 500);
});
</script>

<template> 
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Server Performance Metrics</h1>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Average Response Time Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsResponseTime"
            :series="seriesResponseTime"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Request Rate Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsRequestRate"
            :series="seriesRequestRate"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Error Rate Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsErrorRate"
            :series="seriesErrorRate"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Page Load Time Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsPageLoadTime"
            :series="seriesPageLoadTime"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Connections to Third-Party APIs Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsThirdPartyConnections"
            :series="seriesThirdPartyConnections"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Slowest Transactions Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsSlowestTransactions"
            :series="seriesSlowestTransactions"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
