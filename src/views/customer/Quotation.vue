<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h2 class="mb-0">ใบเสนอราคา</h2>
      
      <router-link class="btn btn-dark" :to="'/app/Quotation/Create'">
        + เพิ่มข้อมูล
      </router-link>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>เลขที่ใบเสนอราคา</th>
              <th>ชื่อใบเสนอราคา</th>
              <th>รหัสลูกค้า</th>
              <th>ราคา</th>
              <th>จัดการข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in quotations" :key="index">
              <td>{{ item.qt_code }}</td>
              <td>{{ item.qt_name }}</td>
              <td>{{ item.customer_code }}</td>
              <td>{{ formatPrice(item.total_price) }}</td>
              <td>
                <router-link class="btn btn-sm btn-primary me-2" :to="`/app/Quotation/Edit/${item.id}`">แก้ไข</router-link>
                <button class="btn btn-sm btn-secondary me-2" @click="destroy(item.id)">ลบ</button>
                <!-- <button
                  class="btn btn-sm btn-info"
                >
                  เพิ่มโครงการ
                </button> -->
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
import { useRouter } from "vue-router";
import { 
  formatThaiDate, 
  formatPrice,
  validateMoneyInput,
  formatMoney
} from '@/utils/basefunction'
import Swal from "sweetalert2";

export default {
  // data() {
  //   return {
  //     quotations: [
  //       {
  //         id: "B0001",
  //         name: "โรงรถแบริ่ม",
  //         customerCode: "C0001",
  //         price: 200000,
  //       },
  //       {
  //         id: "B0002",
  //         name: "โครงสร้างคอนกรีต",
  //         customerCode: "C0002",
  //         price: 120000,
  //       },
  //       {
  //         id: "B0003",
  //         name: "บ้านน็อคดาวน์สรค",
  //         customerCode: "C0003",
  //         price: 500000,
  //       },
  //     ],
  //   };
  // },
  // methods: {
  //   formatPrice(price) {
  //     return price.toLocaleString("th-TH");
  //   },
  //   addNewQuotation() {
  //     // Logic to add a new quotation
  //     // console.log("Adding new quotation");
      
  //   },
  //   editQuotation(quotation) {
  //     // Logic to edit a quotation
  //     console.log("Editing quotation:", quotation.id);
  //   },
  //   deleteQuotation(quotation) {
  //     // Logic to delete a quotation
  //     console.log("Deleting quotation:", quotation.id);
  //   },
  //   addToProject(quotation) {
  //     // Logic to add quotation to a project
  //     console.log("Adding quotation to project:", quotation.id);
  //   },
  // },

  setup() {
    const route = useRouter();

    const quotations = ref([])

    onMounted(async () => {
      await getDataList()
    })

    const headers = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
    }

    const getDataList = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/qt/list`, headers)
      
      if (data.status) {
        quotations.value = data.data
      }
    }

    const destroy = async (id) => {
      Swal.fire({
        icon: "warning",
        text: "คุณแน่ใจใช้ไหมที่จะลบข้อมูล !",
        showCancelButton: true
      }).then(async (result) => {
          if (result.isConfirmed) {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/qt/destroy/${id}`, headers)
            if (data.status) {
              Swal.fire({
                icon: "success",
                title: "ข้อมูลถูกลบแล้ว",
              })
              await getDataList()
            }
          }
      });
    }
    
    return {
      quotations,
      formatPrice,
      destroy
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
}
</style>
