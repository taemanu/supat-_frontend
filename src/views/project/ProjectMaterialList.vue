<template>
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between">
          <h1 class="h3 mb-3"><strong>ใบสั่งซื้อวัสดุ</strong></h1>
          <!-- <router-link class="btn btn-success pt-2" to="/app/FormUser">
                      <i class="fas fa-check"></i>สร้างใบสั่งซื้อวัสดุ
                  </router-link> -->
          <button type="button" class="btn btn-success pt-2" @click="showModal = true">
            <!-- <button type="button" class="btn btn-success pt-2" data-bs-toggle="modal" data-bs-target="#exampleModal"> -->
            <i class="bi bi-plus"></i>สร้างใบสั่งซื้อวัสดุ
          </button>
          <div class="modal-backdrop fade show" v-if="showModal"></div>
          <div class="modal" :class="{ 'fade show d-block': showModal }">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">สร้างใบสั่งซื้อวัสดุ</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <form @submit.prevent="onSubmit">
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="code_project" class="col-form-label">รหัสโครงการ:</label>
                        <input type="text" class="form-control" id="code_project" name="code_project" v-model="formData.code_project" readonly>
                      </div>
                      <div class="mb-3">
                        <label for="code_number" class="col-form-label">เลขที่ใบสั่งซื้อ:</label>
                        <input type="text" class="form-control" id="code_number" name="code_number" v-model="formData.code_number">
                      </div>
                      <div class="mb-3">
                        <label for="name" class="col-form-label">ชื่อใบสั่งซื้อ:</label>
                        <input type="text" class="form-control" id="name" name="name" v-model="formData.name">
                      </div>
                      <div class="mb-3">
                        <label for="price" class="col-form-label">ราคาสุทธิ:</label>
                        <input type="text" class="form-control" id="price" name="price" v-model="formData.price" @change="checkPrice">
                      </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">ยกเลิก</button>
                    <button type="submit" class="btn btn-primary">บันทึก</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- <h2 class="h4 mb-3">รออนุมัติ</h2>
        <div class="table-responsive">
          <table class="table table-bordered mb-0">
            <thead>
              <tr>
                <th class="text-center">เลขที่ใบสั่งซื้อ</th>
                <th class="text-center">รหัสโครงการ</th>
                <th class="text-center">ชื่อใบสั่งซื้อ</th>
                <th class="text-center">วันที่</th>
                <th class="text-center">ราคาสุทธิ</th>
                <th class="text-center">การอนุมัติ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in purchaseOrdersPending" :key="order.id">
                <td class="text-center">{{ order.code_number }}</td>
                <td class="text-center">{{ order.code_project }}</td>
                <td>{{ order.name }}</td>
                <td class="text-center">{{ formatThaiDate(order.created_at) }}</td>
                <td class="text-center">{{ formatPrice(order.price) }}</td>
                <td class="text-center">
                  <button type="button" class="btn btn-primary me-2" @click="approval('approve',order.id)">
                    <i class="fas fa-plus"></i> อนุมัติ
                  </button>
  
                  <button type="button" class="btn btn-danger" @click="approval('cancel',order.id)">
                    <i class="fas fa-plus"></i> ไม่อนุมัติ
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div> -->
  
        <h2 class="h4 mb-3 mt-4">ใบสั่งซื้อทั้งหมด</h2>
        <div class="table-responsive">
          <table class="table table-bordered mb-0">
            <thead>
              <tr>
                <th class="text-center">เลขที่ใบสั่งซื้อ</th>
                <th class="text-center">รหัสโครงการ</th>
                <th class="text-center">ชื่อใบสั่งซื้อ</th>
                <th class="text-center">วันที่</th>
                <th class="text-center">ราคาสุทธิ</th>
                <th class="text-center">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in purchaseOrdersAll" :key="order.id">
                <td class="text-center">{{ order.code_number }}</td>
                <td class="text-center">{{ order.code_project }}</td>
                <td>{{ order.name }}</td>
                <td class="text-center">{{ formatThaiDate(order.created_at) }}</td>
                <td class="text-center">{{ formatPrice(order.price) }}</td>
                <td class="text-center" v-html="approvalStatus[order.status]"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { ref, reactive, computed, onMounted  } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { 
    formatThaiDate, 
    formatPrice,
    validateMoneyInput,
    formatMoney
  } from '@/utils/basefunction'
  import Swal from "sweetalert2";
  
  export default {
    setup() {
      const purchaseOrdersPending = ref([])
      const purchaseOrdersAll = ref([])

      const route = useRoute();
      const router = useRouter();
  
      const showModal = ref(false)
      const formData = reactive({
        code_number: '',
        code_project: '',
        name: '',
        price: ''
      })
      const price = ref('')
  
      const approvalStatus = {
        pending: `<span class="badge bg-secondary">pending</span>`,
        success: `<span class="badge bg-success">success</span>`,
        cancel: `<span class="badge bg-danger">cancel</span>`
      }
  
      const headers = {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }
  
      onMounted(async () => {
        await getDataList(route.query.p_code)

        // Update code_project
        formData.code_project = route.query.p_code;

      })
  
      const getDataList = async (p_code) => {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/po/list-project/${p_code}`,headers)
        // console.log(data);
        purchaseOrdersAll.value = data.data

      }
  
      function checkPrice(event) {
        const regex = /^\d{1}|[1-9]\d{1}$/;;
        if (regex.test(event.target.value)) {
          formData.price = event.target.value;
        } else {
          formData.price = ''
        }
      }
  
      const closeModal = () => {
        showModal.value = false
      }
  
      const onSubmit = async () => {
       try {
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/po/create`, formData, headers)
  
          console.log(data);
  
          if (data.status == true) {
            await Swal.fire({
              icon: "success",
              title: "success",
              text: data.message,
           }).then((result) => {
                if (result.isConfirmed) {
                  closeModal()
                  getDataList('pending')
                  getDataList('all')
                  Object.keys(formData).forEach(key => formData[key] = '')
                }
            });
          }
        } catch (error) {
          if (error.response.status == 500) {
            await Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          }
        }
      }
  
      const approval = async (type, id) => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/po/${type}/${id}`, headers)
          if (data.status == true) {
            await Swal.fire({
              icon: "success",
              title: "success",
              text: data.message,
            }).then((result) => {
                if (result.isConfirmed) {
                  closeModal()
                  getDataList('pending')
                  getDataList('all')
                }
            });
          }
        } catch (error) {
          if (error.response.status == 500) {
            await Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
            });
          }
        }
      }
  
      return {
        purchaseOrdersPending,
        purchaseOrdersAll,
        formatThaiDate,
        formatPrice,
        showModal,
        closeModal,
        formData,
        checkPrice,
        price,
        onSubmit,
        approval,
        approvalStatus
      }
    }
  }
  
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
  