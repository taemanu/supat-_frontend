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
            task_detail: `${import.meta.env.VITE_API_URL}/project/task_detail/`,
            get_project_from_customer: `${import.meta.env.VITE_API_URL}/project/get-project-from-customer/`,
            update_percents: `${import.meta.env.VITE_API_URL}/project/update-percents/`,

            list_project_customer: `${import.meta.env.VITE_API_URL}/project/project-customer`,
            list_quotation_customer: `${import.meta.env.VITE_API_URL}/qt/customer/list`,
        },
        form:{
            data:{
                id_project : "",
                customer_code : "",
                name_project : "",
                code_quo : "",
                date_contract : "",
                date_end : "",
                note : "",
                status : "1",
                task : [
                    {
                        task: '', 
                        percent: 0 ,
                    }
                ],
            }
        },
        data_list_pedding:{},
        data_list:{},
        data_project_customer_list:{},
        data_quotation_customer_list:{}
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
        },

        async getDataDetail(id){

            console.log(id);

            const data  = await axios.get(`${this.url.task_detail}${id}`);
            return data;
        },

        async getProjectFromCustomer(customer_code){
            const data  = await axios.get(`${this.url.get_project_from_customer}${customer_code}`);
            return data;
        },

        async getDataProjectCustomerList(){
            const data  = await axios.get(this.url.list_project_customer);
            this.data_project_customer_list = data.data;

        },

        async getDataQuotationCustomerList(){
            const data  = await axios.get(this.url.list_quotation_customer);
            this.data_quotation_customer_list = data.data;

        },
    }
});
