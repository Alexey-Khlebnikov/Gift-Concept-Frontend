/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)
import moduleAuth from './auth/moduleAuth.js'
import product from './product'



import moduleTodo from './todo/moduleTodo.js'
import moduleCalendar from './calendar/moduleCalendar.js'
import moduleChat from './chat/moduleChat.js'
import moduleEmail from './email/moduleEmail.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    auth: moduleAuth,
    product,




    todo: moduleTodo,
    calendar: moduleCalendar,
    chat: moduleChat,
    email: moduleEmail,
    eCommerce: moduleECommerce,
  },
  strict: process.env.NODE_ENV !== 'production'
})
