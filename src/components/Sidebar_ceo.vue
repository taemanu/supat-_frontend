<template>
  <nav id="sidebar" class="sidebar js-sidebar">
    <div class="sidebar-content js-simplebar">
      <router-link
        class="sidebar-brand"
        to="/app/dashboard"
        style="text-align: center"
        @click="resetMenu(0)"
      >
        <small class="align-middle"
          >ระบบสารสนเทศบริหารจัดการข้อมูลของผู้รับเหมาก่อสร้าง</small
        >
      </router-link>
      <hr />
      <ul class="sidebar-nav">
        <div v-for="(item, key) in menu" :key="key">
          <li class="sidebar-item" :id="'menu' + key" @click="resetMenu(key)">
            <router-link class="sidebar-link" :to="item.url">
              <i :class="item.icon"></i>
              <span class="align-middle">{{ item.name }}</span>
            </router-link>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<style></style>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const route = useRouter();
    // const currentPath = ref(route.currentRoute.value.path);
    const menu = [
      {
        name: "แดชบอร์ด",
        icon: "bi bi-person",
        url: "/app/dashboard",
      },
      {
        name: "ข้อมูลโครงการ",
        icon: "bi bi-receipt",
        url: "/app/ProjectList",
      },
      {
        name: "รายงานการเงิน",
        icon: "bi bi-kanban-fill",
        url: "/app/MonthlyEmployeeReport",
      },
              
    ];
    function resetMenu(key) {
      let el = document.querySelectorAll(".sidebar-item");
      el.forEach(function (item, key) {
        item.classList.remove("active");
      });
      document.getElementById("menu" + key).classList.add("active");
    }

    return { menu, resetMenu };
  },
};
</script>
