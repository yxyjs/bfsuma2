import Vue from 'vue'
import Router from 'vue-router'
// register
import RegisterIndex from "@/pages/register/Index"
import RegisterAgreement from "@/pages/register/Agreement"
const DistributorCountrySponsor = () => import('@/pages/register/distributor/CountrySponsor')
const DistributorPersonalInformation = () => import('@/pages/register/distributor/PersonalInformation')
const DistributorPayment = () => import('@/pages/register/distributor/Payment')
const DistributorPersonal = () => import('@/pages/register/distributor/Personal')
const DistributorBusiness = () => import('@/pages/register/distributor/Business')

import LoginIndex from "@/pages/login/Index"
const FindPassword = () => import("@/pages/login/FindPassword")

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/register',
    },
    {
      path: '/register',
      component: RegisterIndex,
      meta: {
        title: 'Register Home'
      }
    },
    {
      path: '/register/agreement',
      component: RegisterAgreement,
      meta: {
        title: 'Register Agreement'
      }
    },
    {
      path: '/register/distributor/countrySponsor',
      component: DistributorCountrySponsor,
      meta: {
        title: 'Country & Upline'
      }
    },
    {
      path: '/register/distributor/personalInformation',
      component: DistributorPersonalInformation,
      meta: {
        title: 'Account Information'
      }
    },
    {
      path: '/register/distributor/payment',
      component: DistributorPayment,
      meta: {
        title: 'Pay Registration Fee'
      }
    },
    {
      path: '/register/distributor/personal',
      component: DistributorPersonal,
      meta: {
        title: 'Register Personal'
      }
    },
    {
      path: '/register/distributor/business',
      component: DistributorBusiness,
      meta: {
        title: 'Start a Business Trip'
      }
    },
    {
      path: '/login',
      component: LoginIndex,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/findPassword',
      component: FindPassword,
      meta: {
        title: 'Find Password'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})


export default router