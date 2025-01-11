import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";

export const userAuthStore = defineStore("userAuthStore", {
  id: "userAuthStore",
  state: () => ({
    url: {
      auth_login: `${import.meta.env.VITE_API_URL}/auth/login`,
      auth_me: `${import.meta.env.VITE_API_URL}/auth/user`,
      auth_refresh: `${import.meta.env.VITE_API_URL}/auth/refresh`,
      auth_logout: `${import.meta.env.VITE_API_URL}/auth/logout`,
      page_login: "/",
    },
    access_token: localStorage.getItem("access_token"),
    user: JSON.parse(localStorage.getItem("user")),
    permissions : null
  }),

  actions: {
    async login(user_id, password) {
      try {
        const res = await axios.post(this.url.auth_login, {
          user_id: user_id,
          password: password,
        });

        if (res.status == 200) {
          this.access_token = res.data.data.access_token;
          this.permissions = res.data.data.permission_menu;

          localStorage.setItem("access_token", res.data.data.access_token);
          localStorage.setItem("permissions", res.data.data.permission_menu);

          await this.me();
          return res;
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 500) {
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.response.data.message,
          });
        }

        return {
          data: error.response.data.errors,
          status: 400,
        };
      }
    },
    async refresh() {
      try {
        const res = await axios.post(this.url.auth_refresh, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.access_token}`,
          },
        });

        if (res.status == 200) {
          this.access_token = res.data.access_token;
          localStorage.setItem("access_token", res.data.access_token);
          return await this.me();
        }
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    async me() {
      try {
        const res = await axios.post(this.url.auth_me, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.access_token}`,
          },
        });

        if (res.status == 200) {
          this.user = res.data;
          localStorage.setItem("user", JSON.stringify(res.data));
          return true;
        }
      } catch (error) {
        console.log(error);
      }

      return false;
    },
    async logout() {
      try {
        const res = await axios.post(this.url.auth_logout, null, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.access_token}`,
          },
        });
      } catch (error) {
        console.log(error);
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      router.push(this.url.page_login || "/");
      window.location.reload();
    },
  },
});
