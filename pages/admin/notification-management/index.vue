<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">
      Notification Management (Email & Mobile)
    </div>

    <!-- Create Notification Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">Create Notification</div>
      <div class="space-y-4">
        <!-- Notification Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Notification Type</label
          >
          <select
            v-model="newNotification.type"
            class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        <!-- Targeted User Group -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Targeted User Group</label
          >
          <select
            v-model="newNotification.targetGroup"
            class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="seller">Seller</option>
            <option value="user">User</option>
          </select>
        </div>

        <!-- Notification Title -->
        <div>
          <input
            v-model="newNotification.title"
            type="text"
            placeholder="Notification Title"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Notification Message -->
        <div>
          <textarea
            v-model="newNotification.message"
            placeholder="Notification Message"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        <!-- Attachments -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Attachments (Max 3 files)</label
          >
          <input
            type="file"
            multiple
            @change="handleAttachment"
            :disabled="newNotification.attachments.length >= 3"
            class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div class="mt-2 flex flex-wrap space-x-2">
            <div
              v-for="(data, index) in newNotification.attachments"
              :key="index"
              class="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg"
            >
              <span>{{ data.name }}</span>
              <button
                @click="removeAttachment(index)"
                class="text-red-600 hover:text-red-800"
              >
                <Icon
                  name="material-symbols:delete-outline-rounded"
                  class="w-4 h-4"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Publish Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Publish</label
          >
          <div class="flex items-center space-x-4">
            <div>
              <input
                type="radio"
                id="immediate"
                value="immediate"
                v-model="newNotification.publishTime"
                class="mr-2"
              />
              <label for="immediate" class="text-sm">Immediate</label>
            </div>
            <div>
              <input
                type="radio"
                id="schedule"
                value="schedule"
                v-model="newNotification.publishTime"
                class="mr-2"
              />
              <label for="schedule" class="text-sm">Schedule</label>
            </div>
          </div>
        </div>

        <!-- Schedule Date & Time -->
        <div
          v-if="newNotification.publishTime === 'schedule'"
          class="flex space-x-4"
        >
          <input
            v-model="newNotification.scheduleDate"
            type="date"
            class="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            v-model="newNotification.scheduleTime"
            type="time"
            class="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <!-- Save as Draft & Create Notification -->
        <div class="flex justify-between">
          <button
            @click="saveAsDraft"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Save as Draft
          </button>
          <rs-button @click="createNotification" class="px-4 py-2 text-sm">
            Create Notification
          </rs-button>
        </div>
      </div>
    </div>

    <!-- List of Notifications -->
    <div class="pb-20">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-lg font-medium mb-4">Notifications</div>
        <div class="space-y-4">
          <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="p-4 bg-gray-50 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 class="text-sm font-semibold">{{ notification.title }}</h3>
              <p class="text-xs text-gray-600">{{ notification.message }}</p>
              <p class="text-xs text-gray-500">
                {{ notification.type === "email" ? "Email" : "Mobile" }} |
                {{ notification.targetGroup === "seller" ? "Seller" : "User" }}
              </p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editNotification(index)"
                class="text-blue-600 hover:text-blue-800"
              >
                <Icon name="material-symbols:edit-outline-rounded" size="30" />
              </button>
              <button
                @click="deleteNotification(index)"
                class="text-red-600 hover:text-red-800"
              >
                <Icon
                  name="material-symbols:delete-outline-rounded"
                  size="30"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <rs-modal
      v-model="editingModal"
      title="Create Notification"
      size="lg"
      position="center"
    >
      <!-- Notification Type -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Notification Type</label
        >
        <select
          v-model="notifications[editingIndex].type"
          class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="email">Email</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>

      <!-- Targeted User Group -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Targeted User Group</label
        >
        <select
          v-model="notifications[editingIndex].targetGroup"
          class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="seller">Seller</option>
          <option value="user">User</option>
        </select>
      </div>

      <!-- Notification Title -->
      <input
        v-model="notifications[editingIndex].title"
        type="text"
        class="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      />

      <!-- Notification Message -->
      <textarea
        v-model="notifications[editingIndex].message"
        class="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
      ></textarea>

      <!-- Attachments -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Attachments (Max 3 files)</label
        >
        <input
          type="file"
          multiple
          @change="handleEditAttachment"
          :disabled="notifications[editingIndex].attachments.length >= 3"
          class="block w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div class="mt-2 flex flex-wrap space-x-2">
          <div
            v-for="(file, index) in notifications[editingIndex].attachments"
            :key="index"
            class="flex items-center space-x-2 p-2 bg-gray-100 rounded-lg"
          >
            <span>{{ file.name }}</span>
            <button
              @click="removeEditAttachment(index)"
              class="text-red-600 hover:text-red-800"
            >
              <Icon
                name="material-symbols:delete-outline-rounded"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Publish Time -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Publish</label
        >
        <div class="flex items-center space-x-4">
          <div>
            <input
              type="radio"
              id="editImmediate"
              value="immediate"
              v-model="notifications[editingIndex].publishTime"
              class="mr-2"
            />
            <label for="editImmediate" class="text-sm">Immediate</label>
          </div>
          <div>
            <input
              type="radio"
              id="editSchedule"
              value="schedule"
              v-model="notifications[editingIndex].publishTime"
              class="mr-2"
            />
            <label for="editSchedule" class="text-sm">Schedule</label>
          </div>
        </div>
      </div>

      <!-- Schedule Date & Time -->
      <div
        v-if="notifications[editingIndex].publishTime === 'schedule'"
        class="flex space-x-4 mb-4"
      >
        <input
          v-model="notifications[editingIndex].scheduleDate"
          type="date"
          class="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
        <input
          v-model="notifications[editingIndex].scheduleTime"
          type="time"
          class="p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div class="flex justify-end space-x-4">
        <button
          @click="(editingModal = false), cancelEdit"
          class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Cancel
        </button>
        <rs-button @click="saveNotification" class="px-4 py-2 text-sm">
          Save Changes
        </rs-button>
      </div>

      <template #footer>
        <div></div>
      </template>
    </rs-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";

definePageMeta({
  title: "Notification Management",
  middleware: ["auth"],
  requiresAuth: true,
});

const notifications = ref([
  {
    title: "Welcome",
    message: "Welcome to our application!",
    type: "email",
    targetGroup: "user",
    publishTime: "immediate",
    attachments: [
      {
        name: "attachment.pdf",
        type: "application/pdf",
        size: "10.5 MB",
      },
    ],
  },
  {
    title: "Update Available",
    message: "A new update is available. Please update your app.",
    type: "mobile",
    targetGroup: "seller",
    publishTime: "schedule",
    scheduleDate: "2023-09-01",
    scheduleTime: "12:00",
    attachments: [
      {
        name: "attachment.pdf",
        type: "application/pdf",
        size: "10.5 MB",
      },
    ],
  },
]);

const newNotification = ref({
  title: "",
  message: "",
  type: "email",
  targetGroup: "user",
  publishTime: "immediate",
  scheduleDate: "",
  scheduleTime: "",
  attachments: [
    {
      name: "",
      type: "",
      size: "",
    },
  ],
});

const file = ref({
  name: "",
  type: "",
  size: "",
});

const editingIndex = ref(null);
const editingModal = ref(false);

const createNotification = () => {
  if (newNotification.value.title && newNotification.value.message) {
    notifications.value.push({ ...newNotification.value });
    resetNewNotification();
  }
};

const saveAsDraft = () => {
  console.log("Notification saved as draft:", newNotification.value);
};

const editNotification = (index) => {
  editingIndex.value = index;
  editingModal.value = true;
};

const saveNotification = () => {
  editingIndex.value = null;
};

const deleteNotification = (index) => {
  notifications.value.splice(index, 1);
};

const cancelEdit = () => {
  editingIndex.value = null;
};

const resetNewNotification = () => {
  newNotification.value = {
    title: "",
    message: "",
    type: "email",
    targetGroup: "user",
    publishTime: "immediate",
    scheduleDate: "",
    scheduleTime: "",
    attachments: [],
  };
};

const handleAttachment = (event) => {
  const files = event.target.files;
  if (files.length + newNotification.value.attachments.length <= 3) {
    newNotification.value.attachments.push(...files);
  } else {
    alert("You can only upload up to 3 files.");
  }
};

const removeAttachment = (index) => {
  newNotification.value.attachments.splice(index, 1);
};

const handleEditAttachment = (event) => {
  const files = event.target.files;
  if (
    files.length + notifications.value[editingIndex.value].attachments.length <=
    3
  ) {
    notifications.value[editingIndex.value].attachments.push(...files);
  } else {
    alert("You can only upload up to 3 files.");
  }
};

const removeEditAttachment = (index) => {
  notifications.value[editingIndex.value].attachments.splice(index, 1);
};
</script>

<style scoped></style>
