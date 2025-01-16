<style>
.btn-equal-size {
  width: 150px;
}
</style>
<template>
  <main class="content">

    <div class="container-fluid p-0">
      <div class="d-flex justify-content-between m-2">
        <h1 class="h3 mb-3"><strong>ข้อมูลพนักงาน</strong></h1>
        <!-- <router-link class="btn btn-success" ><i class="fas fa-check"></i> เพิ่มข้อมูล</router-link> -->

        <router-link class="btn btn-success pt-2" to="/app/FormEmployee">
          <i class="bi bi-plus"></i>เพิ่มข้อมูล
        </router-link>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">


              <div class="table-responsive" v-if="loading">
                <table class="mb-0 table table-bordered">
                  <thead>
                    <tr>
                      <th class="text-center align-middle" scope="col">#</th>
                      <th
                        class="text-center align-middle"
                        width="10%"
                        scope="col"
                      >
                        รหัสพนักงาน
                      </th>
                      <th
                        class="text-center align-middle"
                        width="12%"
                        scope="col"
                      >
                      รหัสผู้ใช้งาน
                      </th>
                      <th
                        class="text-center align-middle"
                        scope="col"
                      >
                        ชื่อ-นามสกุล
                      </th>
                      <th
                        class="text-center align-middle"
                        scope="col"
                      >
                      ตำแหน่ง
                      </th>
                      <th class="text-center align-middle" scope="col">
                        เบอร์โทรศัพท์
                      </th>
                      <th class="text-center align-middle" scope="col">
                        เงินเดือน
                      </th>
                      <th class="text-center align-middle" scope="col">
                        วันที่เริ่มทำงาน
                      </th>

                      <th class="text-center align-middle" scope="col">
                        สถานะ
                      </th>

                      <th class="text-center" scope="col">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  <!-- แสดงข้อมูลในกรณีที่มีข้อมูล -->
                  <tr v-for="(list, index) in employee_store.data_list" :key="index" v-if="employee_store.data_list.length">
                    <th class="text-center align-middle" scope="row">
                      {{ index + 1 }}
                    </th>
                    <td class="text-center align-middle">
                      {{ list.emp_code }}
                    </td>
                    <td class="text-center align-middle">
                      {{ list.user_id }}
                    </td>
                    <td class="text-left align-middle">
                      {{ list.firstname + ' ' + list.lastname }}
                    </td>
                    <td class="text-center align-middle">
                      <span v-if="list.position == 'manager'">ผู้จัดการ</span>
                      <span v-if="list.position == 'account'">บัญชี</span>
                      <span v-if="list.position == 'ceo'">ซีอีโอ</span>
                      <span v-if="list.position == 'emp'">พนักงาน</span>
                    </td>
                    <td class="text-center align-middle">
                      {{ list.tel }}
                    </td>
                    <td class="text-center align-middle">
                      {{ list.salary.toLocaleString() }}
                    </td>
                    <td class="text-center align-middle">
                      {{ list.start_date }}
                    </td>
                    <td class="text-center align-middle">
                      <div @click="change_status(list.id)">
                        <span class="btn btn-success btn-equal-size" v-if="list.employment_status == '1'">ปกติ</span>
                        <span class="btn btn-danger btn-equal-size" v-else>ลาออก</span>
                      </div>
                    </td>
                    <td class="text-center align-middle">
                      <button type="button" class="btn btn-info m-1 btn-equal-size" @click="openModal(list)">
                        <i class="bi bi-eye"></i> ดูข้อมูล
                      </button>
                      <router-link class="btn btn-primary m-1 btn-equal-size" :to="{ path: '/app/FormEmployee', query: { data: JSON.stringify(list) } }">
                        <i class="bi bi-pencil-square"></i> แก้ไขข้อมูล
                      </router-link>
                    </td>
                  </tr>

                  <!-- แสดงข้อความไม่พบข้อมูลในกรณีที่ไม่มีข้อมูล -->
                  <tr v-else>
                    <td class="text-center" colspan="10">ไม่พบข้อมูล</td>
                  </tr>
                </tbody>
                </table>
              </div>

              <SectionLoading v-else/>

            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="viewEmployee" tabindex="-1" aria-labelledby="viewEmployeeLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewEmployeeLabel">รายละเอียดพนักงาน</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row mb-2">
                  <!-- รหัสพนักงาน -->
                  <div class="col-md-6 my-2">
                    <label for="emp-code" class="form-label">รหัสพนักงาน:</label>
                    <input type="text" id="emp-code" class="form-control" :value="selectedEmployee?.emp_code || '-'" disabled />
                  </div>
                  <!-- ชื่อเต็ม -->
                  <div class="col-md-6 my-2">
                    <label for="name" class="form-label">ชื่อ-นามสกุล:</label>
                    <input type="text" id="name" class="form-control" :value="selectedEmployee?.name || '-'" disabled />
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- ตำแหน่ง -->
                  <div class="col-md-6 my-2">
                    <label for="position" class="form-label">ตำแหน่ง:</label>
                    <input type="text" id="position" class="form-control" :value="selectedEmployee?.position || '-'" disabled />
                  </div>
                  <!-- เงินเดือน -->
                  <div class="col-md-6 my-2">
                    <label for="salary" class="form-label">เงินเดือน:</label>
                    <input type="text" id="salary" class="form-control" :value="selectedEmployee?.salary.toLocaleString() || '-'" disabled />
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- เบอร์โทรศัพท์ -->
                  <div class="col-md-6 my-2">
                    <label for="tel" class="form-label">เบอร์โทรศัพท์:</label>
                    <input type="text" id="tel" class="form-control" :value="selectedEmployee?.tel || '-'" disabled />
                  </div>
                  <!-- อีเมล -->
                  <div class="col-md-6 my-2">
                    <label for="email" class="form-label">อีเมล:</label>
                    <input type="text" id="email" class="form-control" :value="selectedEmployee?.email || '-'" disabled />
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- วันเริ่มทำงาน -->
                  <div class="col-md-6 my-2">
                    <label for="start-date" class="form-label">วันที่เริ่มทำงาน:</label>
                    <input type="text" id="start-date" class="form-control" :value="selectedEmployee?.start_date || '-'" disabled />
                  </div>
                  <!-- เลขบัตรประชาชน -->
                  <div class="col-md-6 my-2">
                    <label for="id-card" class="form-label">เลขบัตรประชาชน:</label>
                    <input type="text" id="id-card" class="form-control" :value="selectedEmployee?.id_card || '-'" disabled />
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- ที่อยู่ -->
                  <div class="col-md-6 my-2">
                    <label for="address" class="form-label">ที่อยู่:</label>
                    <textarea id="address" class="form-control" rows="3" :value="selectedEmployee?.address || '-'" disabled></textarea>
                  </div>
                  <!-- หมายเหตุ -->
                  <div class="col-md-6 my-2">
                    <label for="note" class="form-label">หมายเหตุ:</label>
                    <textarea id="note" class="form-control" rows="3" :value="selectedEmployee?.note || '-'" disabled></textarea>
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- สถานะการทำงาน -->
                  <div class="col-md-6 my-2">
                    <label for="employment-status" class="form-label">สถานะการทำงาน:</label>
                    <input type="text" id="employment-status" class="form-control" :value="selectedEmployee?.employment_status == '1' ? 'กำลังทำงาน' : 'ลาออก'" disabled />
                  </div>
                  <!-- เพศ -->
                  <div class="col-md-6 my-2">
                    <label for="gender" class="form-label">เพศ:</label>
                    <input type="text" id="gender" class="form-control" :value="selectedEmployee?.gender || '-'" disabled />
                  </div>
                </div>

                <div class="row mb-2">
                  <!-- รหัสผู้ใช้งาน -->
                  <div class="col-md-6 my-2">
                    <label for="user-id" class="form-label">รหัสผู้ใช้งาน :</label>
                    <input type="text" id="user-id" class="form-control" :value="selectedEmployee?.user_id || '-'" disabled />
                  </div>

                  <div class="col-md-6 my-2">
                    <label for="user-id" class="form-label">รหัสผ่าน :</label>
                    <input type="text" id="user-id" class="form-control" :value="selectedEmployee?.password_user || '-'" disabled />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ปิด</button>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { userAuthStore } from "@/stores/models/userAuthStore";
import { employeeStore } from "@/stores/models/employeeStore";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const employee_store = employeeStore();
const router = useRouter();
const loading = ref(true);

const selectedEmployee = ref(null);

const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

onMounted(async () => {
  try {
    loading.value = false
    await employee_store.getDataList();
  } finally {
    await setTimeout((loading.value = true))
  }
});



// const change_status = async (id_customer) => {
//   const result = await Swal.fire({
//     // title: 'คุณแน่ใจหรือไม่?',
//     text: "คุณแน่ใจหรือไม่?", // "Are you sure?"
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "ยืนยัน", // "Confirm"
//     cancelButtonText: "ยกเลิก", // "Cancel"
//   });

//   if (result.isConfirmed) {
//     try {

//       loading.value = false

//       const response = await axios.post(customer_store.url.change_status, {
//         id_customer,
//       });

//       if (response.status === 200) {
//         Swal.fire({
//           icon: "success",
//           title: "สำเร็จ",
//           text: response.data.message,
//         });
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 500) {
//         Swal.fire({
//           icon: "error",
//           title: "เกิดข้อผิดพลาด...",
//           text: error.response.data.message,
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "เกิดข้อผิดพลาด...",
//           text: "Something went wrong!",
//         });
//       }
//     } finally {
//       await customer_store.getDataList();
//       await setTimeout((loading.value = true))
//     }
//   }
// };


const openModal = async (employee) => {

  console.log(employee);
  selectedEmployee.value = employee;
  const modal = new bootstrap.Modal(document.getElementById('viewEmployee'));

  modal.show();
}
</script>
<style>
</style>