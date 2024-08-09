<script setup>
        definePageMeta({
          title: "Server Performance Metrics",
        });
    
      import VueApexCharts from 'vue3-apexcharts';
      
      // Refs for the chart
      const changeKey = ref(0);
      
      const series = ref([
        {
          name: "CPU Usage (%)",
          data: [65, 70, 68, 80, 75, 70, 85, 90], // Example data for CPU usage
        },
        {
          name: "Memory Usage (%)",
          data: [55, 60, 58, 65, 70, 68, 75, 80], // Example data for memory usage
        },
        {
          name: "Hard Disk Free Space (GB)",
          data: [120, 115, 110, 105, 100, 95, 90, 85], // Example data for hard disk space
        },
        {
          name: "Network Connection Status (ms)",
          data: [10, 12, 11, 13, 14, 15, 13, 12], // Example data for network status
        },
      ]);
      
      const chartOptions = computed(() => ({
        chart: {
          id: "serverPerformanceMetrics",
        },
        legend: {
          position: "top",
        },
        theme: {
          mode: "light",
          palette: "palette1",
        },
        xaxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8'], // Example quarters or checkpoints
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
        <h2 class="text-xl font-semibold"></h2>
      </template>
      <template #body>
        <ClientOnly>
          <VueApexCharts
            :key="changeKey"
            width="100%"
            height="300"
            type="line"
            :options="chartOptions"
            :series="series"
          ></VueApexCharts>
        </ClientOnly>
        </template>
        </rs-card>
        </div>
      </template>