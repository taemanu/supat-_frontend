import { createApp } from 'vue'
import { createPinia } from "pinia";
// import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "./assets/css/app.css"
import "./assets/css/fonts.css"
import "./assets/js/app"
// import Main from './views/Login.vue'
import App from './App.vue'
import router from './router/index'
import VueDatePicker from '@vuepic/vue-datepicker';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import globalComponents from "./global-components";

import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App).use(router).use(createPinia());

globalComponents(app);

app.use(router);
app.component('VueDatePicker', VueDatePicker);
app.use(VueSweetalert2);
app.mount('#app');