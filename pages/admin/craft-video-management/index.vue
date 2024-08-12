<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Craft Video Management</div>

    <!-- Video Placement Selection Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Select Video Placement</div>
      <div class="grid grid-cols-2 gap-4">
        <!-- Placement Buttons -->
        <button
          v-for="placement in videoPlacements"
          :key="placement.code"
          @click="selectPlacement(placement)"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          {{ placement.label }}
        </button>
      </div>
    </div>

    <!-- Video Upload & Schedule Section -->
    <div
      v-if="selectedPlacement && selectedPlacement.video.length === 0"
      class="bg-white p-6 rounded-lg shadow-md"
    >
      <div class="text-lg font-medium mb-4">
        Upload Video for {{ selectedPlacement.label }}
      </div>
      <div class="space-y-4">
        <!-- File Upload -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Upload Video (Max 10MB)</label
          >
          <input
            type="file"
            @change="handleVideoUpload"
            accept="video/*"
            class="block w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="videoFile" class="text-sm text-gray-500 mt-2">
            {{ videoFile.name }}
          </p>
        </div>

        <!-- Scheduler -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Publish Video</label
          >
          <div class="flex space-x-4">
            <div>
              <input
                type="radio"
                id="immediate"
                value="immediate"
                v-model="publishOption"
                class="mr-2"
              />
              <label for="immediate" class="text-sm">Immediate</label>
            </div>
            <div>
              <input
                type="radio"
                id="schedule"
                value="schedule"
                v-model="publishOption"
                class="mr-2"
              />
              <label for="schedule" class="text-sm">Schedule</label>
            </div>
          </div>
        </div>

        <!-- Date and Time Inputs -->
        <div v-if="publishOption === 'schedule'" class="flex space-x-4">
          <input
            v-model="scheduleDate"
            type="date"
            class="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            v-model="scheduleTime"
            type="time"
            class="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-between">
          <button
            @click="saveVideoPlacement"
            :disabled="!videoFile"
            class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500 disabled:opacity-50"
          >
            Save Video
          </button>
          <button
            @click="deleteVideoPlacement"
            :disabled="!selectedPlacement.video"
            class="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-500 disabled:opacity-50"
          >
            Delete Video
          </button>
        </div>
      </div>
    </div>

    <!-- Existing Video Details and Additional Upload Option -->
    <div
      v-if="selectedPlacement && selectedPlacement.video.length > 0"
      class="bg-white p-6 rounded-lg shadow-md"
    >
      <div class="text-lg font-medium mb-4">
        Current Videos for {{ selectedPlacement.label }}
      </div>
      <div class="flex space-x-4">
        <!-- Existing Video Thumbnail -->
        <div class="relative">
          <video
            :src="selectedPlacement.video.url"
            controls
            class="w-full rounded-lg shadow-md"
          ></video>
          <div class="mt-2">
            <p>
              <strong>Scheduled Appearance:</strong>
              {{ selectedPlacement.video.scheduleDate }} at
              {{ selectedPlacement.video.scheduleTime }}
            </p>
            <p>
              <strong>File Size:</strong> {{ selectedPlacement.video.size }} MB
            </p>
          </div>
        </div>
        <!-- Plus Icon for Adding More Videos -->
        <div
          @click="addAnotherVideo"
          class="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Page metadata
definePageMeta({
  title: "Craft Video Management",
});

// Video placements available for selection
const videoPlacements = ref([
  {
    code: "advertisement",
    label: "Advertisement",
    video: [],
  },
  { code: "promotional", label: "Promotional", video: [] },
  {
    code: "event",
    label: "Event",
    video: [],
  },
  {
    code: "banner",
    label: "Banner",
    video: [
      {
        url: "https://path/to/existing/video.mp4",
        name: "example.mp4",
        size: 8.5,
        scheduleDate: "2023-09-12",
        scheduleTime: "14:00",
      },
    ],
  },
]);

// Currently selected placement
const selectedPlacement = ref(null);
const videoFile = ref(null);
const scheduleDate = ref("");
const scheduleTime = ref("");
const publishOption = ref("immediate"); // Immediate or Schedule

// Select a placement
const selectPlacement = (placement) => {
  selectedPlacement.value = placement;
  videoFile.value = null;
  scheduleDate.value = placement.video?.scheduleDate || "";
  scheduleTime.value = placement.video?.scheduleTime || "";
  publishOption.value = "immediate";
};

// Handle video upload
const handleVideoUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.size / 1024 / 1024 <= 10) {
    videoFile.value = file;
  } else {
    alert("The file exceeds the maximum size of 10MB.");
  }
};

// Save the video to the selected placement
const saveVideoPlacement = () => {
  const publicationDate =
    publishOption.value === "immediate"
      ? new Date().toISOString()
      : `${scheduleDate.value} ${scheduleTime.value}`;
  // Code to save video with the chosen publication date
  console.log("Video saved with publication date:", publicationDate);

  if (videoFile) {
    const reader = new FileReader();
    reader.onload = () => {
      selectedPlacement.value.video = {
        url: reader.result,
        name: videoFile.value.name,
        size: (videoFile.value.size / 1024 / 1024).toFixed(2),
        scheduleDate:
          publishOption.value === "schedule" ? scheduleDate.value : "Immediate",
        scheduleTime:
          publishOption.value === "schedule" ? scheduleTime.value : "",
      };
      videoFile.value = null;
      alert(
        `Video uploaded and set to ${
          publishOption.value === "immediate"
            ? "publish immediately"
            : `schedule for ${scheduleDate.value} at ${scheduleTime.value}`
        }.`
      );
    };
    reader.readAsDataURL(videoFile.value);
  }
};

// Delete the video from the selected placement
const deleteVideoPlacement = () => {
  if (selectedPlacement.value.video) {
    selectedPlacement.value.video = null;
    alert("Video has been deleted.");
  }
};

// Method to handle adding another video
const addAnotherVideo = () => {
  alert("Upload another video for this placement.");
  // Trigger file input or show the upload section
};
</script>

<style scoped>
/* Add custom styles here */
</style>
