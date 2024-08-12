<script setup>
  import { DateTime } from "luxon";
  definePageMeta({
    title: "Product Management",
  });

  const dt = DateTime.now();
  const month = dt.toFormat("yyyy-MM");
  const selectedSeller = ref("");
  const selectedCategory = ref("");
  const selectedStatus = ref("");
  const showModal = ref(false);
  const selectedQRCodeLink = ref("");

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
    { label: "", value: "" },
    { label: "TechStore", value: "TechStore" },
    { label: "HomeEssentials", value: "HomeEssentials" },
    { label: "FashionHub", value: "FashionHub" },
    { label: "BeautyNest", value: "BeautyNest" },
    { label: "FitLife", value: "FitLife" },
    { label: "AutoGear", value: "AutoGear" },
    { label: "KidsZone", value: "KidsZone" },
    { label: "BookWorld", value: "BookWorld" },
    { label: "OfficeComfort", value: "OfficeComfort" },
    { label: "HealthPlus", value: "HealthPlus" },
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
    { label: "", value: "" },
    { label: "Electronics", value: "Electronics" },
    { label: "Home Appliances", value: "Home Appliances" },
    { label: "Fashion", value: "Fashion" },
    { label: "Beauty & Personal Care", value: "Beauty & Personal Care" },
    { label: "Sports & Outdoors", value: "Sports & Outdoors" },
    { label: "Automotive", value: "Automotive" },
    { label: "Toys & Games", value: "Toys & Games" },
    { label: "Books", value: "Books" },
    { label: "Furniture", value: "Furniture" },
    { label: "Health & Wellness", value: "Health & Wellness" },
  ];

  const products = ref([
    {
      "ProductId": "#PRD001",
      "Category": "Electronics",
      "ProductName": "Wireless Bluetooth Headphones",
      "Seller": "TechStore",
      "PagePreview": "WirelessBluetoothHeadphones",
      "LinkQRCode": "https://techstore.com/products/wireless-bluetooth-headphones",
      "Status": "Published",
    },
    {
      "ProductId": "#PRD002",
      "Category": "Home Appliances",
      "ProductName": "Smart Vacuum Cleaner",
      "Seller": "HomeEssentials",
      "PagePreview": "SmartVacuumCleaner",
      "LinkQRCode": "https://homeessentials.com/products/smart-vacuum-cleaner",
      "Status": "Approved",
    },
    {
      "ProductId": "#PRD003",
      "Category": "Fashion",
      "ProductName": "Men's Casual Sneakers",
      "Seller": "FashionHub",
      "PagePreview": "MensCasualSneakers",
      "LinkQRCode": "https://fashionhub.com/products/mens-casual-sneakers",
      "Status": "Suspend",
    },
    {
      "ProductId": "#PRD004",
      "Category": "Beauty & Personal Care",
      "ProductName": "Organic Face Moisturizer",
      "Seller": "BeautyNest",
      "PagePreview": "OrganicFaceMoisturizer",
      "LinkQRCode": "https://beautynest.com/products/organic-face-moisturizer",
      "Status": "Rejected",
    },
    {
      "ProductId": "#PRD005",
      "Category": "Sports & Outdoors",
      "ProductName": "Yoga Mat with Carrying Strap",
      "Seller": "FitLife",
      "PagePreview": "YogaMatCarryingStrap",
      "LinkQRCode": "https://fitlife.com/products/yoga-mat-with-carrying-strap",
      "Status": "Approved",
    },
    {
      "ProductId": "#PRD006",
      "Category": "Automotive",
      "ProductName": "Car Dashboard Phone Mount",
      "Seller": "AutoGear",
      "PagePreview": "CarDashboardPhoneMount",
      "LinkQRCode": "https://autogear.com/products/car-dashboard-phone-mount",
      "Status": "Published",
    },
    {
      "ProductId": "#PRD007",
      "Category": "Toys & Games",
      "ProductName": "Educational Wooden Blocks",
      "Seller": "KidsZone",
      "PagePreview": "EducationalWoodenBlocks",
      "LinkQRCode": "https://kidszone.com/products/educational-wooden-blocks",
      "Status": "Approved",
    },
    {
      "ProductId": "#PRD008",
      "Category": "Books",
      "ProductName": "Introduction to Machine Learning",
      "Seller": "BookWorld",
      "PagePreview": "IntroductionToMachineLearning",
      "LinkQRCode": "https://bookworld.com/products/introduction-to-machine-learning",
      "Status": "Approved",
    },
    {
      "ProductId": "#PRD009",
      "Category": "Furniture",
      "ProductName": "Ergonomic Office Chair",
      "Seller": "OfficeComfort",
      "PagePreview": "ErgonomicOfficeChair",
      "LinkQRCode": "https://officecomfort.com/products/ergonomic-office-chair",
      "Status": "Published",
    },
    {
      "ProductId": "#PRD010",
      "Category": "Health & Wellness",
      "ProductName": "Digital Blood Pressure Monitor",
      "Seller": "HealthPlus",
      "PagePreview": "DigitalBloodPressureMonitor",
      "LinkQRCode": "https://healthplus.com/products/digital-blood-pressure-monitor",
      "Status": "Approved",
    }
  ]);

  const showQRCode = (productId) => {
    const product = products.value.find(p => p.ProductId === productId);
    selectedQRCodeLink.value = product?.LinkQRCode || '';
    showModal.value = true;
  };

  const generateQRCode = (link) => {
    // Placeholder for QR Code generation logic
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=150x150`;
  };

  // Computed property to filter products
  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSeller = selectedSeller.value === "" || product.Seller === selectedSeller.value;
      const matchesCategory = selectedCategory.value === "" || product.Category === selectedCategory.value;
      const matchesStatus = selectedStatus.value === "" || product.Status === selectedStatus.value;

      return matchesSeller && matchesCategory && matchesStatus;
    });
  });

  // Method to handle form submission
  function onFilter() {
    // This method can trigger any additional actions needed when the filter is applied,
    // but the actual filtering is done by the computed property `filteredProducts`.
  }
</script>

<template>
  <div class="mb-10">
    <h4>Product Management</h4>
  </div>

  <!-- FILTER -->
  <rs-card>
    <template #header> Filter </template>
    <template #body>
      <FormKit type="form" submit-label="Filter" @submit="onFilter">
        <FormKit 
          type="month" 
          v-model="month" 
          label="Month Only" 
        />
        <FormKit 
          type="select" 
          v-model="selectedSeller"
          label="Seller"
          :options="optionSeller"
        />
        <FormKit 
          type="select" 
          v-model="selectedCategory"
          label="Category"
          :options="optionCategory"
        />
        <FormKit 
          type="select" 
          v-model="selectedStatus"
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

      <rs-table v-if="products && products.length > 0"
        :field="field"
        :data="products"
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
          <a :href="`/product/preview/${data.value.ProductId}`" target="_blank">
            <rs-button variant="info-text">Preview</rs-button>
          </a>
        </template>
        <template v-slot:LinkQRCode="data">
          <rs-button variant="info-text" @click="showQRCode(data.value.ProductId)">
            QR Code
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
            <nuxt-link :to="`/product-management/audittrails/:id`">
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

  <!-- MODAL for QR Code -->
  <rs-modal title="Product QR Code" position="center" v-model="showModal">
      <div class="qr-code-content">
        <p>Link: {{ selectedQRCodeLink }}</p>
        <img :src="generateQRCode(selectedQRCodeLink)" alt="QR Code"/>
      </div>
    </rs-modal>
  
</template>

<style lang="scss" scoped>
.qr-code-content {
  text-align: center;
}

.qr-code-content img {
  margin-top: 10px;
  width: 150px;
  height: 150px;
}
</style>
