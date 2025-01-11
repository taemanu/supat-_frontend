<template>
  <div class="wrapper">
    <component :is="getSidebarComponent(role)" v-if="role" />
    <div class="main">
      <NavbarVue />
      <router-view></router-view>
      <FooterVue />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { userAuthStore } from "@/stores/models/userAuthStore";
import FooterVue from "../../components/Footer.vue";
import NavbarVue from "../../components/Navbar.vue";

import SidebarVue from "../../components/Sidebar.vue";
import SidebarVueManager from "../../components/Sidebar_manager.vue";
import SidebarVueAccount from "../../components/Sidebar_account.vue";
import SidebarVueCeo from "../../components/Sidebar_ceo.vue";
import SidebarVueCustomer from "../../components/Sidebar_customer.vue";

const router = useRouter();
const store_auth = userAuthStore();

const role = ref("");

onMounted(() => {
  // ตั้งค่า role จาก localStorage
  role.value = localStorage.getItem("permissions");

  // Redirect ไปที่ dashboard หาก sidebarActive เป็น "dashboard"
  const sidebarActive = ref("dashboard");
  if (sidebarActive.value === "dashboard") {
    document.getElementById("menu0")?.classList.add("active");
    router.push("/app/dashboard");
  }
});

// ฟังก์ชันสำหรับเลือก Sidebar Component
const getSidebarComponent = (role) => {
  const sidebarComponents = {
    super_admin: SidebarVue,
    manager: SidebarVueManager,
    account: SidebarVueAccount,
    ceo: SidebarVueCeo,
    customer: SidebarVueCustomer,
  };
  return sidebarComponents[role] || null; // คืนค่า Component ตาม role
};
</script>