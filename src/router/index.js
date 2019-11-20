import Vue from 'vue'
import Router from 'vue-router'
import CountrySponsor from '@/pages/CountrySponsor'
import PersonalInformation from '@/pages/PersonalInformation'
import Payment from '@/pages/Payment'
import Personal from '@/pages/Personal'
import Business from '@/pages/Business'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'CountrySponsor',
      component: CountrySponsor
    },
    {
      path: '/CountrySponsor',
      name: 'CountrySponsor',
      component: CountrySponsor,
    },
    {
      path: '/PersonalInformation',
      name: 'PersonalInformation',
      component: PersonalInformation,
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment,
    },
    {
      path: '/Personal',
      name: 'Personal',
      component: Personal,
    },
    {
      path: '/Business',
      name: 'Business',
      component: Business,
    },
  ]
})

export default router