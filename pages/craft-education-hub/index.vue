<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Craft Education Hub</div>

    <!-- Create Webinar Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Create Webinar</div>
      <div class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Title</label
          >
          <input
            v-model="newWebinar.title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Start and End DateTime -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Start Date & Time</label
          >
          <input
            v-model="newWebinar.startDatetime"
            type="datetime-local"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >End Date & Time</label
          >
          <input
            v-model="newWebinar.endDatetime"
            type="datetime-local"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            v-model="newWebinar.description"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
          ></textarea>
        </div>

        <!-- External Platform Link -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >External Platform Link</label
          >
          <input
            v-model="newWebinar.link"
            type="url"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Passcode -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Passcode</label
          >
          <input
            v-model="newWebinar.passcode"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end">
          <button
            @click="createWebinar"
            class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500"
          >
            Create Webinar
          </button>
        </div>
      </div>
    </div>

    <!-- Webinar List Section -->
    <div class="pb-20">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-lg font-medium mb-4">Webinar List</div>
        <div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Filter Webinars</label
            >
            <select
              v-model="webinarFilter"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Webinars</option>
              <option value="upcoming">Upcoming Webinars</option>
              <option value="past">Past Webinars</option>
            </select>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(webinar, index) in filteredWebinars"
              :key="index"
              class="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 class="text-sm font-semibold">{{ webinar.title }}</h3>
                <p class="text-xs text-gray-600">
                  {{ webinar.startDatetime }} - {{ webinar.endDatetime }}
                </p>
                <p class="text-xs text-gray-600">{{ webinar.description }}</p>
                <p class="text-xs text-gray-600">
                  Platform Link:
                  <a
                    :href="webinar.link"
                    target="_blank"
                    class="text-blue-600"
                    >{{ webinar.link }}</a
                  >
                </p>
                <p class="text-xs text-gray-600">
                  Passcode: {{ webinar.passcode }}
                </p>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="editWebinar(index)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  <Icon
                    name="material-symbols:edit-outline-rounded"
                    size="30"
                  />
                </button>
                <button
                  @click="deleteWebinar(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <Icon
                    name="material-symbols:delete-outline-rounded"
                    size="30"
                  />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <rs-modal
      v-model="editingModal"
      position="center"
      title="Edit Webinar"
      size="lg"
    >
      <div class="text-lg font-medium mb-4">Edit Webinar</div>
      <div class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Title</label
          >
          <input
            v-model="webinars[editingIndex].title"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Start and End DateTime -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Start Date & Time</label
          >
          <input
            v-model="webinars[editingIndex].startDatetime"
            type="datetime-local"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >End Date & Time</label
          >
          <input
            v-model="webinars[editingIndex].endDatetime"
            type="datetime-local"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Description</label
          >
          <textarea
            v-model="webinars[editingIndex].description"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
          ></textarea>
        </div>

        <!-- External Platform Link -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >External Platform Link</label
          >
          <input
            v-model="webinars[editingIndex].link"
            type="url"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Passcode -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Passcode</label
          >
          <input
            v-model="webinars[editingIndex].passcode"
            type="text"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelEdit"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="saveWebinar"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>

      <template #footer>
        <div></div>
      </template>
    </rs-modal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Define page meta
definePageMeta({
  title: "Craft Education Hub",
});

// Data for managing webinars
const webinars = ref([
  {
    title: "Introduction to Crafting",
    startDatetime: "2023-09-15T10:00",
    endDatetime: "2023-09-15T12:00",
    description: "An introductory webinar on the basics of crafting.",
    link: "https://example.com/webinar1",
    passcode: "1234",
  },
  {
    title: "Advanced Crafting Techniques",
    startDatetime: "2023-09-20T14:00",
    endDatetime: "2023-09-20T16:00",
    description: "Learn advanced techniques for crafting.",
    link: "https://example.com/webinar2",
    passcode: "5678",
  },
]);

const newWebinar = ref({
  title: "",
  startDatetime: "",
  endDatetime: "",
  description: "",
  link: "",
  passcode: "",
});

const editingModal = ref(false);

const webinarFilter = ref("all"); // "all", "upcoming", "past"

// Method to create a new webinar
const createWebinar = () => {
  if (
    newWebinar.value.title &&
    newWebinar.value.startDatetime &&
    newWebinar.value.endDatetime
  ) {
    webinars.value.push({ ...newWebinar.value });
    newWebinar.value = {
      title: "",
      startDatetime: "",
      endDatetime: "",
      description: "",
      link: "",
      passcode: "",
    };
    alert("Webinar created successfully!");
  } else {
    alert("Please fill in all required fields.");
  }
};

// Computed property to filter webinars based on the selected filter
const filteredWebinars = computed(() => {
  const now = new Date().toISOString();
  if (webinarFilter.value === "upcoming") {
    return webinars.value.filter((webinar) => webinar.startDatetime > now);
  } else if (webinarFilter.value === "past") {
    return webinars.value.filter((webinar) => webinar.endDatetime < now);
  }
  return webinars.value;
});

const editingIndex = ref(null);

// Method to edit a webinar
const editWebinar = (index) => {
  editingIndex.value = index;

  editingModal.value = true;
};

// Method to save the edited webinar
const saveWebinar = () => {
  editingIndex.value = null;
  alert("Webinar updated successfully!");
};

// Method to delete a webinar
const deleteWebinar = (index) => {
  webinars.value.splice(index, 1);
  alert("Webinar deleted successfully!");
};

// Method to cancel the edit operation
const cancelEdit = () => {
  editingIndex.value = null;
  editingModal.value = false;
};
</script>

<style scoped>
/* Add custom styles here */
</style>
