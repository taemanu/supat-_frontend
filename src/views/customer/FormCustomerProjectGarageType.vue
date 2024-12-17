<style>
.btn-equal-size {
  width: 150px;
}
</style>
<template>
  <main class="content">
    <div class="container-fluid p-0">
      <div class="d-flex justify-content-between m-2">
        <h1 class="h3 mb-3"><strong>รายละเอียด {{master_project_store.form.data_garage.name}} </strong></h1>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-center mb-5">
                    <img
                        :src="master_project_store.form.data_garage.img ? master_project_store.form.data_garage.img : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'"
                        alt=""
                        class="img-fluid"
                        style="max-width: 700px; height: auto;"
                    />
                </div>
                <hr>
                <div class="mt-4">
                    <div class="row g-3 mb-4">
                        <div class="col-12 col-md-4">
                            <div class="">
                                <h4>
                                    <label for="steel" class="form-label">ชนิดเหล็ก</label>
                                </h4>
                                <div>
                                    <div class="form-check form-check-inline" v-for="(list, index) in master_project_store.form.data_garage.type_steel" :key="index">
                                        <input class="form-check-input" type="radio" name="steel" :id="`steel-standard-${index}`" :value="list" v-model="steel_type">
                                        <label class="form-check-label" :for="`steel-standard-${index}`">{{ list }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="">
                                <h4>
                                    <label for="steel" class="form-label">ความหนาเหล็ก</label>
                                </h4>
                                <div>
                                    <select class="form-select form-control" id="thickness" name="thickness" v-model="steel_thickness">
                                        <option v-for="(list2, index2) in master_project_store.form.data_garage.thickness_steel" :key="index2"  :value="list2" >
                                            {{list2}}
                                        </option>

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="">
                                <h4>
                                    <label for="steel" class="form-label">สีเหล็ก</label>
                                </h4>
                                <div>
                                    <input type="color" class="form-control form-control-color" id="exampleColorInput" v-model="steel_color" title="Choose your color" style="width: 200px;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-12 col-md-4">
                            <div class="">
                                <h4>
                                    <label for="steel" class="form-label">แผ่นหลังคา</label>
                                </h4>
                                <div>
                                    <select class="form-select form-control" id="sheet" name="sheet" v-model="type_sheet">
                                        <option  v-for="(list3, index3) in master_project_store.form.data_garage.type_sheet" :key="index3"  :value="list3">
                                            {{list3}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-4">
                            <div class="">
                                <h4>
                                    <label for="steel" class="form-label">สีหลังคา</label>
                                </h4>
                                <div>
                                    <input type="color" class="form-control form-control-color" id="exampleColorInput" v-model="sheet_color" title="Choose your color" style="width: 200px;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3 mb-4">
                        <div class="col-12 col-md-12">
                            <div class="">
                                <h4>
                                    <label for="steel" class="form-label">หมายเหตุ</label>
                                </h4>
                                <div>
                                    <textarea v-model="note" class="form-control" name="" id="" cols="30" rows="10">

                                    </textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                    
                    <div class="d-flex justify-content-center">
                        <button @click="onSubmit(master_project_store.form.data_garage.id)" class="btn btn-primary" >บันทึก</button>
                        <a href="" class="btn btn-secondary mx-2">ยกเลิก</a>
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
import { ref, reactive, computed, watch ,onMounted } from "vue";
import { userAuthStore } from "@/stores/models/userAuthStore";
import { masterProjectStore } from "@/stores/models/masterProjectStore";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const project = ref(null);
const master_project_store = masterProjectStore();

const id_garage = ref(null);
const steel_type = ref(null);
const steel_thickness = ref(null);
const steel_color = ref(null);

const type_sheet = ref(null);
const sheet_color = ref(null);

const note = ref(null);

onMounted(async() => {
    project.value = route.params.id;
    await master_project_store.getDataGarageDetail(project.value);

    id_garage.value = route.params.id;
    steel_type.value = master_project_store.form.data_garage.type_steel[0];
    steel_thickness.value = master_project_store.form.data_garage.thickness_steel[0];
    steel_color.value = '#000000';

    type_sheet.value = master_project_store.form.data_garage.type_sheet[0];
    sheet_color.value = '#000000';
});

const onSubmit = async (id) => {

    const form_data = {
        id_garage : id_garage.value,
        steel_type : steel_type.value,
        steel_thickness : steel_thickness.value,
        steel_color : steel_color.value,
        type_sheet : type_sheet.value,
        sheet_color : sheet_color.value,
        note : note.value,
    }

    try {
        const response  = await axios.post(master_project_store.url.store_customer_garage, form_data)
        if (response.status == 200) {
            await Swal.fire({
            icon: "success",
            title: "success",
            text: response.message,
            }).then((result) => {
                // router.push('/app/customer');
            });
        }
    } catch (error) {
        if (error.response.status == 500) {
            await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
            });
        }
    }

}

</script>
<style>
</style>