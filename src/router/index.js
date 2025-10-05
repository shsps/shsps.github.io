import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/home/HomePage.vue'),
      },
      {
        path: '/normal/button',
        name: 'Button',
        component: () => import('../views/home/normal/Button.vue'),
      },
      {
        path: '/normal/checkbox',
        name: 'CheckBox',
        component: () => import('../views/home/normal/CheckBox.vue'),
      },
      {
        path: '/normal/datepicker',
        name: 'DatePicker',
        component: () => import('../views/home/normal/DatePicker.vue'),
      },
      {
        path: '/normal/input',
        name: 'Input',
        component: () => import('../views/home/normal/Input.vue'),
      },
      {
        path: '/normal/select',
        name: 'Select',
        component: () => import('../views/home/normal/Select.vue'),
      },
      {
        path: '/progressbar',
        name: 'ProgressBar',
        component: () => import('../views/home/ProgressBar.vue'),
      },
      {
        path: '/signature',
        name: 'Signature',
        component: () => import('../views/home/Signature.vue'),
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('../views/home/Table.vue'),
      },
      {
        path: '/address',
        name: 'Address',
        component: () => import('../views/home/Address.vue'),
      },
      {
        path: '/otp-input',
        name: 'OTPInput',
        component: () => import('../views/home/OTPInput.vue'),
      },
      {
        path: '/chart',
        name: 'Chart',
        component: () => import('../views/home/Charts.vue'),
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
