<template>
  <div class="space-y-8">
    <div class="text-lg font-semibold">Customer service Management</div>

    <!-- First Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6">
      <!-- Summary Card #1 -->
      <rs-card>
        <div class="summary-1 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-primary/20 rounded-2xl"
          >
            <Icon class="text-primary" name="lets-icons:book-duotone"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 100</span>
            <span class="text-base font-semibold text-gray-500"
              >Total Complaint</span
            >
          </div>
        </div>
      </rs-card>
      <!-- Summary Card #2 -->
      <rs-card>
        <div class="summary-2 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-indigo-100 rounded-2xl"
          >
            <Icon class="text-indigo-500" name="icon-park:inbox-success"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 50</span>
            <span class="text-base font-semibold text-gray-500"
              >Total Completed</span
            >
          </div>
        </div>
      </rs-card>
      <!-- Summary Card #3 -->
      <rs-card>
        <div class="summary-3 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-orange-100 rounded-2xl"
          >
            <Icon
              class="text-orange-500"
              name="ic:round-pending-actions"
            ></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 20</span>
            <span class="text-base font-semibold text-gray-500"
              >Total In Process</span
            >
          </div>
        </div>
      </rs-card>
      <!-- Summary Card #4 -->
      <rs-card>
        <div class="summary-4 pt-5 pb-3 px-5 flex items-center gap-4">
          <div
            class="p-5 flex justify-center items-center bg-blue-100 rounded-2xl"
          >
            <Icon class="text-red-500" name="mdi:comment-processing"></Icon>
          </div>
          <div class="flex-1 truncate">
            <span class="block font-semibold text-xl leading-tight"> 20</span>
            <span class="text-base font-semibold text-gray-500"
              >Total Pending</span
            >
          </div>
        </div>
      </rs-card>
    </div>

    <!-- FILTER -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-x-6">
      <FormKit type="select" label="Status" :options="optionsStatusFilter" />

      <FormKit
        type="select"
        label="Assign To"
        :options="optionAssignToFilter"
      />

      <FormKit type="date" :value="sdate" label="Start Date" />

      <FormKit type="date" :value="edate" label="End Date" />
    </div>

    <!-- List of complaints -->
    <div class="pb-20">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div class="text-lg font-medium mb-4">List of Complaints</div>
        <div class="flex justify-end items-center mb-3 gap-5">
          <rs-button variant="primary" @click="showModal2 = true">
            <Icon name="solar:add-square-broken" class="mr-2" /> Add complaint
          </rs-button>
          <rs-modal
            title="Edit Complaint"
            v-model="showModal2"
            size="lg"
            cancel-title="Close"
            ok-title="Save"
          >
            <template v-slot:header>
              <!-- {{ editingComplaint ? 'Edit Complaint' : 'Add Complaint' }} -->
              Add Complaint
            </template>
            <template v-slot:body>
              <form @submit.prevent="submitComplaint">
                <FormKit type="text" label="Name" />

                <FormKit
                  type="textarea"
                  placeholder="Complaint Detail"
                  rows="5"
                  label="Complaint Details"
                />

                <FormKit type="select" label="Status" :options="options" />
              </form>
            </template>
          </rs-modal>
          <rs-button variant="info">
            Export Report
            <Icon name="ph:file-csv" class="ml-2" />
          </rs-button>
        </div>
        <rs-table
          :data="complaint"
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
          <template v-slot:status="complaint">
            <rs-badge
              :variant="
                complaint.text === 'Completed'
                  ? 'success'
                  : complaint.text == 'Processing'
                  ? 'warning'
                  : 'danger'
              "
            >
              {{ complaint.text }}
            </rs-badge>
          </template>
          <template #Action="complaint">
            <div class="flex items-center gap-4">
              <rs-button @click="showModal = true">
                <Icon
                  name="solar:pen-new-square-broken"
                  class="mr-2 !w-4 !h-4"
                />
                Edit
              </rs-button>
              <rs-modal
                title="Edit Complaint"
                v-model="showModal"
                size="lg"
                cancel-title="Close"
                ok-title="Update"
              >
                <template v-slot:header>
                  <!-- {{ editingComplaint ? 'Edit Complaint' : 'Add Complaint' }} -->
                  Edit Complaint
                </template>
                <template v-slot:body>
                  <form @submit.prevent="submitComplaint">
                    <FormKit type="text" label="Name" />

                    <FormKit
                      type="textarea"
                      placeholder="Complaint Detail"
                      rows="5"
                      label="Complaint Details"
                    />

                    <FormKit
                      type="select"
                      label="Assign To"
                      :options="optionAssignTo"
                    />

                    <FormKit
                      type="textarea"
                      placeholder="Notes"
                      rows="5"
                      label="Notes"
                    />

                    <FormKit type="select" label="Status" :options="options" />
                  </form>
                </template>
              </rs-modal>

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
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "Pengurusan Profil",
  
});

const showModal = ref(false);
const showModal2 = ref(false);

const options = ["Completed", "Processing", "Pending", "Cancel"];
const optionsStatusFilter = [
  "All",
  "Completed",
  "Processing",
  "Pending",
  "Cancel",
];

const optionAssignTo = ["Haqeem", "Lily", "Afiq"];
const optionAssignToFilter = ["All", "Haqeem", "Lily", "Afiq"];

const complaint = [
  {
    id: "#8b5404",
    fullName: "Andrej",
    // "email":"afoucar0@cocolog-nifty.com",
    complaint: "Package arrived late",
    status: "Processing",
    Action: "",
  },
  {
    id: "#144bba",
    fullName: "Glenna",
    // "email":"ghardcastle1@ovh.net",
    complaint: "Received damaged product",
    status: "Completed",
    Action: "",
  },
  {
    id: "#d0d0b6",
    fullName: "Ramona",
    // "email":"rfewkes2@home.pl",
    complaint: "	Rude behavior from support staff",
    status: "Pending",
    Action: "",
  },
  {
    id: "#2b1261",
    fullName: "Matias",
    // "email":"mdobbings3@flavors.me",
    complaint: "	Incorrect charge on credit card",
    status: "Pending",
    Action: "",
  },
  {
    id: "#b5bb69",
    fullName: "Kial",
    // "email":"kashtonhurst4@uiuc.edu",
    complaint: "	Package never arrived",
    status: "Pending",
    Action: "",
  },
  {
    id: "#a6b5af",
    fullName: "Hamish",
    // "email":"hlagrange5@pagesperso-orange.fr",
    complaint: "Wrong item received",
    status: "Completed",
    Action: "",
  },
  {
    id: "#495759",
    fullName: "Myrwyn",
    // "email":"mmcshane6@thetimes.co.uk",
    complaint: "Difficulty finding items on the website",
    status: "Completed",
    Action: "",
  },
  {
    id: "#26b5da",
    fullName: "Jami",
    // "email":"jlighten7@github.io",
    complaint: "Delay in processing refund",
    status: "Completed",
    Action: "",
  },
  {
    id: "#8f70b8",
    fullName: "Red",
    // "email":"rkinnear8@gizmodo.com",
    complaint: "Item doesn't match description",
    status: "Completed",
    Action: "",
  },
  {
    id: "#53d378",
    fullName: "Royal",
    // "email":"rcleeton9@nifty.com",
    complaint: "Item doesn't match description",
    status: "Completed",
    Action: "",
  },
  {
    id: "#a7b924",
    fullName: "Orly",
    // "email":"oratledgea@elegantthemes.com",
    complaint: "Item doesn't match description",
    status: "Completed",
    Action: "",
  },
  {
    id: "#bbfd6b",
    fullName: "Maddy",
    // "email":"mronnayb@unicef.org",
    complaint: "Package delivered to wrong addres",
    status: "Processing",
    Action: "",
  },
  {
    id: "#21dcb2",
    fullName: "Cob",
    // "email":"cwrightamc@wix.com",
    complaint: "Package delivered to wrong addres",
    status: "Processing",
    Action: "",
  },
  {
    id: "#bb8656",
    fullName: "Ynez",
    // "email":"ybrahamd@nbcnews.com",
    complaint: "Package delivered to wrong addres",
    status: "Processing",
    Action: "",
  },
];
</script>

<style lang="scss" scoped></style>
