import Vue from 'vue'
import Router from 'vue-router'
import CountrySponsor_p from '@/pages/CountrySponsor_p'
import CountrySponsor_m from '@/pages/CountrySponsor_m'
import PersonalInformation_p from '@/pages/PersonalInformation_p'
import PersonalInformation_m from '@/pages/PersonalInformation_m'
// import mLogin from '@/pages/mLogin'
// import FindPwd from '@/pages/FindPwd'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'CountrySponsor_p',
      component: CountrySponsor_p
    },
    {
      path: '/p',
      name: 'CountrySponsor_p',
      component: CountrySponsor_p,
    },
    {
      path: '/m',
      name: 'CountrySponsor_m',
      component: CountrySponsor_m,
    },
    {
      path: '/CountrySponsor_p',
      name: 'CountrySponsor_p',
      component: CountrySponsor_p,
    },
    {
      path: '/PersonalInformation_p',
      name: 'PersonalInformation_p',
      component: PersonalInformation_p,
    },
    {
      path: '/PersonalInformation_m',
      name: 'PersonalInformation_m',
      component: PersonalInformation_m,
    },
  ]
})

export default router