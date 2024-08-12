<script setup>
const currentYear = new Date().getFullYear();

const footerSections = [
  {
    title: "Shop",
    links: [
      { name: "New Arrivals", url: "/new-arrivals" },
      { name: "Best Sellers", url: "/best-sellers" },
      { name: "Sale", url: "/sale" },
      { name: "Categories", url: "/categories" },
      { name: "Gift Cards", url: "/gift-cards" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { name: "Contact Us", url: "/contact" },
      { name: "FAQs", url: "/faqs" },
      { name: "Shipping & Returns", url: "/shipping-returns" },
      { name: "Size Guide", url: "/size-guide" },
      { name: "Order Tracking", url: "/order-tracking" },
    ],
  },
  {
    title: "About Us",
    links: [
      { name: "Our Story", url: "/our-story" },
      { name: "Blog", url: "/blog" },
      { name: "Careers", url: "/careers" },
      { name: "Press", url: "/press" },
      { name: "Sustainability", url: "/sustainability" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Terms of Service", url: "/terms" },
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Cookie Policy", url: "/cookie-policy" },
      { name: "Accessibility", url: "/accessibility" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", icon: "mdi:facebook", url: "#" },
  { name: "Instagram", icon: "mdi:instagram", url: "#" },
  { name: "Twitter", icon: "mdi:twitter", url: "#" },
  { name: "Pinterest", icon: "mdi:pinterest", url: "#" },
  { name: "YouTube", icon: "mdi:youtube", url: "#" },
];

const newsletterEmail = ref("");

const subscribeToNewsletter = () => {
  // Implement newsletter subscription logic here
  console.log("Subscribing email:", newsletterEmail.value);
  // Reset the input after submission
  newsletterEmail.value = "";
};
</script>

<template>
  <footer
    class="bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t-2 border-primary"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Newsletter Subscription -->
      <div class="mb-12 bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-2xl font-bold mb-2">Join our newsletter</h3>
        <p class="text-gray-600 mb-4">
          Stay updated with our latest offers and products. No spam, we promise!
        </p>
        <form @submit.prevent="subscribeToNewsletter" class="flex">
          <FormKit
            type="email"
            name="email"
            placeholder="Enter your email"
            v-model="newsletterEmail"
            :classes="{
              outer: 'flex-grow mr-2',
              input:
                'w-full px-4 py-2 rounded-l-md border-gray-300 focus:border-purple-500 focus:ring-purple-500',
            }"
          />
          <rs-button
            type="submit"
            class="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-r-md"
          >
            Subscribe
          </rs-button>
        </form>
      </div>

      <!-- Footer Links -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div v-for="section in footerSections" :key="section.title">
          <h4 class="text-lg font-semibold text-gray-900 mb-4">
            {{ section.title }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in section.links" :key="link.name">
              <a :href="link.url" class="text-gray-600 hover:text-purple-700">{{
                link.name
              }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div
        class="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div class="mb-4 md:mb-0">
          <img
            src="@/assets/img/logo/mycraffshop_logo.png"
            alt="Your Store Logo"
            class="h-8 w-auto"
          />
          <p class="text-sm text-gray-500 mt-2">
            Bringing you the best in online shopping since 2024.
          </p>
        </div>
        <div class="flex space-x-4">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            class="text-gray-400 hover:text-purple-700"
          >
            <Icon :name="social.icon" size="24" />
          </a>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-8 text-center text-sm text-gray-500">
        © {{ currentYear }} Your E-commerce Store. All rights reserved.
      </div>
    </div>
  </footer>
</template>
