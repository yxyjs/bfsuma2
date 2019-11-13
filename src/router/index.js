import Vue from 'vue'
import Router from 'vue-router'
import Register_p from '@/pages/Register_p'
import Register_m from '@/pages/Register_m'
// import mLogin from '@/pages/mLogin'
// import FindPwd from '@/pages/FindPwd'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Register_p',
      component: Register_m
    },
    {
      path: '/p',
      name: 'Register_p',
      component: Register_p,
    },
    {
      path: '/m',
      name: 'Register_m',
      component: Register_m,
    }
  ]
})

export default router