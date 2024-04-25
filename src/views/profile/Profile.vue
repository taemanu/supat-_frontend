<style scoped>
.vuejs3-datepicker__value {
    border: none;
}
</style>
<template>
    <main class="content">
        <div class="container-fluid p-0">

            <h1 class="h3 mb-3"><strong>Profile</strong></h1>

            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <div class="card-body">
                            <form id="insert-user" action="" autocomplete="off">
                                <div class="row">
                                    <div class="col-md-4 my-2">
                                        <label for="id-card" class="form-label">เลขประจำตัวประชาชน :</label>
                                        <input type="text" id="id-card" class="form-control" aria-describedby="id-card-HelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="firstname" class="form-label">ชื่อจริง :</label>
                                        <input type="text" id="firstname" class="form-control" aria-describedby="firstname-HelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="lastname" class="form-label">นามสกุล :</label>
                                        <input type="text" id="lastname" class="form-control" aria-describedby="lastnameHelpBlock">
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="birthdath" class="form-label">วันเกิด :</label>
                                        <!-- <input type="date" id="birthdath" class="form-control" aria-describedby="birthdathHelpBlock"> -->
                                        <VueDatePicker v-model="date" :format="format" :enable-time-picker="false" :format-locale="th"></VueDatePicker>

                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="phonenumber" class="form-label">เบอร์โทร :</label>
                                        <input type="text" id="phonenumber" class="form-control" aria-describedby="phonenumberHelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="startwork" class="form-label">วันที่เริ่มทำงาน :</label>
                                        <!-- <input type="date" id="startwork" class="form-control" aria-describedby="startworkHelpBlock"> -->
                                        <VueDatePicker v-model="date" :format="format" :enable-time-picker="false" :format-locale="th"></VueDatePicker>
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="wage" class="form-label">ค่าแรง/วัน :</label>
                                        <input type="text" id="wage" class="form-control" aria-describedby="wageHelpBlock">
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="position" class="form-label">ตำแหน่ง :</label>
                                        <select name="position" class="form-select" aria-label="Default select position">
                                            <option selected>ตำแหน่ง 1</option>
                                            <option value="1">ตำแหน่ง 2</option>
                                            <option value="2">ตำแหน่ง 3</option>
                                            <option value="3">ตำแหน่ง 4</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="role" class="form-label">สิทธ์การใช้งาน :</label>
                                        <select name="role" class="form-select" aria-label="Default select role">
                                            <option selected>สิทธ์การใช้งาน 1</option>
                                            <option value="1">สิทธ์การใช้งาน 2</option>
                                            <option value="2">สิทธ์การใช้งาน 3</option>
                                            <option value="3">สิทธ์การใช้งาน 4</option>
                                        </select>
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="status" class="form-label">สถานะ :</label>
                                        <select name="status" class="form-select" aria-label="Default select status">
                                            <option selected>สถานะ 1</option>
                                            <option value="1">สถานะ 2</option>
                                            <option value="2">สถานะ 3</option>
                                        </select>
                                    </div>

                                    <div class="col-md-8 my-2">
                                        <label for="status" class="form-label">รูปภาพประจำตัว :</label>
                                        <div class="input-group mb-3">
                                        <input type="file" class="form-control" id="file_picuser">
                                        <label class="input-group-text" for="file_picuser">Upload</label>
                                        </div>
                                    </div>


                                    <div class="col-md-12 my-2">
                                        <label for="address" class="form-label">ที่อยู่ :</label>
                                        <textarea class="form-control" id="address" rows="5"></textarea>                                    
                                    </div>
                                    
                                    <div class="col-md-12 my-2">
                                        <label for="note" class="form-label">หมายเหตุ :</label>
                                        <textarea class="form-control" id="note" rows="5"></textarea>                                    
                                    </div>
                                </div>

                                <div class="form-group row my-2">
                                    <div class="col-sm-12 d-flex justify-content-center">


                                        <router-link class="btn btn-secondary btn-icon-split mx-1" to="/app/permission">
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
    </main>
</template>
<script>
import { ref } from 'vue';
import { th } from 'date-fns/locale';

export default {
    components: {
        
    },
    setup() {
        var date = new Date()
        const format = (date) => {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear()+543;

            return `${day}/${month}/${year}`;
        }
        return {
            date,
            th,
            format
        }
    }
}
</script>
