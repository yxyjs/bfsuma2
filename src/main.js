// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body)
  }, false);
}

import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email, alpha_spaces, length, min_value } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Required'
});
extend('email', {
  ...email,
  message: 'Format error'
});
extend('alpha_spaces', {
  ...alpha_spaces,
  message: 'Must be letter'
})
extend('length', {
  ...length,
  message: 'Format error'
})
extend('min_value', {
  ...min_value,
  message: 'Format error'
})
// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
