<style>
.btn-equal-size {
  width: 150px;
}
</style>
<template>
  <main class="content">

    <div class="container-fluid p-0">
      <div class="d-flex justify-content-between m-2">
        <h1 class="h3 mb-3"><strong>ข้อมูลลูกค้า</strong></h1>
        <!-- <router-link class="btn btn-success" ><i class="fas fa-check"></i> เพิ่มข้อมูล</router-link> -->

        <router-link class="btn btn-success pt-2" to="/app/FormCustomer">
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
                        รหัสลูกค้า
                      </th>

                      <th
                        class="text-center align-middle"
                        width="10%"
                        scope="col"
                      >
                        รหัสผู้ใช้งาน
                      </th>
                      <th
                        class="text-center align-middle"
                        width="12%"
                        scope="col"
                      >
                        เลขประจำตัวผู้เสียภาษี
                      </th>
                      <th
                        class="text-center align-middle"
                        width="12%"
                        scope="col"
                      >
                        ชื่อ - นามสกุล
                      </th>
                      <th class="text-center align-middle" scope="col">
                        เบอร์โทรศัพท์
                      </th>
                      <!-- <th class="text-center align-middle" scope="col">E-mail</th>
												<th class="text-center align-middle" scope="col">ที่อยู่</th> -->
                      <th class="text-center align-middle" scope="col">
                        สถานะ
                      </th>
                      <th class="text-center" width="15%" scope="col">
                        จัดการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  <!-- แสดงข้อมูลในกรณีที่มีข้อมูล -->
                  <tr v-for="(list, index) in customer_store.data_list" :key="index" v-if="customer_store.data_list.length">

                    <th class="text-center align-middle" scope="row">
                      {{ index + 1 }}
                    </th>
                    <td class="text-center align-middle">
                      {{ list.customer_code }}
                    </td>
                    <td class="text-center align-middle">
                      {{ list.user_id }}
                    </td>
                    <td class="text-left align-middle">
                      {{ list.id_tax }}
                    </td>
                    <td class="text-left align-middle">
                      {{ list.firstname + " " + list.lastname }}
                    </td>
                    <td class="text-center align-middle">
                      {{ list.tel }}
                    </td>
                    <td class="text-center align-middle">
                      <div @click="change_status(list.id)">
                        <span
                          class="btn btn-success btn-equal-size"
                          v-if="list.status == 'active'"
                          >ใช้งาน</span
                        >
                        <span class="btn btn-danger btn-equal-size" v-else
                          >ไม่ใช้งาน</span
                        >
                      </div>
                    </td>
                    <td class="text-center align-middle">
                      <button
                        type="button"
                        class="btn btn-info m-1 btn-equal-size"
                        @click="openModal(list)"
                      >
                        <i class="bi bi-eye"></i>
                        ดูข้อมูล
                      </button>


                      <router-link  class="btn btn-primary m-1 btn-equal-size" :to="{ path: '/app/FormCustomer', query: { data: JSON.stringify(list) } }" >
                          <i class="bi bi-pencil-square"></i>
                          แก้ไขข้อมูล
                      </router-link>

                    </td>
                  </tr>

                  <!-- แสดงข้อความไม่พบข้อมูลในกรณีที่ไม่มีข้อมูล -->
                  <tr v-else>
                    <td class="text-center" colspan="7">ไม่พบข้อมูล</td>
                  </tr>
                </tbody>
                </table>
              </div>

              <SectionLoading v-else/>

            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="viewUser" tabindex="-1" aria-labelledby="viewUserLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewUserLabel">รายละเอียดลูกค้า</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="row mb-2">
                  <!-- เลขประจำตัวผู้เสียภาษี -->
                  <div class="col-md-6 my-2">
                    <label for="id-tax" class="form-label">เลขประจำตัวผู้เสียภาษี :</label>
                    <input type="text" id="id-tax" class="form-control" :value="selectedCustomer?.id_tax || '-'" disabled />
                  </div>

                  <!-- รหัสลูกค้า -->
                  <div class="col-md-6 my-2">
                    <label for="customer-code" class="form-label">รหัสลูกค้า :</label>
                    <input type="text" id="customer-code" class="form-control" :value="selectedCustomer?.customer_code || '-'" disabled />
                  </div>

                </div>
                <div class="row mb-2">
                  <!-- ชื่อ -->
                  <div class="col-md-6 my-2">
                    <label for="first-name" class="form-label">ชื่อจริง :</label>
                    <input type="text" id="first-name" class="form-control" :value="selectedCustomer?.firstname || '-'" disabled />
                  </div>
                  <!-- นามสกุล -->
                  <div class="col-md-6 my-2">
                    <label for="last-name" class="form-label">นามสกุล :</label>
                    <input type="text" id="last-name" class="form-control" :value="selectedCustomer?.lastname || '-'" disabled />
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- เบอร์โทรศัพท์ -->
                  <div class="col-md-6 my-2">
                    <label for="tel" class="form-label">เบอร์โทรศัพท์ :</label>
                    <input type="text" id="tel" class="form-control" :value="selectedCustomer?.tel || '-'" disabled />
                  </div>
                  <!-- อีเมล -->
                  <div class="col-md-6 my-2">
                    <label for="email" class="form-label">อีเมล :</label>
                    <input type="text" id="email" class="form-control" :value="selectedCustomer?.email || '-'" disabled />
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- Line ID -->
                  <div class="col-md-6 my-2">
                    <label for="line-id" class="form-label">Line ID :</label>
                    <input type="text" id="line-id" class="form-control" :value="selectedCustomer?.line_id || '-'" disabled />
                  </div>
                  <!-- สถานะ -->
                  <div class="col-md-6 my-2">
                    <label for="status" class="form-label">สถานะ :</label>
                    <input type="text" id="status" class="form-control" :value="selectedCustomer?.status === 'active' ? 'ใช้งาน' : 'ไม่ใช้งาน'"  disabled />
                  </div>
                </div>
                <div class="row mb-2">
                  <!-- ที่อยู่ -->
                  <div class="col-md-6 my-2">
                    <label for="address" class="form-label">ที่อยู่ :</label>
                    <textarea id="address" class="form-control" rows="3" :value="selectedCustomer?.address || '-'" disabled></textarea>
                  </div>
                                    <!-- หมายเหตุ -->
                  <div class="col-md-6 my-2">
                    <label for="remark" class="form-label">หมายเหตุ :</label>
                    <textarea id="address" class="form-control" rows="3" :value="selectedCustomer?.remark || '-'" disabled></textarea>
                  </div>
                </div>

                <hr>

                <div class="row mb-2">
                  <!-- รหัสผู้ใช้งาน -->
                  <div class="col-md-6 my-2">
                    <label for="user-id" class="form-label">รหัสผู้ใช้งาน :</label>
                    <input type="text" id="user-id" class="form-control" :value="selectedCustomer?.user_id || '-'" disabled />
                  </div>

                  <div class="col-md-6 my-2">
                    <label for="user-id" class="form-label">รหัสผ่าน :</label>
                    <input type="text" id="user-id" class="form-control" :value="selectedCustomer?.password_user || '-'" disabled />
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
import { customerStore } from "@/stores/models/customerStore";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const customer_store = customerStore();
const router = useRouter();
const loading = ref(true);

const selectedCustomer = ref(null);

const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

onMounted(async () => {
  try {
    loading.value = false
    await customer_store.getDataList();
  } finally {
    await setTimeout((loading.value = true))
  }
});

const change_status = async (id_customer) => {
  const result = await Swal.fire({
    // title: 'คุณแน่ใจหรือไม่?',
    text: "คุณแน่ใจหรือไม่?", // "Are you sure?"
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ยืนยัน", // "Confirm"
    cancelButtonText: "ยกเลิก", // "Cancel"
  });

  if (result.isConfirmed) {
    try {

      loading.value = false

      const response = await axios.post(customer_store.url.change_status, {
        id_customer,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด...",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด...",
          text: "Something went wrong!",
        });
      }
    } finally {
      await customer_store.getDataList();
      await setTimeout((loading.value = true))
    }
  }
};


const openModal = async (customer) => {

  console.log(customer);
  selectedCustomer.value = customer;
  const modal = new bootstrap.Modal(document.getElementById('viewUser'));

  modal.show();
}
</script>
<style>
</style>