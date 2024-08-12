<script setup>
definePageMeta({
  title: "My Bookings",
  layout: "default",
});

const activeTab = ref("All");
const searchQuery = ref("");

const bookings = ref([
  {
    id: 1,
    name: "Festival Kraf Johor",
    description:
      "The Malaysia Craft Festival is a celebration of the art of crafting in Malaysia. This event serves as a platform for local artisans to display their products and skills. Join us for three days of workshops, live demonstrations, and craft exhibitions.",
    images: [
      "https://scontent-kul2-1.xx.fbcdn.net/v/t39.30808-6/412912139_753856876776237_3204920442490185521_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFAF8yZc6oOxQdorBBECs56Drqil-KEZDcOuqKX4oRkNzqhbCuJpsbpqzSxYy6Te6XZj2SevOvD3ad5q8Hi1qcV&_nc_ohc=_zSuOt9zllUQ7kNvgHqDkYF&_nc_ht=scontent-kul2-1.xx&oh=00_AYADwiFHuh_fPEOdKyP_LCVgix6SwluR19sZUYkJEWZnPA&oe=66BF4D27",
    ],
    dateRange: "1st - 3rd October 2024",
    timeRange: "10:00 AM - 10:00 PM",
    venue: "Padang Akasia, Angsana Johor Bahru Mall",
    location: "Johor Bahru, Johor",
    price: 0,
    status: "Confirmed",
    registrationDeadline: "2024-10-01",
    contact: "012-3456789",
    expanded: false,
  },
  // Add more bookings as needed
]);

const filteredBookings = computed(() => {
  return bookings.value.filter((booking) => {
    const matchesSearch =
      searchQuery.value === "" ||
      booking.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesTab =
      activeTab.value === "All" || booking.status === activeTab.value;
    return matchesSearch && matchesTab;
  });
});

const toggleBookingExpansion = (bookingId) => {
  const booking = bookings.value.find((b) => b.id === bookingId);
  if (booking) {
    booking.expanded = !booking.expanded;
  }
};
</script>

<template>
  <div class="bg-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <rs-card>
        <template #body>
          <h1 class="text-2xl font-bold text-gray-900 mb-4 pt-4">My Purchases</h1>

          <rs-tab>
            <rs-tab-item
              title="All"
              :active="activeTab === 'All'"
              @click="activeTab = 'All'"
            >
              <!-- Content for All tab -->
            </rs-tab-item>
            <rs-tab-item
              title="Confirmed"
              :active="activeTab === 'Confirmed'"
              @click="activeTab = 'Confirmed'"
            >
              <!-- Content for Confirmed tab -->
            </rs-tab-item>
            <rs-tab-item
              title="Pending Payment"
              :active="activeTab === 'Pending Payment'"
              @click="activeTab = 'Pending Payment'"
            >
              <!-- Content for Pending Payment tab -->
            </rs-tab-item>
            <rs-tab-item
              title="Completed"
              :active="activeTab === 'Completed'"
              @click="activeTab = 'Completed'"
            >
              <!-- Content for Completed tab -->
            </rs-tab-item>
          </rs-tab>

          <div class="my-4">
            <FormKit
              type="text"
              v-model="searchQuery"
              placeholder="Search by Event Name or Location"
              :prefix-icon="'mdi:magnify'"
            />
          </div>

          <div
            v-for="booking in filteredBookings"
            :key="booking.id"
            class="border rounded-lg mb-4 shadow-sm overflow-hidden"
          >
            <div
              @click="toggleBookingExpansion(booking.id)"
              class="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            >
              <div>
                <h3 class="font-semibold text-lg">{{ booking.name }}</h3>
                <p class="text-sm text-gray-500">
                  {{ booking.dateRange }} | {{ booking.timeRange }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ booking.venue }}, {{ booking.location }}
                </p>
              </div>
              <div class="text-right">
                <p
                  :class="{
                    'text-blue-500': booking.status === 'Confirmed',
                    'text-green-500': booking.status === 'Completed',
                    'text-orange-500': booking.status === 'Pending Payment',
                  }"
                  class="font-semibold"
                >
                  {{ booking.status }}
                </p>
              </div>
            </div>

            <div v-if="booking.expanded" class="p-4 bg-white">
              <img
                :src="booking.images[0]"
                alt="Event Image"
                class="mb-2 w-full object-cover rounded"
              />
              <p class="mb-2 text-gray-700">{{ booking.description }}</p>
              <div class="mt-4">
                <p>
                  <strong>Registration Deadline:</strong>
                  {{ booking.registrationDeadline }}
                </p>
                <p><strong>Contact:</strong> {{ booking.contact }}</p>
                <p>
                  <strong>Price:</strong>
                  {{
                    booking.price > 0
                      ? `RM ${booking.price.toFixed(2)}`
                      : "Free"
                  }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </rs-card>
    </div>
  </div>
</template>
