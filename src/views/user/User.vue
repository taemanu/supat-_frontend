<style>
	.btn-equal-size {
		width: 90px;
	}
</style>
<template>
    <main class="content">
        <div class="container-fluid p-0 ">
            <div class="d-flex justify-content-between m-2" >
                <h1 class="h3 mb-3"><strong>ผู้ใช้งานระบบ</strong></h1>
                <!-- <router-link class="btn btn-success" ><i class="fas fa-check"></i> เพิ่มข้อมูล</router-link> -->

				<!-- <router-link class="btn btn-success pt-2" to="/app/FormUser">
                	<i class="fas fa-check"></i>เพิ่มข้อมูล
				</router-link> -->
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <div class="card-body" >
                            <div class="table-responsive" v-if="loading">
									<table class="mb-0 table table-bordered">
										<thead>
											<tr>
												<th class="text-center align-middle" scope="col">#</th>
												<!-- <th class="text-center align-middle" scope="col">รูปภาพประจำตัว</th> -->
												<th class="text-center align-middle" scope="col">รหัสผู้ใช้งาน	</th>
												<th class="text-center align-middle" width="25%" scope="col">ชื่อ - นามสกุล</th>
												<th class="text-center align-middle" scope="col">สิทธ์การใช้งาน</th>
												<th class="text-center align-middle" scope="col">วันที่สร้าง</th>
												<th class="text-center align-middle" scope="col">สถานะ</th>
												<th class="text-center " width="15%" scope="col">จัดการ</th>
	
											</tr>
										</thead>
										<tbody>
											<tr v-for="(list, index) in user_store.data_list" :key="index" >
												<th class="text-center align-middle" scope="row">
												{{ index + 1}}
												</th>
												<td class="text-center align-middle" scope="row">
													{{ list.user_id }}
												</td>
												<td class="text-center align-middle" scope="row">
													{{ list.name }}
												</td>
												<td class="text-center align-middle" scope="row">
													{{ list.role }}
												</td>
												<td class="text-center align-middle" scope="row">
													{{ formatThaiDate(list.created_at) }}
												</td>
												<td class="text-center align-middle" scope="row">
													<span
													class="btn btn-success btn-equal-size"
													v-if="list.status == 'active'"
													>ใช้งาน</span
													>
													<span class="btn btn-danger btn-equal-size" v-else
													>ไม่ใช้งาน</span
													>
												</td>

												<td class="text-center align-middle">
													<button type="button" class="btn btn-info m-1 btn-equal-size" @click="openModal(list)">
														<i class="bi bi-pencil-square"></i> แก้ไขข้อมูล
													</button>
												</td>
	
											</tr>

											<!-- <tr v-else>
												<td class="text-center" colspan="10">ไม่พบข้อมูล</td>
											</tr> -->
										</tbody>
									</table>
							</div>
							<SectionLoading v-else/>
                        </div>
                    </div>
                </div>

				<div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
					<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
						<h5 class="modal-title" id="editUserModalLabel">แก้ไขข้อมูลผู้ใช้</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>

						<div class="modal-body">
							<form @submit.prevent="handleSubmit">
							<div class="mb-3">
							<label class="form-label">สถานะ:</label>
							<select v-model="editedUser.status" class="form-select">
								<option value="active">ใช้งาน</option>
								<option value="inactive">ปิดการใช้งาน</option>
							</select>
							</div>
							
							<div class="mb-3">
							<label class="form-label">User ID:</label>
							<input type="text" class="form-control" v-model="editedUser.user_id">
							</div>
							
							<div class="mb-3">
							<label class="form-label">รหัสผ่าน:</label>
							<input type="password" class="form-control" v-model="editedUser.password_user">
							</div>
							
							<!-- <div class="mb-3">
							<label class="form-label">บทบาท:</label>
							<select v-model="editedUser.role" class="form-select">
								<option value="admin">Admin</option>
								<option value="manager">Manager</option>
								<option value="user">User</option>
							</select>
							</div>  -->
							
							<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
							<button type="submit" class="btn btn-primary">บันทึก</button>
							</div>
						</form>
						</div>



					</div>
				</div>

			<!-- <div class="modal fade" id="editUserModal" tabindex="-1" aria-labelledby="editUserModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
						<h5 class="modal-title" id="editUserModalLabel">แก้ไขข้อมูลผู้ใช้</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
						<form @submit.prevent="handleSubmit">
							<div class="mb-3">
							<label class="form-label">สถานะ:</label>
							<select v-model="editedUser.status" class="form-select">
								<option value="active">ใช้งาน</option>
								<option value="inactive">ปิดการใช้งาน</option>
							</select>
							</div>
							
							<div class="mb-3">
							<label class="form-label">User ID:</label>
							<input type="text" class="form-control" v-model="editedUser.user_id">
							</div>
							
							<div class="mb-3">
							<label class="form-label">รหัสผ่าน:</label>
							<input type="password" class="form-control" v-model="editedUser.password_user">
							</div>
							
							<div class="mb-3">
							<label class="form-label">บทบาท:</label>
							<select v-model="editedUser.role" class="form-select">
								<option value="admin">Admin</option>
								<option value="manager">Manager</option>
								<option value="user">User</option>
							</select>
							</div> 
							
							<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ยกเลิก</button>
							<button type="submit" class="btn btn-primary">บันทึก</button>
							</div>
						</form>
						</div>
					</div>
				</div>
			</div> -->

        </div>
        </div>
        </div>
    </main>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { userAuthStore } from "@/stores/models/userAuthStore";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  formatThaiDate, 
  formatPrice,
  validateMoneyInput,
  formatMoney
} from '@/utils/basefunction'

const user_store = userAuthStore();
const loading = ref(true);

const emit = defineEmits(['update'])
const editedUser = ref({
  status: '',
  user_id: '',
  password_user: '',
  role: ''
})
let modal = null

onMounted(async () => {
  try {
    loading.value = false
    await user_store.getDataList();

  } finally {
    await setTimeout((loading.value = true))
  }
});

const openModal = (userData) => {
  
editedUser.value = {
    status: userData.status,
    user_id: userData.user_id,
    password_user: userData.password_user,
    role: userData.role
  }

  const modal = new bootstrap.Modal(document.getElementById('editUserModal'));

  modal.show();
}

</script>
<style>
    
</style>