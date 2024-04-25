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
                            <form id="insert-user" action="" autocomplete="off">
                                <div class="row">
                                    <div class="col-md-4 my-2">
                                        <label for="id-card" class="form-label">เลขประจำตัวผู้เสียภาษี :</label>
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
                                        <label for="tel" class="form-label">เบอร์โทร :</label>
                                        <input type="number" id="tel" class="form-control" aria-describedby="telHelpBlock">
                                    </div>
                                    <div class="col-md-4 my-2">
                                        <label for="email" class="form-label">E-mail :</label>
                                        <input type="text" id="email" class="form-control" aria-describedby="emailHelpBlock">
                                    </div>

                                    <div class="col-md-4 my-2">
                                        <label for="status" class="form-label">สถานะ :</label>
                                        <select name="status" class="form-select" aria-label="Default select status">
                                            <option selected>สถานะ 1</option>
                                            <option value="1">สถานะ 2</option>
                                            <option value="2">สถานะ 3</option>
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
                                        <textarea class="form-control" id="address" rows="5"></textarea>                                    
                                    </div>
                                    
                                    <div class="col-md-12 my-2">
                                        <label for="note" class="form-label">หมายเหตุ :</label>
                                        <textarea class="form-control" id="note" rows="5"></textarea>                                    
                                    </div>
                                </div>

                                <div class="form-group row my-2">
                                    <div class="col-sm-12 d-flex justify-content-center">


                                        <router-link class="btn btn-secondary btn-icon-split mx-1" to="/app/user">
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
</script>
<style>
    
</style>