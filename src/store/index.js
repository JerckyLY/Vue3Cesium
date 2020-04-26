import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      videohide: true
  },
  mutations: {
    setVideoHide (state, status){
      state.videohide = status
    }
  },
  getters: {
    getVideoHide (state){
      return state.videohide
    }
  },
  actions: {
  },
  modules: {
  }
})
