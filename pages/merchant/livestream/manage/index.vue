<script setup>
definePageMeta({
  title: "Livestream Management",
  layout: "default",
});

import { ref } from 'vue';

const activeTab = ref('Videos');
const showScheduleModal = ref(false);
const newStream = ref({
  name: '',
  date: '',
  duration: '',
  picture: null
});

const streams = ref([
  {
    id: 1,
    thumbnail: "https://picsum.photos/seed/stream1/300/200",
    title: "Summer Fashion Showcase 2024",
    description: "Explore the latest summer fashion trends for 2024",
    visibility: "Unlisted",
    restrictions: "None",
    date: "2024-06-15",
    views: 1500,
    comments: 45,
    likes: 120,
    duration: "1:30:00"
  },
  {
    id: 2,
    thumbnail: "https://picsum.photos/seed/stream2/300/200",
    title: "New Product Launch: Smart Home Devices",
    description: "Introducing our latest line of smart home devices",
    visibility: "Public",
    restrictions: "None",
    date: "2024-06-20",
    views: 3000,
    comments: 120,
    likes: 500,
    duration: "2:00:00"
  },
  // Add more dummy data as needed
]);

const scheduleStream = () => {
  // Logic to schedule the stream
  streams.value.push({
    id: streams.value.length + 1,
    title: newStream.value.name,
    description: "New scheduled stream",
    visibility: "Unlisted",
    restrictions: "None",
    date: newStream.value.date,
    views: 0,
    comments: 0,
    likes: 0,
    duration: newStream.value.duration
  });
  showScheduleModal.value = false;
  newStream.value = { name: '', date: '', duration: '', picture: null };
};

const handleFileUpload = (event) => {
  newStream.value.picture = event.target.files[0];
};
</script>

<template>
  <div class="w-full max-w-[1920px] mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Livestream Management</h1>

    <rs-tab>
      <rs-tab-item title="Upcoming Livestream" :active="activeTab === 'Videos'" @click="activeTab = 'Upcoming Livestream'">
        <div class="py-4">
          <div class="flex justify-between items-center mb-4">
            <rs-button variant="secondary">
              <Icon name="ic:baseline-filter-list" class="mr-2" />
              Filter
            </rs-button>
            <rs-button @click="showScheduleModal = true">Schedule Stream</rs-button>
          </div>

          <rs-table
            :data="streams"
            :field="['Video', 'Visibility', 'Restrictions', 'Date', 'Views', 'Comments', 'Likes','Action']"
            advanced>
             <template #Video>
               <img src="https://picsum.photos/seed/buds/300/200"  />
             </template>
             <template #Visibility>
              {{ streams[1].visibility }}
             </template>
             <template #Restrictions>
              {{ streams[1].restrictions }}
             </template>
             <template #Date>
              {{ streams[1].date }}
             </template>
             <template #Views>
              {{ streams[1].views }}
             </template>
             <template #Comments>
              {{ streams[1].comments }}
             </template>
             <template #Likes>
              {{ streams[1].likes }}
             </template>
             <template #Action>
              <rs-button class="p-1">
              <Icon name="material-symbols:multimodal-hand-eye-sharp"/>
            </rs-button>
            <br>
            <rs-button class="p-1">
              <Icon name="material-symbols:comment-outline-rounded"/>
            </rs-button>
             </template>
          </rs-table>
        </div>
      </rs-tab-item>
      <rs-tab-item title="Past Livestream" :active="activeTab === 'Videos'" @click="activeTab = 'Past Livestream'">
        <div class="py-4">
          <div class="flex justify-between items-center mb-4">
            <rs-button variant="secondary">
              <Icon name="ic:baseline-filter-list" class="mr-2" />
              Filter
            </rs-button>
          </div>

          <rs-table
            :data="streams"
            :field="['Video', 'Visibility', 'Restrictions', 'Date', 'Views', 'Comments', 'Likes','Action']"
            advanced>
             <template #Video>
               <img src="https://picsum.photos/seed/buds/300/200"  />
             </template>
             <template #Visibility>
              {{ streams[1].visibility }}
             </template>
             <template #Restrictions>
              {{ streams[1].restrictions }}
             </template>
             <template #Date>
              {{ streams[1].date }}
             </template>
             <template #Views>
              {{ streams[1].views }}
             </template>
             <template #Comments>
              {{ streams[1].comments }}
             </template>
             <template #Likes>
              {{ streams[1].likes }}
             </template>
             <template #Action>
              <rs-button class="p-1">
              <Icon name="material-symbols:multimodal-hand-eye-sharp"/>
            </rs-button>
            <br>
            <rs-button class="p-1">
              <Icon name="material-symbols:comment-outline-rounded"/>
            </rs-button>
             </template>
          </rs-table>
        </div>
      </rs-tab-item>
    </rs-tab>

    <rs-modal v-model="showScheduleModal" title="Schedule New Stream">
      <template #body>
        <FormKit
            type="text"
            name="name"
            label="Stream Name"
            validation="required"
            v-model="newStream.name"
          />
          <FormKit
            type="date"
            name="date"
            label="Date"
            validation="required"
            v-model="newStream.date"
          />
          <FormKit
            type="text"
            name="duration"
            label="Duration (HH:MM)"
            validation="required|matches:/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/"
            validation-messages="{
              matches: 'Please enter a valid time format (HH:MM)'
            }"
            v-model="newStream.duration"
          />
          <FormKit
            type="file"
            label="Stream Thumbnail"
            accept="image/*"
            @change="handleFileUpload"
          />
      </template>
      <template #footer>
        <rs-button variant="secondary" @click="showScheduleModal = false">Cancel</rs-button>
        <rs-button variant="primary" @click="scheduleStream">Schedule</rs-button>
      </template>
    </rs-modal>
  </div>
</template>