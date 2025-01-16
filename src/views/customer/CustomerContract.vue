<style>
.btn-equal-size {
  width: 150px;
}
</style>
<template>
  <main class="content">
    <div class="container-fluid p-0">
      <div class="d-flex justify-content-between m-2">
        <h1 class="h3 mb-3"><strong>สัญญาจ้าง</strong></h1>

        <!-- <router-link class="btn btn-success pt-2" to="/app/FormCustomer">
          <i class="bi bi-plus"></i>เพิ่มข้อมูล
        </router-link> -->
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">

            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { userAuthStore } from "@/stores/models/userAuthStore";
import { masterProjectStore } from "@/stores/models/masterProjectStore";
import { useRouter } from "vue-router";
import { 
  formatThaiDate, 
  formatPrice,
  validateMoneyInput,
  formatMoney
} from '@/utils/basefunction'
import axios from "axios";
import Swal from "sweetalert2";



onMounted(async() => {


});

</script>
<style>
</style>