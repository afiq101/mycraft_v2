<script setup>
import { ref, computed, onMounted } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

definePageMeta({
  title: "Database Performance Metrics",
});

// Refs for the charts
const changeKey = ref(0);

// Data for the "Query Time" graph
const seriesQueryTime = ref([
  {
    name: "Query Time (ms)",
    data: [50, 55, 60, 52, 48, 47, 55, 58, 65, 60], // Example data for query time in milliseconds
  },
]);

// Data for the "Show Processing List" graph
const seriesProcessingList = ref([
  {
    name: "Processes Running",
    data: [2, 3, 4, 3, 2, 1, 3, 4, 5, 6], // Example data for the number of processes running
  },
]);

// Options for the "Query Time" chart
const chartOptionsQueryTime = computed(() => ({
  chart: {
    id: "queryTimeMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'], // Example time intervals
  },
  yaxis: {
    title: {
      text: 'Query Time (ms)',
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

// Options for the "Show Processing List" chart
const chartOptionsProcessingList = computed(() => ({
  chart: {
    id: "processingListMetrics",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette2",
  },
  xaxis: {
    categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00'], // Example time intervals
  },
  yaxis: {
    title: {
      text: 'Processes Running',
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
    <h1 class="text-3xl font-bold mb-8">Database Performance Metrics</h1>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Query Time Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsQueryTime"
            :series="seriesQueryTime"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Processes Running Over Time</h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptionsProcessingList"
            :series="seriesProcessingList"
          ></VueApexCharts>
        </ClientOnly>
      </template>
    </rs-card>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
