import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();

  // Validate every request to every page
  const { data: validateUser } = await useFetch("/api/auth/validate", {
    method: "GET",
  });

  // If user is not logged in, redirect to logout page
  if (validateUser.value.statusCode === 401) return true;

  // console.log("Role : ", userStore.roles);

  if (userStore.roles.includes("Superadmin"))
    return navigateTo("/admin/dashboard");

  if (userStore.roles.includes("Admin")) return navigateTo("/admin/dashboard");

  if (userStore.roles.includes("Seller")) return navigateTo("/admin/dashboard");
  else return navigateTo("/");
});
