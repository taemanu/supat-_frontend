// router.js
import { createRouter, createWebHistory } from "vue-router";
import middleware from "@grafikri/vue-middleware";
import Login from "../views/login/Login.vue";
import Layout from "../views/layouts/Main.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import authentication from "@/middleware/authentication";

import Customer from "../views/customer/List.vue";
import FormCustomer from "../views/customer/FormCustomer.vue";

import ProjectList from "../views/project/ProjectList.vue";
import FormProject from "../views/project/FormProject.vue";
import ProjectMaterialList from "../views/project/ProjectMaterialList.vue";
import ProjectPeriod from "../views/project/ProjectPeriod.vue";
import ProjectCustomerList from "../views/project/ProjectCustomerList.vue";

import User from "../views/user/User.vue";
import FormUser from "../views/user/FormUser.vue";
import Profile from "../views/profile/Profile.vue";
import CateMaterial from "../views/material/ListCate.vue";
import MaterialOrder from "../views/materialorder/MaterialOrderList.vue";
import MonthlyEmployeeReport from "../views/employee/MonthlyEmployeeReport.vue";
import Quotation from "../views/customer/Quotation.vue";
import FinancialList from "../views/financial/FinancialList.vue";
import EmployeeList from "../views/employee/EmployeeList.vue";
import FormQuotation from "../views/quotation/FormQuotation.vue";
import Compensation from "../views/employee/Compensation.vue";

//ลูกค้า
import CustomerProjectType from "../views/customer/CustomerProjectType.vue";
import FormCustomerProjectGarageType from "../views/customer/FormCustomerProjectGarageType.vue";

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
        path: "/app/ProjectCustomerList",
        name: "ProjectCustomerList",
        component: ProjectCustomerList,
      },
      {
        path: "/app/FormProject",
        name: "FormProject",
        component: FormProject,
      },
      {
        path: "/app/ProjectMaterialList",
        name: "ProjectMaterialList",
        component: ProjectMaterialList,
      },
      {
        path: "/app/ProjectPeriod",
        name: "ProjectPeriod",
        component: ProjectPeriod,
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

      {
        path: "/app/Compensation/:id",
        name: "Compensation",
        component: Compensation,
      },

      //ลูกค้าหน้าแรก
      {
        path: "/app/Customer/CustomerProjectType",
        name: "CustomerProjectType",
        component: CustomerProjectType,
      },
      {
        path: "/app/Customer/CustomerProjectGarageType/detail/:id",
        name: "FormCustomerProjectGarageType",
        component: FormCustomerProjectGarageType,
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
