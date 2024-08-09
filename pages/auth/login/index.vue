<script setup>
definePageMeta({
  title: "Login",
  layout: "default",
});

const router = useRouter();

const loginForm = ref({
  email: "admin@mycraff.com",
  password: "admin123",
});

const handleLogin = () => {
  // Implement login logic here
  console.log("Login:", loginForm.value);
  // If login is successful, redirect to dashboard or home page
  // router.push('/dashboard');
  navigateTo("/settings");
};

const goToRegister = () => {
  router.push("/auth/register");
};

const goToForgotPassword = () => {
  router.push("/auth/forgot-password");
};
</script>

<template>
  <div>
    <rs-card class="w-full">
      <template #header>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </template>
      <template #body>
        <div class="flex justify-center">
          <div class="flex-1 max-w-xl flex justify-center">
            <FormKit
              type="form"
              @submit="handleLogin"
              submit-label="Sign in"
              :classes="{
                form: 'flex-1',
              }"
            >
              <FormKit
                type="email"
                name="email"
                label="Email address"
                validation="required|email"
                v-model="loginForm.email"
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
              <FormKit
                type="password"
                name="password"
                label="Password"
                validation="required|length:8"
                v-model="loginForm.password"
              >
                <template #label>
                  <label
                    class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                  >
                    Password
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
          <rs-button variant="primary-text" @click="goToRegister"
            >Create an account</rs-button
          >
          <rs-button variant="primary-text" @click="goToForgotPassword"
            >Forgot password?</rs-button
          >
        </div>
      </template>
    </rs-card>
  </div>
</template>
