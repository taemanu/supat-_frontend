<template>
    <div class="content">
        <div class="container-fluid p-0 ">
            <div class="d-flex justify-content-between m-2" >
                <h1 class="h3 mb-3"><strong>เพิ่ม/แก้ไข ลูกค้า</strong></h1>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <div class="card-body">
                            <form id="insert-user" @submit.prevent="onSubmit" autocomplete="off">
                                <div class="row">
                                    <div class="col-md-4 my-2">
                                        <label for="id-card" class="form-label">เลขประจำตัวผู้เสียภาษี :</label>
                                        <input type="text" id="id_card" name="id_card" v-model="customer_store.form.data.id_card" class="form-control" aria-describedby="id-card-HelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="firstname" class="form-label">ชื่อจริง :</label>
                                        <input type="text" id="firstname" name="firstname" v-model="customer_store.form.data.firstname" class="form-control" aria-describedby="firstname-HelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="lastname" class="form-label">นามสกุล :</label>
                                        <input type="text" id="lastname" name="lastname" v-model="customer_store.form.data.lastname" class="form-control" aria-describedby="lastnameHelpBlock">
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="tel" class="form-label">เบอร์โทร :</label>
                                        <input type="text" id="tel" name="tel" v-model="customer_store.form.data.tel" class="form-control" aria-describedby="telHelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="email" class="form-label">E-mail :</label>
                                        <input type="text" id="email" name="email" v-model="customer_store.form.data.email" class="form-control" aria-describedby="emailHelpBlock">
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="status" class="form-label">สถานะ :</label>
                                        <select name="status" class="form-select" v-model="customer_store.form.data.status" aria-label="Default select status">
                                            <option value="1" selected>ใช้งาน</option>
                                            <option value="2">ไม่ใช้งาน</option>
                                        </select>
                                    </div>

                                    <div class="col-md-12 my-2">
                                        <label for="status" class="form-label">รูปภาพประจำตัว :</label>
                                        <div class="input-group mb-3">
                                        <input type="file" class="form-control" id="file_picuser">
                                        <label class="input-group-text" for="file_picuser">Upload</label>
                                        </div>
                                    </div>


                                    <div class="col-md-12 my-2">
                                        <label for="address" class="form-label">ที่อยู่ :</label>
                                        <textarea class="form-control" id="address" name="address" v-model="customer_store.form.data.address" rows="5"></textarea>                                    
                                    </div>
                                    
                                    <div class="col-md-12 my-2">
                                        <label for="note" class="form-label">หมายเหตุ :</label>
                                        <textarea class="form-control" id="note" name="note" v-model="customer_store.form.data.note" rows="5"></textarea>                                    
                                    </div>
                                </div>

                                <div class="form-group row my-2">
                                    <div class="col-sm-12 d-flex justify-content-center">


                                        <router-link class="btn btn-secondary btn-icon-split mx-1" to="/app/customer">
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
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, watch ,onMounted } from "vue";
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
}

onMounted(async() => {

});

const onSubmit = async () => {
    try {
        const response  = await axios.post(customer_store.url.store_customer, customer_store.form.data)
        if (response.status == 200) {
            await Swal.fire({
            icon: "success",
            title: "success",
            text: response.message,
            }).then((result) => {
                router.push('/app/customer');
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


</script>
<style>
    
</style>