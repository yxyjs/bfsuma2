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
      redirect: '/register',
    },
    {
      path: '/register',
      component: RegisterIndex,
      meta: {
        title: 'register/index'
      }
    },
    {
      path: '/register/agreement',
      component: RegisterAgreement,
      meta: {
        title: 'register/agreement'
      }
    },
    {
      path: '/register/distributor/countrySponsor',
      component: DistributorCountrySponsor,
      meta: {
        title: 'Country Upline'
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
        title: 'register/personal'
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