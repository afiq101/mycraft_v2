<script setup>
  import { DateTime } from "luxon";
  definePageMeta({
    title: "Product Management",
  });

  const dt = DateTime.now();
  const month = dt.toFormat("yyyy-MM");
  const showModalLinkQR = ref(false);

  const field = [
    "ProductId",
    "Category",
    "ProductName",
    "Seller",
    "PagePreview",
    "LinkQRCode",
    "Status",
    "Action"
  ];

  const optionSeller = [
    { label: "", value: ""},
    { label: "Seller 1", value: "Seller 1"},
    { label: "Seller 2", value: "Seller 2"},
    { label: "Seller 3", value: "Seller 3"},
  ];
  const optionStatus = [
    { label: "", value: ""},
    { label: "Pending", value: "Pending"},
    { label: "Approved", value: "Approved"},
    { label: "Published", value: "Published"},
    { label: "Unpublished", value: "Unpublished"},
    { label: "Rejected", value: "Rejected"},
    { label: "Sold", value: "Sold"},
    { label: "Out of Stock", value: "Out of Stock"},
    { label: "International Ready", value: "International Ready"},
    { label: "Draf Mode", value: "Draf Mode"},

  ];
  const optionCategory = [
    { label: "", value: ""},
    { label: "Approved", value: "Approved"},
    { label: "Suspend", value: "Suspend"},
    { label: "Reject", value: "Reject"},
  ];

  const data = [
    {
      "productId":"#8b5404",
      "Category":"Category A",
      "ProductName":"Product 1",
      "Seller":"Seller 1",
      "PagePreview":"PageProduct1",
      "LinkQRCode":"linkproduct1.product.com",
      "Status":"Approved",
      "Action":""
    },
    {
      "productId":"#8b5404",
      "Category":"Category B",
      "ProductName":"Product 2",
      "Seller":"Seller 2",
      "PagePreview":"PageProduct2",
      "LinkQRCode":"linkproduct2.product.com",
      "Status":"Suspend",
      "Action":""
    },
    {
      "productId":"#8b5404",
      "Category":"Category C",
      "ProductName":"Product 3",
      "Seller":"Seller 3",
      "PagePreview":"PageProduct3",
      "LinkQRCode":"linkproduct3.product.com",
      "Status":"Reject",
      "Action":""
    },
  ]
</script>

<template>
  <div class="mb-10">
    <h4>Product Management</h4>
  </div>

  <!-- FILTER -->
  <rs-card>
    <template #header> Filter </template>
    <template #body>
      <FormKit type="form" submit-label="Filter">
        <FormKit 
          type="month" 
          :value="month" 
          label="Month Only" 
        />
        <FormKit 
          type="select" 
          label="Seller"
          :options="optionSeller"
        />
        <FormKit 
          type="select" 
          label="Category"
          :options="optionCategory"
        />
        <FormKit 
          type="select" 
          label="Status"
          :options="optionStatus"
        />
      </FormKit>
    </template>
  </rs-card>
  
  <!-- LIST -->
  <rs-card>
    <template #header> Product List </template>
    <template #body>
      <div class="flex justify-end items-center mb-3 gap-5">
        <rs-button variant="danger">
          Export Report
          <Icon name="ph:file-csv" class="ml-2"/>
        </rs-button>
      </div>

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
        <template v-slot:PagePreview="data">
          <nuxt-link :to="``">
            <rs-button variant="info-text"> {{ data.value.PagePreview}} </rs-button>
          </nuxt-link>
        </template>
        <template v-slot:LinkQRCode="data">
          <rs-button variant="info-text" @click="showModalLinkQR = true"> 
            {{ data.value.LinkQRCode}} 
          </rs-button> 
        </template>
        <template v-slot:Status="data">
          <rs-badge
            :variant="
              data.value.Status === 'Approved'
                ? 'success'
                : data.value.Status == 'Suspend'
                ? 'warning'
                : 'danger'
            ">
            {{ data.value.Status }}
          </rs-badge>
        </template>
        <template v-slot:Action="data">
          <div class="flex gap-5">
            <nuxt-link :to="``">
              <rs-button variant="secondary"> Audit Trails </rs-button> 
            </nuxt-link>
          </div>
        </template>
      </rs-table>
      <div v-else class="flex justify-center text-primary/40 border-2 border-grey-200 p-3">
        <div class="text-center">
          <h5 class="font-semibold">No Record</h5>
          <span class="text-sm text-gray-500">
            Product List not found
          </span>
        </div>
      </div>
    </template>
  </rs-card>

  <!-- MODAL -->
  <rs-modal title="Link & QR Code" position="center" v-model="showModalLinkQR">
    <p>Link Product</p>
    <p>QR Code</p>
  </rs-modal>
  
</template>

<style lang="scss" scoped></style>
