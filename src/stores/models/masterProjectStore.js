import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import Swal from "sweetalert2";

export const masterProjectStore = defineStore("masterProjectStore", {
    id: "masterProjectStore",
    state: () => ({
        url: {
            get_data_garage: `${import.meta.env.VITE_API_URL}/master/garage/list`,
            get_data_garage_detail: `${import.meta.env.VITE_API_URL}/master/garage/detail`,
            store_customer_garage: `${import.meta.env.VITE_API_URL}/master/garage/store`,
        },
        form:{
            data_garage:{
                name: "",
                code: "",
                img: "",
                type_steel: [],
                thickness_steel: [],
                type_sheet: [],
            },
        },
        data_garage_list:{}
    }),
    actions: {

        async getDataGarageList(){
            const data  = await axios.get(this.url.get_data_garage);

            this.data_garage_list = data.data
        },

        async getDataGarageDetail(id){
        
            const data  = await axios.get(`${this.url.get_data_garage_detail}/${id}`);

            if(data.status == 200){
                this.form.data_garage.id = data.data.id
                this.form.data_garage.name = data.data.project_name
                this.form.data_garage.code = data.data.project_code 
                this.form.data_garage.img = data.data.img 
                this.form.data_garage.type_steel = data.data.type_steel 
                this.form.data_garage.thickness_steel = data.data.thickness_steel 
                this.form.data_garage.type_sheet = data.data.type_sheet 
            }

        },

    }
});
