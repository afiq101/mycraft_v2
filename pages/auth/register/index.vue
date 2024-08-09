<script setup>
definePageMeta({
  title: "Register",
  layout: "default",
});

const router = useRouter();

const registerForm = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = () => {
  // Implement registration logic here
  console.log("Register:", registerForm.value);
  // If registration is successful, redirect to login page
  // router.push('/auth/login');
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
          Create a new account
        </h2>
      </template>
      <template #body>
        <div class="flex justify-center">
          <div class="flex-1 max-w-xl flex justify-center">
            <FormKit
              type="form"
              @submit="handleRegister"
              submit-label="Register"
              :classes="{
                form: 'flex-1',
              }"
            >
              <FormKit
                type="text"
                name="name"
                label="Full Name"
                validation="required"
                v-model="registerForm.name"
              >
                <template #label>
                  <label
                    class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                  >
                    Full Name
                    <span class="text-danger">*</span>
                  </label>
                </template>
              </FormKit>
              <FormKit
                type="email"
                name="email"
                label="Email address"
                validation="required|email"
                v-model="registerForm.email"
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
                v-model="registerForm.password"
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
              <FormKit
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                validation="required|confirm"
                v-model="registerForm.confirmPassword"
              >
                <template #label>
                  <label
                    class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500"
                  >
                    Confirm Password
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
            >Already have an account? Sign in</rs-button
          >
        </div>
      </template>
    </rs-card>
  </div>
</template>
