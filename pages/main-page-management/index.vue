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
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                URL
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
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
                  :class="
                    ad.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  "
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
                  :class="
                    ad.status === 'active' ? 'text-green-800' : 'text-gray-800'
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
                    size="20"
                  />
                </button>
                <button
                  @click="deleteAd(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <Icon
                    name="material-symbols:delete-outline-rounded"
                    size="20"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Highlighted Product Section -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="flex justify-between items-center mb-4">
        <div class="text-lg font-medium">Highlighted Products</div>
        <button
          @click="showCreateProductModal = true"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
        >
          Add Highlighted Product
        </button>
      </div>

      <!-- Highlighted Product Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(product, index) in highlightedProducts" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ product.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="product.image.url"
                  alt="Product Image"
                  class="w-16 h-16 object-cover rounded-lg shadow-md"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <button @click="changePriority(index, 'up')">↑</button>
                <button @click="changePriority(index, 'down')">↓</button>
                {{ product.priority }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="deleteProduct(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <Icon
                    name="material-symbols:delete-outline-rounded"
                    size="20"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modals -->
    <rs-modal
      v-model="showCreateAdModal"
      position="center"
      title="Add Advertisement"
    >
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
    </rs-modal>

    <!-- Edit Advertisement Modal -->
    <rs-modal
      v-model="editingAdsModal"
      title="Edit Advertisement"
      position="center"
    >
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
            @click="(editingAdsModal = false), cancelEditAd"
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

      <template #footer>
        <div></div>
      </template>
    </rs-modal>

    <!-- Create Highlighted Product Modal -->
    <rs-modal
      v-model="showCreateProductModal"
      position="center"
      title="Add Highlighted Product"
    >
      <div class="space-y-4">
        <!-- Product Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Product Name</label
          >
          <input
            v-model="newProduct.name"
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
            @change="handleFileUploadProduct"
            accept="image/*"
            class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <p v-if="newProduct.image" class="text-sm text-gray-500 mt-2">
            {{ newProduct.image.name }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelCreateProduct"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="createProduct"
            :disabled="!newProduct.name || !newProduct.image"
            class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500 disabled:opacity-50"
          >
            Add Product
          </button>
        </div>
      </div>
    </rs-modal>

    <!-- Edit Highlighted Product Modal -->
    <rs-modal
      v-model="editingProductsModal"
      title="Edit Highlighted Product"
      position="center"
    >
      <div class="space-y-4">
        <!-- Product Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Product Name</label
          >
          <input
            v-model="highlightedProducts[editingIndex].name"
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
            v-if="highlightedProducts[editingIndex].image"
            class="text-sm text-gray-500 mt-2"
          >
            {{ highlightedProducts[editingIndex].image.name }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelEditProduct"
            class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            @click="saveProduct"
            class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </rs-modal>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Page metadata
definePageMeta({
  title: "Main Page Management",
});

// Banner images state
const bannerImages = ref([]);

// Reference for the hidden file input
const fileInput = ref(null);

// Trigger the hidden file input
const triggerFileUpload = () => {
  fileInput.value.click();
};

// Handle file upload for banner images
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
]);

// Modals and form state
const showCreateAdModal = ref(false);
const editingAdsModal = ref(false);
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
  editingAdsModal.value = true;
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

// Highlighted products data
const highlightedProducts = ref([
  {
    name: "Product 1",
    image: { name: "product1.jpg", url: "https://example.com/product1.jpg" },
    priority: 1,
  },
  {
    name: "Product 2",
    image: { name: "product2.jpg", url: "https://example.com/product2.jpg" },
    priority: 2,
  },
]);

// Modals and form state
const showCreateProductModal = ref(false);
const editingProductsModal = ref(false);
const newProduct = ref({
  name: "",
  image: null,
  priority: 0,
});

// Handle file upload for new highlighted product
const handleFileUploadProduct = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    newProduct.value.image = file;
  } else {
    alert("Please upload a valid image file.");
  }
};

// Create a new highlighted product
const createProduct = () => {
  if (newProduct.value.name && newProduct.value.image) {
    highlightedProducts.value.push({ ...newProduct.value });
    newProduct.value = {
      name: "",
      image: null,
      priority: highlightedProducts.value.length + 1,
    };
    showCreateProductModal.value = false;
    alert("Highlighted product added successfully!");
  }
};

// Edit a highlighted product
const editProduct = (index) => {
  editingProductsModal.value = true;
  editingIndex.value = index;
};

// Save changes to the edited highlighted product
const saveProduct = () => {
  editingProductsModal.value = false;
  alert("Highlighted product updated successfully!");
};

// Delete a highlighted product
const deleteProduct = (index) => {
  highlightedProducts.value.splice(index, 1);
  highlightedProducts.value.forEach((product, i) => (product.priority = i + 1));
  alert("Highlighted product deleted successfully!");
};

// Increase or decrease product priority
const changePriority = (index, direction) => {
  if (direction === "up" && index > 0) {
    [highlightedProducts.value[index], highlightedProducts.value[index - 1]] = [
      highlightedProducts.value[index - 1],
      highlightedProducts.value[index],
    ];
  } else if (
    direction === "down" &&
    index < highlightedProducts.value.length - 1
  ) {
    [highlightedProducts.value[index], highlightedProducts.value[index + 1]] = [
      highlightedProducts.value[index + 1],
      highlightedProducts.value[index],
    ];
  }
  highlightedProducts.value.forEach((product, i) => (product.priority = i + 1));
};

// Cancel highlighted product creation
const cancelCreateProduct = () => {
  newProduct.value = {
    name: "",
    image: null,
    priority: highlightedProducts.value.length + 1,
  };
  showCreateProductModal.value = false;
};

// Cancel highlighted product editing
const cancelEditProduct = () => {
  editingIndex.value = null;
};
</script>

<style scoped>
/* Add custom styles here */
</style>
