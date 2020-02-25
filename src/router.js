/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import AdminApi from "@/api/admin"
import authService from "@/auth/authService"

import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '',
      component: () => import('@/layouts/main/Admin.vue'),
      children: [

        // ///////////////////
        // Admin Side
        // ///////////////////
        {
          path: '/',
          redirect: function () {
            let role = authService.userRole
            switch (role) {
              case 'super':
              case 'admin': return '/admin'
              case 'seller': return '/seller'
              case 'driver': return '/driver'
              default: return '/login'
            }
          },
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/admin',
          name: 'adminHome',
          component: () => import('@/views/admin/Home.vue'),
          meta: {
            rule: 'admin'
          }
        },

        {
          path: '/admin/users/seller',
          name: 'adminSellerList',
          component: () => import('@/views/admin/seller/SellerList.vue'),
          meta: {
            rule: 'admin'
          }
        },

        {
          path: '/admin/users/seller/new',
          name: 'adminNewSellers',
          component: () => import('@/views/admin/seller/NewSellers.vue'),
          meta: {
            rule: 'admin'
          }
        },

        {
          path: '/admin/users/driver',
          name: 'adminDriverList',
          component: () => import('@/views/admin/driver/DriverList.vue'),
          meta: {
            rule: 'admin'
          }
        },

        {
          path: '/admin/users/driver/new',
          name: 'adminNewDrivers',
          component: () => import('@/views/admin/driver/NewDrivers.vue'),
          meta: {
            rule: 'admin'
          }
        },



        {
          path: '/dashboard/analytics',
          name: 'dashboardAnalytics',
          component: () => import('./views/DashboardAnalytics.vue'),
          meta: {
            rule: 'admin'
          }
        },

      ]
    },




    // ////////////////////////////
    // Seller Full Side
    // ////////////////////////////
    {
      path: '',
      component: () => import('@/layouts/main/Seller.vue'),
      children: [
        {
          path: '/seller',
          name: 'sellerHome',
          component: () => import('./views/seller/Home.vue'),
          meta: {
            rule: 'seller'
          }
        },

        {
          path: '/seller/product',
          name: 'sellerProduct',
          component: () => import('./views/seller/ProductList.vue'),
          meta: {
            rule: 'seller'
          }
        },
      ]
    },

    // ////////////////////////////
    // Driver Full Side
    // ////////////////////////////
    {
      path: '',
      component: () => import('@/layouts/main/Seller.vue'),
      children: [
        {
          path: '/driver',
          name: 'driverHome',
          component: () => import('./views/seller/Home.vue'),
          meta: {
            rule: 'driver'
          }
        },
      ]
    },


    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // ///////////////////
        // Admin Side
        // ///////////////////
        {
          path: '/admin/setup',
          name: 'adminSetup',
          component: () => import('@/views/admin/Setup.vue'),
          meta: {
            rule: 'anonymous'
          }
        },



        {
          path: '/callback',
          name: 'authCallback',
          component: () => import('@/views/Callback.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/login',
          name: 'pageLogin',
          component: () => import('@/views/pages/Login.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/register',
          name: 'pageRegister',
          component: () => import('@/views/pages/Register.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'pageForgotPassword',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'pageResetPassword',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/lock-screen',
          name: 'pageLockScreen',
          component: () => import('@/views/pages/LockScreen.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/comingsoon',
          name: 'pageComingSoon',
          component: () => import('@/views/pages/ComingSoon.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/error-404',
          name: 'pageError404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/error-500',
          name: 'pageError500',
          component: () => import('@/views/pages/Error500.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'pageNotAuthorized',
          component: () => import('@/views/pages/NotAuthorized.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/waiting-activation',
          name: 'pageWaitingActivation',
          component: () => import('@/views/pages/WaitingActivation.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
        {
          path: '/pages/maintenance',
          name: 'pageMaintenance',
          component: () => import('@/views/pages/Maintenance.vue'),
          meta: {
            rule: 'anonymous'
          }
        },
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ],
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = "none";
  }
})

router.beforeEach((to, from, next) => {

  if (to.path == '/admin') {
    return AdminApi.isSetAdmin().then(isSetAdmin => {
      if (!isSetAdmin) {
        return router.replace({ path: '/admin/setup' })
      }
      if (!authService.isAuthenticated) {
        return router.push({ path: '/login', query: { to: to.path } })
      }
      next();
    })
  }

  if (to.meta.rule == 'anonymous') return next()

  if(!authService.isAuthenticated) {
    return router.push({ path: '/login', query: { to: to.path } })
  }
  if (!authService.isActivated) {
    return router.push({path: '/pages/waiting-activation', query: {to: '/'}})
  }
  next();

});

export default router
