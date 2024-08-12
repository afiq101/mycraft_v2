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

      <rs-table
        :data="ebooks"
        :options="{
          variant: 'default',
          striped: true,
          borderless: true,
        }"
        :options-advanced="{
          sortable: true,
          responsive: true,
          filterable: false,
        }"
        advanced
      >
        <template v-slot:file="data">
          <div>
            {{ data.value.file.name }}
          </div>
        </template>
        <template v-slot:actions="data">
          <div class="flex gap-2">
            <button
              @click="editEbook(data.value.actions)"
              class="text-blue-600 hover:text-blue-800"
            >
              <Icon name="material-symbols:edit-outline-rounded" size="20">
              </Icon>
            </button>
            <button
              @click="deleteEbook(data.value.actions)"
              class="text-red-600 hover:text-red-800"
            >
              <Icon
                name="material-symbols:delete-outline-rounded"
                size="20"
              ></Icon>
            </button>
          </div>
        </template>
      </rs-table>
    </div>

    <rs-modal
      v-model="showCreateEbookModal"
      title="Create eBook"
      size="lg"
      position="center"
    >
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

      <template #footer>
        <div></div>
      </template>
    </rs-modal>

    <rs-modal
      v-model="editingModal"
      title="Edit eBook"
      size="lg"
      position="center"
    >
      <div class="space-y-4">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"
            >Title</label
          >
          <input
            v-model="editingIndex.title"
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
            v-model="editingIndex.description"
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
          <p v-if="editingIndex.file" class="text-sm text-gray-500 mt-2">
            {{ editingIndex.file.name }}
          </p>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
          <button
            @click="(editingModal = false), cancelEditEbook"
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

      <template #footer>
        <div></div>
      </template>
    </rs-modal>
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
    actions: 1,
  },
  {
    title: "Advanced Crafting Techniques",
    description: "Take your crafting skills to the next level.",
    file: {
      name: "advanced_crafting.pdf",
      url: "https://example.com/advanced_crafting.pdf",
    },
    actions: 2,
  },
]);

const showCreateEbookModal = ref(false);
const newEbook = ref({
  title: "",
  description: "",
  file: null,
});
const editingIndex = ref(null);

const editingModal = ref(false);

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

// Method to edit an eBook
const editEbook = (data) => {
  const filtered = ebooks.value.filter((v) => v.actions == data);

  editingIndex.value = filtered[0];

  editingModal.value = true;
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
</script>

<style scoped>
/* Add custom styles here */
</style>
