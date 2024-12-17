<style>
.btn-equal-size {
  width: 150px;
}
</style>
<template>
  <main class="content">
    <div class="container-fluid p-0">
      <div class="d-flex justify-content-between m-2">
        <h1 class="h3 mb-3"><strong>หน้าแรก</strong></h1>

        <!-- <router-link class="btn btn-success pt-2" to="/app/FormCustomer">
          <i class="bi bi-plus"></i>เพิ่มข้อมูล
        </router-link> -->
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne"
                      aria-expanded="false"
                      aria-controls="flush-collapseOne"
                    >
                      โรงรถ
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div class="container">
                        <div class="row g-3">
                          <div class="col-12 col-md-4"  v-for="(list, index) in master_project_store.data_garage_list" :key="index">
                            
                            <div class="card" style="width: 18rem">
                              <img
                                :src="list.img ?list.img : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'"
                                class="card-img-top"
                                :alt="list.project_code"
                              />
                              <div class="card-body">
                                <h5 class="card-title">{{list.project_name}}</h5>
                                <p class="card-text">
                                  ค่าใช้จ่าย {{formatMoney(list.min_price)}} - {{formatMoney(list.max_price)}} บาท
                                </p>
                                <p class="card-text">
                                  {{list.note}}
                                </p>
                                <router-link class="btn btn-primary" :to="`/app/Customer/CustomerProjectGarageType/detail/${ list.id }`"><i class="bi bi-pencil-square"></i> ดูรายละเอียด</router-link>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseTwo"
                      aria-expanded="false"
                      aria-controls="flush-collapseTwo"
                    >
                      ระแนง
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingTwo"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">x</div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseThree"
                      aria-expanded="false"
                      aria-controls="flush-collapseThree"
                    >
                      ระเบียง
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">xx</div>
                  </div>
                </div>
              </div>
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

const master_project_store = masterProjectStore();


onMounted(async() => {

  await master_project_store.getDataGarageList();

});

</script>
<style>
</style>