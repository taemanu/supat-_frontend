// router.js
import { createRouter, createWebHistory } from "vue-router";
import middleware from "@grafikri/vue-middleware";
import Login from "../views/login/Login.vue";
import Layout from "../views/layouts/Main.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import authentication from "@/middleware/authentication";

import Customer from "../views/customer/List.vue";
import FormCustomer from "../views/customer/FormCustomer.vue";

import User from "../views/user/User.vue";
import FormUser from "../views/user/FormUser.vue";
import Profile from "../views/profile/Profile.vue";
import CateMaterial from "../views/material/ListCate.vue";
import MaterialOrder from "../views/materialorder/materialorderList.vue";
import ProjectList from "../views/project/ProjectList.vue";
import MonthlyEmployeeReport from "../views/employee/MonthlyEmployeeReport.vue";
import Quotation from "../views/customer/Quotation.vue";
import FinancialList from "../views/financial/FinancialList.vue";
import EmployeeList from "../views/employee/EmployeeList.vue";
import FormQuotation from "../views/quotation/FormQuotation.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },

  {
    path: "/app",
    name: "Layout",
    component: Layout,
    meta: {
      middleware: [authentication],
    },
    children: [
      {
        path: "/app/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },

      {
        path: "/app/customer",
        name: "customer",
        component: Customer,
      },
      {
        path: "/app/FormCustomer",
        name: "FormCustomer",
        component: FormCustomer,
      },

      {
        path: "/app/user",
        name: "User",
        component: User,
      },
      {
        path: "/app/FormUser",
        name: "FormUser",
        component: FormUser,
      },

      {
        path: "/app/profile",
        name: "Profile",
        component: Profile,
      },

      {
        path: "/app/listCate",
        name: "CateMaterial",
        component: CateMaterial,
      },

      {
        path: "/app/MaterialOrderList",
        name: "MaterialOder",
        component: MaterialOrder,
      },

      {
        path: "/app/ProjectList",
        name: "ProjectList",
        component: ProjectList,
      },

      {
        path: "/app/MonthlyEmployeeReport",
        name: "MonthlyEmployeeReport",
        component: MonthlyEmployeeReport,
      },

      {
        path: "/app/Quotation",
        name: "Quotation",
        component: Quotation,
      },

      {
        path: "/app/Quotation/Create",
        name: "FormQuotation",
        component: FormQuotation,
      },

      {
        path: "/app/Quotation/Edit/:id",
        name: "FormEditQuotation",
        component: FormQuotation,
      },

      {
        path: "/app/FinancialList",
        name: "FinancialList",
        component: FinancialList,
      },

      {
        path: "/app/EmployeeList",
        name: "EmployeeList",
        component: EmployeeList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition || {
        left: 0,
        top: 0,
      }
    );
  },
});
router.beforeEach(middleware());

export default router;
