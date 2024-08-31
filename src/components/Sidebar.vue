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
        name: "ข้อมูลลูกค้า",
        icon: "bi bi-person",
        url: "/app/customer",
      },
      {
        name: "ใบเสนอราคา",
        icon: "bi bi-receipt",
        url: "/app/Quotation",
      },
      {
        name: "โครงการ",
        icon: "bi bi-kanban-fill",
        url: "/app/ProjectList",
      },
      {
        name: "ใบสั่งซื้อวัสดุ",
        icon: "bi bi-card-checklist",
        url: "/app/materialorderList",
      },      
      // {
      //   name: "ผู้ใช้งานระบบ",
      //   icon: "bi bi-people",
      //   url: "/app/user",
      // },
      // {
        //   name: "โปรไฟล์",
      //   icon: "bi bi-person-lines-fill",
      //   url: "/app/profile",
      // },
      // {
      //   name: "ประเภทวัสดุ",
      //   icon: "bi bi-boxes",
      //   url: "/app/listCate",
      // },
      // {
      //   name: "วัสดุ",
      //   icon: "bi bi-box-seam-fill",
      //   url: "#",
      // },
      // {
      //   name: "จัดการคลังวัสดุ",
      //   icon: "bi bi-database",
      //   url: "#",
      // },
      {
        name: "ข้อมูลพนักงาน",
        icon: "bi bi-person-lines-fill",
        url: "/app/EmployeeList",
      },
      {
        name: "ข้อมูลการเงิน",
        icon: "bi bi-cash-coin",
        url: "/app/FinancialList",
      },
      {
        name: "รายงานใบเสนอราคา",
        icon: "bi bi-person-lines-fill",
        url: "",
      },
      {
        name: "รายงานใบสั่งซื้อ",
        icon: "bi bi-person-lines-fill",
        url: "",
      },
      {
        name: "แดชบอร์ด",
        icon: "bi bi-graph-up",
        url: "/app/dashboard",
      },
      {
        name: "รายงานเงินเดือน",
        icon: "bi bi-newspaper",
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
