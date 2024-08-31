<style>
.btn-equal-size {
  width: 150px;
}
</style>
<template>
  <div class="content">
    <div class="container-fluid p-0 ">
      <div class="d-flex justify-content-between m-2" >
        <h1 class="h3 mb-3"><strong>ใบเสนอราคา</strong></h1>
      </div>
      <div class="card">
        <!-- <div class="card-header d-flex justify-content-between align-items-center">
          <router-link class="btn btn-dark" :to="'/app/Quotation/Create'">
            + เพิ่มข้อมูล
          </router-link>
        </div> -->
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead>
                <tr>
                  <th class="text-center" width="15%">เลขที่ใบเสนอราคา</th>
                  <th class="text-center" width="15%">ชื่อใบเสนอราคา</th>
                  <th class="text-center" width="15%" >รหัสลูกค้า</th>
                  <th class="text-center" width="15%" >ราคา</th>
                  <th class="text-center" width="15%">วันที่</th>
                  <th class="text-center" width="15%">จัดการข้อมูล</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in quotations" :key="index">
                  <td class="text-center">
                    {{ item.qt_code }}
                  </td>
                  <td >
                    {{ item.qt_name }}
                  </td>
                  <td class="text-left">
                    {{ item.customer_code }} : {{ item.firstname }} {{ item.lastname }}
                  </td>
                  <td class="text-center">
                    {{ formatPrice(item.total_price) }}
                  </td>
                  <td class="text-center">
                    {{ formatThaiDate(item.created_at ) }}
                  </td>
                  <td  class="text-center">
                    <router-link class="btn btn-warning m-1 btn-equal-size" :to="`/app/Quotation/Edit/${item.id}`"><i class="bi bi-pencil-square"></i> แก้ไข</router-link>
                    <router-link class="btn btn-primary mt-1 btn-equal-size" :to="{ path: '/app/FormProject', query: { customer_code: item.customer_code} }"> <i class="bi bi-pencil-square"></i> โครงการ</router-link>
                    <button class="btn btn-danger m-1 btn-equal-size" @click="destroy(item.id)">ลบ</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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
      formatThaiDate,
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
