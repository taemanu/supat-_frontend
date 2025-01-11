import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";

export const customerStore = defineStore("customerStore", {
    id: "customerStore",
    state: () => ({
        url: {
            store_customer: `${import.meta.env.VITE_API_URL}/customer/store`,
            list_customer: `${import.meta.env.VITE_API_URL}/customer/get-data-list`,
            change_status: `${import.meta.env.VITE_API_URL}/customer/change-status`,
        },
        form:{
            data:{
                id_card : "",
                firstname : "",
                lastname : "",
                tel : "",
                email : "",
                status : 1,
                address : "",
                line_id : "",
            }
        },
        data_list:{}
    }),
    actions: {
        async getDataList(){
            const data  = await axios.get(this.url.list_customer);

            this.data_list = data.data
        }
    }
});
