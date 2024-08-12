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
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Used/Total
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Expiry Date
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(voucher, index) in vouchers" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ voucher.title }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ voucher.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ voucher.used }}/{{ voucher.quantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{
                  voucher.amountType === "amount"
                    ? voucher.amount | currency
                    : voucher.amount + "%"
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ voucher.expiryDate }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="{
                    'bg-green-100 text-green-800': voucher.status === 'active',
                    'bg-gray-100 text-gray-800': voucher.status === 'inactive',
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ voucher.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="editVoucher(index)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  @click="deleteVoucher(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Voucher Modal -->
    <div
      v-if="showCreateVoucherModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-2/3 lg:w-1/2">
        <div class="text-lg font-medium mb-4">Create Voucher</div>
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
      </div>
    </div>

    <!-- Edit Voucher Modal -->
    <div
      v-if="editingIndex !== null"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-2/3 lg:w-1/2">
        <div class="text-lg font-medium mb-4">Edit Voucher</div>
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Title</label
            >
            <input
              v-model="vouchers[editingIndex].title"
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
              v-model="vouchers[editingIndex].description"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <!-- Quantity -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Quantity</label
            >
            <input
              v-model="vouchers[editingIndex].quantity"
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
              v-model="vouchers[editingIndex].amountType"
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
              v-model="vouchers[editingIndex].amount"
              :type="
                vouchers[editingIndex].amountType === 'amount'
                  ? 'number'
                  : 'text'
              "
              :min="vouchers[editingIndex].amountType === 'amount' ? '0' : '1'"
              :step="
                vouchers[editingIndex].amountType === 'amount' ? '0.01' : '1'
              "
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Expiry Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Expiry Date</label
            >
            <input
              v-model="vouchers[editingIndex].expiryDate"
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
              v-model="vouchers[editingIndex].status"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4">
            <button
              @click="cancelEditVoucher"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Page metadata
definePageMeta({
  title: "Voucher",
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
const editVoucher = (index) => {
  editingIndex.value = index;
};

// Method to save the edited voucher
const saveVoucher = () => {
  editingIndex.value = null;
  alert("Voucher updated successfully!");
};

// Method to delete a voucher
const deleteVoucher = (index) => {
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
</script>

<style scoped>
/* Add custom styles here */
</style>
