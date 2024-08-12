<script setup>


definePageMeta({
  title: "Logout",
  layout: "empty",
});

import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

await useFetch("/api/auth/logout", {
  method: "GET",
});

if (process.client) {
  userStore.setUsername("");
  userStore.setRoles([]);
  userStore.setIsAuthenticated(false);

  navigateTo("/login");
}
</script>

<template>
  <div>
    <h1>Logout</h1>
  </div>
</template>
