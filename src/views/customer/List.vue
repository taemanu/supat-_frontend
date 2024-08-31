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
              <div class="table-responsive">
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
                      <th class="text-center align-middle" scope="col">
                        รูปภาพประจำตัว
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
                    <tr
                      v-for="(list, index) in customer_store.data_list"
                      :key="index"
                    >
                      <th class="text-center align-middle" scope="row">
                        {{ index + 1 }}
                      </th>
                      <td class="text-center align-middle">
                        {{ list.customer_code }}
                      </td>
                      <td class="text-center align-middle">
                        <img
                          src="../../assets/img/avatars/avatar-2.jpg"
                          width="56"
                          height="56"
                          class="rounded-circle me-2"
                          alt="Vanessa Tucker"
                        />
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
                      <!-- <td class="text-center align-middle">
													{{list.email}}
												</td>
												<td class="text-left align-middle">
													{{list.address}}
												</td> -->
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
                          data-bs-toggle="modal"
                          data-bs-target="#viewUser"
                        >
                          <i class="bi bi-eye"></i>
                          ดูข้อมูล
                        </button>

                        <button
                          type="button"
                          class="btn btn-warning m-1 btn-equal-size"
                        >
                          <i class="bi bi-pencil-square"></i>
                          แก้ไข
                        </button>

                        <router-link  class="btn btn-primary m-1 btn-equal-size" :to="{ path: '/app/Quotation/Create', query: { id: list.id , qt_id:list.id_qt} }" >
                          <i class="bi bi-pencil-square"></i>
                          ใบเสนอราคา
                        </router-link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div
          class="modal fade"
          id="viewUser"
          tabindex="-1"
          aria-labelledby="viewUserLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewUserLabel">Modal title</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body px-auto">
                <div class="row mb-2">
                  <div class="text-center col-md-12">
                    <img
                      src="../../assets/img/avatars/avatar-2.jpg"
                      width="86"
                      height="86"
                      class="rounded-circle me-2"
                      alt="Vanessa Tucker"
                    />
                  </div>
                </div>
                <div class="row mb-2">
                  <div class="col-md-4 my-2">
                    <label for="id-card" class="form-label"
                      >เลขประจำตัวประชาชน :</label
                    >
                    <input
                      type="text"
                      id="id-card"
                      class="form-control"
                      aria-describedby="id-card-HelpBlock"
                      disabled
                      value="-"
                    />
                  </div>
                  <div class="col-md-4 my-2">
                    <label for="first-name" class="form-label"
                      >ชื่อจริง :</label
                    >
                    <input
                      type="text"
                      id="first-name"
                      class="form-control"
                      aria-describedby="first-name-HelpBlock"
                      disabled
                      value="-"
                    />
                  </div>
                  <div class="col-md-4 my-2">
                    <label for="last-name" class="form-label">นามสกุล :</label>
                    <input
                      type="text"
                      id="last-name"
                      class="form-control"
                      aria-describedby="last-name-HelpBlock"
                      disabled
                      value="-"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
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

const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

onMounted(async () => {
  await customer_store.getDataList();
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
      const response = await axios.post(customer_store.url.change_status, {
        id_customer,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } finally {
      customer_store.getDataList();
    }
  }
};
</script>
<style>
</style>