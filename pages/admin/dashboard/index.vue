<script setup>
import { BarChart, useBarChart } from "vue-chart-3";
definePageMeta({
  title: "Dashboard",
  middleware: ["auth"],
  requiresAuth: true,
});


// Analytical Total Sales (Normal Price)
const totalSalesData = ref([
  {
    name: 'Total Sales',
    data: [1200, 1500, 1100, 1800, 1900, 2200, 2500],
  },
]);

// Today's Orders (SKU)
const todaysOrdersData = ref([
  {
    name: "Today's Orders",
    data: [150, 200, 120, 300, 250],
  },
]);

// Sales by Categories
const salesByCategoriesData = ref([
  {
    name: 'Sales by Categories',
    data: [5000, 4000, 3000, 7000, 2000],
  },
]);
const categories = ref(['Electronics', 'Clothing', 'Home & Garden', 'Toys', 'Books']);

// Monthly Sales (Domestic & International)
const monthlySalesData = ref([
  {
    name: 'Domestic Sales',
    data: [20000, 25000, 22000, 27000, 30000, 28000, 35000],
  },
  {
    name: 'International Sales',
    data: [15000, 18000, 16000, 20000, 24000, 23000, 26000],
  },
]);

// Annual Sales (Domestic & International)
const annualSalesData = ref([
  {
    name: 'Domestic Sales',
    data: [380000],
  },
  {
    name: 'International Sales',
    data: [280000],
  },
]);

// Sales via Web or Apps Purchased
const salesViaWebOrAppsData = ref([
  {
    name: 'Web Sales',
    data: [24000, 28000, 26000, 29000, 32000],
  },
  {
    name: 'App Sales',
    data: [15000, 16000, 14000, 18000, 20000],
  },
]);

const chartSale = computed(() => ({
  chart: {
    id: "salesChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ],
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

// Chart options category sales
const chartOptions1 = computed(() => ({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['Electronics', 'Clothing', 'Home & Garden', 'Toys', 'Books'],
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

const orderData = ref([44, 55, 67, 83]);

const chartOrder = computed(() => ({
  chart: {
    height: 350,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        style: {
          colors: "#9CA3AF",
        },
        name: {
          offsetY: 30,
          fontSize: "18px",
        },
        value: {
          offsetY: -15,
          fontSize: "30px",
        },
        total: {
          show: true,
          label: "Total",
          formatter: function (w) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return 249;
          },
        },
      },
    },
  },
  labels: ["Delivery Status", "Order Status", "Total Orders PKKM", "Total Domestic/International Orders"],
  stroke: {
    lineCap: "round",
  },
}));

const chartOrder1 = computed(() => ({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ["Delivery Status", "Order Status", "Total Orders PKKM", "Total Domestic/International Orders"],
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

// Campaign
const campaignData = ref([
  {
    name: 'Campaign',
    data: [5000, 4000],
  },
]);
const chartCampaign = computed(() => ({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['Total MCS', 'Total Sellers'],
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

// Users
// Visitor Age Range
const visitorAgeRangeData = ref([
  {
    name: 'Number of Visitors',
    data: [1500, 3000, 2500, 2000, 1000, 500],
  },
]);
const chartVisitorAgeRange = computed(() => ({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['0-18', '19-25', '26-35', '36-45', '46-55', '56+'],
    title: {
      text: 'Age Range',
    },
  },
  yaxis: {
    title: {
      text: 'Number of Visitors',
    },
    min: 0,
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm',
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
  ]
}));

// Total Download Apps
const downloadData = ref([75, 85]);
const chartDownload = computed(() => ({
  chart: {
    height: 350,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        style: {
          colors: "#9CA3AF",
        },
        name: {
          offsetY: 30,
          fontSize: "18px",
        },
        value: {
          offsetY: -15,
          fontSize: "30px",
        },
        total: {
          show: true,
          label: "Total",
          formatter: function (w) {
            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
            return 249;
          },
        },
      },
    },
  },
  labels: ["iOS", "Andriod"],
  stroke: {
    lineCap: "round",
  },
}));

// Financial
// Total Payout
const payoutSeries = ref([
  {
    name: 'Sellers Payout',
    data: [10000, 15000, 12000, 18000, 16000, 19000, 20000],
  },
  {
    name: 'Refund Payout',
    data: [3000, 5000, 4500, 4000, 3500, 3000, 2500],
  },
]);
const chartPayout = computed(() => ({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  yaxis: {
    title: {
      text: 'Amount (MYR)',
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

// Total Redeemed
const redeemedSeries = ref([
  {
    name: 'Coins Redeemed',
    data: [10000, 12000, 13000, 11000, 9000, 8000, 9500],
  },
  {
    name: 'Voucher Redeemed',
    data: [5000, 5500, 6000, 4500, 4800, 5300, 5100],
  },
]);
const chartRedeemed = computed(() => ({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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

// Total Yearly Allocation Amount (VOT)
const votSeries = ref([
  {
    name: 'VOT Spend',
    data: [15000, 16000, 17000, 15500, 16500, 17500, 18000],
  },
  {
    name: 'VOT Balance',
    data: [20000, 19000, 18000, 17000, 16000, 15000, 14000],
  },
]);
const votOptions = ref({
  chart: {
    id: "apexChart",
  },
  legend: {
    position: "top",
  },
  theme: {
    mode: "light",
    palette: "palette1",
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  },
  yaxis: {
    title: {
      text: 'Amount (MYR)',
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
});

onMounted(() => {
  setTimeout(() => {
    changeKey.value++;
  }, 500);
});
</script>


<template>
  <div>
    <LayoutsBreadcrumb />

    <!-- Sales -->
    <rs-card>
      <template #header>Sales</template>
      <template #body>
        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
          <rs-card>
            <template #header> Analytical Total Sales (Normal Price) </template>
            <template #body>
              <ClientOnly>
                <VueApexCharts
                  :key="changeKey"
                  width="100%"
                  height="300"
                  type="line"
                  :options="chartSale"
                  :series="totalSalesData"
                ></VueApexCharts>
              </ClientOnly>
            </template>
          </rs-card>
          <rs-card>
            <template #header> Today's Orders (SKU) </template>
            <template #body>
              <ClientOnly>
                <VueApexCharts
                  :key="changeKey"
                  width="100%"
                  height="300"
                  type="line"
                  :options="chartSale"
                  :series="todaysOrdersData"
                ></VueApexCharts>
              </ClientOnly>
            </template>
          </rs-card>
          <rs-card>
            <template #header> Sales by Categories </template>
            <template #body>
              <ClientOnly>
                <VueApexCharts
                  :key="changeKey"
                  width="100%"
                  height="300"
                  type="bar"
                  :options="chartOptions1"
                  :series="salesByCategoriesData"
                ></VueApexCharts>
              </ClientOnly>
            </template>
          </rs-card>
        </div>

        <div class="flex flex-col md:flex-row gap-x-6">
          <div class="w-full md:w-6/12 flex flex-col">
            <rs-card class="flex-1">
              <template #header>Monthly Sales (Domestic & International)</template>
              <template #body>
                <client-only>
                  <VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="line"
                    :options="chartSale"
                    :series="monthlySalesData"
                  ></VueApexCharts>
                </client-only>
              </template>
            </rs-card>
          </div>
          <div class="w-full md:w-6/12 flex flex-col">
            <!-- Annual Sales -->
            <rs-card class="flex-1">
              <template #header>Annual Sales (Domestic & International)</template>
              <template #body>
                <client-only>
                  <VueApexCharts
                    :key="changeKey"
                    width="100%"
                    height="300"
                    type="line"
                    :options="chartSale"
                    :series="annualSalesData"
                  ></VueApexCharts>
                </client-only>
              </template>
            </rs-card>
          </div>
        </div>

        <div>
          <rs-card>
            <template #header> Sales via Web or Apps Purchased </template>
            <template #body>
              <ClientOnly>
                <VueApexCharts
                  :key="changeKey"
                  width="100%"
                  height="300"
                  type="bar"
                  :options="chartOptions1"
                  :series="salesViaWebOrAppsData"
                ></VueApexCharts>
              </ClientOnly>
            </template>
          </rs-card>
        </div>
      </template>
    </rs-card>
    
    <!-- User, Order, Campaign -->
    <div class="flex flex-col md:flex-row gap-x-6">
      <div class="w-12/2 md:w-8/12 flex flex-col">
        <rs-card>
          <template #header>Users</template>
          <template #body>
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
              <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                  <div class="p-5 flex justify-center items-center bg-success/20 rounded-2xl">
                    <Icon class="text-success" name="eos-icons:admin-outlined"></Icon>
                  </div>
                  <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight"> 5 </span>
                    <span class="text-base font-semibold text-gray-500">Total Admin</span>
                  </div>
                </div>
              </rs-card>
              <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                  <div class="p-5 flex justify-center items-center bg-secondary/20 rounded-2xl">
                    <Icon class="text-secondary" name="material-symbols:person"></Icon>
                  </div>
                  <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight"> 512 </span>
                    <span class="text-base font-semibold text-gray-500">Total Member</span>
                  </div>
                </div>
              </rs-card>
              <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                  <div class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl">
                    <Icon class="text-warning" name="material-symbols:shopping-bag-outline"></Icon>
                  </div>
                  <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight"> 100 </span>
                    <span class="text-base font-semibold text-gray-500">Total Seller</span>
                  </div>
                </div>
              </rs-card>
              <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                  <div class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl">
                    <Icon class="text-warning" name="material-symbols:group-outline"></Icon>
                  </div>
                  <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight"> 2,100 </span>
                    <span class="text-base font-semibold text-gray-500">Total Visitors</span>
                  </div>
                </div>
              </rs-card>
              <rs-card>
                <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
                  <div class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl">
                    <Icon class="text-warning" name="tabler:coins"></Icon>
                  </div>
                  <div class="flex-1 truncate">
                    <span class="block font-semibold text-xl leading-tight"> 3,200,100 </span>
                    <span class="text-base font-semibold text-gray-500">Coins Redeemed</span>
                  </div>
                </div>
              </rs-card>
            </div>

            <div class="flex flex-col md:flex-row gap-x-6">
              <div class="w-full md:w-6/12 flex flex-col">
                <rs-card>
                  <template #header>Statistic on Visitors Age Range</template>
                  <template #body>
                    <ClientOnly>
                      <VueApexCharts
                        :key="changeKey"
                        width="100%"
                        height="300"
                        type="line"
                        :options="chartVisitorAgeRange"
                        :series="visitorAgeRangeData"
                      ></VueApexCharts>
                    </ClientOnly>
                  </template>
                </rs-card>
              </div>
              <div class="w-full md:w-6/12 flex flex-col">
                <rs-card>
                  <template #header>Total Download Apps</template>
                  <template #body>
                    <client-only>
                      <VueApexCharts
                        :key="changeKey"
                        width="100%"
                        height="300"
                        name="radialBar"
                        :options="chartDownload"
                        :series="downloadData"
                      ></VueApexCharts>
                    </client-only>
                  </template>
                </rs-card>
              </div>
            </div>
          </template>
        </rs-card>
      </div>
      <div class="w-12/2 md:w-4/12 flex flex-col">
        <rs-card>
          <template #header>Orders</template>
          <template #body>
            <client-only>
              <VueApexCharts
                :key="changeKey"
                width="100%"
                height="300"
                type="pie"
                :options="chartOrder1"
                :series="orderData"
              ></VueApexCharts>
            </client-only>
          </template>
        </rs-card>
        <rs-card>
          <template #header>Campaign</template>
          <template #body>
            <ClientOnly>
              <VueApexCharts
                :key="changeKey"
                width="100%"
                height="300"
                type="bar"
                :options="chartCampaign"
                :series="campaignData"
              ></VueApexCharts>
            </ClientOnly>
          </template>
        </rs-card>
      </div>
    </div>
    
    <!-- Financial -->
    <rs-card>
      <template #header>Financial</template>
      <template #body>
        <rs-card>
          <template #header>Total Payout</template>
          <template #body>
            <ClientOnly>
              <VueApexCharts
                :key="changeKey"
                width="100%"
                height="300"
                type="line"
                :options="chartPayout"
                :series="payoutSeries"
              ></VueApexCharts>
            </ClientOnly>
          </template>
        </rs-card>
        <rs-card>
          <template #header>Total Redeemed</template>
          <template #body>
            <ClientOnly>
              <VueApexCharts
                :key="changeKey"
                width="100%"
                height="300"
                type="bar"
                :options="chartRedeemed"
                :series="redeemedSeries"
              ></VueApexCharts>
            </ClientOnly>
          </template>
        </rs-card>
        <rs-card>
          <template #header>Total Yearly Allocation Amount</template>
          <template #body>
            <ClientOnly>
              <VueApexCharts
                :key="changeKey"
                width="100%"
                height="300"
                type="line"
                :options="votOptions"
                :series="votSeries"
              ></VueApexCharts>
            </ClientOnly>
          </template>
        </rs-card>
      </template>
    </rs-card>
    
  </div>
</template>
