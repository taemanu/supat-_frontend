<style scoped>
a {
  text-decoration: none;
}
.login-page {
  width: 100%;
  height: 100vh;
  display: inline-block;
  display: flex;
  align-items: center;
}
.form-right i {
  font-size: 100px;
}

.construct {
  width: 45%;
  height: 45%;
}
</style>
<template>
  <div>
    <div class="login-page bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 offset-lg-1">
            <div class="bg-white shadow rounded">
              <div class="row">
                <div class="col-md-7 pe-0">
                  <div class="form-left h-100 py-5 px-5">
                    <form @submit.prevent="onSubmit" class="row g-4">
                      <div class="col-12">
                        <label
                          >Username<span class="text-danger">*</span></label
                        >
                        <div class="input-group">
                          <div class="input-group-text">
                            <i class="bi bi-person-fill"></i>
                          </div>
                          <input
                            type="text"
                            :class="is_user == true ? 'is-invalid' : ''"
                            class="form-control"
                            placeholder="Enter Username"
                            name="user_id"
                            v-model="data_login.user_id"
                          />
                          <div
                            id="validationServerUsernameFeedback"
                            class="invalid-feedback"
                          >
                            {{ error_user }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <label
                          >Password<span class="text-danger">*</span></label
                        >
                        <div class="input-group">
                          <div class="input-group-text">
                            <i class="bi bi-lock-fill"></i>
                          </div>
                          <input
                            type="password"
                            :class="is_password == true ? 'is-invalid' : ''"
                            class="form-control"
                            placeholder="Enter Password"
                            name="password"
                            v-model="data_login.password"
                          />
                          <div
                            id="validationServerPasswordFeedback"
                            class="invalid-feedback"
                          >
                            {{ error_password }}
                          </div>
                        </div>
                      </div>

                      <div class="col-12">
                        <button type="submit" class="btn btn-primary float-end">
                          เข้าสู่ระบบ
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-md-5 ps-0 d-none d-md-block">
                  <div
                    class="form-right h-100 bg-primary text-white text-center pt-5"
                  >
                    <img
                      src="/construct.svg"
                      class="construct img-fluid rounded me-1"
                      alt="Charles Hall"
                    />
                    <h2 class="text-bg-warning text-white my-4 px-5 py-2">
                      ระบบสารสนเทศบริหารจัดการข้อมูลของผู้รับเหมาก่อสร้าง
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <!-- <p class="text-end text-secondary mt-3">Bootstrap 5 Login Page Design</p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, watch } from "vue";
import { userAuthStore } from "@/stores/models/userAuthStore";
import { useRouter } from "vue-router";

//data
const data_login = reactive({
  user_id: "",
  password: "",
});
const is_password = ref(false);
const is_user = ref(false);
const error_password = ref("");
const error_user = ref("");
const router = useRouter();

//use
const store = userAuthStore();

//function
const onSubmit = async () => {
  let res = await store.login(data_login.user_id, data_login.password);
  if (res.status == 200) {
    router.push({ name: "Dashboard" });
  } else {
    if (res.data.password) {
      is_password.value = true;
      const computed_password = computed(() => {
        return res.data.password[0];
      });
      error_password.value = computed_password.value;
    } else {
      is_password.value = false;
    }

    if (res.data.user_id) {
      is_user.value = true;
      error_user.value = res.data.user_id[0];
    } else {
      is_user.value = false;
    }
  }
};
</script>
