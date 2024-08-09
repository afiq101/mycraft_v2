<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Digital Product Management</div>

    <!-- Create eBook Button -->
    <div class="flex justify-end">
      <button
        @click="showCreateEbookModal = true"
        class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
      >
        Create eBook
      </button>
    </div>

    <!-- eBook Listing Table -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="text-lg font-medium mb-4">eBook Listing</div>

      <!-- Search Bar -->
      <div class="mb-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search eBooks..."
          class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <!-- Table -->
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
                Description
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                File
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
            <tr v-for="(ebook, index) in paginatedEbooks" :key="index">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ ebook.title }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ ebook.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ ebook.file.name }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2"
              >
                <button
                  @click="editEbook(index)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  <Icon
                    name="material-symbols:edit-outline-rounded"
                    class="w-4 h-4"
                  />
                </button>
                <button
                  @click="deleteEbook(index)"
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

      <!-- Pagination Controls -->
      <div class="mt-4 flex justify-between items-center">
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Create eBook Modal -->
    <div
      v-if="showCreateEbookModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-2/3 lg:w-1/2">
        <div class="text-lg font-medium mb-4">Create eBook</div>
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Title</label
            >
            <input
              v-model="newEbook.title"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Description</label
            >
            <textarea
              v-model="newEbook.description"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            ></textarea>
          </div>

          <!-- File Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Upload PDF</label
            >
            <input
              type="file"
              @change="handleFileUpload"
              accept="application/pdf"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p v-if="newEbook.file" class="text-sm text-gray-500 mt-2">
              {{ newEbook.file.name }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4">
            <button
              @click="cancelCreateEbook"
              class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              @click="createEbook"
              :disabled="!newEbook.title || !newEbook.file"
              class="px-4 py-2 text-sm text-white bg-green-600 rounded-lg hover:bg-green-500 disabled:opacity-50"
            >
              Create eBook
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit eBook Modal -->
    <div
      v-if="editingIndex !== null"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-2/3 lg:w-1/2">
        <div class="text-lg font-medium mb-4">Edit eBook</div>
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Title</label
            >
            <input
              v-model="ebooks[editingIndex].title"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Description</label
            >
            <textarea
              v-model="ebooks[editingIndex].description"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              rows="4"
            ></textarea>
          </div>

          <!-- File Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Upload PDF</label
            >
            <input
              type="file"
              @change="handleFileUploadEdit"
              accept="application/pdf"
              class="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <p
              v-if="ebooks[editingIndex].file"
              class="text-sm text-gray-500 mt-2"
            >
              {{ ebooks[editingIndex].file.name }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-4">
            <button
              @click="cancelEditEbook"
              class="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              @click="saveEbook"
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
import { iconRegistry } from "@formkit/themes";
import { ref, computed } from "vue";

// Page metadata
definePageMeta({
  title: "Digital Product Management",
});

// eBook data
const ebooks = ref([
  {
    title: "Crafting 101",
    description: "A beginner's guide to crafting.",
    file: {
      name: "crafting101.pdf",
      url: "https://example.com/crafting101.pdf",
    },
  },
  {
    title: "Advanced Crafting Techniques",
    description: "Take your crafting skills to the next level.",
    file: {
      name: "advanced_crafting.pdf",
      url: "https://example.com/advanced_crafting.pdf",
    },
  },
]);

const showCreateEbookModal = ref(false);
const newEbook = ref({
  title: "",
  description: "",
  file: null,
});
const editingIndex = ref(null);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 5;

// Method to handle file upload for new eBook
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    newEbook.value.file = file;
  } else {
    alert("Please upload a valid PDF file.");
  }
};

// Method to create a new eBook
const createEbook = () => {
  if (newEbook.value.title && newEbook.value.file) {
    ebooks.value.push({ ...newEbook.value });
    newEbook.value = { title: "", description: "", file: null };
    showCreateEbookModal.value = false;
    alert("eBook created successfully!");
  }
};

// Method to handle file upload for editing eBook
const handleFileUploadEdit = (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    ebooks.value[editingIndex.value].file = file;
  } else {
    alert("Please upload a valid PDF file.");
  }
};

// Computed property for filtered and paginated eBooks
const filteredEbooks = computed(() => {
  return ebooks.value.filter((ebook) =>
    ebook.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredEbooks.value.length / itemsPerPage)
);

const paginatedEbooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredEbooks.value.slice(start, start + itemsPerPage);
});

// Method to edit an eBook
const editEbook = (index) => {
  editingIndex.value = index;
};

// Method to save the edited eBook
const saveEbook = () => {
  editingIndex.value = null;
  alert("eBook updated successfully!");
};

// Method to delete an eBook
const deleteEbook = (index) => {
  ebooks.value.splice(index, 1);
  alert("eBook deleted successfully!");
};

// Method to cancel the eBook creation
const cancelCreateEbook = () => {
  newEbook.value = { title: "", description: "", file: null };
  showCreateEbookModal.value = false;
};

// Method to cancel the eBook editing
const cancelEditEbook = () => {
  editingIndex.value = null;
};

// Pagination controls
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
</script>

<style scoped>
/* Add custom styles here */
</style>
