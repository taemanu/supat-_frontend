<style>
	.btn-equal-size {
		width: 90px;
	}
</style>
<template>

  <main class="content">
      <div class="container-fluid p-0 ">
        <div class="d-flex justify-content-between m-2" >
          <h1 class="h3 mb-4"><strong>โครงการลูกค้า</strong></h1>
          <!-- <router-link class="btn btn-success mt-2" to="/app/FormProject">
            <i class="bi bi-plus"></i>สร้างโครงการ
          </router-link> -->
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h1 class="h3 mb-4"><strong>โครงการลูกค้า</strong></h1>
    
          <div class="table-responsive mb-4">
            <table class="table table-bordered mb-0">
              <thead>
                <tr>
                  <th class="text-center">รหัสโครงการ</th>
                  <th class="text-center">ชื่อโครงการ</th>
                  <th class="text-center">ประเภท</th>
                  <th class="text-center">รหัสลูกค้า</th>
                  <th class="text-center">ชื่อ - นามสกุล</th>
                  <th class="text-center">สถานะ</th>
                  <th class="text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(list, index) in project_store.data_project_customer_list" :key="index" >
                    <td class="text-center">{{ list.project_code }}</td>
                    <td class="text-center">{{ list.project_name }}</td>
                    <td class="text-center">โรงรถ</td>
                    <td class="text-center">{{ list.customer_code }}</td>
                    <td class="text-center">{{ list.firstname }} {{ list.lastname }}</td>
                    <td class="text-center">

                      <span class="badge bg-info" v-if="list.status == 'qt_pending'">สร้างใบเสนอราคา</span>

                      <span class="badge bg-warning text-dark" v-if="list.status == 'qt_approve'">ส่งใบเสนอราคา</span>

                      <span class="badge bg-success" v-if="list.status == 'qt_success'">ยืนยันใบเสนอราคา</span>
  
                    </td>
                    <td class="text-center">

                        <button
                          type="button"
                          class="btn btn-info m-1 btn-equal-size"
                          data-bs-toggle="modal"
                          data-bs-target="#viewUser"
                        >
                          <i class="bi bi-eye"></i>
                          ดูข้อมูล
                        </button>


                        <router-link  class="btn btn-primary m-1 btn-equal-size" :to="{ path: '/app/Quotation/Create', query: { id: list.id , qt_id:list.qt_id } }" >
                          <i class="bi bi-pencil-square"></i>
                          ใบเสนอราคา
                        </router-link>
                        <!-- <button  class="btn btn-primary m-1 btn-equal-size">
                          <i class="bi bi-pencil-square"></i>
                          ใบเสนอราคา
                        </button> -->
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
    

        </div>
      </div>





  </main>

</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { userAuthStore } from "@/stores/models/userAuthStore";
import { ProjectStore } from "@/stores/models/ProjectStore";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const project_store = ProjectStore();
const router = useRouter();


const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

onMounted(async () => {
    await project_store.getDataProjectCustomerList();
});







</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.table th,
.table td {
  vertical-align: middle;
}
.table td {
  white-space: nowrap;
}
</style>
