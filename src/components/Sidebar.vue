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
        name: "หน้าแรก",
        icon: "bi bi-kanban-fill",
        url: "/app/dashboard",
      },
      {
        name: "จัดการข้อมูลลูกค้า",
        icon: "bi bi-person",
        url: "/app/customer",
      },
      {
        name: "จัดการข้อมูลพนักงาน",
        icon: "bi bi-receipt",
        url: "/app/EmployeeList",
      },
      {
        name: "จัดการข้อมูล User",
        icon: "bi bi-kanban-fill",
        url: "/app/user",
      },
      
      {
        name: "ใบสั่งซื้อวัสดุ (บัญชี)",
        icon: "bi bi-card-checklist",
        url: "/app/materialorderList",
      },      
      {
        name: "ผู้ใช้งานระบบ",
        icon: "bi bi-people",
        url: "/app/user",
      },
      {
          name: "โปรไฟล์",
        icon: "bi bi-person-lines-fill",
        url: "/app/profile",
      },
      {
        name: "ประเภทวัสดุ",
        icon: "bi bi-boxes",
        url: "/app/listCate",
      },
      {
        name: "วัสดุ",
        icon: "bi bi-box-seam-fill",
        url: "#",
      },
      {
        name: "จัดการคลังวัสดุ",
        icon: "bi bi-database",
        url: "#",
      },
      {
        name: "ข้อมูลพนักงาน (บัญชี)",
        icon: "bi bi-person-lines-fill",
        url: "/app/EmployeeList",
      },
      {
        name: "ข้อมูลการเงิน (บัญชี)",
        icon: "bi bi-cash-coin",
        url: "/app/FinancialList",
      },
      {
        name: "รายงานใบเสนอราคา (เจ้าของ)",
        icon: "bi bi-person-lines-fill",
        url: "",
      },
      {
        name: "รายงานใบสั่งซื้อ (เจ้าของ)",
        icon: "bi bi-person-lines-fill",
        url: "",
      },
      {
        name: "แดชบอร์ด (เจ้าของ)",
        icon: "bi bi-graph-up",
        url: "/app/dashboard",
      },
      {
        name: "รายงานเงินเดือน (เจ้าของ)",
        icon: "bi bi-newspaper",
        url: "/app/MonthlyEmployeeReport",
      },

      
      //ลูกค้า
      {
        name: "หน้าแรก (ลูกค้า)",
        icon: "bi bi-newspaper",
        url: "/app/Customer/CustomerProjectType",
      },
      {
        name: "ใบเสนอราคา (ลูกค้า)",
        icon: "bi bi-newspaper",
        url: "/app/Customer/CustomerQuotationList",
      },
      {
        name: "โครงการ (ลูกค้า)",
        icon: "bi bi-newspaper",
        url: "",
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
