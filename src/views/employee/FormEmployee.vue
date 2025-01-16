<template>
    <div class="content">
        <div class="container-fluid p-0 ">
            <div class="d-flex justify-content-between m-2" >
                <!-- <h1 class="h3 mb-3"><strong>เพิ่ม/แก้ไข พนักงาน <span v-if="edit_data">{{ customer_data.customer_code }}</span></strong></h1> -->
                <h1 class="h3 mb-3"><strong>เพิ่ม/แก้ไข พนักงาน </strong></h1>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <div class="card-body" v-if="loading">
                            <form id="insert-employee" @submit.prevent="onSubmit" autocomplete="off">
                                <div class="row">
                                    <!-- Personal Information -->
                                    <div class="col-md-12 my-2">
                                        <h4>ข้อมูลส่วนตัว</h4>
                                        <hr>
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="id_card" class="form-label">เลขประจำตัวประชาชน <span class="text-danger">*</span> :</label>
                                        <input type="text" id="id_card" required name="id_card" v-model="employee_store.form.data.id_card" class="form-control" @input="validateIdCard">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="firstname" class="form-label">ชื่อจริง <span class="text-danger">*</span> :</label>
                                        <input type="text" id="firstname" required name="firstname" v-model="employee_store.form.data.firstname" class="form-control">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="lastname" class="form-label">นามสกุล <span class="text-danger">*</span> :</label>
                                        <input type="text" id="lastname" required name="lastname" v-model="employee_store.form.data.lastname" class="form-control">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="gender" class="form-label">เพศ :</label>
                                        <select name="gender" class="form-select" v-model="employee_store.form.data.gender">
                                            <option value="male">ชาย</option>
                                            <option value="female">หญิง</option>
                                            <option value="other">อื่นๆ</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="dob" class="form-label">วันเกิด :</label>
                                        <input type="date" id="dob" name="dob" v-model="employee_store.form.data.dob" class="form-control">
                                    </div>

                                    <!-- Contact Information -->
                                    <div class="col-md-12 my-4">
                                        <h4>ข้อมูลติดต่อ</h4>
                                        <hr>
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="tel" class="form-label">เบอร์โทร <span class="text-danger">*</span> :</label>
                                        <input type="text" id="tel" required name="tel" v-model="employee_store.form.data.tel" class="form-control" @input="validateTel">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="email" class="form-label">อีเมล์ <span class="text-danger">*</span> :</label>
                                        <input type="email" id="email" required name="email" v-model="employee_store.form.data.email" class="form-control">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="line_id" class="form-label">ไลน์ไอดี :</label>
                                        <input type="text" id="line_id" name="line_id" v-model="employee_store.form.data.line_id" class="form-control">
                                    </div>
                                    <div class="col-md-12 my-2">
                                        <label for="address" class="form-label">ที่อยู่ <span class="text-danger">*</span>:</label>
                                        <textarea class="form-control" id="address" name="address" v-model="employee_store.form.data.address" rows="3"></textarea>
                                    </div>

                                    <!-- Employment Details -->
                                    <div class="col-md-12 my-4">
                                        <h4>รายละเอียดการทำงาน</h4>
                                        <hr>
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="position" class="form-label">ตำแหน่ง <span class="text-danger">*</span> :</label>
                                        <!-- <input type="text" id="position" required name="position" v-model="employee_store.form.data.position" class="form-control"> -->
                                        <select name="position" class="form-select" id="position" required v-model="employee_store.form.data.position">
                                            <option value="emp">พนักงาน</option>
                                            <option value="manager">ผู้จัดการ</option>
                                            <option value="account">บัญชี</option>
                                            <option value="ceo">ซีอีโอ</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="start_date" class="form-label">วันที่เริ่มงาน <span class="text-danger">*</span> :</label>
                                        <input type="date" id="start_date" required name="start_date" v-model="employee_store.form.data.start_date" class="form-control">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="salary" class="form-label">เงินเดือน <span class="text-danger">*</span> :</label>
                                        <input type="number" id="salary" required name="salary" v-model="employee_store.form.data.salary" class="form-control">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="employment_status" class="form-label">สถานะการจ้างงาน <span class="text-danger">*</span>:</label>
                                        <select name="employment_status" class="form-select" v-model="employee_store.form.data.employment_status">
                                            <option value="1">ปกติ</option>
                                            <option value="2">ลาออก</option>
                                        </select>
                                    </div>

                                    <!-- Additional Information -->
                                    <div class="col-md-12 my-2">
                                        <label for="note" class="form-label">หมายเหตุ :</label>
                                        <textarea class="form-control" id="note" name="note" v-model="employee_store.form.data.note" rows="3"></textarea>
                                    </div>
                                    <!-- <div class="col-md-12 my-2">
                                        <label for="file_picuser" class="form-label">รูปภาพพนักงาน :</label>
                                        <div class="input-group">
                                            <input type="file" class="form-control" id="file_picuser">
                                            <label class="input-group-text" for="file_picuser">Upload</label>
                                        </div>
                                    </div> -->
                                </div>

                                <!-- Submit Section -->
                                <div class="form-group row my-4">
                                    <div class="col-sm-12 d-flex justify-content-center">
                                        <router-link class="btn btn-secondary btn-icon-split mx-1" to="/app/EmployeeList">
                                            <span class="icon text-white-50">
                                                <i class="fa fa-retweet"></i>
                                            </span>
                                            <span class="text">ย้อนกลับ</span>
                                        </router-link>
                                        <button type="submit" class="btn btn-primary btn-icon-split mx-1">
                                            <span class="icon text-white-50">
                                                <i class="fas fa-save"></i>
                                            </span>
                                            <span class="text">บันทึก</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <SectionLoading v-else/>
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, watch ,onMounted } from "vue";
import { userAuthStore } from "@/stores/models/userAuthStore";
import { employeeStore } from "@/stores/models/employeeStore";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const employee_store = employeeStore();
const router = useRouter();
const route = useRoute();

const employee_data = ref([]);
const edit_data = ref(false);

const headers = {
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
}

const loading = ref(true);

onMounted(async() => {

    try {
    
    const data = route.query.data ? JSON.parse(route.query.data) : null;
    employee_data.value = data;   


    loading.value = false
    if (employee_data.value) {

        edit_data.value = true;

        employee_store.form.data.id_employee = employee_data.value.id || '';
        employee_store.form.data.id_card = employee_data.value.id_card || '';
        employee_store.form.data.firstname = employee_data.value.firstname || '';
        employee_store.form.data.lastname = employee_data.value.lastname || '';
        employee_store.form.data.gender = employee_data.value.gender || '';
        employee_store.form.data.dob = employee_data.value.dob || '';
        employee_store.form.data.tel = employee_data.value.tel || '';
        employee_store.form.data.email = employee_data.value.email || '';
        employee_store.form.data.line_id = employee_data.value.line_id || '';
        employee_store.form.data.address = employee_data.value.address || '';
        employee_store.form.data.position = employee_data.value.position || '';
        employee_store.form.data.start_date = employee_data.value.start_date || '';
        employee_store.form.data.employment_status = employee_data.value.employment_status || '';
        employee_store.form.data.note = employee_data.value.note || '';
        employee_store.form.data.salary = employee_data.value.salary || '';

    } else {
    employee_store.form.data = {
        id_employee : "",
        id_card : "",
        firstname : "",
        lastname : "",
        gender : "male",
        dob : "",
        tel : "",
        email : "",
        line_id : "",
        address : "",
        position : "emp",
        start_date : "",
        employment_status : "1",
        note : "",
        salary : 0,
        user_id : '',
        password_user : '',
    };
}
    

  } finally {
    await setTimeout((loading.value = true))
  }

});

const validateIdCard = (event) => {
  // กรองเฉพาะตัวเลข และจำกัดไม่เกิน 13 หลัก
  const value = event.target.value.replace(/\D/g, ""); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
  employee_store.form.data.id_card = value.slice(0, 13); // จำกัดไม่เกิน 13 ตัวอักษร
};

const validateTel = (event) => {
  // กรองเฉพาะตัวเลข และจำกัดไม่เกิน 13 หลัก
  const value = event.target.value.replace(/\D/g, ""); // ลบตัวอักษรที่ไม่ใช่ตัวเลข
  employee_store.form.data.tel = value.slice(0, 10); // จำกัดไม่เกิน 10 ตัวอักษร
};

const onSubmit = async () => {
    try {

        console.log(edit_data);

        const response  = edit_data.value ? await axios.post(employee_store.url.edit_employee, employee_store.form.data,headers) : await axios.post(employee_store.url.store_employee, employee_store.form.data,headers)
        if (response.status == 200) {
            await Swal.fire({
            icon: "success",
            title: "สำเร็จ",
            text: response.message,
            }).then((result) => {
                router.push('/app/EmployeeList');
            });
        }
    } catch (error) {
        if (error.response.status == 500) {
            await Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด...",
            text: error.response.data.message,
            });
        }
    }
}


</script>
<style>
    
</style>