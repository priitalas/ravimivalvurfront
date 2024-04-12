import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import ErrorView from "@/views/ErrorView.vue";
import DoctorView from "@/views/DoctorView.vue";
import PatientView from "@/views/PatientView.vue";

const routes = [
  {
    path: '/',
    name: 'homeRoute',
    component: HomeView
  },

  {
    path: '/error',
    name: 'errorRoute',
    component: ErrorView
  },
  {
    path: '/doctor',
    name: 'doctorRoute',
    component: DoctorView
  },
  {
    path: '/patient',
    name: 'patientRoute',
    component: PatientView
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
