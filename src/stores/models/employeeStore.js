import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";

export const employeeStore = defineStore("employeeStore", {
    id: "employeeStore",
    state: () => ({
        url: {
            store_employee: `${import.meta.env.VITE_API_URL}/employee/store`,
            edit_employee: `${import.meta.env.VITE_API_URL}/employee/update`,
            list_employee: `${import.meta.env.VITE_API_URL}/employee/get-data-list`,
            // change_status: `${import.meta.env.VITE_API_URL}/employee/change-status`,
        },
        form:{
            data:{
                id_employee : "",
                id_card : "",
                firstname : "",
                lastname : "",
                gender : "male",
                dob : "",
                tel : "",
                email : "",
                line_id : "",
                address : "",
                position : "emp",
                start_date : "",
                employment_status : "1",
                note : "",
                salary : 0,
                user_id : '',
                password_user : '',
            }
        },
        data_list:{}
    }),
    actions: {
        async getDataList(){
            const data  = await axios.get(this.url.list_employee);

            console.log(data.data)

            this.data_list = data.data
        }
    }
});
