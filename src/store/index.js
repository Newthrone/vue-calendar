import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDate: new Date()
  },
  mutations: {
    SET_CURRENT_DATE: (state, date) => {
      state.currentDate = date
    }
  },
  actions: {
    SET_CURRENT_DATE: ({ commit }, date) => {
      const currentDate = date || new Date()
      commit('SET_CURRENT_DATE', currentDate)
    }
  },
  getters: {
    GET_CURRENT_DATE: (state) => state.currentDate
  }
})
