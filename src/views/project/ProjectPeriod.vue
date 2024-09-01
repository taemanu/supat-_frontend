<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h2 class="mb-0">จัดการค่างวด</h2>
        </div>

        <div class="card-body">
            <div class="border border-3 border-dark p-4">
                <form @submit.prevent="submitForm">
                    <div class="d-flex flex-column">
                        <div class="mb-2 row col-5">
                            <label for="p_code" class="col-sm-2 col-form-label">รหัสโครงการ</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="p_code" name="p_code"  v-model="data_project.p_code" readonly>
                            </div>
                        </div>
                        <div class="mb-2 row col-5">
                            <label for="net_price" class="col-sm-2 col-form-label">ราคาสุทธิ</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="net_price" name="net_price"  v-model="data_project.price_project" readonly >
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="table-dark">
                                <tr>
                                    <th>งวดที่</th>
                                    <th>ราคา</th>
                                    <th>วันที่ต้องชำระ</th>
                                    <th>สถานะ</th>
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in periodList" :key="index">
                                    <td>
                                        <input type="text" class="form-control" name="period[]" >
                                    </td>
                                    <td>
                                        <input type="number" class="form-control" name="price[]" >
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-end" name="date[]">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-end" name="status[]">
                                    </td>
    
                                    <td class="text-center">
                                        <button class="btn btn-danger" @click="removeList(index)" v-if="index != 0" >ลบ</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-end mb-4">
                        <button type="button" class="btn btn-success" @click="addList">+ เพิ่มรายการ</button>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">บันทึก</button>
                        <router-link class="btn btn-secondary mx-2" :to="'/app/Quotation'">ยกเลิก</router-link>
                    </div>
                </form>
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
import shortid from "shortid";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();

        const periodList = ref([
            {
                // id: shortid.generate(),
                period: '',
                price: '',
                date: '',
                status: '0.00'
            }
        ])

        const data_project = reactive({
            p_code:null,
            price_project:null
        })


        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }


        onMounted(async () => {
            await getData(route.query.p_code);

            console.log(data_project);
        });
            

        const getData = async (id) => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/project/period/${id}`, headers)

            if (data.status) {
                data_project.p_code = data.data.project.p_code;
                data_project.price_project = data.data.quotation.total_price;
            }
        }

        const addList = () => {
            periodList.value.push(
                {
                    // id: shortid.generate(),
                    period: '',
                    price: '',
                    date: '',
                    status: '0.00'
                }
            )
        }

        const removeList = (index) => {
            periodList.value.splice(index, 1)
        }

        return {
            data_project,
            addList,
            removeList,
            periodList
        }
    }
}
</script>
<style>
    .form-control[readonly] {
        background-color: #e9ecef;
        opacity: 1;
    }
</style>