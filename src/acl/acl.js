import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'anonymous'
if(localStorage.getItem('userRole')) initialRole = localStorage.getItem('userRole')

export default new AclCreate({
  initial: initialRole,
  notfound: '/pages/not-authorized',
  router,
  acceptLocalRules: true,
  globalRules: {
    super: new AclRule('super').generate(),
    admin: new AclRule('admin').or('super').generate(),
    buyer: new AclRule('buyer').generate(),
    seller: new AclRule('seller').generate(),
    driver: new AclRule('driver').generate(),
    anonymous: new AclRule('anonymous').or('admin').or('seller').or('buyer').or('super').or('driver').generate(),
  }
})
