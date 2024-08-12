<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  title: "New Admin",
  layout: "default",
});

const user = ref({
  profilePicture: "/img/background/default-thumbnail.jpg",
  fullName: "John Doe",
  email: "john@example.com",
  phoneNumber: "+1 234 567 8900",
  adminType: 'superadmin',
  adminStatus: 'active',
  bankAccount: {
    accountNumber: '',
    bankName: '',
    branchName: '',
  }
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
    <h1 class="text-3xl font-bold mb-8">Update Profile</h1>
    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Change Profile Picture</h2>
      </template>
      <template #body>
        <div class="flex items-center space-x-6">
          <div class="shrink-0">
            <img class="h-16 w-16 object-cover rounded-full" :src="user.profilePicture" alt="Current Avatar" />
          </div>
          <label class="block flex-grow">
            <span class="sr-only">Choose image file</span>
            <input type="file" @change="uploadAvatar" class="block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "/>
          </label>
        </div>
        <div class="flex justify-end mt-6">
          <rs-button @click="uploadAvatar">Upload Avatar</rs-button>
        </div>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Profile Information</h2>
      </template>
      <template #body>
        <FormKit type="form" :actions="false" @submit="updateProfile">
          <div class="space-y-6">
            <FormKit
              type="text"
              name="fullName"
              label="Full Name"
              v-model="user.fullName"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Full Name <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="ic"
              label="Identification Number"
              v-model="user.ic"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Identification Number <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>


            <FormKit
              type="tel"
              name="phoneNumber"
              label="Phone Number"
              v-model="user.phoneNumber"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Phone Number <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="email"
              name="email"
              label="Email"
              v-model="user.email"
              validation="required|email"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Email <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="select"
              name="status"
              label="Status"
              v-model="user.adminStatus"
              :options="adminStatus"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Status <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

          </div>
          <div class="flex justify-end mt-6">
            <rs-button type="submit">Update Profile</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>

    <!-- Address -->
    <rs-card class="mb-8">
  <template #header>
    <h2 class="text-xl font-semibold">Address Information</h2>
  </template>
  <template #body>
    <FormKit type="form" :actions="false" @submit="updateProfile">
      <div class="space-y-6">
        <FormKit
          type="text"
          name="streetAddress"
          label="Street Address"
          v-model="user.streetAddress"
          validation="required"
        >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
              Street Address <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>

        <FormKit
          type="text"
          name="city"
          label="City"
          v-model="user.city"
          validation="required"
        >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
              City <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>

        <FormKit
          type="text"
          name="state"
          label="State/Province"
          v-model="user.state"
          validation="required"
        >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
              State/Province <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>

        <FormKit
          type="text"
          name="postalCode"
          label="Postal Code"
          v-model="user.postalCode"
          validation="required|length:5"
        >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
              Postal Code <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>

        <FormKit
          type="text"
          name="country"
          label="Country"
          v-model="user.country"
          validation="required"
        >
          <template #label>
            <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
              Country <span class="text-danger">*</span>
            </label>
          </template>
        </FormKit>

      </div>
      <div class="flex justify-end mt-6">
        <rs-button type="submit">Update Address</rs-button>
      </div>
    </FormKit>
  </template>
</rs-card>


    <!-- New Card for Bank Account Details -->
    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Bank Account Details</h2>
      </template>
      <template #body>
        <FormKit type="form" :actions="false" @submit="updateProfile">
          <div class="space-y-6">
            <FormKit
              type="text"
              name="accountNumber"
              label="Account Number"
              v-model="user.bankAccount.accountNumber"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Account Number <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="bankName"
              label="Bank Name"
              v-model="user.bankAccount.bankName"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Bank Name <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="branchName"
              label="Branch Name"
              v-model="user.bankAccount.branchName"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Branch Name <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
          </div>
          <div class="flex justify-end mt-6">
            <rs-button type="submit">Update Bank Details</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Change Password</h2>
      </template>
      <template #body>
        <FormKit type="form" :actions="false" @submit="changePassword">
          <div class="space-y-6">
            <FormKit
              type="password"
              name="currentPassword"
              label="Current Password"
              v-model="password.current"
              validation="required"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Current Password <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="password"
              name="newPassword"
              label="New Password"
              v-model="password.new"
              validation="required|length:8"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  New Password <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <div>
              <label class="block text-sm font-medium text-gray-700">Password Strength</label>
              <rs-progress-bar 
                :value="passwordStrength" 
                :max="100" 
                class="mt-2" 
                :variant="passwordStrengthColor"
              />
              <p class="mt-1 text-sm" :class="`text-${passwordStrengthColor}`">
                {{ passwordStrengthLabel }}
              </p>
            </div>

            <FormKit
              type="password"
              name="confirmNewPassword"
              label="Confirm New Password"
              v-model="password.confirmNew"
              validation="required|confirm"
              validation-label="New Password"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Confirm New Password <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>
          </div>
          <div class="flex justify-end mt-6">
            <rs-button type="submit">Change Password</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>
