<script setup>
  definePageMeta({
    title: "Product Care",
  });

  const { $swal } = useNuxtApp();

  const data = [
    {
      id: 1,
      name: "Product Care 1",
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "Product Care 2",
      status: "ACTIVE"
    },
    {
      id: 3,
      name: "Product Care 3",
      status: "ACTIVE"
    },
  ];

  // Add Form
  const form = reactive({
    name: "",
  });
  const showModalAdd = ref(false);

  // Edit Form
  const formEdit = reactive({
    id: "",
    name: "",
  });
  const showModalEdit = ref(false);

  const openModalEdit = (data) => {
    formEdit.id = data.id;
    formEdit.name = data.name;

    showModalEdit.value = true;
  };

  const updateStatus = async (id, event) => {
    try {
      $swal
        .fire({
          title: "Are you sure to update this status?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#1D1E22",
          cancelButtonColor: "#d33",
          confirmButtonText: "Proceed",
        })
    } catch (error) {
      console.log(error);
      event.target.checked = !event.target.checked;
    }
  };
  
  const deleteWarning = async (id) => {
    try {
      $swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel!",
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
        })
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <div class="mb-10">
    <h4>Product Care</h4>
  </div>
  
  <rs-card>
    <template #header>
      <div class="flex justify-between items-center">
        Product Care List
        <rs-button @click="showModalAdd = !showModalAdd">
          <Icon name="solar:add-square-broken" class="mr-2" />
          Add Product Care
        </rs-button>
      </div>
    </template>
    <template #body>
      <rs-table v-if="data"
        :data="data"
        :key="data"
        :field="[
          'Id',
          'Product Care',
          'Status',
          'Action',
        ]"
        advanced
      >
        <template #Status="data">
          <div class="flex items-center gap-4">
            <div>
              <rs-badge v-if="data.value.status === 'ACTIVE'" variant="success">
                {{ data.value.status }}
              </rs-badge>
              <rs-badge v-else variant="danger">
                {{ data.value.status }}
              </rs-badge>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input v-if="data.value.status !== 'INACTIVE'"
                type="checkbox"
                @change="updateStatus(data.value.status, $event)"
                class="sr-only peer"
                :checked="data.value.status == 'ACTIVE' ? true : false"
              />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
              <span
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
              </span>
            </label>
          </div>
        </template>
        <template #Action="data">
          <div class="flex items-center gap-4">
            <rs-button @click="openModalEdit(data.value)">
              <Icon
                name="solar:pen-new-square-broken"
                class="mr-2 !w-4 !h-4"
              />
              Edit
            </rs-button>

            <!-- <rs-button
              @click="deleteWarning(data.value.action.categoryID)"
              variant="primary-outline"
            >
              <Icon name="solar:trash-bin-2-broken" class="mr-2 !w-4 !h-4" />
              Delete
            </rs-button> -->
          </div>
        </template>
      </rs-table>
      <div v-else>
        <div class="text-center text-gray-500 font-semibold">
          No data available.
        </div>
      </div>
    </template>
  </rs-card>

  <rs-modal v-model="showModalAdd" title="Add Product Care">
    <template #body>
      <FormKit type="form">
        <FormKit 
          v-model="form.name" 
          type="text" 
          label="Product Care" 
        />
      </FormKit>
    </template>
    <template #footer> </template>
  </rs-modal>

  <rs-modal v-model="showModalEdit" title="Edit Product Care">
    <template #body>
      <FormKit type="form">
        <FormKit 
          v-model="formEdit.name" 
          type="text" 
          label="Product Care" 
        />
      </FormKit>
    </template>
    <template #footer> </template>
  </rs-modal>
</template>

<style lang="scss" scoped></style>