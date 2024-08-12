<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  title: "Global Setting Management",
  layout: "default",
});

const user = ref({
  profilePicture: "/img/background/default-thumbnail.jpg",
  fullName: "John Doe",
  email: "john@example.com",
  phoneNumber: "+1 234 567 8900",
});

const password = ref({
  current: '',
  new: '',
  confirmNew: '',
});

const adminTypes = ref([
  { value: 'superadmin', label: 'Super Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]);

const adminStatus = ref([
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'suspended', label: 'Suspended' },
  { value: 'delete', label: 'Delete' },
]);

const measurePasswordStrength = (password) => {
  let score = 0;
  if (!password) return score;

  // Password length
  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  // Presence of uppercase and lowercase letters
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score += 20;

  // Presence of numbers
  if (password.match(/\d/)) score += 20;

  // Presence of special characters
  if (password.match(/[^a-zA-Z\d]/)) score += 20;

  // Character variety
  const uniqueChars = new Set(password).size;
  score += Math.min(uniqueChars * 2, 10);

  return Math.min(score, 100);
};

const passwordStrength = computed(() => {
  return measurePasswordStrength(password.value.new);
});

const passwordStrengthLabel = computed(() => {
  const score = passwordStrength.value;
  if (score >= 80) return 'Very Strong';
  if (score >= 60) return 'Strong';
  if (score >= 40) return 'Moderate';
  if (score >= 20) return 'Weak';
  return 'Very Weak';
});

const passwordStrengthColor = computed(() => {
  const score = passwordStrength.value;
  if (score >= 80) return 'success';
  if (score >= 60) return 'info';
  if (score >= 40) return 'warning';
  return 'danger';
});

const updateProfile = () => {
  console.log('Profile updated', user.value);
};

const changePassword = () => {
  console.log('Password changed', password.value);
};

const uploadAvatar = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.profilePicture = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Global Setting Management</h1>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Coin Reward</h2>
      </template>
      <template #body>
        <FormKit type="form" @submit="updateProfile" :actions="false">
          <div class="flex space-x-6">
              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Coin Value <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>

              <FormKit
                type="text"
                name="perRm"
                label="Per RM"
                v-model="user.perRm"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Per RM <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>
            </div>
            <div class="flex space-y-6">
              <label class="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Earn Coin for Purchases Product</span>
            </label>
            </div>
            <div class="flex space-y-6">
              <label class="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Earn Coins for Rate & Review Product</span>
            </label>
            </div>
            <div class="flex space-y-6">
              <label class="inline-flex items-center mb-5 cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer">
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Earn Coins for Game Reward</span>
            </label>
            </div>
          <div class="flex justify-start mt-6">
            <rs-button type="submit">Update</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Other Setting</h2>
      </template>
      <template #body>
        <FormKit type="form" @submit="updateProfile" :actions="false">
              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Period of Days for Auto Cancellation Order (Unpaid Order) <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>

            
              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Period of Days After Order Completion for Rate & Review Product <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>

              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Max Weight Measurement Order Limit <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>

              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Web Session Timeout Period <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>

              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Notification Period <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>

              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Two-Factor Authentication (2FA) Session Timeout Period <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>

              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Max File Size & Resolution of Product Picture <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>
         
         
              <FormKit
                type="text"
                name="coinValue"
                label="Coin Value"
                v-model="user.coinValue"
                validation="required"
                class="flex-1"
              >
                <template #label>
                  <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                    Max File Size & Resolution of Video Craft <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>
              <div class="flex justify-start mt-6">
            <rs-button type="submit">Update</rs-button>
          </div>
            </FormKit>
      </template>
    </rs-card>
  </div>
</template>