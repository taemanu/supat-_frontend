import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";

export const ProjectStore = defineStore("ProjectStore", {
    id: "ProjectStore",
    state: () => ({
        url: {
            store_project: `${import.meta.env.VITE_API_URL}/project/store`,
            list_project: `${import.meta.env.VITE_API_URL}/project/get-data-list`,
            change_status: `${import.meta.env.VITE_API_URL}/project/change-status`,
            project_detail: `${import.meta.env.VITE_API_URL}/project/project-detail/`,
        },
        form:{
            data:{
                id_project : "",
                name_project : "",
                code_quo : "",
                date_contract : "",
                date_end : "",
                note : "",
                status : "",
            }
        },
        data_list_pedding:{},
        data_list:{}
    }),
    actions: {
        async getDataList(){
            const data  = await axios.get(this.url.list_project);
            this.data_list_pedding = data.data['data_list_pedding'];
            this.data_list = data.data['data_list'];

        },

        async getDataDetail(code){
            const data  = await axios.get(`${this.url.project_detail}${code}`);
            return data;
        }
    }
});
