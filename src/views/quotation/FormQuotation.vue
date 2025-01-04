<template>
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h2 class="mb-0">จัดการใบเสนอราคา</h2>
        </div>

        <div class="card-body">
            <div class="border border-3 border-dark p-4">
                <div class="header-quotation d-flex justify-content-between mb-4">
                    <div class="logo">
                        <img src="" alt="">
                    </div>
                    <div class="title-quotation d-flex flex-column align-items-center">
                        <div>หจก.สุพัฒน์การช่าง</div>
                        <div>ที่อยู่ 146 หมู่.8 ต.ดอนแก้ว อ.แม่ริม จ.เชียงใหม่ 50180</div>
                        <div>โทร.089-2647140,0821920547 เลขประจำตัวผู้เสียภาษี: 1-5007-01236-2</div>
                    </div>
                    <div class="qt-code-date">
                        <div>{{ qtCode }}</div>
                        <div>วันที่: {{ dateCreate }}</div>
                    </div>
                </div>
                <form @submit.prevent="submitForm">
                    <div class="row">
                        
                        <div class="col-md-4 mb-3">
                            <label for="qt_code" class="form-label">ใบเสนอราคา</label>
                            <input type="text" class="form-control" id="qt_code" name="qt_code" readonly v-model="qtCode">
                        </div>
                        
                        <div class="col-md-4 mb-3">
                            <label for="qt_name" class="form-label">ชื่อใบเสนอราคา <span class="text-danger">*</span></label>
                            <input type="text" class="form-control" id="qt_name" name="qt_name" v-model="formData.qt_name" required>
                        </div>
                        
                        <div class="col-md-4 mb-3">
                            <label for="customer_code" class="form-label">รหัสลูกค้า</label>
                            <input type="text" class="form-control" id="customer_code" name="customer_code" readonly v-model="formData.customer_code">
                        </div>
                    </div>

                    <hr>
                    
                    <!-- <h4 class="mb-0">รายละเอียดโครงการ</h4> -->
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="pj_code" class="form-label">รหัสโครงการ</label>
                            <input type="text" class="form-control" id="pj_code" name="pj_code" readonly :value="formData.project_data.project_code">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="pj_name" class="form-label">โครงการ</label>
                            <input type="text" class="form-control" id="pj_name" name="pj_name" readonly :value="formData.project_data.project_name">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="pj_type" class="form-label">ประเภท</label>
                            <input type="text" class="form-control" id="pj_type" name="pj_type" readonly value="โรงรถ">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="type_steel" class="form-label">ชนิดเหล็ก</label>
                            <input type="text" class="form-control" id="type_steel" name="type_steel" readonly :value="formData.project_data.garage_steel_type">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="thickness_steel" class="form-label">ความหนาเหล็ก</label>
                            <input type="text" class="form-control" id="thickness_steel" name="thickness_steel" readonly :value="formData.project_data.garage_steel_thickness">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="color_sheet" class="form-label">สีเหล็ก</label>
                            <input type="color" class="form-control" id="color_sheet" name="color_sheet" disabled  :value="formData.project_data.garage_steel_color">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="type_sheet" class="form-label">แผ่นหลังคา</label>
                            <input type="text" class="form-control" id="type_sheet" name="type_sheet" readonly :value="formData.project_data.garage_sheet_type">
                        </div>


                        <div class="col-md-4 mb-3">
                            <label for="color_sheet" class="form-label">สีหลังคา</label>
                            <input type="color" class="form-control" id="color_sheet" name="color_sheet" disabled  :value="formData.project_data.garage_sheet_color">
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="remark" class="form-label">หมายเหตุ</label>
                            <textarea 
                                class="form-control" 
                                id="remark" 
                                name="remark" 
                                rows="3" 
                                readonly 
                                :value="formData.project_data.garage_note"></textarea>
                        </div>
                    </div>

                    <hr>

                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead class="table-dark">
                                <tr>
                                    <th>รายการ</th>
                                    <th>จำนวน</th>
                                    <th>ราคา/หน่วย</th>
                                    <th>รวม</th>
                                    <th>-</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in qtList" :key="index">
                                    <td>
                                        <input type="text" class="form-control" name="q_name[]" v-model="item.q_name">
                                    </td>
                                    <td>
                                        <input type="number" class="form-control" name="amount[]" v-model="item.amount">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control text-end" name="price[]" v-model="item.price" @input="validatePrice(index)">
                                    </td>
                                    <td style="width: 20%;">
                                        <div class="text-end">{{ formatMoney(item.total) }}</div>
                                    </td>
                                    <td class="text-center">
                                        <button class="btn btn-danger" @click="removeList(index)" v-if="index != 0">ลบ</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colspan="3"></td>
                                    <td>
                                        <div class="text-end">{{ formatMoney(totalP) }}</div>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="d-flex justify-content-end mb-4">
                        <button type="button" class="btn btn-success" @click="addList">+ เพิ่มรายการ</button>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary">บันทึก</button>
                        <router-link class="btn btn-secondary mx-2" :to="'/app/ProjectCustomerList'">ยกเลิก</router-link>
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
        const id = ref(null);
        const id_customer = ref(null);
        const customer = reactive({});

        const qtCode = ref('-')
        const dateCreate = ref('-')
        const totalP = ref(0.00)
        const qtList = ref([
            {
                // id: shortid.generate(),
                q_name: '',
                amount: '',
                price: '',
                total: '0.00'
            }
        ])

        const formData = reactive({
            qt_name: '',
            customer_code: '' ,
            project_data: [] 
        })
        

        onMounted(async () => {

            id.value = route.query.qt_id || route.params.id;
            
            id_customer.value = route.query.id;

            if (id.value) {
                await getDataEdit(id.value)
            } else {
                await getQTcode()
            }

        })

        const addList = () => {
            qtList.value.push(
                {
                    // id: shortid.generate(),
                    q_name: '',
                    amount: '',
                    price: '',
                    total: '0.00'
                }
            )
        }

        const removeList = (index) => {
            qtList.value.splice(index, 1)
            sumTotal()
        }

        const validatePrice = (index) => {
            let value = qtList.value[index].price;
            // ลบทุกอักขระที่ไม่ใช่ตัวเลขหรือจุดทศนิยม
            value = value.replace(/[^\d.]/g, '');
            // ตรวจสอบว่ามีจุดทศนิยมมากกว่าหนึ่งจุดหรือไม่
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            // จำกัดทศนิยมไม่เกิน 2 ตำแหน่ง
            if (parts.length === 2) {
                value = parts[0] + '.' + parts[1].slice(0, 2);
            }
            qtList.value[index].price = value;
            calculateTotal(index);
            sumTotal()
        }

        const calculateTotal = (index) => {
            const item = qtList.value[index];
            const amount = parseFloat(item.amount) || 0;
            const price = parseFloat(item.price) || 0;
            item.total = (amount * price).toFixed(2);
        }

        const headers = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        }

        const getQTcode = async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/qt/create/${id_customer.value }`, headers)

            if (data.status) {
                qtCode.value = data.data.qt_code
                dateCreate.value = formatThaiDate(new Date())
                // Object.assign(customer, data.data.customer_data);
                formData.customer_code = data.data.customer_data
                formData.project_data = data.data.project_data
            } else {
                qtCode.value = '-'
                dateCreate.value = '-'
            }

            // console.log(formData.project_data.project_name);
        }

        const getDataEdit = async (id) => {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/qt/edit/${id}`, headers)
            if (data.status) {
                qtCode.value = data.data.data.qt_code
                formData.qt_name = data.data.data.qt_name
                formData.customer_code = data.data.data.customer_code
                dateCreate.value = formatThaiDate(data.data.data.created_at)
                qtList.value = data.data.data.quotation_list
                formData.project_data = data.data.project
                qtList.value.forEach((item,index) => {
                    calculateTotal(index);
                })
                sumTotal()
            }
        }

        const sumTotal = () => {
            totalP.value = qtList.value.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0)
        }

        const submitForm = async () => {
            try {
                const dataToSend = {
                    ...formData,
                    total_price: qtList.value.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0),
                    qt_list: qtList.value.map(item => ({
                        q_name: item.q_name,
                        amount: parseFloat(item.amount) || 0,
                        price: parseFloat(item.price) || 0,
                        total: parseFloat(item.total) || 0
                    }))
                }

                console.log('Data to send:', dataToSend);

                // ส่งข้อมูลไปยังเซิร์ฟเวอร์
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/qt/${id.value ? 'update/'+id.value :'store'}`, dataToSend, headers)
                if (data.status) {
                    await Swal.fire({
                        icon: "success",
                        title: "success",
                        text: data.message,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push({ path: '/app/Quotation' });
                        }
                    });
                } else {
                    throw new Error(data.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                Swal.fire('ผิดพลาด', error.message, 'error');
            }
        }
        
        return {
            router,
            qtList,
            formData,
            addList,
            removeList,
            validatePrice,
            formatMoney,
            qtCode,
            submitForm,
            formatThaiDate,
            dateCreate,
            totalP,
            customer
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