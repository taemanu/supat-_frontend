// router.js
import {
  createRouter,
  createWebHistory
} from 'vue-router'
import middleware from "@grafikri/vue-middleware"
import Login from '../views/login/Login.vue'
import Layout from '../views/layouts/Main.vue'
import Dashboard from '../views/dashboard/Dashboard.vue'
import authentication from "@/middleware/authentication"

import Customer from '../views/customer/List.vue'
import FormCustomer from '../views/customer/FormCustomer.vue'

import User from '../views/user/User.vue'
import FormUser from '../views/user/FormUser.vue'

import Profile from '../views/profile/Profile.vue'

import CateMaterial from '../views/material/ListCate.vue'

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '/app',
    name: 'Layout',
    component: Layout,
    meta: {
      middleware: [authentication],
    },
    children: [
      {
        path: '/app/dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },

      {
        path: '/app/customer',
        name: 'customer',
        component: Customer,
      },
      {
        path: '/app/FormCustomer',
        name: 'FormCustomer',
        component: FormCustomer,
      },

      {
        path: '/app/user',
        name: 'User',
        component: User,
      },
      {
        path: '/app/FormUser',
        name: 'FormUser',
        component: FormUser,
      },

      {
        path: '/app/profile',
        name: 'Profile',
        component: Profile,
      },

      {
        path: '/app/listCate',
        name: 'CateMaterial',
        component: CateMaterial,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {
      left: 0,
      top: 0
    }
  },
})
router.beforeEach(middleware())

export default router