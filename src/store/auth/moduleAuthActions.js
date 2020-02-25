/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import firebase from 'firebase/app'
import 'firebase/auth'
import router from '@/router'
import sellerApi from '@/api/seller'
import driverApi from "@/api/driver"
import userApi from '@/api/user'
import adminApi from '@/api/admin'
import authService from '@/auth/authService'

export default {

  registerUser({ dispatch }, payload) {
    var { userDetails, notify } = payload
    return dispatch('registerAttempt', userDetails)
      .then(() => {
        notify({
          title: 'Account Created',
          text: 'You are successfully registered!',
          iconPack: 'feather',
          icon: 'icon-check',
          color: 'success'
        });
        const newPayload = {
          userDetails: userDetails,
          notify
        }
        return dispatch('loginAttempt', newPayload)
      })
      .catch((error) => {
        notify({
          title: `Error: ${error.code}`,
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

  registerAttempt({}, userDetails) {
    if (userDetails.role == 'seller') {
      return sellerApi.register(userDetails)
    } else {
      return driverApi.register(userDetails)
    }
  },

  async adminSetup({ state }, payload) {
    adminApi.post('/setup', payload.adminData)
      .then(() => {
        payload.notify({
          title: `Admin Setting`,
          text: "You are registered as an administrator",
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        });
        console.log(state.auth)
        router.replace({ path: '/login', query: { to: '/admin' } });
      })
      .catch(error => {
        payload.notify({
          time: 2500,
          title: `Error: ${error.code}`,
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })

  },

  async loginAttempt({ state }, payload) {

    // If user is already logged in notify and exit
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }

    // New payload for login action
    const newPayload = {
      userDetails: payload.userDetails,
      notify: payload.notify
    }

    return authService.login(newPayload.userDetails)
      .then(result => {
        if (payload.checkbox_remember_me) {
          return userApi.rememberMe().then(() => {
            router.push(router.currentRoute.query.to || '/');
            return result;
          })
        }
        router.push(router.currentRoute.query.to || '/');
        return result;
      })
      .catch((error) => {
        payload.notify({
          time: 2500,
          title: `Error: ${error.code}`,
          text: error.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },














  // Google Login
  loginWithGoogle({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

  // Facebook Login
  loginWithFacebook({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

  // Twitter Login
  loginWithTwitter({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.TwitterAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },

  // Github Login
  loginWithGithub({ commit, state }, payload) {
    if (state.isUserLoggedIn()) {
      payload.notify({
        title: 'Login Attempt',
        text: 'You are already logged in!',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'warning'
      });
      return false
    }
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        router.push(router.currentRoute.query.to || '/');
        commit('UPDATE_AUTHENTICATED_USER', result.user.providerData[0])
      }).catch((err) => {
        payload.notify({
          time: 2500,
          title: 'Error',
          text: err.message,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        });
      })
  },
  updateUsername({ commit }, payload) {
    payload.user.updateProfile({
      displayName: payload.username
    }).then(() => {

      // If username update is success
      // update in localstorage
      let newUserData = Object.assign({}, payload.user.providerData[0])
      newUserData.displayName = payload.username
      commit('UPDATE_AUTHENTICATED_USER', newUserData)

      // If reload is required to get fresh data after update
      // Reload current page
      if (payload.isReloadRequired) {
        router.push(router.currentRoute.query.to || '/')
      }
    }).catch((err) => {
      payload.notify({
        time: 8800,
        title: 'Error',
        text: err.message,
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      });
    })
  },
  updateAuthenticatedUser({ commit }, payload) {
    commit('UPDATE_AUTHENTICATED_USER', payload)
  }
}
