<template>
    <div class="content">
        <div class="container-fluid p-0 ">
            <div class="d-flex justify-content-between m-2" >
                <h1 class="h3 mb-3"><strong>เพิ่ม/แก้ไข โครงการ</strong></h1>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <div class="card-body">
                            <form id="insert-project" @submit.prevent="onSubmit" autocomplete="off">
                                <div class="row">
                                    <div class="col-md-4 my-2">
                                        <label for="id-card" class="form-label">รหัสโครงการ :</label>
                                        <input type="text" id="id_project" name="id_project" v-model="project_store.form.data.id_project" class="form-control" aria-describedby="id-card-HelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="code_quo" class="form-label">เลขใบเสนอราคา :</label>
                                        <input type="text" id="code_quo" name="code_quo" v-model="project_store.form.data.code_quo" class="form-control" aria-describedby="code-quo-HelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="name_project" class="form-label">ชื่อโครงการ :</label>
                                        <input type="text" id="name_project" name="name_project" v-model="project_store.form.data.name_project" class="form-control" aria-describedby="name-project-HelpBlock">
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="date_contract" class="form-label">วันที่เริ่มสัญญา :</label>
                                        <input type="date" id="date_contract" name="date_contract" v-model="project_store.form.data.date_contract" class="form-control" aria-describedby="date-contract-HelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="date_end" class="form-label">กำหนดส่งงาน :</label>
                                        <input type="date" id="date_end" name="date_end" v-model="project_store.form.data.date_end" class="form-control" aria-describedby="date-end-HelpBlock">
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="status" class="form-label">สถานะ :</label>
                                        <select name="status" class="form-select" v-model="project_store.form.data.status" aria-label="Default select status">
                                            <option value="1" selected>รออนุมัติ</option>
                                            <option value="2">อนุมัติ</option>
                                        </select>
                                    </div>

                                    <div class="col-md-12 my-2">
                                        <label for="status" class="form-label">สัญญา :</label>
                                        <div class="input-group mb-3">
                                        <input type="file" class="form-control" id="file_contract">
                                        <label class="input-group-text" for="file_contract">Upload</label>
                                        </div>
                                    </div>

                                    <div class="col-md-12 my-2">
                                        <label for="status" class="form-label">แบบงาน :</label>
                                        <div class="input-group mb-3">
                                        <input type="file" class="form-control" id="file_task">
                                        <label class="input-group-text" for="file_task">Upload</label>
                                        </div>
                                    </div>


                                    
                                    <div class="col-md-12 my-2">
                                        <label for="note" class="form-label">หมายเหตุ :</label>
                                        <textarea class="form-control" id="note" name="note" v-model="project_store.form.data.note" rows="5"></textarea>                                    
                                    </div>
                                </div>

                                <div class="form-group row my-2">
                                    <div class="col-sm-12 d-flex justify-content-center">


                                        <router-link class="btn btn-secondary btn-icon-split mx-1" to="/app/ProjectList">
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
import { ProjectStore } from "@/stores/models/ProjectStore";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const project_store = ProjectStore();
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
        const response  = await axios.post(project_store.url.store_project, project_store.form.data)
        if (response.status == 200) {
            await Swal.fire({
            icon: "success",
            title: "success",
            text: response.message,
            }).then((result) => {
                router.push('/app/ProjectList');
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