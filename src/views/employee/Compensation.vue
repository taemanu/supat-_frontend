<template>
    <div class="content">
        <div class="container-fluid p-0 ">
            <div class="d-flex justify-content-between m-2" >
                <h1 class="h3 mb-3"><strong>จัดการเงินเดือน</strong></h1>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="onSubmit">
                                <div class="row">
                                    <div class="col-md-6 my-2">
                                        <label for="emp_code" class="form-label">รหัสพนักงาน :</label>
                                        <input type="text" id="emp_code" name="emp_code" class="form-control" :value="route.query.emp_code" readonly>
                                    </div>
                                    <div class="col-md-6 my-2">
                                        <label for="name" class="form-label">ชื่อ-นามสกุล :</label>
                                        <input type="text" id="name" name="name" class="form-control" :value="route.query.name" readonly>
                                    </div>
                                    <div class="col-md-6 my-2">
                                        <label for="slary" class="form-label">เงินเดือน :</label>
                                        <input type="text" id="slary" name="slary" class="form-control" :value="route.query.slary" readonly>
                                    </div>
                                    <div class="col-md-6 my-2">
                                        <label for="month" class="form-label">เดือน :</label>
                                        <VueDatePicker v-model="formData.month" month-picker />
                                    </div>
                                </div>
                                <div class="row flex-column">
                                    <div class="col-md-6 my-2">
                                        <label for="ot" class="form-label">OT(ชั่วโมง) :</label>
                                        <input type="number" id="ot" name="ot" v-model="formData.ot" class="form-control">
                                    </div>
                                    <div class="col-md-6 my-2">
                                        <label for="stop_work" class="form-label">หยุดงาน(วัน) :</label>
                                        <input type="number" id="stop_work" name="stop_work" v-model="formData.stop_work" class="form-control">
                                    </div>
                                    <div class="col-md-6 my-2">
                                        <label for="withdraw_advance" class="form-label">เบิกล่วงหน้า :</label>
                                        <input type="text" id="withdraw_advance" name="withdraw_advance" v-model="formData.withdraw_advance" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group row my-2">
                                    <div class="col-sm-12 d-flex justify-content-center">
                                        <router-link class="btn btn-secondary btn-icon-split mx-1" to="/app/EmployeeList">
                                            <span class="icon text-white-50">
                                                <i class="fa fa-retweet"></i>
                                            </span>
                                            <span class="text">ย้อนกลับ</span>
                                        </router-link>
                                        <button type="submit" class="btn btn-primary btn-icon-split mx-1">
                                            <span class="icon text-white-50 ">
                                                <i class="fas fa-search"></i>
                                            </span>
                                            <span class="text">บันทึก</span>
                                        </button>
                                    </div>
                                </div>
                            </form>

                            <div class="table-responsive mt-4">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>เดือน</th>
                                            <th>OT(ชั่วโมง)</th>
                                            <th>หยุดงาน(วัน)</th>
                                            <th>เบิกล่วงหน้า</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in slaries" :key="index">
                                            <td>{{ setFormatDate(item.month) }}</td>
                                            <td>{{ item.ot }}</td>
                                            <td>{{ item.stop_work }}</td>
                                            <td>{{ formatMoney(item.withdraw_advance) }}</td>
                                            <td>
                                                <button class="btn btn-danger me-2" @click="destroy(item.id)">ลบ</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { ref, reactive, computed, onMounted  } from "vue";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { 
  formatThaiDate, 
  formatPrice,
  validateMoneyInput,
  formatMoney
} from '@/utils/basefunction'
import { userAuthStore } from '../../stores/models/userAuthStore'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { th } from 'date-fns/locale'

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const storeAuth = userAuthStore()

        const slaries = ref([])

        const dateNow = new Date();
        const formData = reactive({
            month: {
                month: dateNow.getMonth(),
                year: dateNow.getFullYear()
            },
            ot: '',
            stop_work: '',
            withdraw_advance: ''
        })

        onMounted(async () => {
            await getDataList()
        })

        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storeAuth.access_token}`,
            },
        }

        const setFormatDate = (date) => {
            const d = date.split('-')
            return `${d[1]}/${d[0]}`
        }

        const getDataList = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/employee/listCompensation/${route.params.id}`,headers)
            if (data.status) {
                slaries.value = data.data
            }
        }

        const onSubmit = async () => {
            formData.month = `${formData.month.year}-${(formData.month.month+1)>=10?(formData.month.month+1):'0'+(formData.month.month+1)}-01`
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/employee/compensationStore/${route.params.id}`, formData, headers)

                if (data.status == true) {
                    await Swal.fire({
                        icon: "success",
                        title: "success",
                        text: data.message,
                    }).then(async(result) => {
                        if (result.isConfirmed) {
                            await getDataList()
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

        const destroy = async (id) => {
            try {
                const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/employee/compensationDestroy/${route.params.id}`,headers)

                if (data.status == true) {
                    await Swal.fire({
                        icon: "success",
                        title: "success",
                        text: data.message,
                    }).then(async(result) => {
                        if (result.isConfirmed) {
                            await getDataList()
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
            route,
            formData,
            onSubmit,
            formatMoney,
            slaries,
            setFormatDate,
            destroy
        }
    }
}
</script>
<style>
    
</style>