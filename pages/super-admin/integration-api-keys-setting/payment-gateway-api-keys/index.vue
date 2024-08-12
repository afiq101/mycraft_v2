<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  title: "Integration API Keys Setup",
  layout: "default",
});

const apiKeys = ref({
  paymentGatewayApiKey: "sk_test_4eC39HqLyjWDarjtT1zdp7dc", // Example API key for Payment Gateway
  courierServiceApiKey: "YXBpS2V5Q291cmllclNlcnZpY2U=", // Example API key for Courier Service
  liveStreamingApiKey: "12345-abcde-67890-fghij", // Example API key for Live Streaming
  whatsappSmsApiKey: "EAAQZCwxyz12345ZCBA", // Example API key for Whatsapp & SMS
  webinarApiKey: "webinar_api_key_abcdef123456", // Example API key for Webinar
  gameApiKey: "game-789xyz-api-key-456def", // Example API key for Game Integration
});

</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Integration API Keys Setup</h1>

    <rs-card class="mb-8">
      <template #header>
        <h2 class="text-xl font-semibold">Setup API Keys</h2>
      </template>
      <template #body>
        <FormKit type="form" @submit="updateApiKeys" :actions="false">
          <div class="space-y-6">
            
            <FormKit
              type="text"
              name="paymentGatewayApiKey"
              label="Payment Gateway API Key"
              v-model="apiKeys.paymentGatewayApiKey"
              validation="required"
              class="flex-1"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Payment Gateway API Key <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="courierServiceApiKey"
              label="Courier Service API Key"
              v-model="apiKeys.courierServiceApiKey"
              validation="required"
              class="flex-1"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Courier Service API Key <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="liveStreamingApiKey"
              label="Live Streaming API Key"
              v-model="apiKeys.liveStreamingApiKey"
              validation="required"
              class="flex-1"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Live Streaming API Key <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="whatsappSmsApiKey"
              label="Whatsapp & SMS API Key"
              v-model="apiKeys.whatsappSmsApiKey"
              validation="required"
              class="flex-1"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Whatsapp & SMS API Key <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="webinarApiKey"
              label="Webinar API Key"
              v-model="apiKeys.webinarApiKey"
              validation="required"
              class="flex-1"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Webinar API Key <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

            <FormKit
              type="text"
              name="gameApiKey"
              label="Game API Key"
              v-model="apiKeys.gameApiKey"
              validation="required"
              class="flex-1"
            >
              <template #label>
                <label class="formkit-label text-gray-700 dark:text-gray-200 block mb-2 font-semibold text-sm formkit-invalid:text-red-500">
                  Game API Key <span class="text-danger">*</span>
                </label>
              </template>
            </FormKit>

          </div>
          <div class="flex justify-start mt-6">
            <rs-button type="submit">Update</rs-button>
          </div>
        </FormKit>
      </template>
    </rs-card>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
