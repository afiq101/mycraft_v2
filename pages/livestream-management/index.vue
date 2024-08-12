<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Livestream Management</div>

    <!-- Ongoing/Live Streams Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Ongoing Livestreams</div>

      <rs-table
        :data="livestreams"
        :options="{
          variant: 'default',
          striped: true,
          borderless: true,
          hover: false,
          fixed: false,
        }"
        advanced
      >
        <template v-slot:actions="data">
          <div class="flex gap-2">
            <button
              @click="endLivestream(data.value.actions)"
              class="text-red-600 hover:text-red-800"
            >
              <Icon name="material-symbols:stop-circle"></Icon>
            </button>
            <button
              @click="banFromLivestream(data.value.actions)"
              class="text-red-600 hover:text-red-800"
            >
              <Icon name="material-symbols:person-cancel-rounded"></Icon>
            </button>
            <button
              @click="viewLivestreamAnalytics(data.value.actions)"
              class="text-green-600 hover:text-green-800"
            >
              <Icon name="material-symbols:analytics"></Icon>
            </button>
          </div>
        </template>
      </rs-table>
    </div>

    <rs-modal
      v-model="showAnalytics"
      title="Livestream Analytics"
      position="center"
    >
      <div class="text-lg font-medium mb-4">Livestream Analytics</div>
      <div class="space-y-4">
        <!-- Viewer Statistics -->
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-700">Total Viewers:</div>
          <div class="text-lg font-semibold text-gray-900">
            {{ analytics.totalViewers }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-700">
            Peak Concurrent Viewers:
          </div>
          <div class="text-lg font-semibold text-gray-900">
            {{ analytics.peakViewers }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-700">
            Average Watch Time:
          </div>
          <div class="text-lg font-semibold text-gray-900">
            {{ analytics.averageWatchTime }}
          </div>
        </div>

        <!-- Engagement Metrics -->
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-700">Likes:</div>
          <div class="text-lg font-semibold text-gray-900">
            {{ analytics.likes }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-700">Comments:</div>
          <div class="text-lg font-semibold text-gray-900">
            {{ analytics.comments }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div class="text-sm font-medium text-gray-700">Shares:</div>
          <div class="text-lg font-semibold text-gray-900">
            {{ analytics.shares }}
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button
          @click="closeAnalytics"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          Close
        </button>
      </div>

      <template #footer>
        <div></div>
      </template>
    </rs-modal>

    <!-- Livestream Configuration Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Livestream Configuration</div>
      <div class="space-y-4">
        <!-- Livestream Duration Limit -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Maximum Livestream Duration</label
          >
          <div class="flex items-center space-x-4">
            <input
              v-model="configuration.maxDuration.hours"
              type="number"
              min="0"
              max="12"
              placeholder="Hours"
              class="w-20 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span class="text-sm text-gray-700">Hours</span>
            <input
              v-model="configuration.maxDuration.minutes"
              type="number"
              min="0"
              max="59"
              placeholder="Minutes"
              class="w-20 p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <span class="text-sm text-gray-700">Minutes</span>
          </div>
        </div>

        <!-- Save Configuration Button -->
        <div class="flex justify-end">
          <button
            @click="saveConfiguration"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Page metadata
definePageMeta({
  title: "Livestream Management",
});

// Data for managing livestreams
const livestreams = ref([
  {
    seller: "John Doe",
    title: "Product Launch",
    startTime: "2023-09-10 10:00",
    status: "Live",
    actions: 1,
  },
  {
    seller: "Jane Doe",
    title: "Weekly Q&A",
    startTime: "2023-09-10 15:00",
    status: "Live",
    actions: 2,
  },
  {
    seller: "John Doe",
    title: "Gaming Session",
    startTime: "2023-09-10 20:00",
    status: "Live",
    actions: 3,
  },
  {
    seller: "Jane Doe",
    title: "Community Update",
    startTime: "2023-09-11 09:00",
    status: "Live",
    actions: 4,
  },
]);

const searchQuery = ref("");
const showAnalytics = ref(false);
const analytics = ref({
  totalViewers: 0,
  peakViewers: 0,
  averageWatchTime: 0,
  likes: 0,
  comments: 0,
  shares: 0,
});

// Configuration data
const configuration = ref({
  maxDuration: {
    hours: 2,
    minutes: 0,
  },
});

// Computed property for filtered livestreams
const filteredLivestreams = computed(() => {
  return livestreams.value.filter((livestream) =>
    livestream.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods for managing livestreams
const endLivestream = (data) => {
  // CHang ethe status of the livestream basde action id
  console.log("data", data);

  const filtered = livestreams.value.filter(
    (livestream) => livestream.actions === data
  );
  filtered[0].status = "Ended";
  alert(`Livestream "${filtered[0].seller}" has ended.`);
};

const banFromLivestream = (data) => {
  const filtered = livestreams.value.filter(
    (livestream) => livestream.actions === data
  );
  filtered[0].status = "Banned";
  alert(`Livestream "${filtered[0].title}" has been banned.`);
};
const viewLivestreamAnalytics = (data) => {
  // Mock data for analytics
  analytics.value = {
    totalViewers: 1200,
    peakViewers: 300,
    averageWatchTime: "15:32",
    likes: 150,
    comments: 40,
    shares: 30,
  };
  showAnalytics.value = true;
};

const closeAnalytics = () => {
  showAnalytics.value = false;
};

// Method to save the configuration
const saveConfiguration = () => {
  alert(
    `Configuration saved: Maximum Duration - ${configuration.value.maxDuration.hours} Hours and ${configuration.value.maxDuration.minutes} Minutes.`
  );
};
</script>

<style scoped>
/* Add custom styles here */
</style>
