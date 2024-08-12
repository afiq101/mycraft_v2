<script setup>
import events from "../../data/events";

definePageMeta({
  title: "Event Detail",
});

const route = useRoute();

const event = events.find((p) => p.id == route.query.id);

const remainingTime = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

const updateCountdown = () => {
  const now = new Date();
  const deadline = new Date(event.registrationDeadline);
  const difference = deadline - now;

  if (difference > 0) {
    remainingTime.value = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    remainingTime.value = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
};

const addToCart = () => {
  // Add to cart logic here
  alert("Event added to cart!");
};

let countdownInterval;

onMounted(() => {
  updateCountdown(); // Initial update
  countdownInterval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>

<template>
  <div>
    <rs-card class="py-5">
      <template #header>
        <h2 class="text-2xl font-bold mb-4">{{ event.name }}</h2>
      </template>
      <template #body>
        <div
          class="flex flex-col md:flex-row items-start justify-center my-4 px-5"
        >
          <div class="w-full md:w-1/2 mb-6 md:mb-0 md:mr-6">
            <img
              :src="event.images[0]"
              :alt="event.name"
              class="w-full rounded-lg shadow-lg"
            />
          </div>
          <div class="w-full md:w-1/2">
            <p class="text-lg mb-4">{{ event.description }}</p>
            <div class="mb-4">
              <h3 class="font-semibold">Date:</h3>
              <p>{{ event.dateRange }}</p>
            </div>
            <div class="mb-4">
              <h3 class="font-semibold">Time:</h3>
              <p>{{ event.timeRange }}</p>
            </div>
            <div class="mb-4">
              <h3 class="font-semibold">Venue:</h3>
              <p>{{ event.venue }}</p>
            </div>
            <div class="mb-4">
              <h3 class="font-semibold">Location:</h3>
              <p>{{ event.location }}</p>
            </div>
            <div class="mb-4">
              <h3 class="font-semibold">Price:</h3>
              <p>
                {{ event.price === 0 ? "Free" : `RM${event.price.toFixed(2)}` }}
              </p>
            </div>
            <div class="mb-6">
              <h3 class="font-semibold">Registration Deadline:</h3>
              <p>{{ event.registrationDeadline }}</p>
            </div>
            <div class="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 class="font-semibold mb-2">Time Left to Register:</h3>
              <div class="flex justify-between">
                <div class="text-center">
                  <span class="text-2xl font-bold">{{
                    remainingTime.days
                  }}</span>
                  <p>Days</p>
                </div>
                <div class="text-center">
                  <span class="text-2xl font-bold">{{
                    remainingTime.hours
                  }}</span>
                  <p>Hours</p>
                </div>
                <div class="text-center">
                  <span class="text-2xl font-bold">{{
                    remainingTime.minutes
                  }}</span>
                  <p>Minutes</p>
                </div>
                <div class="text-center">
                  <span class="text-2xl font-bold">{{
                    remainingTime.seconds
                  }}</span>
                  <p>Seconds</p>
                </div>
              </div>
            </div>
            <rs-button @click="addToCart" class="w-full">
              <Icon class="mr-2" name="ph:ticket"></Icon>
              <span class="text-white">Add to Cart</span>
            </rs-button>
          </div>
        </div>
      </template>
    </rs-card>
  </div>
</template>
