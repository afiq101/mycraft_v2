<script setup>
definePageMeta({
  title: "Forgot Password",
  layout: "default",
});

const router = useRouter();

const forgotPasswordForm = ref({
  email: "",
});

const handleForgotPassword = () => {
  // Implement forgot password logic here
  console.log("Forgot Password:", forgotPasswordForm.value);
  // After sending reset instructions, you might want to show a success message
  // or redirect to a confirmation page
};

const goToLogin = () => {
  router.push("/auth/login");
};
</script>

<template>
  <div>
    <rs-card class="w-full">
      <template #header>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Reset your password
        </h2>
      </template>
      <template #body>
        <div class="flex justify-center">
          <div class="flex-1 max-w-xl flex justify-center">
            <FormKit
              type="form"
              @submit="handleForgotPassword"
              submit-label="Send reset instructions"
              :classes="{
                form: 'flex-1',
              }"
            >
              <p class="text-center text-gray-600 mb-4">
                Enter your email address and we'll send you instructions to
                reset your password.
              </p>
              <FormKit
                type="email"
                name="email"
                label="Email address"
                validation="required|email"
                v-model="forgotPasswordForm.email"
              >
                <template #label>
                  <label
                    class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                  >
                    Email address
                    <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>
            </FormKit>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="text-center">
          <rs-button variant="primary-text" @click="goToLogin"
            >Back to login</rs-button
          >
        </div>
      </template>
    </rs-card>
  </div>
</template>
