<template>
  <div class="card">
    <div class="card-header">
      <h2 class="mb-0">ข้อมูลการเงิน , ค่าใช้จ่ายโครงการ , ค่าใช้จ่ายอื่นๆ , กำไร - ขาดทุน</h2>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>รหัสโครงการ</th>
              <th>รายได้</th>
              <th>ค่าใช้จ่าย</th>
              <th>กำไรสุทธิ</th>
              <th>จัดการข้อมูล</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.id">
              <td>{{ project.id }}</td>
              <td>{{ formatCurrency(project.income) }}</td>
              <td>{{ formatCurrency(project.expenses) }}</td>
              <td
                :class="{
                  'text-success': project.profit > 0,
                  'text-danger': project.profit < 0,
                }"
              >
                {{ formatCurrency(project.profit) }}
              </td>
              <td>
                <button
                  class="btn btn-dark btn-sm"
                  @click="manageProject(project)"
                >
                  Button
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
      projects: [
        { id: "P0001", income: "xxxxx", expenses: 25000, profit: 100000 },
        { id: "P0002", income: "xxxxxx", expenses: 15000, profit: -15000 },
        { id: "P0003", income: "xxxxx", expenses: 18000, profit: 50000 },
      ],
    };
  },
  methods: {
    formatCurrency(value) {
      if (value === "xxxxx" || value === "xxxxxx") return value;
      return new Intl.NumberFormat("th-TH", { style: "decimal" }).format(value);
    },
    manageProject(project) {
      // Logic to manage the project
      console.log("Managing project:", project.id);
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
.text-success {
  color: #28a745;
}
.text-danger {
  color: #dc3545;
}
</style>
