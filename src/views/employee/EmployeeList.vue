<template>
  <div class="card">
    <div class="card-header">
      <h2 class="mb-0">ข้อมูลพนักงาน</h2>

      <button class="btn btn-primary mt-4 me-2" @click="showModal = true">เพิ่มพนักงาน</button>
      <div class="modal-backdrop fade show" v-if="showModal"></div>
      <div class="modal" :class="{ 'fade show d-block': showModal }">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">สร้างใบสั่งซื้อวัสดุ</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <form @submit.prevent="onSubmit">
              <div class="modal-body">
                  <div class="mb-3">
                    <label for="name" class="col-form-label">ชื่อ-นามสกุล:</label>
                    <input type="text" class="form-control" id="name" name="name" v-model="formData.name">
                  </div>
                  <div class="mb-3">
                    <label for="code_project" class="col-form-label">ตำแหน่ง:</label>
                    <select class="form-select" aria-label="Default select example" v-model="formData.role">
                      <option selected>เลือกตำแหน่ง</option>
                      <option v-for="(item, index) in positions" :key="index" :value="item.value">
                        {{ item.text }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="tel" class="col-form-label">เบอร์โทรศัพท์:</label>
                    <input type="text" class="form-control" id="tel" name="tel" v-model="formData.tel">
                  </div>
                  <div class="mb-3">
                    <label for="slary" class="col-form-label">เงินเดือน:</label>
                    <input type="text" class="form-control" id="slary" name="slary" v-model="formData.slary" @change="checkPrice">
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
    <div class="card-body">
      <h3 class="mb-3">ข้อมูลพนักงานทั้งหมด</h3>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>รหัสพนักงาน</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>รหัสผู้ใช้งาน</th>
              <th>เบอร์โทรศัพท์</th>
              <th>เงินเดือน</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in employees" :key="index">
              <td>{{ item.emp_code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ findObjPosition(item.role) }}</td>
              <td>{{ userId(item.user_id) }}</td>
              <td>{{ formatPhoneNumber(item.tel) }}</td>
              <td>{{ formatMoney(item.slary) }}</td>
              <td>
                <button class="btn btn-primary me-2" @click="edit(item.id)">
                  แก้ไข
                </button>
                <router-link class="btn btn-primary me-2" :to="'/app/Compensation/'+item.id+'?name='+item.name+'&emp_code='+item.emp_code+'&slary='+item.slary">
                  ค่าตอบแทน
                </router-link>
              </td>
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
import Swal from "sweetalert2";
import { 
  formatThaiDate, 
  formatPrice,
  validateMoneyInput,
  formatMoney
} from '@/utils/basefunction'
import { userAuthStore } from '../../stores/models/userAuthStore'

export default {
  setup() {
    const storeAuth = userAuthStore()
    const showModal = ref(false)
    const editId = ref(null)
    const employees = ref([])

    const closeModal = () => {
      showModal.value = false;
      Object.keys(formData).forEach(key => formData[key] = '')
    }

    onMounted(async () => {
      await getEmployee()
    })

    const positions = [
      { value: 1, text: 'พนักงานทั่วไป'},
      { value: 2, text: 'พนักงานบัญชีและการจัดการ'},
    ]

    const formData = reactive({
      name: '',
      role: '',
      tel: '',
      slary: ''
    })

    function checkPrice(event) {
      const regex = /^\d{1}|[1-9]\d{1}$/;;
      if (regex.test(event.target.value)) {
        formData.slary = event.target.value;
      } else {
        formData.slary = ''
      }
    }

    const headers = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storeAuth.access_token}`,
        },
    }

    const getEmployee = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/employee`,headers)
      if (data.status) {
        employees.value = data.data
      }
    }

    const findObjPosition = (position) => {
      return positions.find(item => item.value == position).text
    }

    const formatPhoneNumber = (phone) => {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }

    const userId = (id) => {
      const paddedId = id.toString().padStart(6, '0')
      return `U${paddedId}`
    }

    const edit = async (id) => {
      const data = employees.value.find(item => item.id == id)
      formData.name = data.name
      formData.role = data.role
      formData.tel = data.tel
      formData.slary = data.slary
      showModal.value = true
    }

    const onSubmit = async () => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/employee/${editId?'/update/'+editId:'store'}`, formData, headers)

        if (data.status == true) {
          await Swal.fire({
            icon: "success",
            title: "success",
            text: data.message,
         }).then((result) => {
              if (result.isConfirmed) {
                closeModal()
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

    return {
      showModal,
      closeModal,
      positions,
      employees,
      findObjPosition,
      formatPhoneNumber,
      userId,
      formData,
      checkPrice,
      formatMoney,
      onSubmit,
      edit
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.table th,
.table td {
  vertical-align: middle;
  white-space: nowrap;
}
</style>
