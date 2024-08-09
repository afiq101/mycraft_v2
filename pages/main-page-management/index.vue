<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Main Page Management</div>

    <!-- Banner Image Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">
        Banner Images

        <p class="text-xs">First section of the website content</p>
      </div>

      <!-- Display Existing Images -->
      <div class="flex space-x-4 mb-4">
        <div
          v-for="(image, index) in bannerImages"
          :key="index"
          class="relative"
        >
          <img
            :src="image.url"
            alt="Banner Image"
            class="w-40 h-40 object-cover rounded-lg shadow-md"
          />
          <!-- Delete Button -->
          <button
            @click="deleteImage(index)"
            class="absolute top-2 right-2 text-red-600 hover:text-red-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Add Image Icon (Visible if less than 5 images) -->
        <div
          v-if="bannerImages.length < 5"
          @click="triggerFileUpload"
          class="flex items-center justify-center w-40 h-40 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
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

      <!-- File Input (Hidden) -->
      <input
        type="file"
        ref="fileInput"
        @change="handleFileUpload"
        accept="image/*"
        class="hidden"
      />
    </div>

    <!-- Advertisement Listing Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <div class="text-lg font-medium">Advertisement Listing</div>
        <button
          @click="showCreateAdModal = true"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          Add Advertisement
        </button>
      </div>

      <!-- Advertisement Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                URL
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(ad, index) in advertisements" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ ad.title }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="ad.image.url"
                  alt="Advertisement Image"
                  class="w-16 h-16 object-cover rounded-lg shadow-md"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                <a :href="ad.url" target="_blank">{{ ad.url }}</a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="{
                    'bg-green-100 text-green-800': ad.status === 'active',
                    'bg-gray-100 text-gray-800': ad.status === 'inactive',
                  }"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ ad.status }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="toggleAdStatus(index)"
                  class=""
                  :class="
                    ad.status === 'active'
                      ? ' text-green-800'
                      : ' text-gray-800'
                  "
                >
                  {{ ad.status === "active" ? "Deactivate" : "Activate" }}
                </button>
                <button
                  @click="editAd(index)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  <Icon
                    name="material-symbols:edit-outline-rounded"
                    class="w-4 h-4"
                  />
                </button>
                <button
                  @click="deleteAd(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <Icon
                    name="material-symbols:delete-outline-rounded"
                    class="w-4 h-4"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create Advertisement Modal -->
    <div
      v-if="showCreateAdModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-2/3 lg:w-1/2">
        <div class="text-lg font-medium mb-4">Add Advertisement</div>
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Title</label
            >
            <input
              v-model="newAd.title"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Upload Image</label
            >
            <input
              type="file"
              @change="handleFileUploadAds"
              accept="image/*"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p v-if="newAd.image" class="text-sm text-gray-500 mt-2">
              {{ newAd.image.name }}
            </p>
          </div>

          <!-- URL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >URL</label
            >
            <input
              v-model="newAd.url"
              type="url"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4">
            <button
              @click="cancelCreateAd"
              class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              @click="createAd"
              :disabled="!newAd.title || !newAd.image || !newAd.url"
              class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500 disabled:opacity-50"
            >
              Add Advertisement
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Advertisement Modal -->
    <div
      v-if="editingIndex !== null"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-2/3 lg:w-1/2">
        <div class="text-lg font-medium mb-4">Edit Advertisement</div>
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Title</label
            >
            <input
              v-model="advertisements[editingIndex].title"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Upload Image</label
            >
            <input
              type="file"
              @change="handleFileUploadEdit"
              accept="image/*"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p
              v-if="advertisements[editingIndex].image"
              class="text-sm text-gray-500 mt-2"
            >
              {{ advertisements[editingIndex].image.name }}
            </p>
          </div>

          <!-- URL -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >URL</label
            >
            <input
              v-model="advertisements[editingIndex].url"
              type="url"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4">
            <button
              @click="cancelEditAd"
              class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              @click="saveAd"
              class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Page metadata
definePageMeta({
  title: "Main Page Management",
});

// Banner images state
const bannerImages = ref([
  // Example images
  { url: "https://example.com/image1.jpg" },
  { url: "https://example.com/image2.jpg" },
]);

// Reference for the hidden file input
const fileInput = ref(null);

// Trigger the hidden file input
const triggerFileUpload = () => {
  fileInput.value.click();
};

// Handle file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && bannerImages.value.length < 5) {
    const reader = new FileReader();
    reader.onload = (e) => {
      bannerImages.value.push({ url: e.target.result });
    };
    reader.readAsDataURL(file);
  } else if (bannerImages.value.length >= 5) {
    alert("You can only upload up to 5 images.");
  }
};

// Delete an image from the banner
const deleteImage = (index) => {
  bannerImages.value.splice(index, 1);
};

// Advertisements data
const advertisements = ref([
  {
    title: "Ad 1",
    image: { name: "ad1.jpg", url: "https://example.com/ad1.jpg" },
    url: "https://example.com",
    status: "active",
  },
  {
    title: "Ad 2",
    image: { name: "ad2.jpg", url: "https://example.com/ad2.jpg" },
    url: "https://example.com",
    status: "inactive",
  },
  {
    title: "Ad 2",
    image: { name: "ad2.jpg", url: "https://example.com/ad2.jpg" },
    url: "https://example.com",
    status: "inactive",
  },
]);

const showCreateAdModal = ref(false);
const newAd = ref({
  title: "",
  image: null,
  url: "",
  status: "inactive",
});
const editingIndex = ref(null);

// Handle file upload for new advertisement
const handleFileUploadAds = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    newAd.value.image = file;
  } else {
    alert("Please upload a valid image file.");
  }
};

// Handle file upload for editing advertisement
const handleFileUploadEdit = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    advertisements.value[editingIndex.value].image = file;
  } else {
    alert("Please upload a valid image file.");
  }
};

// Create a new advertisement
const createAd = () => {
  if (newAd.value.title && newAd.value.image && newAd.value.url) {
    advertisements.value.push({ ...newAd.value });
    newAd.value = { title: "", image: null, url: "", status: "inactive" };
    showCreateAdModal.value = false;
    alert("Advertisement added successfully!");
  }
};

// Edit an advertisement
const editAd = (index) => {
  editingIndex.value = index;
};

// Save changes to the edited advertisement
const saveAd = () => {
  editingIndex.value = null;
  alert("Advertisement updated successfully!");
};

// Delete an advertisement
const deleteAd = (index) => {
  advertisements.value.splice(index, 1);
  alert("Advertisement deleted successfully!");
};

// Toggle advertisement status (active/inactive)
const toggleAdStatus = (index) => {
  const activeAdsCount = advertisements.value.filter(
    (ad) => ad.status === "active"
  ).length;
  if (advertisements.value[index].status === "active") {
    advertisements.value[index].status = "inactive";
  } else if (activeAdsCount < 5) {
    advertisements.value[index].status = "active";
  } else {
    alert("You can only have 5 active advertisements at a time.");
  }
};

// Cancel advertisement creation
const cancelCreateAd = () => {
  newAd.value = { title: "", image: null, url: "", status: "inactive" };
  showCreateAdModal.value = false;
};

// Cancel advertisement editing
const cancelEditAd = () => {
  editingIndex.value = null;
};
</script>

<style scoped>
/* Add custom styles here */
</style>
