<style>
	.btn-equal-size {
		width: 90px;
	}
</style>
<template>

  <main class="content">
      <div class="container-fluid p-0 ">
        <div class="d-flex justify-content-between m-2" >
          <h1 class="h3 mb-4"><strong>โครงการ</strong></h1>
          <button type="button" class="btn btn-success pt-2">
              <i class="bi bi-plus"></i>สร้างโครงการ
          </button>
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <h1 class="h3 mb-4"><strong>โครงการ</strong></h1>
    
          <h2 class="h4 mb-3">โครงการที่กำลังดำเนินการ</h2>
          <div class="table-responsive mb-4">
            <table class="table table-bordered mb-0">
              <thead>
                <tr>
                  <th class="text-center">รหัสโครงการ</th>
                  <th class="text-center">เลขใบเสนอราคา</th>
                  <th class="text-center">ชื่อโครงการ</th>
                  <th class="text-center">วันที่เริ่มสัญญา</th>
                  <th class="text-center">กำหนดส่งงาน</th>
                  <th class="text-center">แบบงาน</th>
                  <th class="text-center">การอนุมัติ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in ongoingProjects" :key="project.id">
                  <td class="text-center">{{ project.id }}</td>
                  <td class="text-center">{{ project.quoteId }}</td>
                  <td>{{ project.name }}</td>
                  <td class="text-center">{{ project.startDate }}</td>
                  <td class="text-center">{{ project.dueDate }}</td>
                  <td class="text-center">{{ project.blueprint }}</td>
                  <td class="text-center">
                    <button type="button" class="btn btn-primary me-2">
                      <i class="fas fa-plus"></i> อนุมัติ
                    </button>
    
                    <button type="button" class="btn btn-danger">
                      <i class="fas fa-plus"></i> ไม่อนุมัติ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    
          <h2 class="h4 mb-3">โครงการทั้งหมด</h2>
          <p class="text-danger mb-2">คลิกที่ชื่อโครงการเพื่อดูความก้าวหน้า</p>
          <div class="table-responsive">
            <table class="table table-bordered mb-0">
              <thead>
                <tr>
                  <th class="text-center">รหัสโครงการ</th>
                  <th class="text-center">เลขใบเสนอราคา</th>
                  <th class="text-center">ชื่อโครงการ</th>
                  <th class="text-center">วันที่เริ่มสัญญา</th>
                  <th class="text-center">กำหนดส่งงาน</th>
                  <th class="text-center">สัญญา</th>
                  <th class="text-center">แบบงาน</th>
                  <th class="text-center">ราคา</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="project in allProjects" :key="project.id">
                  <td class="text-center">{{ project.id }}</td>
                  <td class="text-center">{{ project.quoteId }}</td>
                  <td>
                    <a href="#" @click.prevent="showProjectDetails(project.id)">{{
                      project.name
                    }}</a>
                  </td>
                  <td class="text-center">{{ project.startDate }}</td>
                  <td class="text-center">{{ project.dueDate }}</td>
                  <td class="text-center">{{ project.contract }}</td>
                  <td class="text-center">{{ project.blueprint }}</td>
                  <td class="text-end">{{ formatPrice(project.price) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  </main>

</template>

<script>
export default {
  data() {
    return {
      ongoingProjects: [
        {
          id: "P0001",
          quoteId: "B0001",
          name: "โรงคนแม่น",
          startDate: "01/02/2567",
          dueDate: "10/02/2567",
          blueprint: "aaaaa.pdf",
        },
        {
          id: "P0002",
          quoteId: "B0002",
          name: "บ้านน็อคดาวน์สารคี",
          startDate: "19/02/2567",
          dueDate: "29/02/2567",
          blueprint: "bbbbb.pdf",
        },
        {
          id: "P0003",
          quoteId: "B0003",
          name: "โรงหล่อหลอมแก้ว",
          startDate: "24/03/2567",
          dueDate: "30/03/2567",
          blueprint: "ccccc.pdf",
        },
      ],
      allProjects: [
        {
          id: "P0001",
          quoteId: "B0001",
          name: "โรงคนแม่น",
          startDate: "01/02/2567",
          dueDate: "10/02/2567",
          contract: "aaaaa.pdf",
          blueprint: "aaaaa.pdf",
          price: 75000,
        },
        {
          id: "P0002",
          quoteId: "B0002",
          name: "บ้านน็อคดาวน์สารคี",
          startDate: "19/02/2567",
          dueDate: "29/02/2567",
          contract: "bbbbb.pdf",
          blueprint: "bbbbb.pdf",
          price: 180000,
        },
        {
          id: "P0003",
          quoteId: "B0003",
          name: "โรงหล่อหลอมแก้ว",
          startDate: "24/03/2567",
          dueDate: "30/03/2567",
          contract: "ccccc.pdf",
          blueprint: "ccccc.pdf",
          price: 100900,
        },
      ],
    };
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString("th-TH");
    },
    showProjectDetails(projectId) {
      // Implement logic to show project details
      console.log(`Showing details for project ${projectId}`);
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 1rem;
}
.table th,
.table td {
  vertical-align: middle;
}
.table td {
  white-space: nowrap;
}
</style>
