<template>
  <div class="card">
    <div class="card-body">
      <h1 class="h3 mb-3"><strong>ใบสั่งซื้อวัสดุ</strong></h1>

      <h2 class="h4 mb-3">รออนุมัติ</h2>
      <div class="table-responsive">
        <table class="table table-bordered mb-0">
          <thead>
            <tr>
              <th class="text-center">เลขที่ใบสั่งซื้อ</th>
              <th class="text-center">รหัสโครงการ</th>
              <th class="text-center">ชื่อใบสั่งซื้อ</th>
              <th class="text-center">วันที่</th>
              <th class="text-center">ราคาสุทธิ</th>
              <th class="text-center">การอนุมัติ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in purchaseOrders" :key="order.id">
              <td class="text-center">{{ order.id }}</td>
              <td class="text-center">{{ order.projectId }}</td>
              <td>{{ order.name }}</td>
              <td class="text-center">{{ order.date }}</td>
              <td class="text-center">{{ formatPrice(order.price) }}</td>
              <td class="text-center">
                <span class="me-2">✓</span>
                <span>✗</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 class="h4 mb-3 mt-4">ใบสั่งซื้อทั้งหมด</h2>
      <div class="table-responsive">
        <table class="table table-bordered mb-0">
          <thead>
            <tr>
              <th class="text-center">เลขที่ใบสั่งซื้อ</th>
              <th class="text-center">รหัสโครงการ</th>
              <th class="text-center">ชื่อใบสั่งซื้อ</th>
              <th class="text-center">วันที่</th>
              <th class="text-center">ราคาสุทธิ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in purchaseOrders" :key="order.id">
              <td class="text-center">{{ order.id }}</td>
              <td class="text-center">{{ order.projectId }}</td>
              <td>{{ order.name }}</td>
              <td class="text-center">{{ order.date }}</td>
              <td class="text-center">{{ formatPrice(order.price) }}</td>
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
      purchaseOrders: [
        {
          id: "N0001",
          projectId: "P0001",
          name: "สั่งเหล็ก",
          date: "01/02/2567",
          price: 12000,
        },
        {
          id: "N0002",
          projectId: "P0001",
          name: "สั่งเหล็กดา PU ไฟม",
          date: "19/02/2567",
          price: 35000,
        },
        {
          id: "N0003",
          projectId: "P0002",
          name: "แผ่นสมาทบอร์ด",
          date: "24/03/2567",
          price: 9900,
        },
      ],
    };
  },
  methods: {
    formatPrice(price) {
      return price.toLocaleString("th-TH");
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
