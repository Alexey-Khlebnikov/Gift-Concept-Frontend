import { Api } from '@/api'

const actions = {
  async loadCategories({ commit, state }) {
    return Api.post('/category/find').then(data => {
      commit('SET_CATEGORIES', data)
    })
  },
  async loadPriceUnits({ commit, state }) {
    return Api.post('/priceUnit/find').then(data => {
      commit('SET_PRICEUNITS', data)
    })
  }
}

export default actions
