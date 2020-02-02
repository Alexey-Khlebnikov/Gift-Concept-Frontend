/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import auth from "@/auth/authService";

export default {
	UPDATE_AUTHENTICATED_USER(state, user) {
    auth.updateUserData(user)
  },

  SOCKET_change_user_acivate_state(state, activate) {
    let user = state.user
    user.activate = activate
    auth.updateUserData(user)
  },



}
