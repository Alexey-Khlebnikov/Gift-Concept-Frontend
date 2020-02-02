// import Axios from "axios";

/*=========================================================================================
  File Name: mutations.js
  Description: Vuex Store - mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const mutations = {
  SET_CATEGORIES(state, data) {
    state.categories = data
  },
  SET_PRICEUNITS(state, data) {
    state.priceUnits = data
  }
}

export default mutations
