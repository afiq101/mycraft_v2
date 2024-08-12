<script setup>

definePageMeta({
  title: "Registration",
});

import { ref, computed, watch } from 'vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';


const stepNames = ["Contact Information", "Address Registration", "Document Upload", "Add Product"];

// Region, City, District options
const regionOptions = [
  { value: 'region1', label: 'Region 1' },
  { value: 'region2', label: 'Region 2' },
];

const cityOptions = [
  { value: 'city1', label: 'City 1', region: 'region1' },
  { value: 'city2', label: 'City 2', region: 'region1' },
  { value: 'city3', label: 'City 3', region: 'region2' },
  { value: 'city4', label: 'City 4', region: 'region2' },
];

const districtOptions = [
  { value: 'district1', label: 'District 1', city: 'city1' },
  { value: 'district2', label: 'District 2', city: 'city2' },
  { value: 'district3', label: 'District 3', city: 'city3' },
  { value: 'district4', label: 'District 4', city: 'city4' },
];

// Reactive variables for Warehouse Address
const warehouseAddress = ref('');
const warehouseRegion = ref('');
const warehouseCity = ref('');
const warehouseDistrict = ref('');

// Additional Cards' Toggle States (Default to true)
const useWarehouseAddressForReturn = ref(true);
const useWarehouseAddressForBusiness = ref(true);

// Computed for Filtered Options
const filteredCityOptions = computed(() => {
  return cityOptions.filter(city => city.region === warehouseRegion.value);
});

const filteredDistrictOptions = computed(() => {
  return districtOptions.filter(district => district.city === warehouseCity.value);
});

// Watch Toggles to Copy Data
watch(useWarehouseAddressForReturn, (newVal) => {
  if (newVal) {
    returnAddress.value = warehouseAddress.value;
    returnRegion.value = warehouseRegion.value;
    returnCity.value = warehouseCity.value;
    returnDistrict.value = warehouseDistrict.value;
  } else {
    returnAddress.value = '';
    returnRegion.value = '';
    returnCity.value = '';
    returnDistrict.value = '';
  }
});

watch(useWarehouseAddressForBusiness, (newVal) => {
  if (newVal) {
    businessAddress.value = warehouseAddress.value;
    businessRegion.value = warehouseRegion.value;
    businessCity.value = warehouseCity.value;
    businessDistrict.value = warehouseDistrict.value;
  } else {
    businessAddress.value = '';
    businessRegion.value = '';
    businessCity.value = '';
    businessDistrict.value = '';
  }
});

// Reactive variables for Additional Cards
const returnAddress = ref('');
const returnRegion = ref('');
const returnCity = ref('');
const returnDistrict = ref('');

const businessAddress = ref('');
const businessRegion = ref('');
const businessCity = ref('');
const businessDistrict = ref('');

const sellerTypeOptions = [
  { value: 'individual', label: 'Individual Seller' },
  { value: 'company', label: 'Company' },
];

const documentTypeOptions = [
  { value: 'passport', label: 'Passport' },
  { value: 'national_id', label: 'National ID' },
];

const goodsTypeOptions = [
  { value: 'none', label: 'None' },
  { value: 'battery_flammables_liquid', label: 'Contains battery / flammables / liquid' },
];

const businessTypeOptions = [
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'private_limited_company', label: 'Private Limited Company' },
  { value: 'public_limited_company', label: 'Public Limited Company' },
];

const selectedSellerType = ref('');
const selectedDocumentType = ref('');

// Reactive variables for form fields
const registeredName = ref('');
const registeredIdNo = ref('');
const frontImage = ref(null);
const backImage = ref(null);
const sstCert = ref(null);

// Conditional Display Based on Seller Type
const isIndividualSeller = computed(() => selectedSellerType.value === 'individual');
const isCompany = computed(() => selectedSellerType.value === 'company');

// Conditional Display Based on Document Type
const showBackImageUpload = computed(() => selectedDocumentType.value === 'national_id');
const showFrontImageUpload = computed(() => selectedDocumentType.value === 'passport' || showBackImageUpload.value);

// SST Information
const isSSTRegistered = ref(false);
const sstRegistrationNumber = ref('');
const sstRegistrationCertificate = ref(null);

const rows = ref([
  { price: '', specialPrice: '', stock: '', sku: '', taxes: '', availability: false },
]);

function addRow() {
  rows.value.push({ price: '', specialPrice: '', stock: '', sku: '', taxes: '', availability: false });
}


// Watcher to reset document type and form fields when seller type changes
watch(selectedSellerType, () => {
  selectedDocumentType.value = '';
  registeredName.value = '';
  registeredIdNo.value = '';
  frontImage.value = null;
  backImage.value = null;
  backImage.value = null;
});

</script>

<template #addproduct>
    <LayoutsBreadcrumb/>
    <!-- Product Description Card -->
    <rs-card class="p-4">
      <h4 class="mb-4">Basic Information</h4>
      <FormKit
      type="text"
      label="Product Name"
      validation-visibility="dirty"
    />
    <v-select
            label="label"
            :options="filteredCityOptions"
            placeholder="Product Category"
            v-model="warehouseCity"
            :reduce="option => option.value"
            searchable
            clearable
            class="mb-4"
          />
          <FormKit
        type="file"
        label="Product Image"
        v-model="sstCert"
        
        validation-visibility="dirty"
      />
      <FormKit
        type="file"
        label="Buyer Promotion Image"
        v-model="sstCert"
        
        validation-visibility="dirty"
      />
      <FormKit
        type="file"
        label="Video"
        v-model="sstCert"
        
        validation-visibility="dirty"
      />
    </rs-card>

    <!-- Product Specification Card -->
    <rs-card class="p-4">
<h4 class="mb-4">Product Specification</h4>
<div class="grid grid-cols-2 gap-4">
<FormKit
  type="text"
  label="Brand"
  validation-visibility="dirty"
/>
<FormKit
  type="text"
  label="Type"
  validation-visibility="dirty"
/>
<FormKit
  type="text"
  label="Model"
  validation-visibility="dirty"
/>
<FormKit
  type="text"
  label="Material"
  validation-visibility="dirty"
/>
<FormKit
  type="text"
  label="Characteristics"
  validation-visibility="dirty"
/>
</div>
    </rs-card>

    <!-- Price, Stock and Variants-->
    <rs-card class="p-4">
<h4 class="mb-4">Price, Stock and Variants</h4>
<table class="transaction-table">
<thead>
  <tr>
    <th>Price</th>
    <th>Special Price</th>
    <th>Stock</th>
    <th>Seller SKU</th>
    <th>Taxes</th>
    <th>Availability</th>
  </tr>
</thead>
<tbody>
  <tr v-for="(row, index) in rows" :key="index">
    <td><FormKit type="text" v-model="row.price" /></td>
    <td><FormKit type="text" v-model="row.specialPrice" /></td>
    <td><FormKit type="text" v-model="row.stock" /></td>
    <td><FormKit type="text" v-model="row.sku" /></td>
    <td><FormKit type="text" v-model="row.taxes" /></td>
    <td><input type="checkbox" v-model="row.availability" /></td>
  </tr>
</tbody>
</table>
<button @click="addRow">Add Row</button>
</rs-card>


    <!-- Product Description-->
    <rs-card class="p-4">
    <h4 class="mb-4">Product Description</h4>
    <QuillEditor theme="snow"> </QuillEditor>
    </rs-card>

     <!-- Shipping and Warranty-->
     <rs-card class="p-4">
<h4 class="mb-4">Shipping and Warranty</h4>

<!-- Package Weight -->
<FormKit type="text" label="Package Weight" placeholder="">
<template #suffix>
  <div class="p-3">Kg</div>
</template>
</FormKit>

<!-- Dimensions: Height x Width x Length -->
<rs-card class="p-4">
<h4 class="mb-4">Shipping and Warranty</h4>

<!-- Package Weight -->
<FormKit type="text" label="Package Weight" placeholder="">
<template #suffix>
  <div class="p-3">Kg</div>
</template>
</FormKit>

<!-- Dimensions: Height x Width x Length -->
<div class="flex items-center space-x-2">
<FormKit
  type="text"
  label="Height"
  placeholder="Height"
  :input-class="'formkit-input flex-grow'"
/>
<span>X</span>
<FormKit
  type="text"
  label="Width"
  placeholder="Width"
  :input-class="'formkit-input flex-grow'"
/>
<span>X</span>
<FormKit
  type="text"
  label="Length"
  placeholder="Length"
  :input-class="'formkit-input flex-grow'"
/>
</div>
<FormKit
    type="select"
    label="Dangerous Goods"
    :options="goodsTypeOptions"
    v-model="selectedDocumentType"
    
    validation-visibility="dirty"
  />
</rs-card>

</rs-card>

  </template>

<style scoped>
.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.transaction-table th, .transaction-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.transaction-table th {
  background-color: #f2f2f2;
}

.copy-button {
  margin-left: auto;
}

.extracted-row-text {
  font-size: 14px; /* Adjust the font size as per your requirement */
}
</style>

