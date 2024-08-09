<script setup>
  definePageMeta({
    title: "Audit Trails Product",
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
      transactionDate: "09-08-2024",
      orderID: "OD001",
      transactionNo: "202408091230",
      userFullname: "User A",
      status: "Delivered"
    },
    {
      transactionDate: "09-08-2024",
      orderID: "OD002",
      transactionNo: "202408091230",
      userFullname: "User B",
      status: "Complete"
    },
  ]
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
          <span class="block font-semibold text-xl leading-tight"> 0 </span>
          <span class="text-base font-semibold text-gray-500">Complate</span>
        </div>
      </div>
    </rs-card>
    <rs-card>
      <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
        <div class="p-5 flex justify-center items-center bg-secondary/20 rounded-2xl">
          <Icon class="text-secondary" name="material-symbols:box-outline-rounded"></Icon>
        </div>
        <div class="flex-1 truncate">
          <span class="block font-semibold text-xl leading-tight"> 0 </span>
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
          <span class="block font-semibold text-xl leading-tight"> 0 </span>
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