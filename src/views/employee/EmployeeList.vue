<template>
  <div class="card">
    <div class="card-header">
      <h2 class="mb-0">ข้อมูลพนักงาน</h2>
    </div>
    <div class="card-body">
      <h3 class="mb-3">ข้อมูลพนักงานทั้งหมด</h3>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>รหัสพนักงาน</th>
              <th>ชื่อ-นามสกุล</th>
              <th>ตำแหน่ง</th>
              <th>รหัสผู้ใช้งาน</th>
              <th>เบอร์โทรศัพท์</th>
              <th>เงินเดือน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.userId }}</td>
              <td>{{ formatPhoneNumber(employee.phone) }}</td>
              <td>{{ formatSalary(employee.salary) }}</td>
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
      employees: [
        {
          id: "E0001",
          name: "นาย มิคม บุญแดง",
          position: "พนักงานทั่วไป",
          userId: "U0001",
          phone: "0987654321",
          salary: 12000,
        },
        {
          id: "E0002",
          name: "นาย คามุพงษ์ เทพเมือง",
          position: "พนักงานบัญชีและการจัดการ",
          userId: "U0002",
          phone: "0654789123",
          salary: 15000,
        },
        {
          id: "E0003",
          name: "นาย สมชาย มานะดี",
          position: "พนักงานทั่วไป",
          userId: "U0003",
          phone: "0897654123",
          salary: 18000,
        },
      ],
    };
  },
  methods: {
    formatPhoneNumber(phone) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    },
    formatSalary(salary) {
      return new Intl.NumberFormat("th-TH", { style: "decimal" }).format(
        salary
      );
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
  white-space: nowrap;
}
</style>
