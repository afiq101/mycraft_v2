<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Voucher Management</div>

    <!-- Create Voucher Button -->
    <div class="flex justify-end">
      <button
        @click="showCreateVoucherModal = true"
        class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Create Voucher
      </button>
    </div>

    <!-- Voucher Listing Table -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <rs-table
        :data="vouchers"
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
        <template v-slot:quantity="data">
          <div>{{ numberFormat(data.value.quantity, 0) }}</div>
        </template>
        <template v-slot:used="data">
          <div>{{ numberFormat(data.value.used, 0) }}</div>
        </template>
        <template v-slot:amount="data">
          <div>RM {{ numberFormat(data.value.amount, 2) }}</div>
        </template>
        <template v-slot:status="data">
          <div class="flex gap-2">
            <span
              :class="{
                'bg-green-100 text-green-800': data.value.status === 'active',
                'bg-yellow-100 text-yellow-800':
                  data.value.status === 'inactive',
                'bg-red-100 text-red-800': data.value.status === 'inactive',
                'bg-blue-100 text-blue-800': data.value.status === 'expired',
                'bg-indigo-100 text-indigo-800': data.value.status === 'used',
              }"
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
            >
              <span class="first-letter:uppercase">
                {{ data.value.status }}
              </span>
            </span>
          </div>
        </template>

        <template v-slot:actions="data">
          <div class="flex gap-2">
            <button
              @click="editVoucher(data.value.actions)"
              class="text-blue-600 hover:text-blue-800"
            >
              <Icon name="material-symbols:edit-outline-rounded" class="20">
              </Icon>
            </button>
            <button
              @click="deleteVoucher(data.value.actions)"
              class="text-red-600 hover:text-red-800"
            >
              <Icon
                name="material-symbols:delete-outline-rounded"
                size="20"
              ></Icon>
            </button>
          </div>
        </template>
      </rs-table>
    </div>

    <!-- Create Voucher Modal -->
    <rs-modal
      v-model="showCreateVoucherModal"
      title="Create Voucher"
      size="lg"
      position="center"
    >
      <div class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Title</label
          >
          <input
            v-model="newVoucher.title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            v-model="newVoucher.description"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Quantity</label
          >
          <input
            v-model="newVoucher.quantity"
            type="number"
            min="1"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Amount Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Amount Type</label
          >
          <select
            v-model="newVoucher.amountType"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="amount">Amount</option>
            <option value="percent">Percent</option>
          </select>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Amount</label
          >
          <input
            v-model="newVoucher.amount"
            :type="newVoucher.amountType === 'amount' ? 'number' : 'text'"
            :min="newVoucher.amountType === 'amount' ? '0' : '1'"
            :step="newVoucher.amountType === 'amount' ? '0.01' : '1'"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Expiry Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Expiry Date</label
          >
          <input
            v-model="newVoucher.expiryDate"
            type="date"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="newVoucher.status"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelCreateVoucher"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="createVoucher"
            :disabled="
              !newVoucher.title ||
              !newVoucher.quantity ||
              !newVoucher.amount ||
              !newVoucher.expiryDate
            "
            class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500 disabled:opacity-50"
          >
            Create Voucher
          </button>
        </div>
      </div>
      <template #footer>
        <div></div>
      </template>
    </rs-modal>

    <!-- Edit Voucher Modal -->
    <rs-modal
      v-model="editingModal"
      title="Edit Voucher"
      size="lg"
      position="center"
    >
      <div class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Title</label
          >
          <input
            v-model="editingIndex.title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            v-model="editingIndex.description"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <!-- Quantity -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Quantity</label
          >
          <input
            v-model="editingIndex.quantity"
            type="number"
            min="1"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Amount Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Amount Type</label
          >
          <select
            v-model="editingIndex.amountType"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="amount">Amount</option>
            <option value="percent">Percent</option>
          </select>
        </div>

        <!-- Amount -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Amount</label
          >
          <input
            v-model="editingIndex.amount"
            :type="editingIndex.amountType === 'amount' ? 'number' : 'text'"
            :min="editingIndex.amountType === 'amount' ? '0' : '1'"
            :step="editingIndex.amountType === 'amount' ? '0.01' : '1'"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Expiry Date -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Expiry Date</label
          >
          <input
            v-model="editingIndex.expiryDate"
            type="date"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Status</label
          >
          <select
            v-model="editingIndex.status"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button
            @click="(editingModal = false), cancelEditVoucher"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="saveVoucher"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
      <template #footer>
        <div></div>
      </template>
    </rs-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Page metadata
definePageMeta({
  title: "Voucher Management",
});

// Vouchers data
const vouchers = ref([
  {
    title: "10% Off",
    description: "Get 10% off on your next purchase.",
    quantity: 100,
    used: 20,
    amount: 10,
    amountType: "percent",
    expiryDate: "2023-12-31",
    status: "active",
    actions: 1,
  },
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on orders over $50.",
    quantity: 50,
    used: 10,
    amount: 5,
    amountType: "amount",
    expiryDate: "2023-11-30",
    status: "inactive",
    actions: 2,
  },
]);

const showCreateVoucherModal = ref(false);
const newVoucher = ref({
  title: "",
  description: "",
  quantity: 1,
  used: 0,
  amount: 0,
  amountType: "amount",
  expiryDate: "",
  status: "inactive",
});
const editingIndex = ref(null);

const editingModal = ref(false);

// Method to create a new voucher
const createVoucher = () => {
  if (
    newVoucher.value.title &&
    newVoucher.value.quantity > 0 &&
    newVoucher.value.amount >= 0 &&
    newVoucher.value.expiryDate
  ) {
    vouchers.value.push({ ...newVoucher.value });
    newVoucher.value = {
      title: "",
      description: "",
      quantity: 1,
      used: 0,
      amount: 0,
      amountType: "amount",
      expiryDate: "",
      status: "inactive",
    };
    showCreateVoucherModal.value = false;
    alert("Voucher created successfully!");
  }
};

// Method to edit a voucher
const editVoucher = (data) => {
  console.log("data", data);
  //filter based on actions value

  const filtered = vouchers.value.filter((v) => v.actions == data);

  console.log("filtered", filtered);

  editingIndex.value = filtered[0];

  editingModal.value = true;
};

// Method to save the edited voucher
const saveVoucher = () => {
  editingIndex.value = null;
  alert("Voucher updated successfully!");
};

// Method to delete a voucher
const deleteVoucher = (voucher) => {
  const index = vouchers.value.indexOf(voucher);
  vouchers.value.splice(index, 1);
  alert("Voucher deleted successfully!");
};

// Method to cancel voucher creation
const cancelCreateVoucher = () => {
  newVoucher.value = {
    title: "",
    description: "",
    quantity: 1,
    used: 0,
    amount: 0,
    amountType: "amount",
    expiryDate: "",
    status: "inactive",
  };
  showCreateVoucherModal.value = false;
};

// Method to cancel voucher editing
const cancelEditVoucher = () => {
  editingIndex.value = null;
};

function numberFormat(val, dec) {
  return val.toLocaleString(undefined, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec,
  });
}
</script>

<style scoped>
/* Add custom styles here */
</style>
