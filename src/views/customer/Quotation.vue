<template>
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <h2 class="mb-0">ใบเสนอราคา</h2>
      <button class="btn btn-dark" @click="addNewQuotation">
        + เพิ่มข้อมูล
      </button>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>เลขที่ใบเสนอราคา</th>
              <th>ชื่อใบเสนอราคา</th>
              <th>รหัสลูกค้า</th>
              <th>ราคา</th>
              <th>จัดการข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="quotation in quotations" :key="quotation.id">
              <td>{{ quotation.id }}</td>
              <td>{{ quotation.name }}</td>
              <td>{{ quotation.customerCode }}</td>
              <td>{{ formatPrice(quotation.price) }}</td>
              <td>
                <button
                  class="btn btn-sm btn-primary me-2"
                  @click="editQuotation(quotation)"
                >
                  แก้ไข
                </button>
                <button
                  class="btn btn-sm btn-secondary me-2"
                  @click="deleteQuotation(quotation)"
                >
                  ลบ
                </button>
                <button
                  class="btn btn-sm btn-info"
                  @click="addToProject(quotation)"
                >
                  เพิ่มโครงการ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quotations: [
        {
          id: "B0001",
          name: "โรงรถแบริ่ม",
          customerCode: "C0001",
          price: 200000,
        },
        {
          id: "B0002",
          name: "โครงสร้างคอนกรีต",
          customerCode: "C0002",
          price: 120000,
        },
        {
          id: "B0003",
          name: "บ้านน็อคดาวน์สรค",
          customerCode: "C0003",
          price: 500000,
        },
      ],
    };
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString("th-TH");
    },
    addNewQuotation() {
      // Logic to add a new quotation
      console.log("Adding new quotation");
    },
    editQuotation(quotation) {
      // Logic to edit a quotation
      console.log("Editing quotation:", quotation.id);
    },
    deleteQuotation(quotation) {
      // Logic to delete a quotation
      console.log("Deleting quotation:", quotation.id);
    },
    addToProject(quotation) {
      // Logic to add quotation to a project
      console.log("Adding quotation to project:", quotation.id);
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
</style>
