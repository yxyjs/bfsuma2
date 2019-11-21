import Vue from 'vue'
import Router from 'vue-router'
// register
import RegisterIndex from "@/pages/register/Index"
import RegisterAgreement from "@/pages/register/Agreement"
import DistributorCountrySponsor from '@/pages/register/distributor/CountrySponsor'
import DistributorPersonalInformation from '@/pages/register/distributor/PersonalInformation'
import DistributorPayment from '@/pages/register/distributor/Payment'
import DistributorPersonal from '@/pages/register/distributor/Personal'
import DistributorBusiness from '@/pages/register/distributor/Business'

// login
import LoginIndex from "@/pages/login/Index"
// findpassword
import FindPassword from "@/pages/login/FindPassword"

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/register'
    },
    {
      path: '/register',
      component: RegisterIndex
    },
    {
      path: '/register/agreement',
      component: RegisterAgreement
    },
    {
      path: '/register/distributor',
      component: DistributorCountrySponsor
    },
    {
      path: '/register/distributor/personalInformation',
      component: DistributorPersonalInformation
    },
    {
      path: '/register/distributor/payment',
      component: DistributorPayment
    },
    {
      path: '/register/distributor/personal',
      component: DistributorPersonal
    },
    {
      path: '/register/distributor/business',
      component: DistributorBusiness
    },
    {
      path: '/login',
      component: LoginIndex
    },
    {
      path: '/findPassword',
      component: FindPassword
    }
  ]
})


export default router