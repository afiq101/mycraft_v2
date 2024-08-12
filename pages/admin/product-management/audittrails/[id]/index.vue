<script setup>
  definePageMeta({
    title: "Product Audit Trails",
  });

  const field = [
    "Date",
    "OrderID",
    "TransactionNo",
    "CustomerName",
    "Status"
  ]
  
  const data = [
    {
      transactionDate: "2024-08-09",
      orderID: "OD1001",
      transactionNo: "TX202408091001",
      userFullname: "Ahmad Faizal",
      status: "Delivered"
    },
    {
      transactionDate: "2024-08-09",
      orderID: "OD1002",
      transactionNo: "TX202408091002",
      userFullname: "Siti Aisyah",
      status: "Complete"
    },
    {
      transactionDate: "2024-08-09",
      orderID: "OD1003",
      transactionNo: "TX202408091003",
      userFullname: "Mohd Azim",
      status: "Shipped"
    },
    {
      transactionDate: "2024-08-10",
      orderID: "OD1004",
      transactionNo: "TX202408101001",
      userFullname: "Nor Aini",
      status: "Complete"
    },
    {
      transactionDate: "2024-08-10",
      orderID: "OD1005",
      transactionNo: "TX202408101002",
      userFullname: "Kumar Raj",
      status: "Delivered"
    },
    {
      transactionDate: "2024-08-11",
      orderID: "OD1006",
      transactionNo: "TX202408111001",
      userFullname: "Nurul Huda",
      status: "Shipped"
    },
    {
      transactionDate: "2024-08-11",
      orderID: "OD1007",
      transactionNo: "TX202408111002",
      userFullname: "Lee Wei Ming",
      status: "Complete"
    },
  ];

  // Calculate the counts for each status
  const statusCounts = data.reduce((acc, record) => {
    acc[record.status] = (acc[record.status] || 0) + 1;
    return acc;
  }, {});

  const deliveredCount = statusCounts['Delivered'] || 0;
  const completeCount = statusCounts['Complete'] || 0;
  const shippedCount = statusCounts['Shipped'] || 0;

</script>

<template>
  <div class="mb-10">
    <h4>Audit Trails Product</h4>
  </div>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6">
    <rs-card>
      <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
        <div class="p-5 flex justify-center items-center bg-success/20 rounded-2xl">
          <Icon class="text-success" name="ph:check-circle-duotone"></Icon>
        </div>
        <div class="flex-1 truncate">
          <span class="block font-semibold text-xl leading-tight"> {{ completeCount }} </span>
          <span class="text-base font-semibold text-gray-500">Complete</span>
        </div>
      </div>
    </rs-card>
    <rs-card>
      <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
        <div class="p-5 flex justify-center items-center bg-secondary/20 rounded-2xl">
          <Icon class="text-secondary" name="material-symbols:box-outline-rounded"></Icon>
        </div>
        <div class="flex-1 truncate">
          <span class="block font-semibold text-xl leading-tight"> {{ shippedCount }} </span>
          <span class="text-base font-semibold text-gray-500">Shipped</span>
        </div>
      </div>
    </rs-card>
    <rs-card>
      <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
        <div class="p-5 flex justify-center items-center bg-warning/20 rounded-2xl">
          <Icon class="text-warning" name="carbon:delivery-truck"></Icon>
        </div>
        <div class="flex-1 truncate">
          <span class="block font-semibold text-xl leading-tight"> {{ deliveredCount }} </span>
          <span class="text-base font-semibold text-gray-500">Delivered</span>
        </div>
      </div>
    </rs-card>
    
  </div>

  <rs-card>
    <template #header></template>
    <template #body>
      <rs-table v-if="data && data.length > 0"
        :field="field"
        :data="data"
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
        <template v-slot:Status="data">
          <rs-badge
            :variant="
              data.value.status === 'Complete'
                ? 'success'
                : data.value.status == 'Delivered'
                ? 'warning'
                : 'secondary'
            ">
            {{ data.value.status }}
          </rs-badge>
        </template>
      </rs-table>
      <div v-else class="flex justify-center text-primary/40 border-2 border-grey-200 p-3">
        <div class="text-center">
          <h5 class="font-semibold">No Record</h5>
          <span class="text-sm text-gray-500">
            List not found
          </span>
        </div>
      </div>
    </template>
  </rs-card>
  
</template>

<style lang="scss" scoped></style>