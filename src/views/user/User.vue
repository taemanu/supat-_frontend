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

				<router-link class="btn btn-success pt-2" to="/app/FormUser">
                	<i class="fas fa-check"></i>เพิ่มข้อมูล
				</router-link>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">

                        <div class="card-body">
                            <div class="table-responsive">
									<table class="mb-0 table table-bordered">
										<thead>
											<tr>
												<th class="text-center align-middle" scope="col">#</th>
												<th class="text-center align-middle" scope="col">รูปภาพประจำตัว</th>
												<th class="text-center align-middle" scope="col">รหัสสมาชิก</th>
												<th class="text-center align-middle" width="25%" scope="col">ชื่อ - นามสกุล</th>
												<th class="text-center align-middle" scope="col">ตำแหน่ง</th>
												<th class="text-center align-middle" scope="col">สิทธ์การใช้งาน</th>
												<th class="text-center align-middle" scope="col">สถานะ</th>
												<th class="text-center " width="15%" scope="col">จัดการ</th>
	
											</tr>
										</thead>
										<tbody>
											<tr>
												<th class="text-center align-middle" scope="row">
													1
												</th>
												<td class="text-center align-middle">
													<img src="../../assets/img/avatars/avatar-2.jpg" width="56" height="56" class="rounded-circle me-2" alt="Vanessa Tucker">
												</td>
												<td class="text-center align-middle">
													SP-001
												</td>
												<td class="text-left align-middle">
													นาย ภานุพงษ์ เทพเมือง
												</td>
												<td class="text-center align-middle">
													ผู้จัดการ
												</td>
												<td class="text-center align-middle">
													ผู้ดูแลระบบ
												</td>
												<td class="text-center align-middle">
													<span class="btn btn-success">ปกติ</span>
												</td>
												<td class="text-center align-middle">

													<button type="button" class="btn btn-info m-1 btn-equal-size" data-bs-toggle="modal" data-bs-target="#viewUser">
														<i class="bi bi-eye"></i>
														ดูข้อมูล
													</button>

													<button type="button" class="btn btn-warning m-1 btn-equal-size">
														<i class="bi bi-pencil-square"></i>
														แก้ไข
													</button>
												</td>
											</tr>

											<tr>
												<th class="text-center align-middle" scope="row">
													2
												</th>
												<td class="text-center align-middle">
													<img src="../../assets/img/avatars/avatar-3.jpg" width="56" height="56" class="rounded-circle me-2" alt="Vanessa Tucker">
												</td>
												<td class="text-center align-middle">
													SP-002
												</td>
												<td class="text-left align-middle">
													นาย ภูวนาถ จิตรีเชื้อ
												</td>
												<td class="text-center align-middle">
													พนักงาน
												</td>
												<td class="text-center align-middle">
													สมาชิก
												</td>
												<td class="text-center align-middle">
													<span class="btn btn-success">ปกติ</span>
												</td>
												<td class="text-center align-middle">

													<button type="button" class="btn btn-info m-1 btn-equal-size" data-bs-toggle="modal" data-bs-target="#viewUser">
														<i class="bi bi-eye"></i>
														ดูข้อมูล
													</button>

													<button type="button" class="btn btn-warning m-1 btn-equal-size">
														<i class="bi bi-pencil-square"></i>
														แก้ไข
													</button>
												</td>
											</tr>
										</tbody>
									</table>
							</div>
                        </div>
                    </div>
                </div>


				<!-- Modal -->
				<div class="modal fade" id="viewUser" tabindex="-1" aria-labelledby="viewUserLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg">
						<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="viewUserLabel">Modal title</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body px-auto">
							<div class="row mb-2">
								<div class="text-center col-md-12">
									<img src="../../assets/img/avatars/avatar-2.jpg" width="86" height="86" class="rounded-circle me-2" alt="Vanessa Tucker">
								</div>
							</div>
							<div class="row mb-2">

								<div class="col-md-4 my-2">
									<label for="id-card" class="form-label">เลขประจำตัวประชาชน :</label>
									<input type="text" id="id-card" class="form-control" aria-describedby="id-card-HelpBlock" disabled value="-">
								</div>
								<div class="col-md-4 my-2">
									<label for="first-name" class="form-label">ชื่อจริง :</label>
									<input type="text" id="first-name" class="form-control" aria-describedby="first-name-HelpBlock" disabled value="-">
								</div>
								<div class="col-md-4 my-2">
									<label for="last-name" class="form-label">นามสกุล :</label>
									<input type="text" id="last-name" class="form-control" aria-describedby="last-name-HelpBlock" disabled value="-">
								</div>

								


							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<!-- <button type="button" class="btn btn-primary">Save changes</button> -->
						</div>
						</div>
					</div>
				</div>

            </div>



        </div>
    </main>
</template>
<script setup>
</script>
<style>
    
</style>