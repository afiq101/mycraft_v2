<script setup>
import { ref, computed } from "vue";

definePageMeta({
  title: "Profile Management",
  layout: "default",
});

const { $swal } = useNuxtApp();

const user = ref({
  profilePicture: "/img/background/default-thumbnail.jpg",
});

const currentPassword = ref("abc123");

const password = ref({
  current: "",
  new: "",
  confirm: "",
});

const measurePasswordStrength = (password) => {
  let score = 0;
  if (!password) return score;

  if (password.length >= 8) score += 10;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score += 20;
  if (password.match(/\d/)) score += 20;
  if (password.match(/[^a-zA-Z\d]/)) score += 20;
  score += Math.min(new Set(password).size * 2, 10);

  return Math.min(score, 100);
};

const passwordStrength = computed(() =>
  measurePasswordStrength(password.value.new)
);

const passwordStrengthLabel = computed(() => {
  const score = passwordStrength.value;
  if (score >= 80) return "Very Strong";
  if (score >= 60) return "Strong";
  if (score >= 40) return "Medium";
  if (score >= 20) return "Weak";
  return "Very Weak";
});

const passwordStrengthColor = computed(() => {
  const score = passwordStrength.value;
  if (score >= 80) return "success";
  if (score >= 60) return "info";
  if (score >= 40) return "warning";
  return "danger";
});

const changePassword = () => {
  if (password.value.current !== currentPassword.value) {
    return $swal.fire({
      title: "Password",
      text: "Current password is incorrect",
      icon: "warning",
      confirmButtonText: "Close",
    });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password.value.new)) {
    $swal.fire({
      title: "Password",
      text: "Password must contain at least one uppercase, one lowercase, one number, and one special character",
      icon: "warning",
      confirmButtonText: "Close",
    });
    return;
  }

  if (password.value.new !== password.value.confirm) {
    $swal.fire({
      title: "Password",
      text: "Password and confirmation password do not match",
      icon: "warning",
      confirmButtonText: "Close",
    });
    return;
  }

  user.value.password = password.value.new;

  $swal.fire({
    title: "Password",
    text: "Password has been changed successfully",
    icon: "success",
    confirmButtonText: "Close",
  });
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
        <h2 class="text-xl font-semibold">Change Profile Avatar</h2>
      </template>
      <template #body>
        <div class="flex items-center space-x-6">
          <div class="shrink-0">
            <img
              class="h-16 w-16 object-cover rounded-full"
              :src="user.profilePicture"
              alt="Current Avatar"
            />
          </div>
          <label class="block flex-grow">
            <span class="sr-only">Choose image file</span>
            <input
              type="file"
              @change="uploadAvatar"
              class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            />
          </label>
        </div>
        <div class="flex justify-end mt-6">
          <rs-button @click="uploadAvatar">Upload Avatar</rs-button>
        </div>
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
            />

            <FormKit
              type="password"
              name="newPassword"
              label="New Password"
              v-model="password.new"
              validation="required|length:8"
            />

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >Password Strength</label
              >
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
              v-model="password.confirm"
              validation="required"
              validation-label="New Password"
            />
          </div>
          <div class="flex justify-end mt-6">
            <rs-button type="submit">Change Password</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>
